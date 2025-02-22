'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';

import ButtonCircle3 from '@/shared/Button/ButtonCircle3';

const tabs = ['Home', 'Banner', 'New Arrival'];

const SectionNavigation = () => {
  const [activeTab, setActiveTab] = useState('New Arrival');
  return (
    <div className="my-10 flex items-center justify-between">
      <Link href="/">
        <ButtonCircle3 size="w-10 h-10" className="border border-neutral-300">
          <MdArrowBack className="text-2xl" />
        </ButtonCircle3>
      </Link>

      <div className="flex items-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab ? 'text-primary' : 'text-neutral-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionNavigation;
