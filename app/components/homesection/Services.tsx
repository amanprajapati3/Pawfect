
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
import SectionHeader from "../shared/SectionHeader";
import ScrollReveal from "../shared/ScrollReveal";

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
  layout?: "slider" | "grid";
}

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

type DotButtonPropType = {
  selected: boolean;
  onClick: () => void;
};

const DotButton: React.FC<DotButtonPropType> = ({
  selected,
  onClick,
}) => (
  <button
    className={`h-2.5 rounded-full transition-all duration-300 ${
      selected ? "w-6 bg-[#3B1264]" : "w-2.5 bg-gray-300"
    }`}
    type="button"
    onClick={onClick}
    aria-label="Go to slide"
  />
);

export default function ServicesPage({ data, layout = "slider" }: ServicesPageProps) {
  const { badge, title, description, services = [] } = data || {};

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 640px)": {
        slidesToScroll: 2,
      },
      "(min-width: 1024px)": {
        slidesToScroll: 4,
      },
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
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

    setScrollSnaps(emblaApi.scrollSnapList());

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (services.length === 0) return null;

  const isGrid = layout === "grid";

  const renderCard = (service: PetServiceItem) => {
    const IconComponent =
      iconMap[service.iconName.toLowerCase()] || PawPrint;

    return (
      <div className="group flex h-full flex-col items-center overflow-hidden rounded-[20px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
        {/* IMAGE */}
        <div className="relative mb-0 aspect-[4/3] w-full rounded-[15px]">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* FLOATING ICON */}
          <div className="absolute bottom-0 left-1/2 z-20 flex h-[80px] w-[80px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-8 border-white bg-[#3B1264] text-white">
            <IconComponent className="h-10 w-10" />
          </div>
        </div>

        {/* TEXT */}
        <div className="mt-12 flex flex-grow flex-col items-center text-center sm:mb-6">
          <h3 className="mb-0 text-[22px] font-bold tracking-tight text-[#1C0D3F]">
            {service.title}
          </h3>

          {/* DECORATION */}
          <div className="my-3 flex items-center gap-1">
            <div className="h-[1px] w-[30px] bg-[#1C0D3F]" />
            <div className="-mt-2 text-[#1C0D3F]">
              <FaPaw />
            </div>
            <div className="h-[1px] w-[30px] bg-[#1C0D3F]" />
          </div>

          {/* DESCRIPTION */}
          <p className="mb-6 flex-grow max-w-[180px] text-[14px] font-medium leading-relaxed text-gray-500">
            {service.description}
          </p>

          {/* LINK */}
          <div className="-mt-5 flex w-full justify-end pr-5">
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
    );
  };

  return (
    <main className="w-full bg-[#FAFBFF] py-8 text-[#231F20] md:py-12">
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        {/* SECTION HEADER */}
        <SectionHeader badge={badge} title={title} description={description} className="mb-8" />

        {isGrid ? (
          /* SERVICES GRID */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ScrollReveal
                key={service.id}
                direction="up"
                staggerChildren={0.1}
                index={index}
                className="h-full"
              >
                <div className="h-full">
                  {renderCard(service)}
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* SERVICES SLIDER */
          <ScrollReveal direction="up">
            <div className="relative">

            {/* PREVIOUS BUTTON */}
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className="absolute -left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#3B1264] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3B1264] hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:-left-5 sm:flex"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* NEXT BUTTON */}
            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className="absolute -right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#3B1264] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3B1264] hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:-right-5 sm:flex"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* EMBLA VIEWPORT */}
            <div
              ref={emblaRef}
              className="overflow-hidden"
            >
              {/* TRACK */}
              <div className="flex">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="min-w-0 flex-[0_0_100%] pl-0 sm:flex-[0_0_50%] sm:pl-4 lg:flex-[0_0_25%] lg:pl-5"
                  >
                    {renderCard(service)}
                  </div>
                ))}
              </div>
            </div>

            {/* DOTS */}
            {scrollSnaps.length > 1 && (
              <div className="relative z-10 mt-10 flex items-center justify-center gap-2.5">
                {scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    selected={index === selectedIndex}
                    onClick={() => scrollTo(index)}
                  />
                ))}
              </div>
            )}

          </div>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
}
