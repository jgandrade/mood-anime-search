"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
};

const faqItems = [
  {
    id: "commitment",
    question: "Is there a long-term commitment?",
    answer: "None! Cancel anytime - but we're confident you'll love it.",
  },
  {
    id: "payment",
    question: "What payment methods do you accept?",
    answer: "All major credit cards and PayPal.",
  },
  {
    id: "switch",
    question: "Can I switch between free and premium?",
    answer: "Yes! Downgrade or upgrade anytime.",
  },
  {
    id: "track",
    question: "How does episode tracking work?",
    answer:
      "We let you track which episodes you've watched across any streaming service, so you never lose your place.",
  },
  {
    id: "mood",
    question: "What makes mood-based recommendations special?",
    answer:
      "Our algorithm considers not just genres but emotional tones, pacing, and themes to match anime to your current mood.",
  },
];

const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: FAQItemProps) => {
  return (
    <motion.div
      className="border-b border-border pb-2 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <button
        type="button"
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none cursor-pointer"
        onClick={onToggle}
      >
        <span className="text-lg font-medium">{question}</span>
        <span className="ml-6 flex-shrink-0 text-primary">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Close"
            >
              <title>Close</title>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Open"
            >
              <title>Open</title>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-foreground/80">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block text-3xl mb-2">❓</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="divide-y divide-border rounded-xl border border-border bg-muted/20 overflow-hidden">
          {faqItems.map((item, index) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-foreground/80">
            Have more questions? Contact us at{" "}
            <a
              href="mailto:support@anivibe.com"
              className="text-primary hover:underline"
            >
              support@anivibe.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
