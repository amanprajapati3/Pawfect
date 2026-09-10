"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPaw, FaArrowRight, FaHeadset, FaCalendarAlt } from "react-icons/fa";
import Banner from "../../shared/BannerPage";
import CtaBanner from "../../shared/CtaBanner";
import SectionHeader from "../../shared/SectionHeader";
import ScrollReveal from "../../shared/ScrollReveal";
import { PricingVariant } from "@/type/typeSection";

interface PricingProps {
  data: PricingVariant;
}

export default function Pricing({ data }: PricingProps) {
  const pricingData = data;

  // Active state initialized to the popular card ID ("basic")
  const [activePlan, setActivePlan] = useState<string>("basic");

  return (
    <div className="w-full bg-[#FAFAFC] font-sans text-[#1E1B4B]">
      <Banner
        image={pricingData.banner.backgroundImage}
        title={pricingData.banner.title}
        homeHref={pricingData.banner.homeHref}
        current={pricingData.banner.breadcrumbCurrent}
      />

      <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader
          badge={pricingData.badge}
          title={pricingData.heading}
          description={
            <>
              {pricingData.subtitle1}
              <br className="hidden sm:inline" />
              {pricingData.subtitle2}
            </>
          }
          className="mx-auto mb-12 max-w-2xl sm:mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-stretch mb-12">
          {pricingData.plans.map((plan, index) => {
            const isActive = activePlan === plan.id;

            return (
              <ScrollReveal
                key={plan.id}
                direction="up"
                staggerChildren={0.1}
                index={index}
                className="h-full"
              >
              <div
                onClick={() => setActivePlan(plan.id)}
                className={`relative rounded-[32px] pt-10 pb-0 px-6 sm:px-8 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? "bg-white border-2 border-[#5B21B6] shadow-xl shadow-purple-900/10 scale-[1.02]"
                    : "bg-white border border-gray-100 shadow-xs hover:border-purple-300 hover:shadow-md"
                }`}
              >
                {/* 1. TOP-LEFT CORNER QUADRANT SVG BACKGROUND */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-[#d4c6fa] rounded-br-[100px] pointer-events-none flex items-start justify-start pt-4 pl-4">
                  <FaPaw className="h-8 w-8 text-[#5B21B6] " />
                </div>

                {/* Most Popular Badge */}
                {plan.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#5B21B6] text-white text-[10px] font-black tracking-widest uppercase px-5 py-1.5 rounded-b-xl shadow-xs z-10">
                    {plan.badge}
                  </div>
                )}

                {/* 2. CARD HEADER CONTENT */}
                <div className="text-center pt-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B]">
                    {plan.title}
                  </h3>
                  <p className="text-[13px] text-[#64748B] mt-2 max-w-[240px] mx-auto leading-relaxed">
                    {plan.subtitle}
                  </p>

                  <div className="w-full h-[1px] bg-purple-100/60 my-5" />

                  {/* Price Block */}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-bold text-[#5B21B6]">$</span>
                    <span className="text-5xl font-black text-[#5B21B6] tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-base font-bold text-[#1E1B4B]">
                      {plan.period}
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-purple-100/60 my-5" />
                </div>

                {/* 3. FEATURE LIST WITH PURPLE PAW BULLETS */}
                <ul className="space-y-3.5 my-2 text-left">
                  {plan.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 border-b border-dashed border-gray-100 pb-2.5 last:border-none"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-white">
                        <FaPaw className="h-2.5 w-2.5" />
                      </div>
                      <span className="text-[13px] font-bold text-[#1E1B4B]">
                        {feat.title}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* 4. BOTTOM AREA: CURVED ARC BACKGROUND + DOG (LEFT) + BUTTON (RIGHT) */}
                <div className="relative mt-6 -mx-6 sm:-mx-8 h-[170px] sm:h-[190px] overflow-hidden flex items-end justify-center px-4 sm:px-6">
                  {/* Arc Curve Background */}
                  <div className="absolute sm:top-20 top-12 right-20 -left-10 inset-0 bg-[#F3EFFE] rounded-tr-[180px]  rounded-tl-[180px]  z-0 pointer-events-none" />

                  {/* Decorative Paw Print Watermarks */}
                  <div className="absolute right-12 top-6 text-purple-200/80 pointer-events-none z-0">
                    <FaPaw className="h-12 w-12 rotate-[25deg]" />
                  </div>
                  <div className="absolute right-20 top-20 text-purple-200/80 pointer-events-none z-0">
                    <FaPaw className="h-12 w-12 rotate-[25deg]" />
                  </div>

                  {/* Dog Cutout Image (Aligned Left) */}
                  <div className="relative  w-[130px] h-[150px] sm:w-[235px] sm:top-20 sm:h-[225px] z-10 shrink-0">
                    <Image
                      src={plan.dogImage}
                      alt={plan.title}
                      fill
                      sizes="(max-width: 640px) 130px, 235px"
                      className="object-contain object-bottom"
                    />
                  </div>

                  {/* Choose Plan Button (Aligned Right beside the Dog) */}
                  <div className="z-10 mr-20 mb-6 shrink-0">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#4C1D95] to-[#5B21B6] py-3 px-5 sm:px-6 text-[13px] sm:text-[14px] font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
                    >
                      <span>{plan.buttonText}</span>
                      <FaArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
              </ScrollReveal>
            );
          })}
        </div>

        <CtaBanner
          items={[
            {
              icon: <FaHeadset className="h-7 w-7" />,
              title: pricingData.ctaBanner.needDifferent.title,
              subtitle: pricingData.ctaBanner.needDifferent.description,
            },
            {
              icon: <FaCalendarAlt className="h-7 w-7" />,
              title: pricingData.ctaBanner.consultation.title,
              subtitle: pricingData.ctaBanner.consultation.description,
              action: {
                text: pricingData.ctaBanner.consultation.buttonText,
                href: pricingData.ctaBanner.consultation.buttonHref,
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
