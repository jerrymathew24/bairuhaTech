import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AiFeatures from "@/components/AiFeatures";
import GetStarted from "@/components/GetStarted";
import TeamExperienceCarousel from "@/components/TeamExperienceCarousel";
import FeaturesCard from '@/components/FeaturesCard';
import StackUsed from '@/components/StackUsed';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="home">
        <Hero />
      </main>

      <section id="ai-features">
        <AiFeatures />
      </section>

      <section id="get-started">
        <GetStarted />
      </section>

      <section id="our-team">
        <TeamExperienceCarousel />
      </section>

      <section id="why-us">
        <FeaturesCard />
      </section>

      <section id="stack">
        <StackUsed />
      </section>

      <section id="contact">
        <ContactForm />
      </section>

      <Footer />
    </>
  );
}
