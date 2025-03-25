"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    id: "mood-match",
    title: "Mood-Matched Anime",
    description:
      "Tell us if you're feeling Hype, Chill, or In Your Feels - get perfect recommendations",
    color: "from-primary/20 to-primary/5",
  },
  {
    id: "tracking",
    title: "Never Lose Your Place",
    description: "Track episodes across all platforms in one place",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    id: "pricing",
    title: "Less Than 3¢ Per Day",
    description: "Premium features for less than your daily loose change",
    color: "from-primary/20 to-secondary/20",
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  return (
    <motion.div
      className="p-6 rounded-xl backdrop-blur-md border border-border/30 shadow-sm"
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${feature.color})`,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ translateY: -5 }}
    >
      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
      <p className="text-foreground/80 font-light">{feature.description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="py-20 px-4 bg-background/50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-[100px] -z-10" />
      <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-secondary/10 rounded-full filter blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why AniVibe?</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-16 p-8 rounded-xl border border-primary/20 backdrop-blur-md bg-gradient-to-r from-primary/5 to-secondary/5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Feature Showcase</h3>
              <p className="text-foreground/80 mb-4">
                See our mood-based interface in action:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  Intelligent mood matching
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  Cross-platform tracking
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  User-friendly interface
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-background/30 backdrop-blur-md rounded-lg h-48 md:h-64 flex items-center justify-center border border-border/30">
              <div className="text-lg text-foreground/60">
                Browser Screenshot
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
