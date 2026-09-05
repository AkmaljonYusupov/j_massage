import { HomeHero } from "@/components/HomeHero/HomeHero";
import { HomeAbout } from "@/components/HomeAbout/HomeAbout";
import { ServicesSection } from "@/components/ServicesSection/ServicesSection";
import { WhyChooseSection } from "@/components/WhyChooseSection/WhyChooseSection";
import { KeyFactsSection } from "@/components/KeyFactsSection/KeyFactsSection";
import { InstagramSection } from "@/components/InstagramSection/InstagramSection";
import { FaqSection } from "@/components/FaqSection/FaqSection";

export default function Home() {
  return (
    <main>
      {/* 1. Diqqatni tortish: asosiy taklif va ikkita tugma */}
      <HomeHero />

      {/* 2. Tanishtirish: biz kimmiz va nima qilamiz */}
      <HomeAbout />

      {/* 3. Taklif: qaysi yo'nalishlarni o'rgatamiz */}
      <ServicesSection />

      {/* 4. Dalillar: nega aynan biz */}
      <WhyChooseSection />

      {/* 5. Isbot: raqamlarda natija */}
      <KeyFactsSection />

      {/* 6. Jonli isbot: darslardan video lavhalar */}
      <InstagramSection />

      {/* 7. Oxirgi shubhalarni yopish: savol-javob */}
      <FaqSection />
    </main>
  );
}