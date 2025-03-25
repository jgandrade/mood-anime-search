import React from "react";
import Header from "../components/landing-page/header";
import Hero from "../components/landing-page/hero";
import Features from "../components/landing-page/features";
import Pricing from "../components/landing-page/pricing";
import FAQ from "../components/landing-page/faq";
import CTA from "../components/landing-page/cta";
import Footer from "../components/landing-page/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
