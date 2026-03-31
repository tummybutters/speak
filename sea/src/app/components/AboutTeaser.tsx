"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 px-8 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C8352A] mb-4">
            About Sand &amp; Sea
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1C1C1E] leading-tight mb-6">
            Built on Trust.
            <br />
            <em>Rooted in San Diego.</em>
          </h2>
          <p className="font-sans text-base text-[#1C1C1E]/70 leading-relaxed mb-5">
            Sand &amp; Sea Realty is San Diego&apos;s premier full-service residential
            brokerage. Owner and Broker Anna Marie Barnard has built a thriving
            network in San Diego with over 40 years of experience — and a
            reputation for getting deals done that others can&apos;t.
          </p>
          <p className="font-sans text-base text-[#1C1C1E]/70 leading-relaxed mb-8">
            Whether you&apos;re buying your first beach cottage or selling an
            investment property, our boutique team brings sharp market insight,
            strong negotiation, and the personal attention that only a
            woman-owned, community-first brokerage can deliver.
          </p>

          {/* Pull quote */}
          <blockquote className="border-l-2 border-[#C8352A] pl-5">
            <p className="font-serif text-xl italic text-[#4A6670] leading-relaxed">
              &ldquo;She is smart, a skilled negotiator, responsive and heart
              centered. I felt her support every step of the way.&rdquo;
            </p>
            <cite className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1E]/40 mt-2 block not-italic">
              — Jeanne Lagorio, Google Review
            </cite>
          </blockquote>
        </motion.div>

        {/* Decorative panel side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="aspect-[3/4] bg-[#4A6670]/10 relative overflow-hidden flex items-end">
            <div className="p-8 w-full">
              <div className="w-12 h-px bg-[#C8352A] mb-4" />
              <p className="font-serif text-2xl text-[#1C1C1E]">
                Anna Marie Barnard
              </p>
              <p className="font-sans text-sm text-[#1C1C1E]/50 mt-1">
                Owner &amp; Broker, Sand &amp; Sea Realty
              </p>
            </div>
          </div>
          {/* Accent offset square */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#C8352A]/10 -z-10" />
        </motion.div>

      </div>
    </section>
  );
}
