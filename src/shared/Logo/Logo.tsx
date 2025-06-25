import Image from 'next/image'
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

interface LogoProps {
  className?: string;
}

const logoUrl = "/assets/images/logo.jpg";

const Logo: FC<LogoProps> = ({ className = 'hidden' }) => {
  return (
    <Link className="flex cursor-pointer items-center gap-2" href="/">
      <Image src={logoUrl} alt="Logo" layout="responsive" width={60} height={60} className="!size-16 object-cover  rounded-full" />
      <span className={`${className} text-2xl font-bold`}>.</span>
    </Link>
  );
};

export default Logo;
