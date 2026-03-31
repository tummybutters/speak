"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const reviews = [
  {
    name: "Shane K.",
    text: "How do you buy a house in the most competitive housing market in recorded history? Easy, work with Anna Marie! She is extremely responsive, works all hours of the day for you. I could not recommend her more.",
    stars: 5,
  },
  {
    name: "L.S.",
    text: "Within 3 days of going on the market, we had an offer above asking price. Our 30-day escrow closed today. Anna Marie coordinated everything seamlessly.",
    stars: 5,
  },
  {
    name: "John Harris",
    text: "FANTASTIC EXPERIENCE!! Anna Marie negotiated our OB house purchase over 10 other competitive offers and sold our El Cajon house $200K above our first thought. Wish we could give 10 stars!",
    stars: 5,
  },
  {
    name: "Jill Whittey",
    text: "She didn't send me listings I wouldn't be interested in or push me into anything. I don't think she sleeps because she was always available any time I reached out. She made my dreams come true.",
    stars: 5,
  },
  {
    name: "Wende Gonyea",
    text: "So much more than a realtor — more like a team of personal assistants! Any issue that arose, AM took on and had the solution immediately. Everything turned out way better than we expected.",
    stars: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-[#FAF8F5] overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C8352A] mb-3">
            Client Stories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1C1C1E]">
            What People Are Saying
          </h2>
        </motion.div>
      </div>

      {/* Draggable carousel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        drag="x"
        dragConstraints={{ right: 0, left: -((reviews.length - 1) * 380) }}
        dragElastic={0.08}
        className="flex gap-6 px-8 cursor-grab active:cursor-grabbing select-none"
      >
        {reviews.map((review, i) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            className="min-w-[320px] max-w-[360px] bg-white p-8 flex-shrink-0 shadow-sm"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: review.stars }).map((_, j) => (
                <span key={j} className="text-[#C8352A] text-sm">★</span>
              ))}
            </div>
            <p className="font-serif text-lg font-light italic text-[#1C1C1E] leading-relaxed mb-6">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#C8352A]" />
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1E]/40">
                {review.name}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
