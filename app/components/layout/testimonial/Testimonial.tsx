"use client";

import React from "react";
import Image from "next/image";
import { Quote, Star, MapPin } from "lucide-react";
import { FaPaw } from "react-icons/fa";
import Banner from "../../shared/BannerPage";
import { TestimonialPageVariant } from "@/type/typeSection";

interface TestimonialProps {
  data: TestimonialPageVariant;
}

export default function Testimonial({ data }: TestimonialProps) {
  const testimonialData = data;

  return (
    <div className="w-full bg-[#FAFAFC] font-sans text-[#1E1B4B]">
      <Banner
        image={testimonialData.banner.backgroundImage}
        title={testimonialData.banner.title}
        homeHref={testimonialData.banner.homeHref}
        current={testimonialData.banner.breadcrumbCurrent}
      />

      <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8 md:py-12">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="mb-0 inline-flex items-center gap-2">
            <FaPaw className="h-5 w-5 fill-[#3B1264] text-[#3B1264]" />
            <span className="text-[13px] font-bold uppercase tracking-widest text-[#3B1264]">
              {testimonialData.badge}
            </span>
          </div>

          <h2 className="text-[36px] -mt-2 font-bold tracking-tighter text-[#1C0D3F] sm:text-[48px] lg:text-[56px]">
            {testimonialData.heading.normal}{" "}
            <span className="text-[#3B1264]">
              {testimonialData.heading.highlighted}
            </span>
          </h2>

          <div className="flex items-center gap-3 my-0">
            <div className="h-px w-16 bg-[#C4B5FD]" />
            <FaPaw className="h-3.5 w-3.5 fill-[#3B1264] text-[#3B1264]" />
            <div className="h-px w-16 bg-[#C4B5FD]/40" />
          </div>

          <p className="mt-2 max-w-[650px] text-[15px] font-medium leading-relaxed text-gray-600 sm:text-[16px]">
            {testimonialData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonialData.testimonialItems.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex h-full flex-col justify-between rounded-[20px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
            >
              <div className="">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAFAFC] text-[#3B1264]">
                    <Quote className="h-6 w-6" />
                  </div>
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${
                          index < testimonial.rating
                            ? "fill-[#F4B400] text-[#F4B400]"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="mb-8 text-[15px] font-medium leading-[1.7] text-gray-500">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-5 border-t border-gray-100 pt-2 mt-auto">
                <div className="relative h-[65px] w-[65px] shrink-0 items-center justify-center rounded-full border border-gray-100 p-0.5">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="65px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-[17px] font-bold tracking-tight text-[#1C0D3F]">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-500">
                    <MapPin className="h-3.5 w-3.5 text-[#3B1264]/70" />
                    <span className="font-medium text-gray-600">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}