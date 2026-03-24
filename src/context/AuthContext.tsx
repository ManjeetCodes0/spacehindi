"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, type Timestamp } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb, googleProvider, facebookProvider } from "@/lib/firebase";

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isPremium: boolean;
  subscriptionSource: "facebook" | "none";
}

interface AuthContextType {
  user: AppUser | null;
  firebaseUser: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  loading: true,
  loginWithGoogle: async () => {},
  loginWithFacebook: async () => {},
  loginWithEmail: async () => {},
  signUpWithEmail: async () => {},
  logout: async () => {},
});

/**
 * Check facebook_subscribers collection for an active subscription.
 * Runs once per login — result is persisted to the users doc.
 */
async function checkFacebookSubscription(
  email: string
): Promise<{ isPremium: boolean; subscriptionSource: "facebook" | "none" }> {
  try {
    const db = getFirebaseDb();
    const subRef = doc(db, "facebook_subscribers", email);
    const subSnap = await getDoc(subRef);

    if (subSnap.exists()) {
      const data = subSnap.data();
      const expiryDate = data.expiryDate as Timestamp | undefined;

      if (expiryDate && expiryDate.toDate().getTime() > Date.now()) {
        return { isPremium: true, subscriptionSource: "facebook" };
      }
    }
  } catch (err) {
    console.error("Failed to check facebook subscription:", err);
  }

  return { isPremium: false, subscriptionSource: "none" };
}

async function syncUserToFirestore(firebaseUser: User): Promise<AppUser> {
  const db = getFirebaseDb();
  const userRef = doc(db, "users", firebaseUser.uid);
  const userSnap = await getDoc(userRef);

  // Check facebook subscription (once per login)
  const subscription = firebaseUser.email
    ? await checkFacebookSubscription(firebaseUser.email)
    : { isPremium: false, subscriptionSource: "none" as const };

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      isPremium: subscription.isPremium,
      subscriptionSource: subscription.subscriptionSource,
      createdAt: serverTimestamp(),
    });

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      isPremium: subscription.isPremium,
      subscriptionSource: subscription.subscriptionSource,
    };
  }

  // User doc exists — update subscription status
  await updateDoc(userRef, {
    isPremium: subscription.isPremium,
    subscriptionSource: subscription.subscriptionSource,
  });

  const data = userSnap.data();
  return {
    uid: firebaseUser.uid,
    email: data.email ?? firebaseUser.email,
    displayName: data.displayName ?? firebaseUser.displayName,
    photoURL: data.photoURL ?? firebaseUser.photoURL,
    isPremium: subscription.isPremium,
    subscriptionSource: subscription.subscriptionSource,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser);
        const appUser = await syncUserToFirestore(fbUser);
        setUser(appUser);
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function loginWithGoogle() {
    const auth = getFirebaseAuth();
    await signInWithPopup(auth, googleProvider);
  }

  async function loginWithFacebook() {
    const auth = getFirebaseAuth();
    await signInWithPopup(auth, facebookProvider);
  }

  async function loginWithEmail(email: string, password: string) {
    const auth = getFirebaseAuth();
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUpWithEmail(email: string, password: string) {
    const auth = getFirebaseAuth();
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    const auth = getFirebaseAuth();
    await signOut(auth);
    setUser(null);
    setFirebaseUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, loginWithGoogle, loginWithFacebook, loginWithEmail, signUpWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
