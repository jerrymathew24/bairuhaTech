import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero"
import AiFeatures from "@/components/AiFeatures"
import GetStarted from "@/components/GetStarted"
import TeamExperienceCarousel from "@/components/TeamExperienceCarousel"
import FeaturesCard from '@/components/FeaturesCard'
import StackUsed from '@/components/StackUsed'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
   <>
    <Navbar />
    <main>
      <Hero />
    </main>
    <AiFeatures />
    <GetStarted />
    <TeamExperienceCarousel />
    <FeaturesCard />
    <StackUsed />
    <ContactForm/>
   </>
  );
}
