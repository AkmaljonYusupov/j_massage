"use client";

import { PageHero } from "@/components/PageHero/PageHero";
import { AboutIntro } from "@/components/AboutIntro/AboutIntro";
import { ApproachSection } from "@/components/ApproachSection/ApproachSection";
import { AboutWhySection } from "@/components/AboutWhySection/AboutWhySection";
import { TeamSection } from "@/components/TeamSection/TeamSection";
import { InstagramSection } from "@/components/InstagramSection/InstagramSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-revoza-ink text-revoza-cream">
      {/* 1. Sahifa sarlavhasi */}
      <PageHero
        titleKey="navbar.about"
        image="/images/hero-about.jpg"
        objectPosition="center 1%"
        waveClassName="fill-[#fffef6]"
      />

      {/* 2. Tanishtirish: biz kimmiz, raqamlarda natija */}
      <AboutIntro />

      {/* 3. Falsafa: maqsad, kelajak rejasi, qadriyatlar */}
      <ApproachSection />

      {/* 4. Dalillar: nega aynan biz, tajriba va sharoit */}
      <AboutWhySection />

      {/* 5. Odamlar: jamoa va murabbiylar */}
      <TeamSection />

      {/* 6. Jonli isbot: darslardan video lavhalar */}
      <InstagramSection />
    </main>
  );
}