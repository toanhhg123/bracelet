'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { pathOr } from 'ramda';
import React from 'react';

import { blogs } from '@/data/content';

const SectionBlogsHero = () => {
  return (
    <motion.div
      // initial={{ opacity: 0, y: '50%' }}
      // whileInView={{ opacity: 1, y: '0%' }}
      // transition={{ duration: 0.5 }}
      // viewport={{ once: true }}
      className="grid gap-10 lg:grid-cols-3"
    >
      <div className="space-y-10 lg:col-span-2">
        <Link href={`/blog/${pathOr('', ['slug'], blogs[0])}`}>
          <Image
            src={pathOr('', ['coverImage'], blogs[0])}
            alt=""
            className="w-full rounded-3xl"
            width={1000}
            height={1000}
          />
        </Link>
        <div className="space-y-3">
          <p className="border-b border-neutral-300 py-5 text-neutral-500">
            {pathOr('', ['tag'], blogs[0])} - {pathOr('', ['date'], blogs[0])}
          </p>
          <h1 className="text-3xl font-semibold">
            {pathOr('', ['title'], blogs[0])}
          </h1>
          <p className="text-neutral-500">{pathOr('', ['brief'], blogs[0])}</p>
        </div>
      </div>
      <div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-1 lg:gap-20">
          {blogs.slice(1, 3).map((blog) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.coverImage}
              className="flex flex-col gap-3"
            >
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={blog.coverImage}
                  alt="cover image"
                  className="h-full w-full object-cover object-center"
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500">
                  {blog.tag} - {blog.date}
                </span>
                <h4 className="font-semibold">{blog.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SectionBlogsHero;
