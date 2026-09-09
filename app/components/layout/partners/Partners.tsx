"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPaw,
  FaTrophy,
  FaHeart,
  FaHandshake,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import BannerPage from "../../shared/BannerPage";
import { PartnersVariant, PartnerFeature } from "@/type/typeSection";

interface PartnersProps {
  data: PartnersVariant;
}

export default function Partners({ data }: PartnersProps) {
  const partnerData = data;
  const sliderRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to enable/disable slider controls on mobile/tablet
  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const ref = sliderRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      checkScroll();
    }
    return () => {
      if (ref) ref.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const cardWidth = container.firstElementChild?.clientWidth || 280;
    const scrollAmount =
      direction === "left" ? -(cardWidth + 20) : cardWidth + 20;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const renderFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "trophy":
        return <FaTrophy className="h-6 sm:w-10 sm:h-10 w-6 text-[#6B21A8]" />;
      case "heart":
        return <FaHeart className="h-6 w-6 sm:w-10 sm:h-10 text-[#6B21A8]" />;
      case "paw":
      default:
        return <FaPaw className="h-6 w-6 sm:w-10 sm:h-10 text-[#6B21A8]" />;
    }
  };

  return (
    <div className="w-full bg-[#FAF8FF] font-sans text-[#1E1B4B]">
      <BannerPage
        image={partnerData.banner.backgroundImage}
        title={partnerData.banner.title}
        homeHref={partnerData.banner.homeHref}
        current={partnerData.banner.breadcrumbCurrent}
      />

      <div className="relative mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8 md:py-12">
        {/* Decorative Background Paw Prints */}
        <div className="absolute top-12 left-2 text-[#F0E8FF] opacity-80 pointer-events-none hidden lg:block">
          <FaPaw className="h-32 w-32 rotate-[-20deg]" />
        </div>
        <div className="absolute top-14 right-2 text-[#F0E8FF] opacity-80 pointer-events-none hidden lg:block">
          <FaPaw className="h-32 w-32 rotate-[20deg]" />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto mb-5">
          <div className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-widest text-[#5B21B6] mb-2">
            <span className="w-5 h-[2px] bg-[#5B21B6] inline-block" />
            <FaPaw className="h-3 w-3" />
            <span>{partnerData.badge}</span>
            <span className="w-5 h-[2px] bg-[#5B21B6] inline-block" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1E1B4B] tracking-tight leading-tight">
            {partnerData.heading.normal}{" "}
            <span className="text-[#5B21B6]">
              {partnerData.heading.highlighted}
            </span>
          </h2>

          <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#64748B] leading-relaxed max-w-xl mx-auto">
            {partnerData.subtitle}
          </p>
        </div>

        <div className="relative z-10 py-4 px-2 md:px-10 max-w-4xl mx-auto mb-5">
          <div className="flex flex-col sm:flex-row  justify-between gap-3 md:gap-4">
            {partnerData.features.map((feat: PartnerFeature, index: number) => (
              <React.Fragment key={index}>
                <div className="flex items-center  gap-4 w-auto justify-start">
                  {/* Circular Icon Badge */}
                  <div className="flex h-14 w-14 rounded-full bg-purple-100  sm:h-16 sm:w-16 shrink-0 items-center justify-center ">
                    {renderFeatureIcon(feat.icon)}
                  </div>

                  {/* Title and Subtitle */}
                  <div className="text-left">
                    <h4 className="text-[15px] sm:text-[16px] font-bold text-[#100A38] leading-tight">
                      {feat.title}
                    </h4>
                    <p className="text-[12px] sm:text-[13px] text-[#71717A] mt-1 font-medium leading-tight">
                      {feat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Vertical Line Separator (Desktop Only) */}
                {index < partnerData.features.length - 1 && (
                  <div className="hidden md:block h-10 w-[1px] bg-[#EBE3FC] shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Slider Navigation Buttons (Mobile / Tablet Only) */}
          <div className="flex lg:hidden justify-end gap-2 mb-4">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous Partner"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                canScrollLeft
                  ? "border-[#5B21B6] bg-white text-[#5B21B6] shadow-xs"
                  : "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
              }`}
            >
              <FaChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Next Partner"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                canScrollRight
                  ? "border-[#5B21B6] bg-white text-[#5B21B6] shadow-xs"
                  : "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
              }`}
            >
              <FaChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div
            ref={sliderRef}
            className="
              flex lg:grid lg:grid-cols-4 gap-5 
              overflow-x-auto  lg:overflow-visible 
              scroll-smooth snap-x snap-mandatory 
              pb-4 pt-1 no-scrollbar
            "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {partnerData.partners.map((item) => (
              <div
                key={item.id}
                className="
                  snap-start shrink-0 lg:shrink 
                  w-[260px] sm:w-[280px] lg:w-full 
                  h-[210px] rounded-[24px] bg-white 
                  border border-[#EFEAFE] p-6 
                  flex flex-col items-center justify-between text-center 
                  shadow-xs hover:shadow-md hover:scale-105  hover:border-purple-200 transition-all duration-300
                "
              >
                {/* Logo Image Area */}
                <div className="relative w-full  h-36 flex items-center justify-center my-auto px-2">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={600}
                    height={250}
                    className="max-h-full  max-w-full w-auto h-auto object-contain"
                  />
                </div>

                {/* Subtitle */}
                <p className="text-[13px] font-bold text-[#64748B] mb-1">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-[24px] bg-[#F3EFFE] p-6 sm:p-7 border border-purple-100/50 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          {/* Left Icon & Text */}
          <div className="flex items-center gap-4">
            <div className="flex h-13 sm:w-20 sm:h-20 w-13 shrink-0 items-center justify-center rounded-full bg-[#d8cdfa] text-[#5B21B6]">
              <FaHandshake className="h-8 sm:w-12 sm:h-12 w-8" />
            </div>
            <div className="hidden md:block h-20 w-[1px] border-l-1 border border-purple-300" />

            <div className="">
              <h4 className="text-[19px] font-bold md:text-3xl text-[#08070e] tracking-tight">
                {partnerData.ctaBanner.title}
              </h4>
              <p className="text-[15px] md:text-xl text-[#000000] mt-0.5">
                {partnerData.ctaBanner.description}
              </p>
            </div>
          </div>

          {/* Dotted Vertical Line Separator */}
          <div className="hidden md:block h-20 w-[1px] border-l-1 border border-purple-300" />

          {/* Button */}
          <Link
            href={partnerData.ctaBanner.buttonHref}
            className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#5B21B6] hover:bg-[#4C1D95] px-7 py-3.5 text-[17px] font-bold text-white shadow-md transition-all whitespace-nowrap self-stretch md:self-auto text-center shrink-0"
          >
            <FaPaw className="h-6 w-6" />
            <span>{partnerData.ctaBanner.buttonText}</span>
            <FaArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
