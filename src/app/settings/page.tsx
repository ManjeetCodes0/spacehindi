"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SettingsPage() {
  const { user, firebaseUser, loading, logout } = useAuth();
  const router = useRouter();
  const t = en;

  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [nameInitialized, setNameInitialized] = useState(false);

  // Initialize name field once user loads
  if (user && !nameInitialized) {
    setDisplayName(user.displayName || "");
    setNameInitialized(true);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-pink-500/30 border-t-pink-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !firebaseUser) {
    router.replace("/login");
    return null;
  }

  const isEmailUser = firebaseUser.providerData.some((p) => p.providerId === "password");

  async function handleSaveProfile() {
    if (!firebaseUser) return;
    setSaving(true);
    setMessage(null);
    try {
      await updateProfile(firebaseUser, { displayName: displayName.trim() });
      await updateDoc(doc(getFirebaseDb(), "users", firebaseUser.uid), {
        displayName: displayName.trim(),
      });
      setMessage({ type: "success", text: t.profileSaved });
    } catch {
      setMessage({ type: "error", text: t.profileError });
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword() {
    if (!firebaseUser || !firebaseUser.email) return;
    setSaving(true);
    setMessage(null);
    try {
      const credential = EmailAuthProvider.credential(firebaseUser.email, currentPassword);
      await reauthenticateWithCredential(firebaseUser, credential);
      await updatePassword(firebaseUser, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setMessage({ type: "success", text: t.passwordSaved });
    } catch {
      setMessage({ type: "error", text: t.passwordError });
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    if (!confirm(t.deleteConfirm)) return;
    try {
      await firebaseUser!.delete();
      router.push("/");
    } catch {
      setMessage({ type: "error", text: t.deleteError });
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-2xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              {t.title}
            </h1>

            {/* Status Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2.5 text-sm rounded-xl px-4 py-3 mb-6 border ${
                  message.type === "success"
                    ? "text-emerald-300 bg-emerald-500/8 border-emerald-500/15"
                    : "text-red-300 bg-red-500/8 border-red-500/15"
                }`}
              >
                {message.type === "success" ? (
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                )}
                <span>{message.text}</span>
              </motion.div>
            )}

            {/* Profile Settings */}
            <SettingsCard title={t.profileSection}>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                    {t.displayName}
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      backgroundColor: "var(--bg-tertiary, rgba(255,255,255,0.04))",
                      border: "1px solid var(--border, rgba(255,255,255,0.08))",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl text-sm opacity-50 cursor-not-allowed"
                    style={{
                      backgroundColor: "var(--bg-tertiary, rgba(255,255,255,0.04))",
                      border: "1px solid var(--border, rgba(255,255,255,0.08))",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-50 cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
                >
                  {saving ? t.saving : t.saveProfile}
                </button>
              </div>
            </SettingsCard>

            {/* Password (email users only) */}
            {isEmailUser && (
              <SettingsCard title={t.passwordSection}>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                      {t.currentPassword}
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        backgroundColor: "var(--bg-tertiary, rgba(255,255,255,0.04))",
                        border: "1px solid var(--border, rgba(255,255,255,0.08))",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                      {t.newPassword}
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      minLength={6}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        backgroundColor: "var(--bg-tertiary, rgba(255,255,255,0.04))",
                        border: "1px solid var(--border, rgba(255,255,255,0.08))",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                  <button
                    onClick={handleChangePassword}
                    disabled={saving || !currentPassword || newPassword.length < 6}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-50 cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
                  >
                    {saving ? t.saving : t.changePassword}
                  </button>
                </div>
              </SettingsCard>
            )}

            {/* Danger Zone */}
            <SettingsCard title={t.dangerZone} danger>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{t.deleteAccount}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{t.deleteDesc}</p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer shrink-0"
                  style={{ borderColor: "rgba(248,113,113,0.3)", color: "#f87171" }}
                >
                  {t.deleteButton}
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 pt-4" style={{ borderTop: "1px solid var(--border, rgba(255,255,255,0.06))" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{t.logoutLabel}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{t.logoutDesc}</p>
                </div>
                <button
                  onClick={async () => { await logout(); router.push("/"); }}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer shrink-0"
                  style={{ borderColor: "var(--border, rgba(255,255,255,0.08))", color: "var(--text-secondary)" }}
                >
                  {t.logoutButton}
                </button>
              </div>
            </SettingsCard>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ─── Settings Card ─── */
function SettingsCard({ title, children, danger = false }: { title: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <div
      className="rounded-2xl p-6 border mb-6"
      style={{
        backgroundColor: "var(--bg-secondary, rgba(255,255,255,0.02))",
        borderColor: danger ? "rgba(248,113,113,0.15)" : "var(--border, rgba(255,255,255,0.06))",
      }}
    >
      <h2 className={`text-base font-semibold mb-4 ${danger ? "text-red-400" : ""}`} style={danger ? {} : { color: "var(--text-primary)" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ─── Translations ─── */
const en = {
  title: "Settings",
  profileSection: "Profile",
  displayName: "Display Name",
  emailLabel: "Email",
  saveProfile: "Save Changes",
  saving: "Saving...",
  profileSaved: "Profile updated successfully!",
  profileError: "Failed to update profile",
  passwordSection: "Change Password",
  currentPassword: "Current Password",
  newPassword: "New Password",
  changePassword: "Update Password",
  passwordSaved: "Password updated successfully!",
  passwordError: "Failed to update password. Check your current password.",
  dangerZone: "Danger Zone",
  deleteAccount: "Delete Account",
  deleteDesc: "Permanently delete your account and all data",
  deleteButton: "Delete Account",
  deleteConfirm: "Are you sure? This action cannot be undone.",
  deleteError: "Failed to delete account. You may need to re-login first.",
  logoutLabel: "Sign Out",
  logoutDesc: "Sign out from your account",
  logoutButton: "Logout",
};


