import type { ButtonHTMLAttributes } from "react";
import type React from "react";

export interface ButtonCircleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
}

const ButtonCircle3: React.FC<ButtonCircleProps> = ({
  className = "",
  size = " ",
  ...args
}) => {
  return (
    <button
      type="button"
      className={`ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none focus:ring-transparent disabled:bg-opacity-70 ${className} ${size} `}
      {...args}
    />
  );
};

export default ButtonCircle3;
