"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MapPin } from "lucide-react";

export default function ContactCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="py-32 px-8 bg-[#1C1C1E] text-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-[#C8352A] mb-4"
        >
          Let&apos;s Connect
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-4xl md:text-6xl font-light leading-tight mb-8"
        >
          Ready to Make
          <br />
          <em>Your Move?</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-base text-white/60 leading-relaxed mb-12 max-w-lg mx-auto"
        >
          Whether you&apos;re buying, selling, or looking for property management
          services, our team is ready to help. Come visit us in Ocean Beach.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
        >
          <a
            href="tel:+16198406683"
            className="flex items-center gap-2 font-sans text-sm text-white/60 hover:text-[#C8352A] transition-colors duration-200"
          >
            <Phone size={14} />
            (619) 840-6683
          </a>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <a
            href="https://maps.google.com/?q=4876+Santa+Monica+Ave+San+Diego+CA+92107"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-sans text-sm text-white/60 hover:text-[#C8352A] transition-colors duration-200"
          >
            <MapPin size={14} />
            4876 Santa Monica Ave, Ocean Beach
          </a>
        </motion.div>

        <motion.a
          href="mailto:info@sandandsearealty.com"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.04 }}
          className="inline-block px-10 py-4 bg-[#C8352A] text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-red-700 transition-colors duration-200"
        >
          Send Us a Message
        </motion.a>
      </div>
    </section>
  );
}
