"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { LangProvider } from "@/context/lang-context";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({
      once: true,
      disable: reduce ? true : "phone",
      duration: 500,
      easing: "ease-out-cubic",
      offset: 40,
    });
  }, []);

  return (
    <LangProvider>
      <Header />
      <main className="grow">{children}</main>
      <Footer border={true} />
    </LangProvider>
  );
}
