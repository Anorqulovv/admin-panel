import React, { type Dispatch, type SetStateAction } from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  name?: string;
  extraClass?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  setValue?: Dispatch<SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  extraClass = "",
  value,
  defaultValue,
  onChange,
  disabled = false,
  required = true,
  autoComplete = "off",
  setValue,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e);
    if (setValue) setValue(e.target.value);
  };

  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
      className={`${extraClass} w-full py-3 px-4 pr-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 transition-all duration-300 focus:outline-none focus:border-[#4A9FF5] focus:ring-2 focus:ring-[#4A9FF5]/30 disabled:opacity-60 disabled:cursor-not-allowed`}
    />
  );
};

export default Input;