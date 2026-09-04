"use client";

import { AboutIntro } from "@/components/AboutIntro/AboutIntro";
import { ApproachSection } from "@/components/ApproachSection/ApproachSection";
import { GallerySection } from "@/components/GallerySection/GallerySection";
import { InstagramSection } from "@/components/InstagramSection/InstagramSection";
import { PageHero } from "@/components/PageHero/PageHero";
import { TeamSection } from "@/components/TeamSection/TeamSection";

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
      <ApproachSection />
      <InstagramSection />
      <TeamSection />
      <GallerySection />
    </main>
  );
}