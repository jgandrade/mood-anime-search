"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ThemeToggle } from "../ui/theme-toggle";

const Header = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg dark:bg-background/60 bg-background/70 px-4 py-3 border-b border-border/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <motion.div
            className="text-2xl font-bold text-primary flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            AniVibe
          </motion.div>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex backdrop-blur-md bg-background/50 hover:bg-background/80"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-primary/90 hover:bg-primary backdrop-blur-md"
          >
            Try Free for 7 Days
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
