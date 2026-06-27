"use client";

import { useState } from "react";
import { Globe } from "lucide-react";

interface FlagImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export default function FlagImage({
  src,
  alt,
  className = "",
}: FlagImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 ${className}`}
      >
        <Globe
          size={34}
          strokeWidth={1.8}
          className="opacity-70"
        />

        <span className="mt-2 text-[10px] font-medium uppercase tracking-wide">
          No Flag
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`h-full w-full object-cover ${className}`}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}