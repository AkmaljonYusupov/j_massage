"use client";

import { PageHero } from "@/components/PageHero/PageHero";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-revoza-ink text-revoza-cream">
      <PageHero titleKey="navbar.courses" image="/images/hero-courses.jpg" />
    </main>
  );
}