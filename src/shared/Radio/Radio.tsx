import type { FC } from 'react';
import React from 'react';

export interface RadioProps {
  className?: string;
  name: string;
  id: string;
  onChange?: (value: string) => void;
  defaultChecked?: boolean;
  sizeClassName?: string;
  label?: string;
}

const Radio: FC<RadioProps> = ({
  className = '',
  name,
  id,
  onChange,
  label,
  sizeClassName = 'w-6 h-6',
  defaultChecked,
}) => {
  return (
    <div className={`flex items-center text-sm sm:text-base ${className}`}>
      <input
        id={id}
        name={name}
        type="radio"
        className={`focus:ring-action-primary rounded-full border-neutral-400 bg-transparent text-primary hover:border-neutral-700  focus:ring-primary ${sizeClassName}`}
        onChange={(e) => onChange && onChange(e.target.value)}
        defaultChecked={defaultChecked}
        value={id}
      />
      {label && <div className="block select-none pl-2.5 sm:pl-3">{label}</div>}
    </div>
  );
};

export default Radio;
