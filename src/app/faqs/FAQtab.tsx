'use client';

import React, { useState } from 'react';

import Accordion from '@/components/Accordion';
import { faqsData } from '@/data/content';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';

const FAQtab = () => {
  const [activeTab, setActiveTab] = useState('Shipping');

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="flex flex-wrap items-center justify-center gap-5">
        {faqsData.faqs.map((faq) => (
          <ButtonSecondary
            key={faq.category}
            className={`rounded-lg ${
              activeTab === faq.category
                ? 'bg-primary text-white'
                : 'bg-neutral-300 text-black dark:bg-neutral-100'
            }`}
            sizeClass="px-5 py-3"
            onClick={() => setActiveTab(faq.category)}
          >
            {faq.category}
          </ButtonSecondary>
        ))}
      </div>

      <div className="flex items-center justify-center p-5 md:p-10">
        {faqsData.faqs.map((faq) => (
          <div
            key={faq.category}
            className={`${
              activeTab === faq.category ? 'block' : 'hidden'
            } max-w-3xl space-y-10`}
          >
            {faq.data.map((faqData) => (
              <Accordion {...faqData} key={faqData.question} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQtab;
