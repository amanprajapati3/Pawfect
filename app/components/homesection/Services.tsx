"use client";

import React, { useState, useEffect, useCallback, ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  PawPrint,
  Scissors,
  Droplets,
  Heart,
  Footprints,
  Stethoscope,
  Medal,
  Sun,
  Hotel,
} from "lucide-react";
import { FaPaw } from "react-icons/fa";

// Define expected interface based on extended JSON and image design
export interface PetServiceItem {
  id: string;
  slug: string;
  iconName: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  href: string;
  linkText: string;
}

export interface PetServicesData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  description: string;
  services: PetServiceItem[];
}

interface ServicesPageProps {
  data: PetServicesData;
}

// Icon Map to convert string names from JSON to Components
const iconMap: Record<string, ElementType> = {
  scissors: Scissors,
  droplet: Droplets,
  "home-heart": Heart,
  footprints: Footprints,
  stethoscope: Stethoscope,
  medal: Medal,
  sun: Sun,
  "building-heart": Hotel,
};

// Dot Button Component for slider navigation
type DotButtonPropType = {
  selected: boolean;
  onClick: () => void;
};

const DotButton: React.FC<DotButtonPropType> = ({ selected, onClick }) => (
  <button
    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
      selected ? "bg-[#3B1264] w-6" : "bg-gray-300"
    }`}
    type="button"
    onClick={onClick}
    aria-label="go to slide"
  />
);

export default function ServicesPage({ data }: ServicesPageProps) {
  // Destructure data with fallbacks
  const { badge, title, description, services = [] } = data || {};

  // --- Slider Functionality ---
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start", // Align to start so cards don't clip at the edges
      slidesToScroll: 1, // Scroll 1 card at a time on mobile
      breakpoints: {
        "(min-width: 640px)": { slidesToScroll: 2 }, // 2 on tablet
        "(min-width: 1024px)": { slidesToScroll: 4, loop: false }, // 4 on desktop, no loop if all visible
      },
    }
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  // States to hold the snaps and screen size detection
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile
  const [isTablet, setIsTablet] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Initial check for screen size on component mount
    const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
        setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    handleResize(); // Call on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [emblaApi, onSelect]);

  // If no services, don't render section
  if (services.length === 0) return null;

  // Determine pagination snaps based on screen size:
  // Desktop (<1024px, 4 slides/view) -> 2 snaps (pages)
  // Tablet (640px-1023px, 2 slides/view) -> 4 snaps (pages)
  // Mobile (<640px, 1 slide/view) -> 8 snaps (pages)
  const paginationSnaps = emblaApi ? emblaApi.scrollSnapList() : [];

  return (
    <main className="w-full bg-[#FAFBFF] py-8 md:py-12 text-[#231F20]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 relative">
        {/* SECTION HEADER */}
        <div className="mb-8 flex flex-col items-center text-center relative z-10">
          {badge && (
            <div className="mb-0 inline-flex items-center gap-2">
              <FaPaw className="h-5 w-5 fill-[#3B1264] text-[#3B1264]" />
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#3B1264]">
                {badge}
              </span>
            </div>
          )}

          {title && (
            <h1 className="text-[36px] font-extrabold tracking-tighter text-[#1C0D3F] sm:text-[48px] lg:text-[56px]">
              {title.normal}{" "}
              <span className="text-[#3B1264]">{title.highlighted}</span>
            </h1>
          )}

          {description && (
            <p className="mt-1 max-w-[650px] text-[15px] font-medium leading-relaxed text-gray-600 sm:text-[16px]">
              {description}
            </p>
          )}
        </div>

        {/* SERVICES SLIDER SECTION */}
        <div className="relative">
          {/* Slider Prev Button - Visible only on tablet and desktop */}
          <button
            onClick={scrollPrev}
            className={`absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#3B1264] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3B1264] hover:text-white sm:-left-5 sm:flex ${
              prevBtnDisabled && "opacity-50 cursor-not-allowed"
            }`}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Slider Next Button - Visible only on tablet and desktop */}
          <button
            onClick={scrollNext}
            className={`absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#3B1264] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3B1264] hover:text-white sm:-right-5 sm:flex ${
              nextBtnDisabled && "opacity-50 cursor-not-allowed"
            }`}
            aria-label="Next Slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* EMBLA SLIDER TRACK */}
          <div className="overflow-hidden p-3 -m-3" ref={emblaRef}>
            <div className="flex">
              {services.map((service, index) => {
                const IconComponent =
                  iconMap[service.iconName.toLowerCase()] || PawPrint;
                return (
                  <div
                    key={service.id}
                    // Responsive sizing: full width on mobile, 1/2 on tablet, 1/4 on desktop
                    className="relative flex-[0_0_100%] px-3 sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
                  >
                    {/* SERVICE CARD */}
                    <div className="flex h-full flex-col items-center rounded-[20px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] group">
                      {/* Card Image Area with Floating Icon */}
                      <div className="relative mb-0 w-full aspect-[4/3] rounded-[15px] ">
                        <Image
                          src={service.image.src}
                          alt={service.image.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Center Floating Icon Badge */}
                        <div className="absolute bottom-0 left-1/2 flex h-[80px] w-[80px] border border-white border-8 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#3B1264] text-white  z-20">
                          <IconComponent className="h-10 w-10" />
                        </div>
                      </div>

                      {/* Card Text Content */}
                      <div className="flex  sm:mb-6 flex-grow flex-col items-center text-center mt-12 mb-0">
                        <h3 className="mb-0 text-[22px] font-bold tracking-tight text-[#1C0D3F]">
                          {service.title}
                        </h3>
                        <div className="my-3 flex gap-1">
                          <div className="w-[30px] bg-[#1C0D3F] h-[1px]"></div>
                          <div className="-mt-2 text-[#1C0D3F]">
                            <FaPaw />
                          </div>
                          <div className="w-[30px] bg-[#1C0D3F] h-[1px]"></div>
                        </div>
                        <p className="flex-grow max-w-[180px] text-[14px] font-medium leading-relaxed text-gray-500 mb-6">
                          {service.description}
                        </p>
                        <div className="flex w-full justify-end -mt-5">
                          <Link
                            href={service.href}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#3B1264] text-[#3B1264] transition-all hover:bg-[#3B1264] hover:text-white"
                            aria-label={`Learn more about ${service.title}`}
                          >
                            <ArrowRight className="h-5 w-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SLIDER DOTS */}
          <div className="mt-12 flex items-center justify-center gap-2.5 relative z-10">
            {/* Display dots only for the determined number of unique pagination snaps */}
            {paginationSnaps.map((_, index) => (
              <DotButton
                key={index}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}