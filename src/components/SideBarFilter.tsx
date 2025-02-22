'use client';

import 'rc-slider/assets/index.css';

import { pathOr } from 'ramda';
import Slider from 'rc-slider';
import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

import Heading from '@/shared/Heading/Heading';
import Input from '@/shared/Input/Input';

// DEMO DATA
const brands = [
  {
    name: 'All',
  },
  {
    name: 'Nike',
  },
  {
    name: 'New Balance',
  },
  {
    name: 'Rick Owens',
  },
];

const gender = ['Men', 'Women', 'Unisex', 'Kids'];

const locations = [
  'New York',
  'Canada',
  'Bangladesh',
  'Indonesia',
  'San Francisco',
];

const PRICE_RANGE = [1, 500];
//
const SidebarFilters = () => {
  const [rangePrices, setRangePrices] = useState([100, 500]);
  const [activeBrand, setActiveBrand] = useState('All');
  const [activeGender, setActiveGender] = useState('Men');
  const [activeLocation, setActiveLocation] = useState('New York');

  const renderTabsCategories = () => {
    return (
      <div className="relative flex flex-col space-y-4 pb-8">
        <h3 className="mb-2.5 text-xl font-medium">Brands</h3>
        <div className="grid grid-cols-2 gap-4">
          {brands.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActiveBrand(item.name)}
              className={`rounded-lg py-4 ${
                activeBrand === item.name ? 'bg-primary text-white' : 'bg-gray'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // OK
  const renderTabsGender = () => {
    return (
      <div className="relative flex flex-col space-y-4 py-8">
        <h3 className="mb-2.5 text-xl font-medium">Gender</h3>
        <div className="grid grid-cols-2 gap-4">
          {gender.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveGender(item)}
              className={`rounded-lg py-4 ${
                activeGender === item ? 'bg-primary text-white' : 'bg-gray'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // OK
  const renderTabsPriceRage = () => {
    return (
      <div className="relative flex flex-col space-y-5 py-8 pr-3">
        <div className="space-y-5">
          <span className="font-semibold">Price range</span>
          <Slider
            range
            min={PRICE_RANGE[0]}
            max={PRICE_RANGE[1]}
            step={1}
            defaultValue={[
              pathOr(0, [0], rangePrices),
              pathOr(0, [1], rangePrices),
            ]}
            allowCross={false}
            onChange={(_input: number | number[]) =>
              setRangePrices(_input as number[])
            }
          />
        </div>

        <div className="flex justify-between space-x-5">
          <div>
            <div className="block text-sm font-medium">Min price</div>
            <div className="relative mt-1 rounded-md">
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-500 sm:text-sm">
                $
              </span>
              <input
                type="text"
                name="minPrice"
                disabled
                id="minPrice"
                className="block w-32 rounded-full border-neutral-300 bg-transparent pl-4 pr-10 sm:text-sm"
                value={rangePrices[0]}
              />
            </div>
          </div>
          <div>
            <div className="block text-sm font-medium">Max price</div>
            <div className="relative mt-1 rounded-md">
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-500 sm:text-sm">
                $
              </span>
              <input
                type="text"
                disabled
                name="maxPrice"
                id="maxPrice"
                className="block w-32 rounded-full border-neutral-300 bg-transparent pl-4 pr-10 sm:text-sm"
                value={rangePrices[1]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // OK
  const renderTabsLocation = () => {
    return (
      <div className="relative flex flex-col space-y-4 py-8">
        <h3 className="mb-2.5 text-xl font-medium">Location</h3>
        <div className="mb-2 flex items-center gap-2 space-y-3 rounded-full border border-neutral-300 px-4 md:flex md:space-y-0">
          <MdSearch className="text-2xl text-neutral-500" />
          <Input
            type="password"
            rounded="rounded-full"
            placeholder="Search..."
            sizeClass="h-12 px-0 py-3"
            className="border-transparent bg-transparent placeholder:text-neutral-500 focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {locations.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveLocation(item)}
              className={`rounded-lg py-4 ${
                activeLocation === item ? 'bg-primary text-white' : 'bg-gray'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="top-28 lg:sticky">
      <Heading className="mb-0">Filter products</Heading>
      <div className="divide-y divide-neutral-300">
        {renderTabsCategories()}
        {renderTabsGender()}
        {renderTabsPriceRage()}
        {renderTabsLocation()}
      </div>
    </div>
  );
};

export default SidebarFilters;
