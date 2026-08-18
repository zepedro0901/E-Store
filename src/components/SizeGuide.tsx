"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "@/i18n/use-translations";

const SCALE_GUIDE_IMAGE =
  "https://images.pangolinresinworks.com/site/scale-guide.png";
// Source image is 1000x535 (~1.87:1) - keep the popover render at that ratio.
const SCALE_GUIDE_WIDTH = 560;
const SCALE_GUIDE_HEIGHT = 300;

export function SizeGuide() {
  const { dict } = useTranslations();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <span
      ref={containerRef}
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={dict.common.sizeGuide}
        aria-expanded={open}
        className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-foreground/30 text-[10px] font-semibold leading-none text-foreground/50 transition-colors hover:border-accent hover:text-accent"
      >
        ?
      </button>
      {open && (
        <div
          role="tooltip"
          style={{
            width: SCALE_GUIDE_WIDTH + 12,
            maxWidth: "calc(100vw - 1.5rem)",
          }}
          className="absolute bottom-full right-0 z-20 mb-2 rounded-lg border border-black/10 bg-white p-1.5 normal-case tracking-normal shadow-lg"
        >
          <Image
            src={SCALE_GUIDE_IMAGE}
            alt={dict.common.sizeGuide}
            width={SCALE_GUIDE_WIDTH}
            height={SCALE_GUIDE_HEIGHT}
            className="h-auto w-full rounded"
          />
        </div>
      )}
    </span>
  );
}
