import { SearchAnime } from "@/components/dashboard/searchAnime";

export default async function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">
          How are you feeling today?
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Tell us your mood, and we'll find the perfect anime for you
        </p>
      </div>

      <SearchAnime />
    </div>
  );
}
