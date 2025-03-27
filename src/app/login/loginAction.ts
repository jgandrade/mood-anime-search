"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function googleLoginAction() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/v1/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    throw error;
  }

  if (data?.url) {
    redirect(data.url);
  }
}
