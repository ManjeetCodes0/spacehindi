"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";

/* ─── Firebase Error → Friendly bilingual message ─── */
function friendlyError(code: string, lang: "en" | "hi"): string {
  const map: Record<string, { en: string; hi: string }> = {
    "auth/invalid-email":           { en: "Invalid email address", hi: "अमान्य ईमेल पता" },
    "auth/user-disabled":           { en: "This account has been disabled", hi: "यह खाता अक्षम कर दिया गया है" },
    "auth/user-not-found":          { en: "No account found", hi: "कोई खाता नहीं मिला" },
    "auth/wrong-password":          { en: "Wrong password", hi: "गलत पासवर्ड" },
    "auth/invalid-credential":      { en: "Wrong email or password", hi: "गलत ईमेल या पासवर्ड" },
    "auth/email-already-in-use":    { en: "Email already registered", hi: "ईमेल पहले से पंजीकृत है" },
    "auth/weak-password":           { en: "Password must be at least 6 characters", hi: "पासवर्ड कम से कम 6 अक्षर का होना चाहिए" },
    "auth/too-many-requests":       { en: "Too many attempts. Try later", hi: "बहुत अधिक प्रयास। बाद में कोशिश करें" },
    "auth/popup-closed-by-user":    { en: "Login popup was closed", hi: "लॉगिन पॉपअप बंद कर दिया गया" },
    "auth/network-request-failed":  { en: "Network error. Check your connection", hi: "नेटवर्क त्रुटि। अपना कनेक्शन जांचें" },
  };
  const fallback = lang === "en"
    ? "Something went wrong"
    : "कुछ गलत हो गया";
  return map[code]?.[lang] || fallback;
}

function getFirebaseErrorCode(err: unknown): string {
  if (typeof err === "object" && err !== null && "code" in err) {
    return (err as { code: string }).code;
  }
  return "";
}

export default function LoginPage() {
  const { user, loading, loginWithGoogle, loginWithFacebook, loginWithEmail } = useAuth();
  const { lang } = useLang();
  const router = useRouter();
  const t = lang === "en" ? en : hi;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  if (!loading && user) {
    router.replace("/");
    return null;
  }

  async function handleSocialLogin(loginFn: () => Promise<void>) {
    setError("");
    setAuthLoading(true);
    try {
      await loginFn();
      router.push("/");
    } catch (err: unknown) {
      setError(friendlyError(getFirebaseErrorCode(err), lang));
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setAuthLoading(true);
    try {
      await loginWithEmail(email, password);
      router.push("/");
    } catch (err: unknown) {
      setError(friendlyError(getFirebaseErrorCode(err), lang));
    } finally {
      setAuthLoading(false);
    }
  }

  // Full-page loading
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 shadow-2xl">
          {/* Branding */}
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              <span className="text-white">ScienceHindi</span>
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"> 360</span>
            </h1>
            <p className="text-sm text-neutral-500 mt-2">{t.subtitle}</p>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3 mb-6">
            {/* Google */}
            <button
              onClick={() => handleSocialLogin(loginWithGoogle)}
              disabled={authLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white text-black font-medium text-sm transition-all hover:shadow-[0_4px_24px_rgba(139,92,246,0.15)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {authLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <GoogleIcon />
                  <span>{t.google}</span>
                </>
              )}
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleSocialLogin(loginWithFacebook)}
              disabled={authLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-[#1877F2] text-white font-medium text-sm transition-all hover:shadow-[0_4px_24px_rgba(24,119,242,0.25)] hover:bg-[#166FE5] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {authLoading ? (
                <Spinner size="sm" dark />
              ) : (
                <>
                  <FacebookIcon />
                  <span>{t.facebook}</span>
                </>
              )}
            </button>
          </div>

          {/* Infographic-style Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500/40" />
              <span className="text-xs text-neutral-500 font-medium tracking-widest uppercase">{t.or}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-neutral-400">
                {t.email}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-neutral-600 outline-none transition-all focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm text-neutral-400">
                {t.password}
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-neutral-600 outline-none transition-all focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
              />
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 text-sm text-red-300 bg-red-500/8 border border-red-500/15 rounded-xl px-4 py-3"
              >
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-sm text-white transition-all hover:shadow-[0_4px_24px_rgba(139,92,246,0.2)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
            >
              {authLoading ? <Spinner size="sm" dark /> : t.submit}
            </button>
          </form>

          {/* Switch to Sign Up */}
          <p className="text-center text-sm text-neutral-500 mt-6">
            {t.noAccount}{" "}
            <Link href="/signup" className="text-violet-400 hover:text-violet-300 transition-colors font-medium">
              {t.signUp}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Spinner (Pink) ─── */
function Spinner({ size = "md", dark = false }: { size?: "sm" | "md"; dark?: boolean }) {
  const sizeClass = size === "sm" ? "w-5 h-5" : "w-8 h-8";
  const color = dark ? "border-white/30 border-t-white" : "border-pink-500/30 border-t-pink-400";
  return <div className={`${sizeClass} border-2 ${color} rounded-full animate-spin`} />;
}

/* ─── Icons ─── */
function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/* ─── Translations ─── */
const en = {
  subtitle: "Sign in to explore the cosmos",
  google: "Continue with Google",
  facebook: "Continue with Facebook",
  or: "OR",
  email: "Email",
  emailPlaceholder: "you@example.com",
  password: "Password",
  submit: "Sign In",
  noAccount: "Don't have an account?",
  signUp: "Sign Up",
};

const hi = {
  subtitle: "ब्रह्मांड की खोज के लिए साइन इन करें",
  google: "गूगल से जारी रखें",
  facebook: "फेसबुक से जारी रखें",
  or: "या",
  email: "ईमेल",
  emailPlaceholder: "you@example.com",
  password: "पासवर्ड",
  submit: "साइन इन करें",
  noAccount: "खाता नहीं है?",
  signUp: "साइन अप करें",
};
