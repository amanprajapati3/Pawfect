"use client";

import React, { useState, useRef, useEffect, TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import SectionHeader from "../shared/SectionHeader";
import ScrollReveal from "../shared/ScrollReveal";
import { site, type PetServiceAreasData, type PetServiceAreaCity } from "@/data";

interface LocationProps {
  data?: PetServiceAreasData;
  layout?: "home" | "grid";
}

// Custom hook to handle swiping
function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = null;
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

export default function Location({ data, layout = "home" }: LocationProps) {
  const locationData = data ?? site.serviceAreas;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(6); // Default for SSR / desktop
  const containerRef = useRef<HTMLDivElement>(null);

  const { badge, title, desc, cities = [] } = locationData;
  const isGrid = layout === "grid";

  // Total number of cities/cards
  const totalCities = cities.length;

  // Handle responsiveness to adjust visible items & max index
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(2); // Mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCards(4); // Tablet
      } else {
        setVisibleCards(6); // Desktop
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  // Calculate maximum index so slider doesn't overshoot white-space
  const maxIndex = Math.max(0, totalCities - visibleCards);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Dot navigation (Clamped to prevent scrolling past valid maxIndex)
  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Integration swipe hook
  const swipeHandlers = useSwipe(handleNext, handlePrev);

  const renderCityCard = (city: PetServiceAreaCity) => (
    <Link
      href={`${city.slug}`}
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
  );

  return (
    <section className="w-full bg-white py-8 md:py-12 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        {/* HEADER SECTION */}
        <SectionHeader badge={badge} title={title} description={desc} />

        {isGrid ? (
          /* CITIES GRID: 4 per row desktop / 2 tablet / 1 mobile */
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((city, index) => (
              <ScrollReveal
                key={city.id}
                direction="up"
                staggerChildren={0.1}
                index={index}
                className="h-full"
              >
                <div className="flex h-full justify-center rounded-3xl border border-gray-200 bg-white p-5 transition-shadow duration-300 hover:shadow-lg">
                  {renderCityCard(city)}
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* SLIDER & CITIES CONTAINER */
          <ScrollReveal direction="up">
            <div className="relative mt-8" ref={containerRef}>
            {/* LEFT CHEVRON BUTTON */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous Slide"
              className="absolute -left-2 top-[35%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border opacity-30 hover:opacity-100 cursor-pointer border-[#3B1264]/20 bg-white text-[#3B1264] shadow-md transition-all hover:bg-[#3B1264] hover:text-white sm:-left-5 sm:h-12 sm:w-12 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#3B1264]"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* RIGHT CHEVRON BUTTON */}
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next Slide"
              className="absolute -right-2 top-[35%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border opacity-30 hover:opacity-100 cursor-pointer border-[#3B1264]/20 bg-white text-[#3B1264] shadow-md transition-all hover:bg-[#3B1264] hover:text-white sm:-right-5 sm:h-12 sm:w-12 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#3B1264]"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div className="overflow-hidden py-6">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                }}
                {...swipeHandlers}
              >
                {cities.map((city) => (
                  <div
                    key={city.id}
                    className="w-1/2 sm:w-1/4 lg:w-1/6 shrink-0 aspect-[4/5] sm:aspect-auto px-2 sm:px-3 flex justify-center items-center"
                  >
                    {renderCityCard(city)}
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM PAGINATION DOTS (HIDDEN ON DESKTOP `lg:hidden`) */}
            <div className="mt-3 flex items-center justify-center gap-2 lg:hidden">
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
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}