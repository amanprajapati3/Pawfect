"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPaw } from "react-icons/fa";

export interface PetTeamMember {
  id: number;
  slug: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface PetTeamData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  desc: string;
  members: PetTeamMember[];
}

interface TeamSectionProps {
  data: PetTeamData;
  layout?: "home" | "grid";
}

export default function TeamSection({ data, layout = "home" }: TeamSectionProps) {
  const { badge, title, desc, members = [] } = data || {};
  const isGrid = layout === "grid";

  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active bullet when user swipes manually
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const cardWidth = slider.clientWidth;

      if (cardWidth > 0) {
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.min(index, members.length - 1));
      }
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, [members.length]);

  // Move slider to a specific card
  const goToSlide = (index: number) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const safeIndex = Math.max(0, Math.min(index, members.length - 1));

    slider.scrollTo({
      left: safeIndex * slider.clientWidth,
      behavior: "smooth",
    });

    setActiveIndex(safeIndex);
  };

  const goNext = () => {
    goToSlide(activeIndex + 1);
  };

  const goPrevious = () => {
    goToSlide(activeIndex - 1);
  };

  return (
    <section className="w-full overflow-hidden bg-[#F3E8FF] py-8 md:py-12">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* HEADER AREA */}
        <div className="mb-14 flex flex-col items-center text-center">
          {badge && (
            <div className="mb-2 inline-flex items-center gap-2">
              <FaPaw className="h-4 w-4 text-[#3B1264]" />
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#3B1264]">
                {badge}
              </span>
            </div>
          )}

          {title && (
            <h2 className="max-w-[700px] text-[36px] font-extrabold leading-[1.1] tracking-tighter text-[#1C0D3F] sm:text-[46px] lg:text-[56px]">
              {title.normal}{" "}
              <span className="inline-block bg-gradient-to-r from-[#8B3BC8] to-[#6A0DAD] bg-clip-text text-transparent">
                {title.highlighted}
              </span>
            </h2>
          )}

          {/* Paw separator */}
          <div className="my-2 flex items-center justify-center">
            <div className="h-px w-[145px] bg-[#3B1264]" />
            <FaPaw className="mx-2 h-4 w-4 fill-[#3B1264] text-[#3B1264]" />
            <div className="h-px w-[145px] bg-[#3B1264]/30" />
          </div>

          {/* Description */}
          {desc && (
            <p className="max-w-[600px] text-[15px] font-medium leading-relaxed text-gray-500 sm:text-[16px]">
              {desc}
            </p>
          )}
        </div>

        {isGrid ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="group flex flex-col items-center rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-transform duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
                >
                  {/* Image */}
                  <div className="relative mb-6 flex h-[160px] w-[160px] items-center justify-center rounded-full border border-[#3B1264]/10 p-1 transition-transform duration-300 group-hover:scale-105 lg:h-[175px] lg:w-[175px]">
                    <div className="relative h-full w-full overflow-hidden rounded-full">
                      <Link href={member.slug}>
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 1024px) 160px, 175px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Member Text Content */}
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-[18px] font-bold tracking-tight text-[#1C0D3F] transition-colors group-hover:text-[#3B1264] sm:text-[20px]">
                      <Link href={member.slug}>{member.name}</Link>
                    </h3>

                    <p className="mt-1 text-[13px] font-bold text-[#8B3BC8]">
                      {member.role}
                    </p>

                    <div className="my-4 flex items-center">
                      <div className="h-[2px] w-[20px] bg-[#3B1264]" />
                      <FaPaw className="mx-1 h-3 w-3 fill-[#3B1264] text-[#3B1264]" />
                      <div className="h-[2px] w-[20px] bg-[#3B1264]" />
                    </div>

                    <p className="max-w-[220px] text-[13px] font-medium leading-relaxed text-gray-500">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : members.length > 0 ? (
            <>
            <div className="relative sm:hidden">
              {/* Slider */}
              <div
                ref={sliderRef}
                className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
              >
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="w-full flex-none snap-center px-1"
                  >
                    <div className="group flex min-h-[430px] flex-col items-center rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                      {/* Image */}
                      <div className="relative mb-6 flex h-[140px] w-[140px] items-center justify-center rounded-full border border-[#3B1264]/10 p-1 transition-transform duration-300 group-hover:scale-105">
                        <div className="relative h-full w-full overflow-hidden rounded-full">
                          <Link href={member.slug}>
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              sizes="140px"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </Link>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex flex-col items-center text-center">
                        <h3 className="text-[18px] font-bold tracking-tight text-[#1C0D3F] transition-colors group-hover:text-[#3B1264]">
                          <Link href={member.slug}>{member.name}</Link>
                        </h3>

                        <p className="mt-1 text-[13px] font-bold text-[#8B3BC8]">
                          {member.role}
                        </p>

                        <div className="my-4 flex items-center">
                          <div className="h-[2px] w-[20px] bg-[#3B1264]" />
                          <FaPaw className="mx-1 h-3 w-3 fill-[#3B1264] text-[#3B1264]" />
                          <div className="h-[2px] w-[20px] bg-[#3B1264]" />
                        </div>

                        <p className="max-w-[220px] text-[13px] font-medium leading-relaxed text-gray-500">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Previous / Next Buttons */}
              {members.length > 1 && (
                <div className="pointer-events-none absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between px-0">
                  <button
                    type="button"
                    onClick={goPrevious}
                    disabled={activeIndex === 0}
                    aria-label="Previous team member"
                    className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#3B1264] shadow-lg transition-all duration-200 hover:scale-105 disabled:pointer-events-none disabled:opacity-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    disabled={activeIndex === members.length - 1}
                    aria-label="Next team member"
                    className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#3B1264] shadow-lg transition-all duration-200 hover:scale-105 disabled:pointer-events-none disabled:opacity-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* Pagination Bullets */}
              {members.length > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  {members.map((member, index) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to team member ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activeIndex === index
                          ? "w-7 bg-[#3B1264]"
                          : "w-2.5 bg-[#3B1264]/25"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="hidden sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="group flex flex-col items-center rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-transform duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
                >
                  {/* Image */}
                  <div className="relative mb-6 flex h-[160px] w-[160px] items-center justify-center rounded-full border border-[#3B1264]/10 p-1 transition-transform duration-300 group-hover:scale-105 lg:h-[175px] lg:w-[175px]">
                    <div className="relative h-full w-full overflow-hidden rounded-full">
                      <Link href={member.slug}>
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 1024px) 160px, 175px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Member Text Content */}
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-[18px] font-bold tracking-tight text-[#1C0D3F] transition-colors group-hover:text-[#3B1264] sm:text-[20px]">
                      <Link href={member.slug}>{member.name}</Link>
                    </h3>

                    <p className="mt-1 text-[13px] font-bold text-[#8B3BC8]">
                      {member.role}
                    </p>

                    <div className="my-4 flex items-center">
                      <div className="h-[2px] w-[20px] bg-[#3B1264]" />
                      <FaPaw className="mx-1 h-3 w-3 fill-[#3B1264] text-[#3B1264]" />
                      <div className="h-[2px] w-[20px] bg-[#3B1264]" />
                    </div>

                    <p className="max-w-[220px] text-[13px] font-medium leading-relaxed text-gray-500">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-20 text-center text-gray-500">
            No team members found.
          </div>
        )}
      </div>
    </section>
  );
}
