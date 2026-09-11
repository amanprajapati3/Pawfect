"use client";

import React from "react";
import Image from "next/image";
import { FaPaw, FaHeart, FaShieldAlt } from "react-icons/fa";
import Banner from "../../shared/BannerPage"; // Adjust path according to project structure
import ScrollReveal from "../../shared/ScrollReveal";
import { site, type PetAboutUsData } from "@/data";

interface AboutProps {
  data?: PetAboutUsData;
}

const renderIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "shield":
      return <FaShieldAlt className="h-5 md:w-10 md:h-10 w-5 text-[#5B21B6]" />;
    case "heart":
      return <FaHeart className="h-5 w-5 md:w-10 md:h-10 text-[#5B21B6]" />;
    case "paw":
    default:
      return <FaPaw className="h-5 w-5 md:w-10 md:h-10 text-[#5B21B6]" />;
  }
};

export default function About({ data }: AboutProps) {
  const { badge, title, paragraphs, images, features, banner } = data ?? site.aboutUs;

  return (
    <main className="w-full bg-white font-sans">
      {/* Reusable Banner Component */}
      <Banner
        image={banner.bgImageUrl}
        title={banner.breadcrumbHome}
        current={banner.breadcrumbCurrent}
      />

      {/* Main Content Section */}
      <section className="mx-auto max-w-[1280px] px-5 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12 items-center">
          {/* LEFT COLUMN: COMPOSITE IMAGES WITH OVERLAYS & DOT MATRIX */}
          <ScrollReveal direction="right" className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[500px] mt-10 lg:max-w-none min-h-[480px] sm:min-h-[560px]">
              {/* Decorative Yellow Arc (Top-Left Background Accent) */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 h-48 w-48 sm:w-70 rounded-t-[60px] border-l-4 border-t-4 border-[#FBBF24] pointer-events-none" />

              {/* Dot Pattern (Bottom-Left Decorative Background Grid) */}
              <div className="absolute -bottom-6 left-2 grid grid-cols-10 gap-2 z-0 opacity-80">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span key={i} className="h-1 w-1 rounded-full bg-[#bbb0d4]" />
                ))}
              </div>
              <div className="absolute bottom-20 left-20 grid grid-cols-10 gap-2 z-0 opacity-80">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]"
                  />
                ))}
              </div>

              {/* Main Image (Top Container with Curved Corner) */}
              <div className="relative z-10 w-[82%] h-[340px] sm:h-[420px] rounded-tl-[80px] rounded-tr-[28px] rounded-br-[28px] rounded-bl-[28px] overflow-hidden shadow-sm">
                <Image
                  src={images.main}
                  alt="Pet owner holding a puppy"
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Purple Paw Circle Badge */}
              <div className="absolute top-[28%] -left-6 sm:-left-14 z-30 flex sm:h-24 sm:w-24 w-16 h-16 items-center justify-center rounded-full bg-[#5B21B6] border-4 border-white shadow-xl">
                <FaPaw className="sm:h-10 sm:w-10 h-7 w-7 text-white" />
              </div>

              {/* Secondary Overlapping Image (Bottom Right) */}
              <div className="absolute bottom-0 right-2 z-20 w-[58%] h-[200px] sm:h-[250px] rounded-[32px] overflow-hidden border-[6px] border-white shadow-xl">
                <Image
                  src={images.secondary}
                  alt="Golden Retriever and Cat sitting together"
                  fill
                  sizes="(max-width: 1024px) 60vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN: TEXT CONTENT & FEATURE CARDS */}
          <ScrollReveal direction="left" className="lg:col-span-6 flex flex-col justify-center relative">
            {/* Background Watermark Paw Icon */}
            <div className="absolute -top-10 right-0 opacity-5 pointer-events-none">
              <FaPaw className="h-44 w-44 text-[#5B21B6]" />
            </div>

            {/* Top Badge Header */}
            <div className="mb-3 inline-flex items-center gap-3">
              <div className="h-px w-10 bg-[#8B5CF6]" />
              <FaPaw className="h-5 w-5 text-[#5B21B6]" />
              <span className="text-[15px] font-bold uppercase tracking-wider text-[#5B21B6]">
                {badge}
              </span>
              <div className="h-px w-10 bg-[#8B5CF6]" />
            </div>

            {/* Main Title */}
            <h2 className="text-[32px] font-black leading-[1.18] tracking-tight text-[#1E1B4B] sm:text-[42px] lg:text-[46px]">
              {title.normal}{" "}
              <span className="text-[#5B21B6]">{title.highlighted}</span>
            </h2>

            {/* Paragraphs */}
            <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-[#64748B] sm:text-[15.5px]">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Features Row */}
            <div className="mt-8 grid grid-cols-1 gap-6 pt-8 sm:grid-cols-3">
              {" "}
              {features.map((feature, index) => (
                <ScrollReveal key={feature.id} direction="up" staggerChildren={0.1} index={index} className="h-full">
                <div
                  className="h-full flex flex-col border-r-1 border-r-gray-200 last:border-r-white items-center text-center sm:items-start sm:text-left"
                >
                  {" "}
                  <div className="mb-3.5 flex h-12 w-12 md:w-16 md:h-16 items-center justify-center rounded-full bg-[#F3E8FF]">
                    {" "}
                    {renderIcon(feature.iconName)}{" "}
                  </div>{" "}
                  <h3 className="text-[15px] font-bold text-[#1E1B4B]">
                    {" "}
                    {feature.title}{" "}
                  </h3>{" "}
                  <p className="mt-1.5 text-[14px] leading-snug text-[#404347]">
                    {" "}
                    {feature.description}{" "}
                  </p>{" "}
                </div>
                </ScrollReveal>
              ))}{" "}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
