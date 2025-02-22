'use client';

import { motion } from 'framer-motion';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import { MdArrowForward } from 'react-icons/md';

interface BlogCardProps {
  title: string;
  brief: string;
  date: string;
  coverImage: string | StaticImageData;
  tag: 'Style' | 'Fitting' | 'General';
  slug: string;
}

const BlogCard: FC<BlogCardProps> = ({
  title,
  brief,
  date,
  coverImage,
  tag,
  slug,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: '50%' }}
      whileInView={{ opacity: 1, y: '0%' }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="relative h-[540px] space-y-5 overflow-hidden rounded-xl border border-neutral-300 p-3 shadow-md"
    >
      <Link href={`/blog/${slug}`}>
        <div className="h-[220px] w-full overflow-hidden rounded-xl">
          <Image
            src={coverImage}
            alt="blog cover"
            className="h-full w-full object-cover object-center"
            width={1000}
            height={1000}
          />
        </div>
      </Link>

      <div className="">
        <p className="text-neutral-500">
          {date} - {tag}
        </p>
        <h3 className="card-title text-2xl font-semibold">{title}</h3>
        <p className="mt-5 text-neutral-500">{brief}</p>
        <div className="absolute bottom-5 left-3 w-full">
          <div className="relative">
            <Link
              href={`/blog/${slug}`}
              className="inline-flex items-center gap-2 border-b-2 border-primary py-1 font-medium text-primary"
            >
              Read More
              <MdArrowForward className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
