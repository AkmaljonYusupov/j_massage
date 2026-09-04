"use client";

import { AboutIntro } from "@/components/AboutIntro/AboutIntro";
import { GallerySection } from "@/components/GallerySection/GallerySection";
import { PageHero } from "@/components/PageHero/PageHero";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-revoza-ink text-revoza-cream">
      <PageHero
        titleKey="navbar.about"
        image="/images/hero-about.jpg"
        objectPosition="center 1%"
        waveClassName="fill-[#fffef6]"
      />
      <AboutIntro />
      <GallerySection />
    </main>
  );
}