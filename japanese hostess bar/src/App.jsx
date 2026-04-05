import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Phone, GlassWater, ChevronDown } from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${scrolled ? 'bg-[#12100E]/90 backdrop-blur-md border-b border-[#282420]' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <h1 className="text-xl font-serif tracking-widest text-[#F0E6D8]">CLUB BRISTOL</h1>
        <div className="hidden md:flex gap-8 text-sm tracking-wide text-[#A89B8F]">
          <a href="#experience" className="hover:text-[#D68F4D] transition-colors">Experience</a>
          <a href="#atmosphere" className="hover:text-[#D68F4D] transition-colors">Atmosphere</a>
          <a href="#visit" className="hover:text-[#D68F4D] transition-colors">Visit</a>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#12100E] flex flex-col items-center justify-center">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: y1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#12100E]/40 via-[#12100E]/20 to-[#12100E] z-10" />
        <img 
          src="/images/lounge_atmosphere_1775381901034.png" 
          alt="Club Bristol Atmosphere" 
          className="w-full h-full object-cover object-center opacity-70"
        />
      </motion.div>

      <motion.div 
        className="relative z-20 text-center px-6 max-w-3xl mt-20"
        style={{ opacity }}
      >
        <FadeIn delay={0.2}>
          <h2 className="text-4xl md:text-6xl font-serif text-[#F0E6D8] leading-tight mb-6">
            A warm place for <br className="hidden md:block"/> good conversation.
          </h2>
        </FadeIn>
        <FadeIn delay={0.4}>
          <p className="text-lg md:text-xl text-[#A89B8F] font-light max-w-xl mx-auto leading-relaxed">
            Step into a dimly lit, cozy lounge where time slows down. Sit together, share a drink, and enjoy genuine hospitality in Southern California.
          </p>
        </FadeIn>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-[#A89B8F]"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity }}
      >
        <ChevronDown className="w-6 h-6 opacity-50" />
      </motion.div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-[#12100E] relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn className="order-2 md:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img 
                src="/images/hostess_interaction_1775381915113.png" 
                alt="Hostess serving drinks" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </FadeIn>
          
          <div className="order-1 md:order-2">
            <FadeIn>
              <h3 className="text-sm tracking-widest text-[#D68F4D] uppercase mb-4">The Experience</h3>
              <h2 className="text-3xl md:text-4xl font-serif text-[#F0E6D8] mb-6 leading-snug">
                Relaxed nightlife, grounded in connection.
              </h2>
              <div className="space-y-6 text-[#A89B8F] font-light text-lg leading-relaxed">
                <p>
                  Club Bristol isn't about flashing lights or loud music. It's a hidden local spot designed for talking, drinking, and unwinding after a long day.
                </p>
                <p>
                  Our hostesses make sure your glass is never empty and the conversation flows easily. Whether you're here alone to decompress or with a group celebrating, the atmosphere stays welcoming, intimate, and authentic.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const Atmosphere = () => {
  return (
    <section id="atmosphere" className="py-24 px-6 bg-[#1E1A17] relative z-20 border-t border-[#282420]">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h3 className="text-sm tracking-widest text-[#D68F4D] uppercase mb-4">From the Bar</h3>
          <h2 className="text-3xl md:text-4xl font-serif text-[#F0E6D8]">Carefully crafted.</h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 md:col-start-2">
            <FadeIn delay={0.2}>
              <p className="text-[#A89B8F] text-lg font-light leading-relaxed mb-8">
                From Japanese whiskies to simple, well-made cocktails. The bar is stocked to accommodate your evening, served with the quiet attention to detail you expect from a proper lounge.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[#F0E6D8]">
                  <GlassWater className="w-5 h-5 text-[#D68F4D]" />
                  <span>Premium Spirits & Cocktails</span>
                </div>
                <div className="flex items-center gap-4 text-[#F0E6D8]">
                  <GlassWater className="w-5 h-5 text-[#D68F4D]" />
                  <span>Curated Japanese Whisky</span>
                </div>
              </div>
            </FadeIn>
          </div>
          
          <div className="md:col-span-6 md:col-start-7">
            <FadeIn delay={0.4}>
              <div className="aspect-video overflow-hidden rounded-sm relative">
                <img
                  src="/images/bartender_making_drinks_1775381929655.png"
                  alt="Bartender preparing drinks"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const Visit = () => {
  return (
    <section id="visit" className="py-24 px-6 bg-[#12100E] border-t border-[#282420]">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-serif text-[#F0E6D8] mb-12">Join us tonight.</h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-[#A89B8F]">
            <div className="flex flex-col items-center p-6 bg-[#1E1A17] rounded-sm">
              <MapPin className="w-6 h-6 text-[#D68F4D] mb-4" />
              <h4 className="text-[#F0E6D8] mb-2 font-medium">Location</h4>
              <p className="text-sm">688 Baker St, Unit 10</p>
              <p className="text-sm">Costa Mesa, CA 92626</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-[#1E1A17] rounded-sm">
              <Clock className="w-6 h-6 text-[#D68F4D] mb-4" />
              <h4 className="text-[#F0E6D8] mb-2 font-medium">Hours</h4>
              <p className="text-sm">Mon - Sat: 9:00 PM - 2:00 AM</p>
              <p className="text-sm">Sunday: Closed</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-[#1E1A17] rounded-sm">
              <Phone className="w-6 h-6 text-[#D68F4D] mb-4" />
              <h4 className="text-[#F0E6D8] mb-2 font-medium">Reservations</h4>
              <p className="text-sm mb-3">(714) 751-2833</p>
              <a href="tel:7147512833" className="text-xs tracking-widest uppercase border border-[#D68F4D] text-[#D68F4D] px-4 py-2 hover:bg-[#D68F4D] hover:text-[#12100E] transition-colors rounded-sm">
                Call Now
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 text-center text-[#73675E] text-sm border-t border-[#282420] bg-[#12100E]">
    <p>© {new Date().getFullYear()} Club Bristol. All rights reserved.</p>
  </footer>
);

export default function App() {
  return (
    <div className="bg-[#12100E] font-sans text-[#F0E6D8] selection:bg-[#8B1A1E] selection:text-white min-h-screen">
      <Navbar />
      <Hero />
      <Experience />
      <Atmosphere />
      <Visit />
      <Footer />
    </div>
  );
}
