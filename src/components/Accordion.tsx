import React from 'react';

const Accordion = ({ question, answer, wfull }: any) => {
  return (
    <div className="">
      <details
        className={`group ${
          wfull ? 'w-full' : 'w-full max-w-2xl'
        } rounded-lg shadow-md`}
      >
        <summary className="flex w-full cursor-pointer list-none items-center gap-4 rounded-lg px-6 py-10">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="block h-5 w-5 group-open:hidden"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="hidden h-5 w-5 group-open:block"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </div>
          {question}
        </summary>
        <div className="px-6 pb-4 text-sm text-neutral-500">{answer}</div>
      </details>
    </div>
  );
};

export default Accordion;
