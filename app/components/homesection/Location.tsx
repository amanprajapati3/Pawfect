"use client";

import React, { useState, useRef, TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import type { PetServiceAreasData } from "@/type/typeSection";

interface LocationProps {
  data: PetServiceAreasData;
}

// Custom hook to handle swiping
function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Minimum distance required for a swipe to register
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = null; // Reset end position
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

export default function Location({ data }: LocationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { badge, title, desc, cities = [] } = data || {};

  // Total number of cities/cards
  const totalCities = cities.length;

  // Items per view based on breakpoints (tailwind conventions)
  // Default (Phone): 2
  // SM (Tablet): 4
  // LG (Desktop): 6
  // These are handled by the aspect-ratio and width classes below.

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalCities - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalCities - 1 ? 0 : prev + 1));
  };

  // Dot navigation
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Integration swipe hook
  const swipeHandlers = useSwipe(handleNext, handlePrev);

  return (
    <section className="w-full bg-white py-8 md:py-12 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center">
          {badge && (
            <div className="inline-flex items-center gap-2">
              <FaPaw className="h-4 w-4 text-[#3B1264]" />
              <span className="text-[14px] font-bold uppercase tracking-wider text-[#3B1264]">
                {badge}
              </span>
            </div>
          )}

          {title && (
            <h2 className="text-[32px] font-extrabold tracking-tight text-[#1C0D3F] sm:text-[42px] lg:text-[48px]">
              {title.normal}{" "}
              <span className="text-[#3B1264]">{title.highlighted}</span>
            </h2>
          )}

          {desc && (
            <p className="mt-1 max-w-[600px] text-[14.5px] font-medium leading-relaxed text-gray-500 sm:text-[15.5px]">
              {desc}
            </p>
          )}
        </div>

        {/* SLIDER & CITIES CONTAINER */}
        <div className="relative mt-8" ref={containerRef}>
          {/* LEFT CHEVRON BUTTON */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute -left-2 cursor-pointer hidden top-[35%] z-20 sm:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#3B1264]/20 bg-white text-[#3B1264] shadow-md transition-all hover:bg-[#3B1264] hover:text-white sm:-left-5 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* RIGHT CHEVRON BUTTON */}
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute cursor-pointer -right-2 hidden top-[35%] z-20 sm:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#3B1264]/20 bg-white text-[#3B1264] shadow-md transition-all hover:bg-[#3B1264] hover:text-white sm:-right-5 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* CITIES CAROUSEL TRACK */}
          {/* Main overflow container */}
          <div className="overflow-hidden py-6">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                // Responsive translateX handling:
                // Default (Mobile): calc translation based on 2 items per view.
                // We use percentage here based on the total width of the track.
                // Mobile translation needs precise calculation to prevent cut-off.
                // We calculate translation as (Index / Total Items) * 100% of the track.
                transform: `translateX(-${
                  currentIndex * (100 / (totalCities || 1))
                }%)`,
              }}
              // Swipe handlers attached directly to the moving track
              {...swipeHandlers}
            >
              {cities.map((city) => (
                // Individual Card Container
                <div
                  key={city.id}
                  // Responsive widths: Phone: 50% (2 items), Tablet: 25% (4 items), Desktop: 16.66% (6 items)
                  // Use aspect-ratio to keep cards square and consistent.
                  className="w-1/2 shrink-0 aspect-[4/5] sm:aspect-auto px-2 sm:w-1/4 lg:w-1/6 sm:px-3 flex justify-center items-center"
                >
                  <Link
                    href={`/service-areas/${city.slug}`}
                    className="group flex flex-col items-center text-center w-full"
                  >
                    {/* CIRCULAR IMAGE CONTAINER */}
                    <div className="relative mb-6 flex items-center justify-center w-full">
                      <div className="relative flex h-[140px] w-[140px] items-center justify-center rounded-full border border-[#3B1264] p-1.5 transition-transform duration-300 group-hover:scale-105 sm:h-[160px] sm:w-[160px] lg:h-[175px] lg:w-[175px]">
                        <div className="relative h-full w-full overflow-hidden rounded-full">
                          <Image
                            src={city.image}
                            alt={city.name}
                            fill
                            sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 175px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            // Prevent native drag on images interfering with swipe
                            draggable="false"
                          />
                        </div>

                        {/* BOTTOM LOCATION ICON */}
                        <div className="absolute -bottom-3 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-white text-[#3B1264] shadow-md">
                          <FaMapMarkerAlt className="h-4 md:h-5 md:w-5 w-4 fill-current stroke-none" />
                        </div>
                      </div>
                    </div>

                    {/* TEXT CONTENT */}
                    <h3 className="mt-1 text-[16px] font-extrabold text-[#1C0D3F] transition-colors group-hover:text-[#3B1264] sm:text-[18px]">
                      {city.name}
                    </h3>
                    <p className="mt-0.5 text-[13px] font-medium text-gray-500">
                      {city.state}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM PAGINATION DOTS */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {cities.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? "w-2.5 bg-[#3B1264]"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}