'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: { label: string; scores: { portugal: number; greece: number; panama: number } }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: 'What is your investment budget?',
    options: [
      { label: 'Under €300,000', scores: { portugal: 0, greece: 3, panama: 1 } },
      { label: '€300,000 – €500,000', scores: { portugal: 1, greece: 2, panama: 3 } },
      { label: '€500,000+', scores: { portugal: 3, greece: 2, panama: 2 } },
    ],
  },
  {
    question: 'What is your primary goal?',
    options: [
      { label: 'EU citizenship / passport', scores: { portugal: 3, greece: 2, panama: 0 } },
      { label: 'Tax optimization', scores: { portugal: 1, greece: 1, panama: 3 } },
      { label: 'Fast residency', scores: { portugal: 0, greece: 2, panama: 3 } },
      { label: 'Property ownership', scores: { portugal: 0, greece: 3, panama: 2 } },
    ],
  },
  {
    question: 'How soon do you need residency?',
    options: [
      { label: 'Within 1-2 months', scores: { portugal: 0, greece: 1, panama: 3 } },
      { label: 'Within 6 months', scores: { portugal: 1, greece: 3, panama: 2 } },
      { label: '1-2 years is fine', scores: { portugal: 3, greece: 2, panama: 1 } },
    ],
  },
  {
    question: 'Where would you prefer to have ties?',
    options: [
      { label: 'Europe / EU', scores: { portugal: 3, greece: 3, panama: 0 } },
      { label: 'The Americas', scores: { portugal: 0, greece: 0, panama: 3 } },
      { label: 'Open to either', scores: { portugal: 2, greece: 2, panama: 2 } },
    ],
  },
];

const RESULTS: Record<string, { name: string; href: string; tagline: string }> = {
  portugal: { name: 'Portugal Golden Visa', href: '/portugal', tagline: 'Best path to EU citizenship with guaranteed returns and minimal stay.' },
  greece: { name: 'Greece Golden Visa', href: '/greece', tagline: 'Most affordable EU residency with direct property ownership.' },
  panama: { name: 'Panama Qualified Investor', href: '/panama', tagline: 'Fastest permanent residency with territorial tax system.' },
};

export function ProgramQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ portugal: 0, greece: 0, panama: 0 });
  const [finished, setFinished] = useState(false);

  const handleAnswer = (optionScores: { portugal: number; greece: number; panama: number }) => {
    const newScores = {
      portugal: scores.portugal + optionScores.portugal,
      greece: scores.greece + optionScores.greece,
      panama: scores.panama + optionScores.panama,
    };
    setScores(newScores);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setScores({ portugal: 0, greece: 0, panama: 0 });
    setFinished(false);
  };

  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const result = RESULTS[winner];

  return (
    <section className="py-16 md:py-24 bg-[#0A1628]">
      <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-3 tracking-[-0.02em]">
          Which Program Is Right for You?
        </h2>
        <p className="text-white/60 text-center mb-10">
          Answer 4 quick questions to find your best fit.
        </p>

        <div className="bg-white rounded-xl p-6 md:p-8 min-h-[280px]">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs text-[#94A3B8] font-medium">
                    Question {currentQ + 1} of {QUESTIONS.length}
                  </span>
                  <div className="flex gap-1">
                    {QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-8 rounded-full ${i <= currentQ ? 'bg-[#C9A84C]' : 'bg-[#E2E8F0]'}`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-[#0A1628] mb-5">
                  {QUESTIONS[currentQ].question}
                </h3>

                <div className="space-y-3">
                  {QUESTIONS[currentQ].options.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleAnswer(opt.scores)}
                      className="w-full text-left px-5 py-3.5 rounded-lg border border-[#E2E8F0] hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all text-[#1E293B] text-sm font-medium"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#C9A84C]/10 mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-[#0A1628] mb-2">
                  We recommend: {result.name}
                </h3>
                <p className="text-[#475569] text-sm mb-6">{result.tagline}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={result.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#C9A84C] text-[#0A1628] font-semibold hover:bg-[#D4B85E] transition-colors text-sm"
                  >
                    Learn More <ArrowRight className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#E2E8F0] text-[#475569] font-medium hover:border-[#94A3B8] transition-colors text-sm"
                  >
                    <RotateCcw className="h-4 w-4" /> Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
