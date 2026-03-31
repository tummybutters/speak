"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Ken Burns background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Aerial view of San Diego coastline"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/55" />

      {/* Bottom-left content */}
      <div className="absolute bottom-16 left-10 md:left-16 max-w-lg">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-[#C8352A] mb-3"
        >
          Ocean Beach, San Diego
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
          className="font-serif text-4xl md:text-6xl font-light text-white leading-tight"
        >
          San Diego&apos;s Premier
          <br />
          <em>Residential Brokerage</em>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
          style={{ originX: 0 }}
          className="h-px w-24 bg-[#C8352A] mt-5 mb-6"
        />

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
          className="inline-block px-7 py-3 bg-[#C8352A] text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-red-700 transition-colors duration-200"
        >
          Get In Touch
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-white/50 mx-auto"
        />
      </motion.div>
    </section>
  );
}
