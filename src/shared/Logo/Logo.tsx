import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import { RiMicrosoftLoopFill } from 'react-icons/ri';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = 'hidden' }) => {
  return (
    <Link className="flex cursor-pointer items-center gap-2" href="/">
      <RiMicrosoftLoopFill className="text-3xl text-primary" />{' '}
      <span className={`${className} text-2xl font-bold`}>HotKicks.</span>
    </Link>
  );
};

export default Logo;
