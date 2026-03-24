"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const { lang } = useLang();
  const router = useRouter();
  const t = lang === "en" ? en : hi;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-pink-500/30 border-t-pink-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Card */}
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "var(--bg-secondary, rgba(255,255,255,0.02))",
                borderColor: "var(--border, rgba(255,255,255,0.06))",
              }}
            >
              {/* Avatar + Name */}
              <div className="flex flex-col items-center text-center mb-8">
                <div
                  className="w-24 h-24 rounded-full mb-4 overflow-hidden"
                  style={{ border: "3px solid #ec4899", padding: "3px" }}
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || "Profile"}
                      width={96}
                      height={96}
                      className="rounded-full object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-2xl font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
                    >
                      {(user.displayName?.[0] || user.email?.[0] || "U").toUpperCase()}
                    </div>
                  )}
                </div>
                <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {user.displayName || t.unnamed}
                </h1>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                  {user.email}
                </p>
                {/* Premium Badge */}
                <div className="mt-3 flex flex-col items-center gap-2">
                  {user.isPremium ? (
                    <>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {t.premium}
                      </span>
                      {user.subscriptionSource === "facebook" && (
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-white"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {t.facebookPro}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08]" style={{ color: "var(--text-muted)" }}>
                      {t.freePlan}
                    </span>
                  )}
                </div>
              </div>

              {/* Info Rows */}
              <div className="space-y-4">
                <InfoRow label={t.name} value={user.displayName || "—"} />
                <InfoRow label={t.emailLabel} value={user.email || "—"} />
                <InfoRow label={t.uid} value={user.uid} mono />
                <InfoRow label={t.plan} value={user.isPremium ? t.premium : t.freePlan} />
                <InfoRow label={t.source} value={user.subscriptionSource === "facebook" ? t.facebookSource : t.noneSource} />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => router.push("/settings")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                    color: "#fff",
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  {t.settings}
                </button>
                <button
                  onClick={async () => {
                    await logout();
                    router.push("/");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer"
                  style={{
                    borderColor: "rgba(248,113,113,0.3)",
                    color: "#f87171",
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                  </svg>
                  {t.logout}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function InfoRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-3 px-4 rounded-xl"
      style={{ backgroundColor: "var(--bg-tertiary, rgba(255,255,255,0.02))" }}
    >
      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{label}</span>
      <span
        className={`text-sm ${mono ? "font-mono text-xs" : ""}`}
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </span>
    </div>
  );
}

const en = {
  unnamed: "User",
  premium: "Premium",
  freePlan: "Free Plan",
  facebookPro: "Pro via Facebook",
  name: "Name",
  emailLabel: "Email",
  uid: "User ID",
  plan: "Plan",
  source: "Subscription Source",
  facebookSource: "Facebook",
  noneSource: "None",
  settings: "Settings",
  logout: "Logout",
};

const hi = {
  unnamed: "उपयोगकर्ता",
  premium: "प्रीमियम",
  freePlan: "मुफ्त योजना",
  facebookPro: "फेसबुक प्रो सदस्य",
  name: "नाम",
  emailLabel: "ईमेल",
  uid: "यूजर आईडी",
  plan: "योजना",
  source: "सदस्यता स्रोत",
  facebookSource: "फेसबुक",
  noneSource: "कोई नहीं",
  settings: "सेटिंग्स",
  logout: "लॉगआउट",
};
