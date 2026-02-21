import React from "react";

type SpinnerProps = {
  className?: string;
};

const Loading: React.FC<SpinnerProps> = ({ className = "" }) => {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={[
        "relative inline-block h-5 w-5 animate-spin rounded-full",
        // outer ring
        "border-2 border-white/20 border-t-white/90",
        // glow
        "shadow-[0_0_18px_rgba(99,102,241,0.35)]",
        className,
      ].join(" ")}
    >
      {/* inner shine dot */}
      <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
      {/* inner soft ring */}
      <span className="absolute inset-1 rounded-full bg-white/5" />
    </span>
  );
};

export default Loading;
