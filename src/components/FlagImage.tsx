"use client";

import React, { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlagImageProps {
  src?: string;
  alt: string;
  className?: string;
  size?: "sm" | "lg";
}

export default function FlagImage({
  src,
  alt,
  className,
  size = "sm",
}: FlagImageProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error state if image source changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasError(false);
  }, [src]);

  const isEmpty = !src || src.trim() === "";

  if (isEmpty || hasError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50/60 text-slate-400 p-2 text-center dark:bg-slate-900/40 dark:text-slate-500 select-none">
        <ImageOff
          className={cn(
            "stroke-[1.5]",
            size === "lg" ? "h-8 w-8 text-slate-450 dark:text-slate-500" : "h-5 w-5"
          )}
        />
        {size === "lg" && (
          <span className="mt-2 text-[10px] font-bold tracking-wider uppercase text-slate-450 dark:text-slate-500">
            Flag unavailable
          </span>
        )}
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading={size === "lg" ? "eager" : "lazy"}
    />
  );
}
