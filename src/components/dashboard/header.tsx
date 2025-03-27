"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions/authActions";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { motion } from "framer-motion";

type UserProfile = {
  full_name: string;
  avatar_url: string;
};

export function Header() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserProfile({
          full_name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url,
        });
      }
    };
    getUserProfile();
  }, [supabase.auth]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-4"
        >
          <h1 className="text-xl font-bold text-primary">Anivibes</h1>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-4"
        >
          <ThemeToggle />
          {userProfile && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-2"
            >
              <span className="text-sm text-foreground">
                {userProfile.full_name}
              </span>
              <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-primary/20">
                <Image
                  src={userProfile.avatar_url}
                  alt={userProfile.full_name}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}
          <Button
            type="button"
            variant="destructive"
            onClick={signOut}
            className="transition-all duration-200 hover:scale-105"
          >
            Logout
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
