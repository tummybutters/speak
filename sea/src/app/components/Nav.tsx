"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Buy", href: "#buy" },
  { label: "Sell", href: "#sell" },
  { label: "Property Mgmt", href: "#property-mgmt" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF8F5]/96 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex-shrink-0"
      >
        <Image
          src="/images/logo.jpg"
          alt="Sand & Sea Realty"
          width={110}
          height={55}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Nav links */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden md:flex items-center gap-8"
      >
        {links.map((link, i) => (
          <motion.li
            key={link.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28 + i * 0.06 }}
          >
            <a
              href={link.href}
              className={`font-sans text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-200 ${
                scrolled
                  ? "text-[#1C1C1E] hover:text-[#C8352A]"
                  : "text-white hover:text-[#C8352A]"
              }`}
            >
              {link.label}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
}
