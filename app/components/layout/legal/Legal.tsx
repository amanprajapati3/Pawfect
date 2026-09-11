"use client";

import React from "react";
import BannerPage from "../../shared/BannerPage";
import ScrollReveal from "../../shared/ScrollReveal";
import { site, type LegalPageData } from "@/data";

interface LegalProps {
  data?: LegalPageData;
}

export default function Legal({ data }: LegalProps) {
  const legalData = data ?? site.privacyPolicyPage;

  return (
    <div className="w-full bg-[#FAF8FF] font-sans text-[#1E1B4B]">
      {/* Page Banner */}
      <BannerPage
        image={legalData.banner.backgroundImage}
        title={legalData.banner.title}
        homeHref={legalData.banner.homeHref}
        current={legalData.banner.breadcrumbCurrent}
      />

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1270px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-8">
          {legalData.sections.map((section, index) => (
            <ScrollReveal
              key={section.id}
              direction="up"
              staggerChildren={0.1}
              index={index}
              className="h-full"
            >
              <div className="text-left">
                <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1B4B] tracking-tight mb-2 sm:mb-3">
                  {section.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[#475569] leading-relaxed font-medium">
                  {section.content}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}