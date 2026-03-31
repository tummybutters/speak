"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "40+", label: "Years Experience" },
  { value: "4.8★", label: "Google Rating" },
  { value: "1.3K", label: "Facebook Followers" },
  { value: "100%", label: "Woman-Owned" },
];

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#1C1C1E] text-white py-12 px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            className="text-center"
          >
            <div className="font-serif text-3xl md:text-4xl font-light text-[#C8352A] mb-1">
              {stat.value}
            </div>
            <div className="font-sans text-xs tracking-[0.2em] uppercase text-white/50">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
