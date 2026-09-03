"use client";

import { PageHero } from "@/components/PageHero/PageHero";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-revoza-ink text-revoza-cream">
      <PageHero
        titleKey="navbar.about"
        image="/images/hero-about.jpg"
        objectPosition="center 20%"
      />
    </main>
  );
}