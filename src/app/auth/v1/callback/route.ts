import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserController } from "@/modules/user_access_management/infrastructure/user/userController";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth error:", error);
      return NextResponse.redirect(
        new URL("/login?error=auth_failed", requestUrl.origin)
      );
    }

    if (user) {
      // Create user in our database
      try {
        const controller = new UserController();
        const result = await controller.createUserBySupabaseId(user.id);

        if (!result.isSuccess) {
          console.error(
            "Failed to create user in database:",
            result.getError()
          );
        }
      } catch (error) {
        console.error("Error creating user in database:", error);
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
}
