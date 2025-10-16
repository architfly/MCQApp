import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    section: "Purchase",
    items: [
      {
        question: "How can I make the payment?",
        answer:
          "You can pay with a credit/debit card or PayPal. Discounts codes can also be applied during checkout.",
      },
      {
        question: "Can you inform us about discount codes?",
        answer:
          "Yes, discount codes are shared on our social media channels and newsletters. Stay tuned!",
      },
    ],
  },
  {
    section: "Solve Section",
    items: [
      {
        question: "How should I study?",
        answer:
          "Start with unseen questions, review incorrect ones, and repeat until your accuracy improves.",
      },
      {
        question: "How do the filters work?",
        answer: (
          <ul className="list-disc pl-5 space-y-2">
            <li><b>Incorrect Questions:</b> Shows incorrect questions based on your last answers.</li>
            <li><b>Unseen Questions:</b> Shows the questions you have not seen since last reset.</li>
            <li><b>No piece of cakes:</b> Hides tagged cake questions.</li>
            <li><b>No Similar Qs:</b> Removes repetitive questions of same type.</li>
            <li><b>Hardest 100:</b> Shows the top 100 questions users get wrong.</li>
          </ul>
        ),
      },
    ],
  },
  {
    section: "My Questions",
    items: [
      {
        question: "Which questions are stored in My Questions menu?",
        answer: (
          <ul className="list-disc pl-5 space-y-2">
            <li><b>Incorrect Questions:</b> Lists your incorrect questions based on your last answers.</li>
            <li><b>Worst Questions:</b> Lists the questions you answered wrong the most.</li>
            <li><b>Marked Questions:</b> Lists the questions you marked with an exclamation.</li>
            <li><b>Cake Questions:</b> Lists the questions you tagged as cake.</li>
            <li><b>Qs with Notes:</b> Lists the questions you took notes on.</li>
          </ul>
        ),
      },
    ],
  },
  {
    section: "Real Exam",
    items: [
      {
        question: "When should I start using Real Exam?",
        answer:
          "You can create real exams after you complete the first 2 rounds mentioned in the study method and reset seen questions.",
      },
      {
        question: "Is there a page where we can see the correct answers directly?",
        answer:
          "Yes, when you finish an exam, you can see the list of questions and correct answers on the Exam Report page.",
      },
    ],
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
        >
          <HelpCircle className="inline-block w-10 h-10 mr-2 text-blue-500" />
          Frequently Asked Questions
        </motion.h1>

        {/* FAQ Sections */}
        {faqs.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-10">
            {/* Section Heading */}
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 border-l-4 border-blue-500 pl-3">
              {section.section}
            </h2>

            {/* Questions inside section */}
            <div className="space-y-4">
              {section.items.map((faq, index) => {
                const uniqueIndex = `${sectionIndex}-${index}`;
                return (
                  <motion.div
                    key={uniqueIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden bg-white dark:bg-gray-800"
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleFAQ(uniqueIndex)}
                      className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-lg font-medium text-gray-800 dark:text-white">
                        {faq.question}
                      </span>
                      {openIndex === uniqueIndex ? (
                        <ChevronUp className="w-6 h-6 text-blue-500" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-500" />
                      )}
                    </button>

                    {/* Answer */}
                    <AnimatePresence>
                      {openIndex === uniqueIndex && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-4 text-gray-600 dark:text-gray-300"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
