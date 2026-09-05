import { HomeHero } from "@/components/HomeHero/HomeHero";
import { HomeAbout } from "@/components/HomeAbout/HomeAbout";
import { InstagramSection } from "@/components/InstagramSection/InstagramSection";
import { ServicesSection } from "@/components/ServicesSection/ServicesSection";
import { WhyChooseSection } from "@/components/WhyChooseSection/WhyChooseSection";

export default function Home() {
  return (
    <main>
      {/* Home Page Content  */}
      <HomeHero />
      {/* About Section  */}
      <HomeAbout />
      {/* Services Section  */} 
      <ServicesSection />
      {/* Why Choose Section  */}
      <WhyChooseSection />
      {/* Instagram Section  */}  
      <InstagramSection/>
    </main>
  );
}