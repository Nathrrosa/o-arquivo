import { createFileRoute, redirect } from "@tanstack/react-router";
import { articles } from "@/content/site";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const slug = articles[0]?.slug ?? "desinformacao-e-fact-checking";
    throw redirect({ to: "/reportagem/$slug", params: { slug } });
  },
  component: () => null,
});
