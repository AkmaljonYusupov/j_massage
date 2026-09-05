import { HomeHero } from "@/components/HomeHero/HomeHero";
import { HomeAbout } from "@/components/HomeAbout/HomeAbout";
import { InstagramSection } from "@/components/InstagramSection/InstagramSection";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeAbout />
      <InstagramSection/>
    </main>
  );
}