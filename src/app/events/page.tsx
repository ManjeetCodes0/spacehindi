"use client";

import { useState } from "react";
import { Navbar, Footer } from "@/components/layout";
import { LiveEvents, Newsletter } from "@/components/events";
import ToastContainer from "@/components/ui/ToastContainer";
import { useToast } from "@/hooks/useToast";

export default function EventsPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const { toasts, show, dismiss } = useToast();

  return (
    <>
      <Navbar lang={lang} onToggleLang={() => setLang(lang === "en" ? "hi" : "en")} />
      <main className="min-h-screen bg-space-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LiveEvents lang={lang} onRemind={(msg) => show(msg, "success")} />
          <Newsletter lang={lang} />
        </div>
      </main>
      <Footer lang={lang} />
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
