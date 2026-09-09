"use client";

import React from "react";
import Image from "next/image";
import { FaPaw, FaHeart, FaShieldAlt, FaAward, FaUsers } from "react-icons/fa";
import { LuEye, LuTarget } from "react-icons/lu";
import Banner from "../../shared/BannerPage";
import type { PetMissionData, PetMissionCard, PetValueItem } from "@/type/typeSection";

interface MissionProps {
  data: PetMissionData;
  showBanner?: boolean;
}

const renderBadgeIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "eye":
      return <LuEye className="h-6 sm:h-12 sm:w-12 w-6 text-white" />;
    case "target":
      return <LuTarget className="h-6 sm:h-12 sm:w-12 w-6 text-white" />;
    default:
      return <FaPaw className="h-6 sm:h-12 sm:w-12 w-6 text-white" />;
  }
};

const renderValueIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "heart":
      return <FaHeart className="h-9 w-9 sm:w-10 sm:h-10 text-purple-700" />;
    case "shield":
      return <FaShieldAlt className="h-9 w-9 sm:w-10 sm:h-10 text-purple-700" />;
    case "award":
      return <FaAward className="h-9 w-9 sm:w-10 sm:h-10 text-purple-700" />;
    case "users":
      return <FaUsers className="h-9 w-9 sm:w-10 sm:h-10 text-purple-700" />;
    default:
      return <FaPaw className="h-9 w-9 sm:w-10 sm:h-10 text-purple-700" />;
  }
};

export default function Mission({ data, showBanner = true }: MissionProps) {
  const { badge, title, subtitle, cards, values, banner } = data;

  return (
    <>
      {showBanner && (
        <Banner
          image={banner.bgImageUrl}
          title={banner.breadcrumbHome}
          current={banner.breadcrumbCurrent}
        />
      )}
      <section className="relative w-full bg-white py-8  pb-8 md:pb-12 overflow-hidden font-sans">
      
      {/* Top Left Dot Matrix Background SVG */}
      <div className="absolute top-0 left-6 grid grid-cols-6 gap-2 opacity-30 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
        ))}
      </div>

      {/* Top Right Curved Lines & Giant Paw Outline SVG */}
      <div className="absolute top-0 right-0 pointer-events-none z-0">
        <svg
          width="320"
          height="240"
          viewBox="0 0 320 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-40"
        >
          {/* Subtle Curve Line */}
          <path
            d="M 0 0 C 120 40, 240 80, 320 220"
            stroke="#E9D5FF"
            strokeWidth="2"
            fill="none"
          />
          {/* Giant Background Paw Outline */}
          <g transform="translate(180, 20) scale(1.8)" opacity="0.15">
            <path
              d="M30 42c-5 0-9 5-9 11 0 7 6 12 11 12s11-5 11-12c0-6-4-11-11-11zm-16-8c-4 0-7 4-7 9 0 5 4 10 8 10 5 0 8-5 8-10 0-5-3-9-9-9zm32 0c-5 0-8 4-8 9 0 5 3 10 8 10 5 0 9-5 9-10 0-5-4-9-9-9zm-26-15c-3 0-6 4-6 8s3 8 6 8 6-4 6-8-3-8-6-8zm20 0c-3 0-6 4-6 8s3 8 6 8 6-4 6-8-3-8-6-8z"
              fill="#5B21B6"
            />
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          {/* Top Badge Header */}
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="h-[2px] w-6 bg-[#6B21A8]" />
            <FaPaw className="h-4 w-4 text-[#6B21A8]" />
            <span className="text-[15px] font-bold uppercase tracking-wider text-[#6B21A8]">
              {badge}
            </span>
            <span className="h-[2px] w-6 bg-[#6B21A8]" />
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#0F172A] tracking-tight">
            {title.normal}{" "}
            <span className="text-[#6B21A8]">{title.highlighted}</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* VISION & MISSION CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {(cards as PetMissionCard[]).map((card) => (
            <div
              key={card.id}
              className="relative bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center gap-6"
            >
              {/* Circular Image Container with Overlapping Icon Badge */}
              <div className="relative flex-shrink-0">
                <div className="relative h-44 w-44 sm:h-60 sm:w-60 rounded-full overflow-hidden border-2 border-purple-700">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 176px, 192px"
                    className="object-cover p-2 rounded-full"
                  />
                </div>

                {/* Circular Icon Badge at Bottom Left */}
                <div className="absolute bottom-1 left-0 flex h-13 w-13 sm:w-20 sm:h-20 items-center justify-center rounded-full bg-[#6B21A8] border-4 border-white shadow-lg">
                  {renderBadgeIcon(card.badgeIcon)}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 text-left relative">
                {/* Decorative Top Bar & Paw */}
                <div className="flex flex-col items-start gap-1 mb-2">
                  <span className="h-[2px] w-8 bg-[#6B21A8]" />
                  <h3 className="text-2xl sm:text-4xl font-bold text-[#6B21A8] mt-1">
                    {card.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <FaPaw className="h-4 w-4 text-[#6B21A8]" />
                    <span className="h-[1.5px] w-6 bg-purple-400" />
                  </div>
                </div>

                {/* Card Description */}
                <p className="text-[16px] text-[#202122] leading-relaxed mt-3">
                  {card.description}
                </p>

                {/* Bottom Dot Matrix Overlay */}
                <div className="absolute  right-0 grid grid-cols-6 gap-1.5 opacity-25 pointer-events-none">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span key={i} className="h-1 w-1 rounded-full bg-[#9485b8]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CORE VALUES BOTTOM BAR */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {(values as PetValueItem[]).map((val, idx) => (
              <div
                key={val.id}
                className={`flex items-start gap-4 ${
                  idx !== 0 ? "pt-4 sm:pt-0 md:pl-6" : ""
                }`}
              >
                {/* Value Circle Icon */}
                <div className="flex h-12 w-12 sm:w-20 sm:h-20 flex-shrink-0 items-center justify-center rounded-full bg-[#F3E8FF]">
                  <div className="flex h-12 sm:w-20 sm:h-20 w-12 items-center justify-center rounded-full bg-[#F3E8FF]">
                    {renderValueIcon(val.icon)}
                  </div>
                </div>

                {/* Value Content */}
                <div>
                  <h4 className="text-[16px] font-bold text-[#0F172A]">
                    {val.title}
                  </h4>
                  <p className="text-[13px] text-[#64748B] mt-1 leading-snug">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      </section>
    </>
  );
}