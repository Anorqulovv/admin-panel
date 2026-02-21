import React, { type ReactNode } from "react";

interface MiniButtonProps {
  type?: "button" | "submit" | "reset";
  extraClass?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const MiniButton: React.FC<MiniButtonProps> = ({
  type = "button",
  extraClass = "",
  children,
  onClick
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${extraClass} grid size-9 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/80 transition hover:text-white hover:bg-white/10 hover:shadow-[0_0_18px_rgba(34,211,238,0.18)] disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export default MiniButton;
