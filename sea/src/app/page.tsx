import Nav from "@/app/components/Nav";
import SocialRail from "@/app/components/SocialRail";
import Hero from "@/app/components/Hero";
import StatsBar from "@/app/components/StatsBar";
import AboutTeaser from "@/app/components/AboutTeaser";
import Services from "@/app/components/Services";
import Testimonials from "@/app/components/Testimonials";
import FacebookFeed from "@/app/components/FacebookFeed";
import ContactCTA from "@/app/components/ContactCTA";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <SocialRail />
      <main>
        <Hero />
        <StatsBar />
        <AboutTeaser />
        <Services />
        <Testimonials />
        <FacebookFeed />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
