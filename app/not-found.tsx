import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { site } from "@/data";
import { NotFoundVariant } from "@/type/typeSection";

export default function NotFoundPage() {
  const data: NotFoundVariant = site.notFoundPage;

  return (
    <div className="w-full bg-white font-sans py-16 sm:py-20 lg:py-24 flex items-center justify-center">
      <div className="mx-auto max-w-3xl px-4 text-center flex flex-col items-center">
        
        <div className="relative flex items-center justify-center gap-1 sm:gap-2 mb-6 select-none">
          {/* Left '4' */}
          <span className="text-[100px] sm:text-[150px] lg:text-[200px] font-black text-[#82478C] leading-none tracking-tighter">
            4
          </span>

          {/* Center Mouse Character */}
          <div className="relative w-[110px] h-[130px] sm:w-[170px] sm:h-[190px] lg:w-[220px] lg:h-[240px] shrink-0">
            <Image
              src={data.image}
              alt="Mouse character"
              fill
              priority
              sizes="(max-width: 640px) 110px, (max-width: 1024px) 170px, 220px"
              className="object-contain"
            />
          </div>

          {/* Right '4' */}
          <span className="text-[100px] sm:text-[150px] lg:text-[200px] font-black text-[#82478C] leading-none tracking-tighter">
            4
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-[#1E1B4B] tracking-tight leading-tight mb-3">
          {data.title}
        </h1>

        <p className="text-[13px] sm:text-[14px] text-[#64748B] font-medium leading-relaxed max-w-md mx-auto mb-8">
          {data.description}
        </p>

        <Link
          href={data.buttonHref}
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#82478C] hover:bg-[#6f3b77] px-8 py-3.5 text-[14px] font-bold text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          <span>{data.buttonText}</span>
          <FaArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}