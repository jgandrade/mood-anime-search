"use client";

import { Button } from "@/components/ui/button";
import { googleLoginAction } from "./loginAction";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Branding */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />

        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="relative max-w-md text-center space-y-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="relative"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <span className="text-7xl font-bold text-primary tracking-tight">
                AniVibe
              </span>
            </div>
            <div className="h-1 w-24 bg-primary/20 rounded-full mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tight">
              Your Mood, Your Anime
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover the perfect anime that resonates with your emotions and
              sets the right mood for your day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="flex flex-col gap-2 text-sm text-muted-foreground"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary/20" />
              <span>Personalized recommendations</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary/20" />
              <span>Mood-based search</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary/20" />
              <span>Curated collections</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Login Form */}
      <motion.div
        className="flex-1 flex items-center justify-center p-8 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full max-w-md space-y-8">
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-muted-foreground">
              Sign in to continue your anime journey
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Button
              type="submit"
              variant="outline"
              className="w-full h-12 text-base relative group hover:bg-primary/5 transition-colors"
              onClick={googleLoginAction}
            >
              <div className="relative flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <title>Google</title>
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </div>
            </Button>
          </motion.div>

          <motion.p
            className="text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
