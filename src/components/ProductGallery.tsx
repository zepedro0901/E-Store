"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslations } from "@/i18n/use-translations";
import { interpolate } from "@/i18n/interpolate";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type Point = { x: number; y: number };

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
  const { dict } = useTranslations();
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

  // --- Zoom lightbox ---
  const [mounted, setMounted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 });

  const viewportRef = useRef<HTMLDivElement>(null);
  const pointersRef = useRef<Map<number, Point>>(new Map());
  const pinchStateRef = useRef<{
    distance: number;
    midX: number;
    midY: number;
    scale: number;
    pos: Point;
  } | null>(null);
  const dragStateRef = useRef<{
    startX: number;
    startY: number;
    startPos: Point;
  } | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") navigateLightbox(-1);
      else if (e.key === "ArrowRight") navigateLightbox(1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, active]);

  function resetZoom() {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }

  function openLightbox() {
    resetZoom();
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
    resetZoom();
    pointersRef.current.clear();
    pinchStateRef.current = null;
    dragStateRef.current = null;
  }

  function navigateLightbox(direction: 1 | -1) {
    resetZoom();
    goToImage(direction);
  }

  const clampPan = useCallback((nextScale: number, next: Point): Point => {
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect || nextScale <= 1) return { x: 0, y: 0 };
    const maxX = ((nextScale - 1) * rect.width) / 2;
    const maxY = ((nextScale - 1) * rect.height) / 2;
    return {
      x: clamp(next.x, -maxX, maxX),
      y: clamp(next.y, -maxY, maxY),
    };
  }, []);

  function zoomBy(factor: number, center?: Point) {
    setScale((prevScale) => {
      const nextScale = clamp(prevScale * factor, MIN_SCALE, MAX_SCALE);
      const rect = viewportRef.current?.getBoundingClientRect();
      setPos((prevPos) => {
        if (nextScale <= 1) return { x: 0, y: 0 };
        if (!rect) return prevPos;
        const m = center ?? {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        const mx = m.x - (rect.left + rect.width / 2);
        const my = m.y - (rect.top + rect.height / 2);
        const nextPos = {
          x: mx - (mx - prevPos.x) * (nextScale / prevScale),
          y: my - (my - prevPos.y) * (nextScale / prevScale),
        };
        return clampPan(nextScale, nextPos);
      });
      return nextScale;
    });
  }

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.2 : 1 / 1.2;
    zoomBy(factor, { x: e.clientX, y: e.clientY });
  }

  function handleDoubleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (scale > 1) {
      resetZoom();
    } else {
      zoomBy(DOUBLE_TAP_SCALE, { x: e.clientX, y: e.clientY });
    }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2) {
      const [p0, p1] = [...pointersRef.current.values()];
      pinchStateRef.current = {
        distance: Math.hypot(p0.x - p1.x, p0.y - p1.y),
        midX: (p0.x + p1.x) / 2,
        midY: (p0.y + p1.y) / 2,
        scale,
        pos,
      };
      dragStateRef.current = null;
    } else if (pointersRef.current.size === 1) {
      dragStateRef.current = { startX: e.clientX, startY: e.clientY, startPos: pos };
    }
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2 && pinchStateRef.current) {
      const [p0, p1] = [...pointersRef.current.values()];
      const distance = Math.hypot(p0.x - p1.x, p0.y - p1.y);
      const midX = (p0.x + p1.x) / 2;
      const midY = (p0.y + p1.y) / 2;
      const start = pinchStateRef.current;
      const nextScale = clamp(
        start.scale * (distance / start.distance),
        MIN_SCALE,
        MAX_SCALE
      );
      setScale(nextScale);
      setPos(
        clampPan(nextScale, {
          x: start.pos.x + (midX - start.midX),
          y: start.pos.y + (midY - start.midY),
        })
      );
    } else if (pointersRef.current.size === 1 && dragStateRef.current && scale > 1) {
      const { startX, startY, startPos } = dragStateRef.current;
      setPos(
        clampPan(scale, {
          x: startPos.x + (e.clientX - startX),
          y: startPos.y + (e.clientY - startY),
        })
      );
    }
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchStateRef.current = null;
    if (pointersRef.current.size === 0) dragStateRef.current = null;
  }

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-surface">
        <button
          type="button"
          onClick={openLightbox}
          aria-label={dict.productGallery.zoomImage}
          className="absolute inset-0 h-full w-full cursor-zoom-in"
        >
          <Image
            key={activeImage}
            src={activeImage}
            alt={alt}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </button>
        <span className="pointer-events-none absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface/90 text-base shadow-sm backdrop-blur">
          🔍
        </span>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToImage(-1);
              }}
              aria-label={dict.productGallery.previousImage}
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-lg shadow-sm backdrop-blur transition-colors hover:border-accent/50"
            >
              &lsaquo;
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToImage(1);
              }}
              aria-label={dict.productGallery.nextImage}
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
              aria-label={dict.productGallery.scrollThumbnailsLeft}
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
                aria-label={interpolate(dict.productGallery.viewImageOf, {
                  index: index + 1,
                  total: images.length,
                })}
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
              aria-label={dict.productGallery.scrollThumbnailsRight}
              className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-sm transition-colors hover:border-accent/50"
            >
              &rsaquo;
            </button>
          )}
        </div>
      )}

      {mounted &&
        lightboxOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex flex-col bg-black/95"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label={dict.productGallery.closeZoom}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl text-white shadow-sm backdrop-blur hover:border-white/40"
            >
              &times;
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => navigateLightbox(-1)}
                  aria-label={dict.productGallery.previousImage}
                  className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl text-white shadow-sm backdrop-blur hover:border-white/40"
                >
                  &lsaquo;
                </button>
                <button
                  type="button"
                  onClick={() => navigateLightbox(1)}
                  aria-label={dict.productGallery.nextImage}
                  className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl text-white shadow-sm backdrop-blur hover:border-white/40"
                >
                  &rsaquo;
                </button>
              </>
            )}

            <div
              ref={viewportRef}
              className="relative m-auto h-full max-h-[85vh] w-full max-w-5xl touch-none select-none overflow-hidden"
              style={{ cursor: scale > 1 ? "grab" : "zoom-in" }}
              onWheel={handleWheel}
              onDoubleClick={handleDoubleClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div
                className="relative h-full w-full"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                  transition: pointersRef.current.size > 0 ? "none" : "transform 0.15s ease-out",
                }}
              >
                <Image
                  src={activeImage}
                  alt={alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  draggable={false}
                  priority
                />
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
              <button
                type="button"
                onClick={() => zoomBy(1 / 1.5)}
                aria-label={dict.productGallery.zoomOut}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-lg text-white shadow-sm backdrop-blur hover:border-white/40"
              >
                &minus;
              </button>
              <button
                type="button"
                onClick={() => zoomBy(1.5)}
                aria-label={dict.productGallery.zoomIn}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-lg text-white shadow-sm backdrop-blur hover:border-white/40"
              >
                +
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
