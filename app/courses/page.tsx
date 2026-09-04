"use client";

import { GallerySection } from "@/components/GallerySection/GallerySection";
import { PageHero } from "@/components/PageHero/PageHero";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-revoza-ink text-revoza-cream">
      <PageHero
        titleKey="navbar.courses"
        image="/images/hero-courses.jpg"
        objectPosition="center 50%"
        waveClassName="fill-[#fffef6]"
      />
      <GallerySection/>
    </main>
  );
}