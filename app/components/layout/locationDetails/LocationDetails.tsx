"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FaPaw,
  FaMapMarkerAlt,
  FaSmile,
  FaAward,
  FaStethoscope,
  FaHome,
  FaHeart,
  FaWalking,
  FaUserFriends,
  FaBath,
  FaShieldAlt,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Banner from "../../shared/BannerPage";
import ScrollReveal from "../../shared/ScrollReveal";
import {
  PetServiceAreaDetail,
  PetServiceAreaDetailsVariant,
} from "@/type/typeSection";

interface LocationDetailsProps {
  data: PetServiceAreaDetail;
  variant: PetServiceAreaDetailsVariant;
}

export default function LocationDetails({
  data: location,
  variant,
}: LocationDetailsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Icons Helper
  const getStatIcon = (icon: string) => {
    switch (icon) {
      case "location":
        return <FaMapMarkerAlt className="h-6 w-6 sm:w-12 sm:h-12 text-[#5B21B6]" />;
      case "smile":
        return <FaSmile className="h-6 w-6 sm:w-12 sm:h-12 text-[#5B21B6]" />;
      case "award":
        return <FaAward className="h-6 w-6 sm:w-12 sm:h-12 text-[#5B21B6]" />;
      default:
        return <FaPaw className="h-6 w-6 sm:w-12 sm:h-12 text-[#5B21B6]" />;
    }
  };

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case "paw":
        return <FaPaw className="h-6 w-6 text-[#5B21B6]" />;
      case "stethoscope":
        return <FaStethoscope className="h-6 w-6 text-[#5B21B6]" />;
      case "home":
        return <FaHome className="h-6 w-6 text-[#5B21B6]" />;
      case "heart":
        return <FaHeart className="h-6 w-6 text-[#5B21B6]" />;
      case "walking":
        return <FaWalking className="h-6 w-6 text-[#5B21B6]" />;
      case "sitting":
        return <FaUserFriends className="h-6 w-6 text-[#5B21B6]" />;
      case "bath":
        return <FaBath className="h-6 w-6 text-[#5B21B6]" />;
      case "shield":
        return <FaShieldAlt className="h-6 w-6 text-[#5B21B6]" />;
      default:
        return <FaPaw className="h-6 w-6 text-[#5B21B6]" />;
    }
  };

  // Slider controls
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -240, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  const handleScroll = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const totalDots = location.subRegions.length;
      const progress = scrollLeft / (scrollWidth - clientWidth || 1);
      const dotIndex = Math.min(
        Math.floor(progress * totalDots),
        totalDots - 1
      );
      setActiveDot(Math.max(0, dotIndex));
    }
  }, [location]);

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [location, handleScroll]);

  return (
    <div className="w-full bg-[#FAFAFC] font-sans text-[#1E1B4B]">
      <Banner
        image={variant.banner.backgroundImage}
        title={variant.banner.title}
        homeHref={variant.banner.homeHref}
        current={variant.banner.breadcrumbCurrent}
      />

      <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Hero Box */}
          <ScrollReveal direction="right" className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1E1B4B]">
                We&apos;re Here For Pets In
              </h3>
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold leading-tight text-[#5B21B6] tracking-tight mt-1">
                {location.name}
              </h2>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-[2px] w-6 bg-purple-500" />
                <FaPaw className="h-4 w-4 text-[#5B21B6]" />
                <span className="h-[2px] w-6 bg-purple-500" />
              </div>

              <p className="mt-6 text-[14px]  md:max-w-[340px] sm:text-[15px] leading-relaxed text-[#111111]">
                {location.description}
              </p>
            </div>

            {/* Stats Row Pinned to Bottom */}
            <div className="mt-8 grid grid-cols-3 ">
              {location.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex  flex-row items-start rounded-[20px] -ml-2  sm:-ml-7 transition-transform hover:-translate-y-0.5"
                >
                  <div className="mb-2 -mt-3 flex h-12 w-12 sm:w-20 sm:h-20 items-center justify-center rounded-full text-[#5B21B6] ">
                    {getStatIcon(stat.icon)}
                  </div>
                  <div className="flex flex-col ">
                  <span className="text-lg sm:text-2xl font-black text-[#5B21B6]">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-medium text-[#000000]">
                    {stat.label}
                  </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Hero Image Card */}
          <ScrollReveal direction="left" className="lg:col-span-7">
            <div className="relative h-[320px] sm:h-[400px] lg:h-full w-full overflow-hidden rounded-[28px] shadow-sm">
              <Image
                src={location.image}
                alt={location.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-[#1E1B4B]">
              Our Services in {location.name}
            </h3>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="h-[1.5px] w-8 bg-purple-500" />
              <FaPaw className="h-4 w-4 text-[#5B21B6]" />
              <span className="h-[1.5px] w-8 bg-purple-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {location.services.map((srv, idx) => (
              <ScrollReveal key={idx} direction="up" staggerChildren={0.1} index={idx} className="h-full">
              <div
                className="group flex flex-col items-center rounded-[24px] bg-white p-6 text-center shadow-sm border border-gray-100/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-purple-200 h-full"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F0FF] text-[#5B21B6] transition-transform duration-300 group-hover:scale-110">
                  {getServiceIcon(srv.icon)}
                </div>
                <h4 className="text-base font-extrabold text-[#1E1B4B] mb-2">
                  {srv.title}
                </h4>
                <p className="text-[13px] leading-relaxed text-[#0d0d0e]">
                  {srv.description}
                </p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-[32px] bg-[#F8F6FE]/80 p-1  border border-purple-50/60">
          {/* Left Text Block */}
          <ScrollReveal direction="right" className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B] mb-2">
                {location.about.title}
              </h3>
              <div className="flex items-center gap-2 mb-6">
              <span className="h-[1.5px] w-8 bg-purple-500" />
              <FaPaw className="h-4 w-4 text-[#5B21B6]" />
              <span className="h-[1.5px] w-8 bg-purple-500" />
              </div>

              <p className="text-[14px] sm:text-[15px] leading-relaxed md:max-w-[500px] text-[#171818] mb-6">
                {location.about.description}
              </p>

              {/* Checkmark List */}
              <div className="space-y-3">
                {location.about.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FaCheckCircle className="h-4 w-4 text-[#5B21B6] shrink-0" />
                    <span className="text-[14px] font-bold text-[#1E1B4B]">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Image Block */}
          <ScrollReveal direction="left" className="lg:col-span-6 min-h-[260px]">
            <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-[24px] shadow-sm">
              <Image
                src={location.aboutImage}
                alt={`Pet Care in ${location.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="pt-2">
          <ScrollReveal direction="up">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-[#1E1B4B]">
              Areas We Serve in {location.name}
            </h3>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="h-[1.5px] w-8 bg-purple-500" />
              <FaPaw className="h-4 w-4 text-[#5B21B6]" />
              <span className="h-[1.5px] w-8 bg-purple-500" />
            </div>
          </div>

          <div className="relative flex items-center">
            {/* Left Nav Arrow Button (Desktop Only) */}
            <button
              onClick={scrollLeft}
              aria-label="Scroll Left"
              className="hidden sm:flex shrink-0 h-10 w-10 items-center justify-center rounded-full bg-[#F3F0FF] text-[#5B21B6] hover:bg-[#5B21B6] hover:text-white transition-colors mr-3"
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>

            {/* Scrollable Track */}
            <div
              ref={sliderRef}
              className="flex w-full gap-3.5 overflow-x-auto scrollbar-hide py-2 px-1 scroll-smooth snap-x snap-mandatory"
            >
              {location.subRegions.map((sub, idx) => (
                <div
                  key={idx}
                  className="snap-start shrink-0 flex items-center gap-2.5 rounded-full bg-[#F3F0FF] px-5 py-3 text-[14px] font-bold text-[#1E1B4B] hover:bg-[#5B21B6] hover:text-white transition-all cursor-pointer shadow-xs"
                >
                  <FaMapMarkerAlt className="h-3.5 w-3.5 text-[#5B21B6] group-hover:text-white" />
                  <span>{sub.name}</span>
                </div>
              ))}
            </div>

            {/* Right Nav Arrow Button (Desktop Only) */}
            <button
              onClick={scrollRight}
              aria-label="Scroll Right"
              className="hidden sm:flex shrink-0 h-10 w-10 items-center justify-center rounded-full bg-[#F3F0FF] text-[#5B21B6] hover:bg-[#5B21B6] hover:text-white transition-colors ml-3"
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Bottom Dotted Indicator */}
          <div className="flex sm:hidden justify-center items-center gap-2 mt-5">
            {location.subRegions.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeDot === idx
                    ? "w-6 bg-[#5B21B6]"
                    : "w-2 bg-purple-200"
                }`}
              />
            ))}
          </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}