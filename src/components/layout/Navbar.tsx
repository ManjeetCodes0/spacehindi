"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/universe", label: "Universe" },
  { href: "/tools", label: "Tools" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/events", label: "Live Events" },
];

export default function Navbar() {
  const { user, loading: authLoading, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${scrolled ? "backdrop-blur-2xl shadow-sm" : "bg-transparent"}
      `}
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="text-lg font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                color: "var(--text-primary)",
              }}
            >
              ScienceHindi
              <span className="text-gradient-violet"> 360</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="group-hover:text-text-primary transition-colors">
                  {link.label}
                </span>
                <span
                  className="absolute bottom-0.5 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: "var(--accent)" }}
                />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Profile / Login Button */}
            {authLoading ? (
              <div className="w-9 h-9 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
            ) : user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-transform hover:scale-105"
                  style={{
                    border: "2px solid #ec4899",
                    padding: "2px",
                  }}
                  aria-label="Profile menu"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || "Profile"}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
                    >
                      {(user.displayName?.[0] || user.email?.[0] || "U").toUpperCase()}
                    </div>
                  )}
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-2xl"
                      style={{
                        backgroundColor: "rgba(15,15,15,0.98)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      {/* User info header */}
                      <div
                        className="px-4 py-3"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                            {user.displayName || "User"}
                          </p>
                          {user.subscriptionSource === "facebook" && (
                            <span
                              className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                            >
                              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                              PRO
                            </span>
                          )}
                        </div>
                        <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {user.email}
                        </p>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        <DropdownLink href="/profile" icon={ProfileIcon} label="My Profile" onClick={() => setProfileOpen(false)} />
                        <DropdownLink href="/settings" icon={SettingsIcon} label="Settings" onClick={() => setProfileOpen(false)} />
                      </div>

                      {/* Logout */}
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <button
                          onClick={async () => {
                            setProfileOpen(false);
                            await logout();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer hover:bg-white/[0.04]"
                          style={{ color: "#f87171" }}
                        >
                          <LogoutIcon />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                  color: "#fff",
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                Login
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5"
                style={{ background: "var(--text-secondary)" }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5"
                style={{ background: "var(--text-secondary)" }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5"
                style={{ background: "var(--text-secondary)" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden backdrop-blur-2xl"
            style={{
              backgroundColor: "rgba(0,0,0,0.95)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium rounded-xl transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Auth */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                {authLoading ? null : user ? (
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-sm font-medium rounded-xl transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-sm font-medium rounded-xl transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={async () => {
                        setMobileOpen(false);
                        await logout();
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors cursor-pointer"
                      style={{ color: "#f87171" }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium rounded-xl transition-colors"
                    style={{ color: "#8b5cf6" }}
                  >
                    Login
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── Dropdown Link ─── */
function DropdownLink({ href, icon: Icon, label, onClick }: {
  href: string;
  icon: React.FC;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/[0.04]"
      style={{ color: "var(--text-secondary)" }}
    >
      <Icon />
      {label}
    </Link>
  );
}

/* ─── Icons ─── */
function ProfileIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
  );
}
