'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

import { templateDetails } from './content';

const DivSlider = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const animationStart = 0.2;

  const topDivX = useTransform(scrollYProgress, [animationStart, 1], [0, -100]);
  const botttomDivX = useTransform(
    scrollYProgress,
    [animationStart, 1],
    [0, 100],
  );

  return (
    <div
      ref={targetRef}
      className="relative hidden flex-col items-center justify-center gap-7 overflow-hidden md:flex"
    >
      <motion.div
        className="flex items-center gap-4 lg:gap-7"
        style={{
          x: topDivX,
        }}
      >
        {templateDetails.screenshotsOne.map((screenshot) => (
          <div
            key={screenshot.src}
            className="min-w-[30%] overflow-hidden rounded-xl shadow-lg"
          >
            <Image
              src={screenshot}
              alt="screenshot"
              className="w-full object-cover"
            />
          </div>
        ))}
      </motion.div>
      <motion.div
        className="flex items-center gap-4 lg:gap-7"
        style={{
          x: botttomDivX,
        }}
      >
        {templateDetails.screenshotsTwo.map((screenshot) => (
          <div
            key={screenshot.src}
            className="min-w-[30%] overflow-hidden rounded-xl shadow-lg"
          >
            <Image
              src={screenshot}
              alt="screenshot"
              className="w-full object-cover"
            />
          </div>
        ))}
        s
      </motion.div>
    </div>
  );
};

export default DivSlider;
