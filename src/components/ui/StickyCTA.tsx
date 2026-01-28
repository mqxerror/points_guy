'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
        >
          <a
            href="#lead-form"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9A84C] text-[#0A1628] font-semibold shadow-lg hover:bg-[#D4B85E] active:bg-[#B8953E] transition-all duration-200 text-sm md:text-base"
          >
            Book Free Consultation
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
