import React, { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

type ModalProps = {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ open, title, children, onClose }) => {
  // ESC bosilganda yopish
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal box */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_-30px_rgba(0,0,0,0.85)]">
        {/* Top glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,106,0,0.7),rgba(255,46,81,0.65),transparent)]" />

        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-6 py-4">
          <div>
            {title && (
              <p className="text-white text-lg font-semibold leading-tight">
                {title}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className=" grid size-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/80 hover:bg-white/10 hover:text-white transition"
            aria-label="Close"
          >
            <IoCloseOutline className=" text-[22px]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
