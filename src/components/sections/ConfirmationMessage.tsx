'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface ConfirmationMessageProps {
  userName: string;
}

export function ConfirmationMessage({ userName }: ConfirmationMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="text-center py-8"
    >
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-16 w-16 text-[#22C55E]" />
      </div>
      <h3 className="text-2xl font-semibold text-[#0A1628] mb-2">
        Thank you, {userName}.
      </h3>
      <p className="text-[#475569] mb-6 max-w-sm mx-auto">
        We&apos;ll be in touch within 24 hours to discuss your investment immigration options.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/portugal"
          className="text-sm font-medium text-[#C9A84C] hover:underline underline-offset-4"
        >
          Explore Portugal
        </Link>
        <Link
          href="/greece"
          className="text-sm font-medium text-[#C9A84C] hover:underline underline-offset-4"
        >
          Explore Greece
        </Link>
        <Link
          href="/panama"
          className="text-sm font-medium text-[#C9A84C] hover:underline underline-offset-4"
        >
          Explore Panama
        </Link>
      </div>
    </motion.div>
  );
}
