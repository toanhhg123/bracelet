import type { TextareaHTMLAttributes } from 'react';
import React from 'react';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', children, rows = 4, ...args }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`block w-full rounded-lg focus:ring focus:ring-transparent focus:ring-opacity-25 disabled:bg-neutral-800 ${className}`}
        rows={rows}
        {...args}
      >
        {children}
      </textarea>
    );
  },
);

export default Textarea;
