import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { checkmark } from "ionicons/icons";

type RadioButtonProps = {
  content: string | JSX.Element;
  selected: boolean;
  name: string;
  value: any;
  onChange: (value: string) => void;
  className?: string;
  wrapperClassName?: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  content,
  selected,
  name,
  value,
  className,
  wrapperClassName,
  onChange,
}) => {
  return (
    <div
      className={`flex w-full items-center space-x-1 md:space-x-4 border rounded-xl justify-center px-1 md:px-2 py-2 
        ${
          selected ? "border-primary-default" : "border-gray-300"
        } ${wrapperClassName}`}
    >
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        className={`hidden ${className}`}
        checked={selected}
        onChange={() => onChange(value)}
      />
      <label
        htmlFor={value}
        className="flex items-center cursor-pointer space-x-1.5 md:space-x-4"
      >
        <div
          className={`flex flex-shrink-0 justify-center items-center w-6 h-6 border border-[#DBDBDB] rounded-full 
          ${selected ? "bg-primary-default" : "bg-white"}`}
        >
          {selected && <IonIcon icon={checkmark} className="text-white" />}
        </div>
        <div className="scale-90 sm:scale-100 text-sm md:text-lg">
          {content}
        </div>
      </label>
    </div>
  );
};

export default RadioButton;
