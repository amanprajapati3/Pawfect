"use client";

import React from "react";
import { FaPaw } from "react-icons/fa";
import ScrollReveal from "./ScrollReveal";

export interface SectionHeaderProps {
  badge?: string;
  title?: { normal: string; highlighted: string };
  description?: React.ReactNode;
  className?: string;
  align?: "center" | "left" | "right";
}

const alignContentClass: Record<string, string> = {
  center: "items-center text-center",
  left: "items-center text-center lg:items-start lg:text-left",
  right: "items-center text-center lg:items-end lg:text-right",
};

export default function SectionHeader({
  badge,
  title,
  description,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  return (
    <ScrollReveal direction="up" distance={30} duration={0.6}>
      <div
        className={`flex flex-col ${alignContentClass[align]} ${className}`}
      >
        {badge && (
        <div className="mb-2 inline-flex items-center gap-2">
          <FaPaw className="h-4 w-4 text-[#3B1264]" />
          <span className="text-[12px] font-bold uppercase tracking-widest text-[#3B1264] sm:text-[13px]">
            {badge}
          </span>
        </div>
      )}

      {title && (
        <h2 className="max-w-[700px] text-[32px] font-bold leading-[1.1] tracking-tighter text-[#1C0D3F] sm:text-[42px] lg:text-[56px]">
          {title.normal}{" "}
          <span className="inline-block bg-gradient-to-r from-[#8B3BC8] to-[#6A0DAD] bg-clip-text text-transparent">
            {title.highlighted}
          </span>
        </h2>
      )}

      <div
        className={`my-2 flex items-center ${
          align === "left"
            ? "justify-center lg:justify-start"
            : align === "right"
              ? "justify-center lg:justify-end"
              : "justify-center"
        }`}
      >
        <div className="h-px w-[100px] bg-[#3B1264] sm:w-[145px]" />
        <FaPaw className="mx-2 h-4 w-4 fill-[#3B1264] text-[#3B1264]" />
        <div className="h-px w-[100px] bg-[#3B1264]/30 sm:w-[145px]" />
      </div>

      {description && (
        <p className="max-w-[600px] text-[14px] font-medium leading-relaxed text-gray-500 sm:text-[15px] lg:text-[16px]">
          {description}
        </p>
      )}
      </div>
    </ScrollReveal>
  );
}
