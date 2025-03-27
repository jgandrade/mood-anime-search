import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/authActions";
import { Input } from "@/components/ui/input";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="container py-10 min-h-screen bg-gradient-to-b from-background to-background/80">
      <header className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-xl">👤</span>
            )}
          </div>
          <div className="text-left">
            <h2 className="font-semibold">
              {user?.user_metadata?.full_name || user?.email}
            </h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium"
          >
            Sign Out
          </button>
        </form>
      </header>

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary  mb-4">
          How are you feeling today?
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Tell us your mood, and we'll find the perfect anime for you
        </p>
        <div className="max-w-2xl mx-auto relative">
          <Input
            type="text"
            placeholder="Describe your mood... (e.g., need motivation, feeling romantic, want to laugh)"
            className="w-full h-14 px-6 text-lg rounded-2xl border-2 border-primary/20 focus:border-primary/50 bg-background/50 backdrop-blur-sm"
          />
          <span className="absolute right-4 top-4 text-2xl">🔍</span>
        </div>
      </div>
    </div>
  );
}
