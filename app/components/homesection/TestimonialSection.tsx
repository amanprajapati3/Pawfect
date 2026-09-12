'use client';

import React, { useState, useEffect, useCallback, ElementType } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { PawPrint, Quote, Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from "../shared/SectionHeader";
import ScrollReveal from "../shared/ScrollReveal";
import { site, type PetTestimonialData } from "@/data";

interface TestimonialSectionProps {
  data?: PetTestimonialData;
}

// Dot Button component for slider navigation
type DotButtonPropType = {
  selected: boolean;
  onClick: () => void;
};

const DotButton: React.FC<DotButtonPropType> = ({ selected, onClick }) => (
  <button
    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
      selected ? 'bg-[#3B1264] w-6' : 'bg-gray-300'
    }`}
    type="button"
    onClick={onClick}
    aria-label="go to slide"
  />
);

export default function TestimonialSection({ data }: TestimonialSectionProps) {
  // Destructure data with fallbacks
  const { badge, title, desc, testimonialItems = [] } = data ?? site.testimonial;

  // Setup Embla carousel with responsive configuration
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start', 
    slidesToScroll: 1, 
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 }, // Scroll 2 cards on desktop
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  // Carousel action callbacks
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  // Update button states on selection change
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  // Setup listeners on component mount and reInit
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Star Rating Component
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1.5 mb-8">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < rating ? 'fill-[#F4B400] text-[#F4B400]' : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="w-full overflow-hidden bg-[#f7f4f4] py-8 text-[#231F20] md:py-12">
      <div className="mx-auto max-w-[1400px] px-3 sm:px-8 lg:px-12">
        {/* SECTION HEADER */}
        <SectionHeader badge={badge} title={title} description={desc} />

        {/* CAROUSEL SECTION */}
        {testimonialItems.length > 0 && (
          <ScrollReveal direction="up" className="relative mt-12 sm:mt-16">
            {/* Desktop Navigation Buttons: Hidden on mobile */}
            <button
              onClick={scrollPrev}
              className={`absolute -left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#3B1264] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3B1264] hover:text-white sm:-left-5 sm:flex ${
                prevBtnDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Previous Slide"
              disabled={prevBtnDisabled}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={scrollNext}
              className={`absolute -right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#3B1264] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3B1264] hover:text-white sm:-right-5 sm:flex ${
                nextBtnDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Next Slide"
              disabled={nextBtnDisabled}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* EMBLA TRACK: Provides swipe support */}
            <div className="overflow-hidden p-3 -m-3" ref={emblaRef}>
              <div className="flex">
                {testimonialItems.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="relative flex-[0_0_100%] px-3 min-w-0 sm:flex-[0_0_50%]"
                  >
                    <div className="flex h-full flex-col justify-between rounded-[20px] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] lg:p-10">
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAFAFC] text-[#3B1264]">
                            <Quote className="h-6 w-6" />
                          </div>
                          <StarRating rating={testimonial.rating} />
                        </div>

                        <p className="mb-8 text-[15px] font-medium leading-[1.7] text-gray-500 max-w-[500px]">
                          “{testimonial.quote}”
                        </p>
                      </div>

                      <div className="flex items-center gap-5 border-t border-gray-100 pt-6 mt-auto">
                        <div className="relative h-[65px] w-[65px] shrink-0 items-center justify-center rounded-full border border-gray-100 p-0.5">
                          <div className="relative h-full w-full overflow-hidden rounded-full">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              sizes="65px"
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {/* Client details */}
                        <div className="flex flex-col">
                          <h4 className="text-[17px] font-bold tracking-tight text-[#1C0D3F]">
                            {testimonial.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5 text-sm text-gray-500">
                             <MapPin className="h-3.5 w-3.5 text-[#3B1264]/70"/>
                             <span className="font-medium text-gray-600">
                                {testimonial.role}
                             </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DOTS: Pagination Dots */}
            <div className="mt-12 flex items-center justify-center gap-2.5">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  selected={index === selectedIndex}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}