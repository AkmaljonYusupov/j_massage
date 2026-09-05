import { HomeHero } from "@/components/HomeHero/HomeHero";
import { HomeAbout } from "@/components/HomeAbout/HomeAbout";
import { InstagramSection } from "@/components/InstagramSection/InstagramSection";
import { ServicesSection } from "@/components/ServicesSection/ServicesSection";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeAbout />
      <ServicesSection />
      <InstagramSection/>

    </main>
  );
}