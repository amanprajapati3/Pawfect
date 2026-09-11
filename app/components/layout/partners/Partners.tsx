"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  FaPaw,
  FaTrophy,
  FaHeart,
  FaHandshake,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import BannerPage from "../../shared/BannerPage";
import CtaBanner from "../../shared/CtaBanner";
import SectionHeader from "../../shared/SectionHeader";
import ScrollReveal from "../../shared/ScrollReveal";
import { site, type PartnersVariant, type PartnerFeature } from "@/data";

interface PartnersProps {
  data?: PartnersVariant;
}

export default function Partners({ data }: PartnersProps) {
  const partnerData = data ?? site.partnersPage;
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

      <div className="relative mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8">
        {/* Decorative Background Paw Prints */}
        <div className="absolute top-12 left-2 text-[#F0E8FF] opacity-80 pointer-events-none hidden lg:block">
          <FaPaw className="h-32 w-32 rotate-[-20deg]" />
        </div>
        <div className="absolute top-14 right-2 text-[#F0E8FF] opacity-80 pointer-events-none hidden lg:block">
          <FaPaw className="h-32 w-32 rotate-[20deg]" />
        </div>

        <SectionHeader
          badge={partnerData.badge}
          title={partnerData.heading}
          description={partnerData.subtitle}
          className="relative z-10 mx-auto mb-5 max-w-2xl"
        />

        <ScrollReveal direction="up">
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
        </ScrollReveal>

        <ScrollReveal direction="up">
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
                    sizes="(max-width: 640px) 200px, 220px"
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
        </ScrollReveal>

        <CtaBanner
          className="mt-10"
          items={[
            {
              icon: <FaHandshake className="h-7 w-7" />,
              title: partnerData.ctaBanner.title,
              subtitle: partnerData.ctaBanner.description,
              action: {
                text: partnerData.ctaBanner.buttonText,
                href: partnerData.ctaBanner.buttonHref,
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
