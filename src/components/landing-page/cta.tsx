"use client";

import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-20 px-4 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-[120px] -z-10" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/10 rounded-full filter blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl opacity-30" />

        <motion.div
          className="relative bg-background/50 backdrop-blur-xl border border-border/30 rounded-3xl p-8 sm:p-12 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-6">🚨</div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Join thousands of weebs finding their perfect anime match!
                </h2>
                <p className="text-foreground/80 text-lg mb-8">
                  Your next favorite anime is just a mood away. Start your free
                  trial today and unlock the full AniVibe experience.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="xl"
                    className="group bg-primary/90 hover:bg-primary backdrop-blur-md"
                  >
                    <span className="mr-2 group-hover:rotate-12 transition-transform">
                      🌟
                    </span>
                    Start Your Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    className="backdrop-blur-md bg-background/30 hover:bg-background/50 border-border/50"
                  >
                    <span className="mr-2">🔐</span>
                    Existing User? Sign In
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="flex-1 p-4 bg-background/30 backdrop-blur-md rounded-xl border border-border/30 relative overflow-hidden h-[280px] sm:h-[320px] w-full md:w-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm font-bold py-1 px-3 rotate-6">
                Exclusive Preview
              </div>

              <div className="h-full w-full flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-4xl mb-4">🎮</div>
                  <h3 className="text-xl font-bold mb-2">Anime Mood Matcher</h3>
                  <p className="text-foreground/70 mb-4">
                    Find your perfect anime based on how you feel right now
                  </p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    <span className="bg-primary/20 text-foreground px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-border/30">
                      Action
                    </span>
                    <span className="bg-secondary/20 text-foreground px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-border/30">
                      Chill
                    </span>
                    <span className="bg-primary/20 text-foreground px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-border/30">
                      Emotional
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
