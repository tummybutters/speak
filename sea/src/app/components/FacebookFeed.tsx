"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const posts = [
  {
    href: "https://www.facebook.com/SandandSeaRealty/posts/pfbid032hA1jRy3U6LVbazGQqGTXMRSoKomwyWYKJxY3Wz2Y5D6xgQsDDPLKJ5hgQkn6JDQl",
    showText: false,
    height: 497,
  },
  {
    href: "https://www.facebook.com/SandandSeaRealty/posts/pfbid0g3ziu1Tk7Vd6Tij1o3c1LZhQb5iUXQwPvD3RtgphtEQwDKGxykNdYxjNDKn6NLEQl",
    showText: true,
    height: 613,
  },
  {
    href: "https://www.facebook.com/SandandSeaRealty/posts/pfbid0Lr42HoAYjw5JHUSmNRM1aazsU3NAPFXq6agNgSYDX8FQFSsTd44oct6EQDntDMwXl",
    showText: false,
    height: 497,
  },
  {
    href: "https://www.facebook.com/SandandSeaRealty/posts/pfbid0xxhjvCczi76uBYpkZk8WFmVA2bThh2KdupFu2En9ykuZjXJvjPnBzejNodmeunVHl",
    showText: false,
    height: 497,
  },
  {
    href: "https://www.facebook.com/SandandSeaRealty/posts/pfbid04EVVof91joHpQN6c49qGqYBWHCrFYNtSwUW8dM6PW6Vk8HHoCwrXaxJyJppLeGGpl",
    showText: true,
    height: 634,
  },
  {
    href: "https://www.facebook.com/SandandSeaRealty/posts/pfbid02LVdUEg8Xhsaq6iGEA19i83ad7A7mwKRRUm6bVrrAZJERXijuogFwerk7Tg4WoZn2l",
    showText: true,
    height: 647,
  },
];

export default function FacebookFeed() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C8352A] mb-3">
            From the Community
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1C1C1E]">
            Life at Sand &amp; Sea
          </h2>
        </motion.div>

        {/* Masonry-style columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {posts.map((post, i) => {
            const src = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
              post.href
            )}&show_text=${post.showText}&width=500`;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="break-inside-avoid"
              >
                <iframe
                  src={src}
                  width="500"
                  height={post.height}
                  style={{
                    border: "none",
                    overflow: "hidden",
                    width: "100%",
                    display: "block",
                  }}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
