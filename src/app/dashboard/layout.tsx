import { Header } from "@/components/dashboard/header";
import { AnimatedBackground } from "@/components/ui/animated-background";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="relative z-10">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
      </div>
      <AnimatedBackground />
    </div>
  );
}
