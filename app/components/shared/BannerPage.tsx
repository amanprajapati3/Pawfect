import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

// --- Component Props ---
export interface BannerProps {
  image: string;
  title: string;
  home?: string;
  homeHref?: string;
  current: string;
}

// --- Reusable Page Banner ---
export default function Banner({
  image,
  title,
  home = 'Home',
  homeHref = '/',
  current,
}: BannerProps) {
  return (
    <section className="relative w-full ">
      {/* Image + gradient overlay */}
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[260px] lg:h-[300px]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Purple gradient fading from left to transparent, matching the reference design */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3B1264] via-[#3B1264]/60 to-transparent" />

        {/* Title */}
        <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-16">
          <h1 className="text-[32px] font-extrabold tracking-tight text-white sm:text-[40px] lg:text-[48px]">
            {current}
          </h1>
        </div>
      </div>

      {/* Breadcrumb pill, overlapping the bottom edge of the banner */}
      <div className="absolute left-6 -bottom-6 z-20 sm:left-10 lg:left-16">
        <div className="flex items-center gap-2.5 rounded-[14px] bg-white px-5 py-3.5 text-[14px] font-semibold ">
          <Link
            href={homeHref}
            className="flex items-center gap-2 text-[#1C0D3F] transition-colors hover:text-[#3B1264]"
          >
            <Home className="h-4 w-4" strokeWidth={2} />
            {home}
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" strokeWidth={2} />
          <span className="text-[#3B1264]">{current}</span>
        </div>
      </div>
    </section>
  );
}