"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  alt,
  activeIndex,
  onActiveIndexChange,
}: {
  images: string[];
  alt: string;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}) {
  const [internalActive, setInternalActive] = useState(0);
  const active = activeIndex ?? internalActive;
  const setActive = onActiveIndexChange ?? setInternalActive;
  const activeImage = images[active] ?? images[0];

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    thumbRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  function goToImage(direction: 1 | -1) {
    setActive((active + direction + images.length) % images.length);
  }

  function scrollByThumb(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const thumbWidth = track.firstElementChild
      ? (track.firstElementChild as HTMLElement).offsetWidth + 12 // gap-3
      : 96;
    const atEnd =
      direction === 1 &&
      track.scrollLeft + track.clientWidth >= track.scrollWidth - thumbWidth / 2;
    const atStart = direction === -1 && track.scrollLeft <= thumbWidth / 2;
    if (atEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else if (atStart) {
      track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    } else {
      track.scrollBy({ left: direction * thumbWidth, behavior: "smooth" });
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-surface">
        <Image
          key={activeImage}
          src={activeImage}
          alt={alt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goToImage(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-lg shadow-sm backdrop-blur transition-colors hover:border-accent/50"
            >
              &lsaquo;
            </button>
            <button
              type="button"
              onClick={() => goToImage(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-lg shadow-sm backdrop-blur transition-colors hover:border-accent/50"
            >
              &rsaquo;
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="relative">
          {images.length > 4 && (
            <button
              type="button"
              onClick={() => scrollByThumb(-1)}
              aria-label="Scroll thumbnails left"
              className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-sm transition-colors hover:border-accent/50"
            >
              &lsaquo;
            </button>
          )}
          <div
            ref={trackRef}
            className="flex gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((image, index) => (
              <button
                key={image}
                ref={(el) => {
                  thumbRefs.current[index] = el;
                }}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View image ${index + 1} of ${images.length}`}
                aria-current={index === active}
                className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg border transition-colors ${
                  index === active
                    ? "border-accent"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <Image src={image} alt="" fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
          {images.length > 4 && (
            <button
              type="button"
              onClick={() => scrollByThumb(1)}
              aria-label="Scroll thumbnails right"
              className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-sm transition-colors hover:border-accent/50"
            >
              &rsaquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
