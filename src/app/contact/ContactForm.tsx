import React from 'react';

import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import FormItem from '@/shared/FormItem';
import Input from '@/shared/Input/Input';
import Textarea from '@/shared/TextArea/TextArea';

const ContactForm = () => {
  return (
    <div className="w-full space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <FormItem label="Name">
          <Input
            placeholder="Full name"
            sizeClass="h-14 px-4 py-5"
            type="text"
            rounded="rounded-lg"
            className="border-neutral-300 bg-white placeholder:text-neutral-500 focus:border-primary"
          />
        </FormItem>
        <FormItem label="Email Address">
          <Input
            placeholder="example@email.com"
            sizeClass="h-14 px-4 py-5"
            type="email"
            rounded="rounded-lg"
            className="border-neutral-300 bg-white placeholder:text-neutral-500 focus:border-primary"
          />
        </FormItem>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <FormItem label="Phone Number">
          <Input
            placeholder="(123) 456-7890"
            sizeClass="h-14 px-4 py-5"
            type="text"
            rounded="rounded-lg"
            className="border-neutral-300 bg-white placeholder:text-neutral-500 focus:border-primary"
          />
        </FormItem>
        <FormItem label="Subject">
          <Input
            placeholder="Shoe care"
            sizeClass="h-14 px-4 py-5"
            type="text"
            rounded="rounded-lg"
            className="border-neutral-300 bg-white placeholder:text-neutral-500 focus:border-primary"
          />
        </FormItem>
      </div>
      <FormItem label="Message">
        <Textarea
          placeholder="Enter your message here!"
          className="border border-neutral-300 bg-white p-4 placeholder:text-neutral-500 focus:border-primary"
          rows={6}
        />
      </FormItem>
      <ButtonPrimary className="self-center" sizeClass="py-4 px-6">
        Submit
      </ButtonPrimary>
    </div>
  );
};

export default ContactForm;
