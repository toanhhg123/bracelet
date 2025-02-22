import { XMarkIcon } from "@heroicons/react/24/solid";

export interface ButtonCloseProps {
  className?: string;
  IconclassName?: string;
  onClick?: () => void;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({
  className = "",
  IconclassName = "w-5 h-5",
  onClick = () => {},
}) => {
  return (
    <button
      className={`flex size-8 items-center justify-center  rounded-full hover:bg-neutral-700 ${className}`}
      onClick={onClick}
      type="button"
    >
      <span className="sr-only">Close</span>
      <XMarkIcon className={IconclassName} />
    </button>
  );
};

export default ButtonClose;
