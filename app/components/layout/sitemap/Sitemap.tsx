"use client";

import React from "react";
import Link from "next/link";
import Banner from "../../shared/BannerPage";
import ScrollReveal from "../../shared/ScrollReveal";
import { site, type SitemapVariant } from "@/data";

interface SitemapProps {
  data?: SitemapVariant;
}

export default function Sitemap({ data }: SitemapProps) {
  const { sections } = data ?? site.sitemapPage;

  // Flatten all pages from sections to get a single sequential list for global 01, 02, 03... numbering
  const allPages = sections.flatMap((section) => section.pages);

  // Group pages into vertical columns so items order top-to-bottom first
  const totalColumns = 4;
  const itemsPerColumn = Math.ceil(allPages.length / totalColumns);

  const columns = Array.from({ length: totalColumns }, (_, colIndex) =>
    allPages.slice(colIndex * itemsPerColumn, (colIndex + 1) * itemsPerColumn)
  );

  return (
    <div className="w-full bg-[#FAF8FF] font-sans text-[#1E1B4B]">
      {/* Banner Component */}
      <Banner
        image={(data ?? site.sitemapPage).banner.backgroundImage}
        title={(data ?? site.sitemapPage).banner.title}
        homeHref={(data ?? site.sitemapPage).banner.homeHref}
        current={(data ?? site.sitemapPage).banner.breadcrumbCurrent}
      />

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        
        {/* 4 Vertical Columns Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-0">
          {columns.map((columnPages, colIdx) => (
            <ScrollReveal
              key={colIdx}
              direction="up"
              staggerChildren={0.1}
              index={colIdx}
              className="h-full"
            >
            <div className="flex flex-col">
              {columnPages.map((page, rowIdx) => {
                // Calculate absolute index to preserve correct global 01, 02, 03... numbering vertically
                const globalIndex = colIdx * itemsPerColumn + rowIdx;
                const pageNumber = String(globalIndex + 1).padStart(2, "0");

                return (
                  <div key={page.href} className="border-b border-[#EAE8F2] pb-3.5 pt-3.5">
                    <Link
                      href={page.href}
                      className="group flex items-center gap-2.5 transition-colors hover:text-[#5B21B6]"
                    >
                      {/* Number Prefix (e.g., 01.) */}
                      <span className="text-[14px] sm:text-[15px] font-bold text-[#1E1B4B] group-hover:text-[#5B21B6] transition-colors">
                        {pageNumber}.
                      </span>

                      {/* Page Title */}
                      <span className="text-[14px] sm:text-[15px] font-bold text-[#1E1B4B] group-hover:text-[#5B21B6] transition-colors">
                        {page.label}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
}