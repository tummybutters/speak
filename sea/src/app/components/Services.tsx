"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const services = [
  {
    title: "Buy",
    subtitle: "Find Your Perfect Home",
    image: "/images/service-buy.jpg",
    desc: "Expert buyer representation across San Diego County. We find the right property and win competitive offers — even in the toughest markets.",
    href: "#buy",
  },
  {
    title: "Sell",
    subtitle: "Get Maximum Value",
    image: "/images/service-sell.jpg",
    desc: "Professional staging, photography, and marketing to sell faster — and consistently above asking price.",
    href: "#sell",
  },
  {
    title: "Property Mgmt",
    subtitle: "Hands-Free Ownership",
    image: "/images/service-property.jpg",
    desc: "Full-service property management: tenant screening, leasing, maintenance coordination, and everything in between.",
    href: "#property-mgmt",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="buy" ref={ref} className="py-24 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C8352A] mb-3">
            Our Services
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1C1C1E]">
            How We Can Help
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <motion.a
              key={svc.title}
              href={svc.href}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group block relative overflow-hidden bg-[#FAF8F5] cursor-pointer"
            >
              {/* Image with zoom on hover */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-500" />
              </div>

              {/* Red accent bar — slides in from left on hover */}
              <div className="h-0.5 bg-[#C8352A] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

              {/* Text */}
              <div className="p-6">
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C8352A] mb-1">
                  {svc.subtitle}
                </p>
                <h3 className="font-serif text-2xl font-light text-[#1C1C1E] mb-3">
                  {svc.title}
                </h3>
                <p className="font-sans text-sm text-[#1C1C1E]/60 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
