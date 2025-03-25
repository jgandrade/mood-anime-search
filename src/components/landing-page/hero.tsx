"use client";

import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="pt-28 pb-20 px-4 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/20 rounded-full filter blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-secondary/20 rounded-full filter blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto flex justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl text-center"
        >
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-primary leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover Anime For Your Mood
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-4 text-foreground/90 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Find the perfect anime based on how you feel, not just what you've
            watched.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl font-semibold text-primary mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            for Just $1/month!
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 mb-8 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="bg-secondary/20 backdrop-blur-sm text-foreground px-3 py-1 rounded-full border border-border/30">
              Personalized Recommendations
            </span>
            <span className="bg-secondary/20 backdrop-blur-sm text-foreground px-3 py-1 rounded-full border border-border/30">
              Progress Tracking
            </span>
            <span className="bg-secondary/20 backdrop-blur-sm text-foreground px-3 py-1 rounded-full border border-border/30">
              Mood Filters
            </span>
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button
              size="xl"
              className="group bg-primary/90 hover:bg-primary backdrop-blur-md"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="backdrop-blur-md bg-background/50 hover:bg-background/80 border-border/50"
            >
              Sign In
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
