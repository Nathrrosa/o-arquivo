import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-vanilla text-ink flex flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}