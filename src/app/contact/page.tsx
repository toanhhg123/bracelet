import Image from 'next/image';
import Link from 'next/link';
import { pathOr } from 'ramda';
import React from 'react';

import { contactSection } from '@/data/content';
import ButtonCircle3 from '@/shared/Button/ButtonCircle3';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import Heading from '@/shared/Heading/Heading';

import ContactForm from './ContactForm';

const page = () => {
  return (
    <div className="container">
      <div className="mb-32 mt-20">
        <Heading desc={contactSection.description} isMain isCenter>
          {contactSection.heading}
        </Heading>

        <div className="mx-auto max-w-3xl rounded-3xl bg-gray p-5 md:p-10 lg:p-16">
          <ContactForm />
        </div>
      </div>

      <div className="mb-32">
        <Heading
          desc={contactSection.directContactInfoHeader.description}
          isMain
          isCenter
        >
          {contactSection.directContactInfoHeader.heading}
        </Heading>

        <div className="grid gap-10 lg:grid-cols-3">
          {contactSection.directContactInfo.map((info) => (
            <div
              key={info.title}
              className="flex flex-col items-center justify-center gap-7"
            >
              <ButtonCircle3 className="bg-gray text-primary" size="w-24 h-24">
                {info.icon}
              </ButtonCircle3>

              <h2 className="text-2xl font-medium">{info.title}</h2>
              <p className="text-center text-neutral-500">{info.description}</p>
              <Link
                className="border-b border-black py-2 text-2xl font-medium hover:border-primary hover:text-primary"
                href={info.contactLink.href}
              >
                {info.contactLink.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-32">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Follow us on Instagram</h2>
          <ButtonSecondary className="border-2 border-primary text-primary">
            Visit
          </ButtonSecondary>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-5">
            {contactSection.instagramPhotos.slice(0, 4).map((photo) => (
              <div key={photo}>
                <Image
                  src={photo}
                  alt="instagram photo"
                  className="h-full w-full object-cover object-center"
                  width={1000}
                  height={1000}
                />
              </div>
            ))}
          </div>
          <div>
            <Image
              src={pathOr('', ['instagramPhotos', 4], contactSection)}
              alt="instagram photo"
              className="h-full w-full object-cover object-center"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
