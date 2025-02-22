import Link from 'next/link';
import React from 'react';
import { FaGoogle } from 'react-icons/fa6';

import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import FormItem from '@/shared/FormItem';
import Input from '@/shared/Input/Input';

const PageSignUp = () => {
  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] md:text-5xl md:leading-[115%]">
          Signup
        </h2>
        <div className="mx-auto max-w-md ">
          <div className="space-y-6">
            <div className="">
              <ButtonSecondary className="flex w-full items-center gap-3 border-2 border-primary text-primary">
                <FaGoogle className="text-2xl" /> Continue with Google
              </ButtonSecondary>
            </div>
            <div className="relative text-center">
              <span className="relative z-10 inline-block rounded-full bg-gray px-4 text-sm font-medium ">
                OR
              </span>
              <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 border border-neutral-300" />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <FormItem label="Email address">
                <Input
                  type="email"
                  rounded="rounded-full"
                  sizeClass="h-12 px-4 py-3"
                  placeholder="example@example.com"
                  className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                />
              </FormItem>
              <FormItem label="Password">
                <Input
                  type="password"
                  rounded="rounded-full"
                  sizeClass="h-12 px-4 py-3"
                  className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                />
              </FormItem>
              <ButtonPrimary>Continue</ButtonPrimary>
            </div>
            <span className="block text-center text-sm text-neutral-500">
              Already have an account? {` `}
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
