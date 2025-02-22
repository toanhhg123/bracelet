'use client';

import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

const languages = ['English', 'Francias', 'Espanyol'];

const Language = () => {
  const [language, setLanguage] = useState('English');
  return (
    <div className="font-medium">
      <Menu as="div" className="relative inline-block">
        <Menu.Button className="flex items-center gap-1">
          <span>{language}</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white">
            <MdKeyboardArrowDown className="text-sm" />
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="divide-gray-100 absolute right-0 mt-2 w-40 origin-top-right divide-y rounded-md bg-[#101010] shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="flex flex-col">
              {languages.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className="w-full px-3 py-1 text-left text-white focus:outline-none"
                >
                  {item}
                </button>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Language;
