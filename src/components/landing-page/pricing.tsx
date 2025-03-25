"use client";

import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const pricingFeatures = [
  { name: "Basic mood search", free: true, premium: true },
  { name: "Manual tracking", free: true, premium: true },
  { name: "Unlimited anime tracking", free: false, premium: true },
  { name: "Auto-sync with MAL/AniList", free: false, premium: true },
  { name: "Advanced mood filters", free: false, premium: true },
  { name: "Ad-free experience", free: false, premium: true },
  { name: "Early access to new features", free: false, premium: true },
];

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-primary"
    aria-labelledby="checkIconTitle"
  >
    <title id="checkIconTitle">Check Mark</title>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-foreground/40"
    aria-labelledby="crossIconTitle"
  >
    <title id="crossIconTitle">Cross Mark</title>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Pricing = () => {
  return (
    <section className="py-20 px-4 bg-background/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block text-3xl mb-2">💲</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, Affordable Pricing
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Cancel anytime - Just $1/month after 7-day free trial
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            className="rounded-xl border border-border p-6 bg-background"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold mb-2">Free</div>
            <div className="text-4xl font-bold mb-6">$0</div>
            <ul className="space-y-4 mb-6">
              {pricingFeatures.map((feature) => (
                <li key={feature.name} className="flex items-center">
                  <div className="mr-3 flex-shrink-0">
                    {feature.free ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <span className={!feature.free ? "text-foreground/60" : ""}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
            <Button variant="outline" size="lg" className="w-full">
              Start for Free
            </Button>
          </motion.div>

          <motion.div
            className="rounded-xl border border-primary p-6 bg-gradient-to-br from-background to-muted shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold">
              RECOMMENDED
            </div>
            <div className="text-2xl font-bold mb-2">Premium</div>
            <div className="text-4xl font-bold mb-1">
              $1<span className="text-xl font-normal">/month</span>
            </div>
            <div className="text-foreground/70 mb-6">
              after 7-day free trial
            </div>
            <ul className="space-y-4 mb-6">
              {pricingFeatures.map((feature) => (
                <li key={feature.name} className="flex items-center">
                  <div className="mr-3 flex-shrink-0">
                    {feature.premium ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="w-full group">
              <span className="mr-2 group-hover:rotate-12 transition-transform">
                💚
              </span>
              Start 7-Day Free Trial
            </Button>
            <div className="text-center mt-4 text-sm text-foreground/60">
              Cancel anytime. No commitment.
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">🌟 Premium Perks</h3>
          <p className="text-xl mb-8">Your $1/month gets you:</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted flex items-start">
              <div className="mr-3 mt-1 text-primary">✓</div>
              <div className="text-left">
                <h4 className="font-semibold mb-1">Unlimited anime tracking</h4>
                <p className="text-sm text-foreground/70">
                  Keep tabs on everything you watch
                </p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted flex items-start">
              <div className="mr-3 mt-1 text-primary">✓</div>
              <div className="text-left">
                <h4 className="font-semibold mb-1">
                  Auto-sync with MyAnimeList/AniList
                </h4>
                <p className="text-sm text-foreground/70">
                  Seamless integration with other platforms
                </p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted flex items-start">
              <div className="mr-3 mt-1 text-primary">✓</div>
              <div className="text-left">
                <h4 className="font-semibold mb-1">Advanced mood filters</h4>
                <p className="text-sm text-foreground/70">
                  Find the perfect anime for any mood
                </p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted flex items-start">
              <div className="mr-3 mt-1 text-primary">✓</div>
              <div className="text-left">
                <h4 className="font-semibold mb-1">Ad-free experience</h4>
                <p className="text-sm text-foreground/70">
                  No distractions, just anime
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
