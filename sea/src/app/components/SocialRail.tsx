"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

// Brand icons inlined — lucide-react dropped Facebook and Instagram exports
function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="3" />
    </svg>
  );
}

type RailItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
};

const items: RailItem[] = [
  { icon: Phone, href: "tel:+16198406683", label: "Call" },
  { icon: Mail, href: "mailto:info@sandandsearealty.com", label: "Email" },
  { icon: FacebookIcon, href: "https://www.facebook.com/SandandSeaRealty", label: "Facebook" },
  { icon: InstagramIcon, href: "https://www.instagram.com/sandandsearealty", label: "Instagram" },
];

export default function SocialRail() {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      {items.map((item, i) => (
        <motion.a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 + i * 0.08, ease: "easeOut" }}
          whileHover={{ scale: 1.15 }}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-[#1C1C1E] hover:bg-[#C8352A] hover:text-white transition-colors duration-200"
        >
          <item.icon size={15} />
        </motion.a>
      ))}
    </div>
  );
}
