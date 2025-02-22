import React from 'react';

import { newsletter } from '@/data/content';

import ButtonPrimary from '../Button/ButtonPrimary';
import Input from '../Input/Input';

const Subscribe = () => {
  return (
    <div className="items-stretch justify-between space-y-5 rounded-2xl bg-white/10 p-5 md:flex md:space-y-0">
      <div className="basis-[52%] space-y-5">
        <h3 className="text-2xl font-medium">{newsletter.heading}</h3>
        <Input
          type="text"
          sizeClass="h-12 px-0 py-3"
          rounded="rounded-none"
          className="border-b-2 border-transparent border-b-neutral-400 bg-transparent placeholder:text-sm placeholder:text-neutral-200 focus:border-transparent"
          placeholder="Your email@email.com"
        />
      </div>
      <div className="basis-[43%] space-y-7">
        <p className="text-neutral-400">{newsletter.description}</p>
        <ButtonPrimary>Subscribe</ButtonPrimary>
      </div>
    </div>
  );
};

export default Subscribe;
