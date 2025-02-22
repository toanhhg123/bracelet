import Link from 'next/link';
import React from 'react';

import FormItem from '@/shared/FormItem';
import Input from '@/shared/Input/Input';

const PageForgotPass = () => {
  return (
    <div className="container mb-24 lg:mb-32">
      <header className="- mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-20">
        <h2 className="mt-20 flex items-center justify-center text-3xl font-semibold leading-[115%] md:text-5xl md:leading-[115%]">
          Forgot password
        </h2>
      </header>

      <div className="mx-auto max-w-md space-y-6">
        {/* FORM */}
        <FormItem label="Email address">
          <Input
            type="email"
            rounded="rounded-full"
            sizeClass="h-12 px-4 py-3"
            placeholder="example@example.com"
            className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
          />
        </FormItem>

        {/* ==== */}
        <span className="block text-center text-neutral-500">
          Go back for {` `}
          <Link href="/login" className="text-primary">
            Sign in
          </Link>
          {` / `}
          <Link href="/signup" className="text-primary">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PageForgotPass;
