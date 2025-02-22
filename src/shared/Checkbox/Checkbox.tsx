import type { FC } from 'react';
import React from 'react';

export interface CheckboxProps {
  label?: string;
  subLabel?: string;
  className?: string;
  sizeClassName?: string;
  labelClassName?: string;
  name: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  subLabel = '',
  label = '',
  name,
  className = '',
  sizeClassName = 'w-6 h-6',
  labelClassName = '',
  defaultChecked,
  onChange,
}) => {
  return (
    <div className={`flex text-sm sm:text-base ${className}`}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className={`focus:ring-action-primary hover:border-neutarl-700 rounded border-neutral-400 bg-transparent text-primary  focus:ring-primary ${sizeClassName}`}
        defaultChecked={defaultChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <div className="flex flex-1 select-none flex-col justify-center pl-2.5 sm:pl-3.5">
          <span className={`${labelClassName} ${subLabel ? '-mt-0.5' : ''}`}>
            {label}
          </span>
          {subLabel && (
            <p className="mt-0.5 text-sm font-light text-neutral-500">
              {subLabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
