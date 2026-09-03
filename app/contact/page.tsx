"use client";

import { PageHero } from "@/components/PageHero/PageHero";
import { ContactSection } from "@/components/ContactSection/ContactSection";
import { MapSection } from "@/components/MapSection/MapSection";
import { GallerySection } from "@/components/GallerySection/GallerySection";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-revoza-ink text-revoza-cream">
      <PageHero
        titleKey="navbar.contact"
        image="/images/hero-contact.jpg"
        objectPosition="center 40%"
        waveClassName="fill-[#fffef6]"
      />
      <ContactSection />
      <MapSection />
      <GallerySection />
    </main>
  );
}