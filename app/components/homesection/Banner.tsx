"use client";

import Image from "next/image";
import Link from "next/link";
import {  ArrowRight } from "lucide-react";
import type { PetBannerData } from "@/type/typeSection";
import { FaPaw } from "react-icons/fa";
import ScrollReveal from "../shared/ScrollReveal";


interface BannerProps {
  data: PetBannerData;
}

export default function Banner({ data }: BannerProps) {
  // Using the structured data fields
  const { badge, title, highlightedTitle, desc, buttons, bgImageUrl } = data || {};

  return (
    <section className="relative w-full overflow-hidden bg-[#9C46C9]">
      {/* BACKGROUND IMAGE - Absolute Positioning to cover full width/height */}
      {bgImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageUrl}
            alt="PawFect Banner Background"
            fill
            sizes="100vw"
            className="object-cover min-h-screen object-center"
            priority
          />
          {/* GRADIENT OVERLAY - Applies the deep purple wash on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#9C46C9] via-[#9C46C9]/40 to-transparent"></div>
        </div>
      )}

      {/* Grid container to manage content layout, stays above image and overlay */}
      <div className="relative z-30 mx-auto grid max-w-[1400px]  grid-cols-1 items-center gap-10 px-3 py-16 sm:px-8 sm:py-20 md:grid-cols-2 md:gap-8 lg:px-20 ">
        {/* LEFT CONTENT COLUMN */}
        <ScrollReveal
          direction="right"
          duration={0.8}
          className="flex flex-col items-start text-left md:col-span-1"
        >
          {/* BADGE STYLE - Matching white pill with purple text */}
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 ">
              {/* Reference image uses a simple orange paw icon */}
              <FaPaw className="h-4.5 w-4.5 text-[#F97316]" />
              <span className="text-[12px] font-bold uppercase tracking-wide text-[#f0eef3]">
                {badge}
              </span>
            </div>
          )}

          {/* TITLE STYLE - Large, thick font in all white */}
          <h1 className="mt-3 ml-4 max-w-[560px] text-[40px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[50px] lg:text-[60px] xl:text-[68px]">
            {title} <br /> {highlightedTitle}
          </h1>

          {/* DESCRIPTION STYLE - White, larger font weight */}
          {desc && (
            <p className="mt-6 ml-4 max-w-[500px] text-[15.5px] font-semibold leading-[1.7] text-white sm:text-[16.5px] lg:text-[17.5px]">
              {desc}
            </p>
          )}

          {/* BUTTON(S) STYLE - Dark blue, square arrow box */}
          {buttons && buttons.length > 0 && (
            <div className="mt-6 ml-4 ">
              {buttons.map((btn, idx) => {
                // Focus styling on the primary button variation from the reference image
                const isPrimary = idx === 0 || btn.variant === "primary";

                return (
                  <Link
                    key={idx}
                    href={btn.href}
                    className={`inline-flex items-center gap-4 rounded-xl px-2 py-2 text-[15px] font-bold transition-all duration-300 ${
                      isPrimary
                        ? "bg-[#0A1D56] text-white shadow-lg hover:bg-[#030E30]" // Dark blue with special icon box
                        : "border-[1.5px] border-white/40 bg-transparent text-white hover:bg-white/10" // Simplified secondary for match
                    }`}
                  >
                    {isPrimary && (
                      <span className="pl-4 pr-1">{btn.label}</span>
                    )}

                    {/* Reference image features arrow inside a white square box */}
                    {isPrimary && (
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white p-2 text-black">
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </ScrollReveal>

        {/* RIGHT COLUMN - Kept empty in grid to respect layout and allow gradient transition */}
        <div className="hidden md:block md:col-span-1"></div>
      </div>
    </section>
  );
}