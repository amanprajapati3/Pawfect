import React from "react";
import BannerPage from "../../shared/BannerPage";
import { LegalPageData } from "@/type/typeSection";

interface LegalProps {
  data: LegalPageData;
}

export default function Legal({ data }: LegalProps) {
  return (
    <div className="w-full bg-[#FAF8FF] font-sans text-[#1E1B4B]">
      {/* Page Banner */}
      <BannerPage
        image={data.banner.backgroundImage}
        title={data.banner.title}
        homeHref={data.banner.homeHref}
        current={data.banner.breadcrumbCurrent}
      />

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1270px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-8">
          {data.sections.map((section) => (
            <div key={section.id} className="text-left">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1B4B] tracking-tight mb-2 sm:mb-3">
                {section.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#475569] leading-relaxed font-medium">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}