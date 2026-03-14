"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-blush/50">
      {items.map((item, i) => (
        <div key={i} className="py-5">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="faq-trigger group"
            aria-expanded={openIndex === i}
          >
            <span className="text-base font-semibold text-espresso group-hover:text-terracotta transition-colors duration-200">
              {item.question}
            </span>
            <span
              className={`flex-shrink-0 w-7 h-7 rounded-full bg-blush/40 flex items-center justify-center text-terracotta transition-transform duration-300 ${
                openIndex === i ? "rotate-45" : ""
              }`}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16M4 12h16"
                />
              </svg>
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="pt-4 pb-1 text-sm text-espresso/65 leading-relaxed pr-12">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
