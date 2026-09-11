"use client";

import React from "react";
import Image from "next/image";
import {
  FaPaw,
  FaDog,
  FaHeart,
  FaRegSmile,
  FaShower,
  FaCut,
} from "react-icons/fa";
import {
  FaShieldHeart,
  FaSyringe,
  FaWandMagicSparkles,
  FaCalendarDays,
  FaDroplet,
} from "react-icons/fa6";
import Banner from "@/app/components/shared/BannerPage";
import ScrollReveal from "../../shared/ScrollReveal";
import {
  site,
  type ServiceDetailsData,
  type ServiceDetailsQuickBenefit,
  type ServiceDetailsBenefitItem,
  type ServiceDetailsProcessStep,
} from "@/data";

const renderBenefitIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "dog":
      return <FaDog className="h-6 sm:w-10 sm:h-10 w-6 text-[#5B21B6]" />;
    case "shield-cross":
      return (
        <FaShieldHeart className="h-6 sm:w-10 sm:h-10 w-6 text-[#5B21B6]" />
      );
    case "heart":
      return <FaHeart className="h-6 w-6 sm:w-10 sm:h-10 text-[#5B21B6]" />;
    case "droplet":
      return <FaDroplet className="h-6 w-6 sm:w-10 sm:h-10 text-[#5B21B6]" />;
    case "smile":
    default:
      return <FaRegSmile className="h-6 w-6 sm:w-10 sm:h-10 text-[#5B21B6]" />;
  }
};

const renderProcessIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "bath":
      return <FaShower className="h-8 w-8 text-white" />;
    case "dryer":
      return <FaSyringe className="h-8 w-8 text-white" />;
    case "scissors":
      return <FaCut className="h-8 w-8 text-white" />;
    case "sparkles":
    default:
      return <FaWandMagicSparkles className="h-8 w-8 text-white" />;
  }
};

interface ServiceDetailsProps {
  data?: ServiceDetailsData;
  serviceTitle?: string;
}

export default function ServiceDetailsView({
  data,
  serviceTitle,
}: ServiceDetailsProps) {
  data = data ?? site.serviceDetails.services[0].detailData;

  const {
    badge,
    title,
    description,
    quickBenefits,
    gallery,
    benefitsSection,
    whatsIncluded,
    processSection,
    ctaBanner,
  } = data;

  return (
    <div className="w-full bg-[#FDFCFE] font-sans text-[#1E1B4B]">
      {/* Dynamic Header Banner */}
      <Banner
        image="/dogs/dog8.jpg"
        title={serviceTitle || "Services"}
        current={serviceTitle || "Services"}
      />

      <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        {/* SECTION 1: ABOUT SERVICE HERO & GALLERY */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-stretch">
          {/* Left Column: Image Collage */}
          <ScrollReveal direction="right" className="lg:col-span-6 grid grid-cols-12 gap-4 h-full">
            {/* Main Featured Image with Badge */}
            <div className="col-span-7 relative min-h-[380px] sm:min-h-[460px] h-full rounded-[28px] overflow-hidden shadow-sm">
              <Image
                src={gallery.mainImage}
                alt={title}
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover"
                priority
              />
              {/* Bottom Purple Pill Badge */}
              <div className="absolute bottom-0 hidden sm:flex left-0 right-4 bg-[#401a7c] text-white rounded-l-2xl rounded-r-[40px] mr-[20%] py-5 px-5 opacity-80  items-center gap-3.5 shadow-xl">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                  <FaPaw className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-[15px] font-extrabold leading-tight">
                    {gallery.badgeText}
                  </p>
                  <p className="text-[12px] text-purple-200 mt-0.5">
                    {gallery.badgeSubtext}
                  </p>
                </div>
              </div>
            </div>

            {/* Side 3 Stacked Images */}
            <div className="col-span-5 flex flex-col justify-between gap-3 h-full">
              {gallery.sideImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-[120px] sm:h-[142px] w-full rounded-[20px] overflow-hidden shadow-sm"
                >
                  <Image
                    src={img}
                    alt={`Service detail ${idx + 1}`}
                    fill
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Column: Title & Text */}
          <ScrollReveal direction="left" className="lg:col-span-6 flex flex-col justify-center">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 mb-3 mx-auto sm:mx-0">
              <span className="h-[2px] w-8 bg-[#5B21B6]" />
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#5B21B6]">
                {badge}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-center sm:text-left text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1E1B4B] leading-[1.2]">
              {title}
            </h2>

            {/* Paragraphs */}
            <div className="mt-5 space-y-4 text-[15px] sm:text-[16px] leading-relaxed text-[#64748B]">
              {description.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* 2x2 Quick Benefits List */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(quickBenefits as ServiceDetailsQuickBenefit[]).map((item) => (
                <div key={item.id} className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#F3E8FF]">
                    <FaPaw className="h-6 w-6 text-[#5B21B6]" />
                  </div>
                  <span className="text-[14.5px] font-semibold text-[#334155]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* SECTION 2: BENEFITS & WHAT'S INCLUDED */}
        <div className="mt-10  grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Benefits Grid */}
          <ScrollReveal direction="right" className="lg:col-span-7 bg-[#FBF7FF] rounded-[28px] p-6 border border-[#F3E8FF] flex flex-col justify-between">
            <div className="inline-flex items-center gap-2 mb-0">
              <span className="h-[2px] w-8 bg-[#5B21B6]" />
              <h3 className="sm:text-2xl text-xl font-bold text-[#5B21B6]">
                {benefitsSection.title}
              </h3>
            </div>

            <div className="grid grid-cols-1  sm:grid-cols-2 gap-8 mt-8 md:mt-0">
              {(benefitsSection.items as ServiceDetailsBenefitItem[]).map(
                (item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="flex h-12 sm:w-20 sm:h-20 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#F3E8FF]">
                      {renderBenefitIcon(item.icon)}
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-[#1E1B4B]">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-[13.5px] text-[#64748B] leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </ScrollReveal>

          {/* What's Included Card */}
          <ScrollReveal direction="left" className="lg:col-span-5 bg-white rounded-[28px] sm:p-6 p-3 border border-[#F3E8FF] shadow-[0_10px_35px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <h3 className="text-2xl font-extrabold text-[#1E1B4B] mb-6">
              {whatsIncluded.title}
            </h3>

            <ul className="space-y-2 my-auto">
              {whatsIncluded.list.map((inc, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3.5 text-[14.5px] font-medium text-[#475569] pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <FaPaw className="h-4 w-4 text-[#5B21B6] flex-shrink-0" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        {/* SECTION 3: PROCESS */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-8">
            <span className="h-[2px] w-10 bg-[#5B21B6]" />
            <FaPaw className="h-4 w-4 text-[#5B21B6]" />
            <h3 className="text-xl pt-5 sm:pt-0 sm:text-3xl lg:text-4xl font-extrabold text-[#1E1B4B]">
              {processSection.title}
            </h3>
            <FaPaw className="h-4 w-4 text-[#5B21B6]" />
            <span className="h-[2px] w-10 bg-[#5B21B6]" />
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {/* Dashed Connecting Line */}
            <div className="hidden lg:block absolute top-9 left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-purple-200 z-0" />

            {(processSection.steps as ServiceDetailsProcessStep[]).map((st, index) => (
              <ScrollReveal key={st.step} direction="up" staggerChildren={0.1} index={index} className="h-full">
              <div
                className="relative z-10 flex flex-col items-center text-center px-2"
              >
                <div className="flex h-18 w-18 h-[72px] w-[72px] items-center justify-center rounded-full bg-[#5B21B6] shadow-lg border-4 border-white mb-5">
                  {renderProcessIcon(st.icon)}
                </div>
                <span className="text-[16px] font-bold text-[#5B21B6] uppercase tracking-wider">
                  {st.step}
                </span>
                <h4 className="text-xl font-bold text-[#1E1B4B] mt-1">
                  {st.title}
                </h4>
                <p className="mt-2.5 text-[14px] text-[#64748B] leading-relaxed max-w-[200px]">
                  {st.description}
                </p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* SECTION 4: CTA BANNER */}
        <ScrollReveal direction="up">
        <div className="mt-10 relative bg-[#F6EEFF] rounded-[32px] p-6 sm:p-10 overflow-hidden flex flex-col lg:flex-row items-center justify-between sm:gap-8 gap-0">
          {/* Paw Watermarks */}
          <div className="absolute -left-8 -bottom-8 opacity-[0.08] pointer-events-none">
            <FaPaw className="h-44 w-44 text-[#5B21B6]" />
          </div>
          <div className="absolute right-8 top-2 opacity-[0.05] pointer-events-none">
            <FaPaw className="h-32 w-32 text-[#5B21B6]" />
          </div>

          {/* Left Text & Calendar Icon */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 relative z-10 w-full md:max-w-[600px] text-center sm:text-left">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-white shadow-lg">
              <FaCalendarDays className="h-9 w-9" />
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E1B4B] leading-tight">
                {ctaBanner.title}
              </h3>
              <p className="mt-2 sm:max-w-[300px] md:max-w-full min-h-12 text-[15px] sm:text-[16px] text-[#64748B]">
                {ctaBanner.subtitle}
              </p>
            </div>
          </div>

          {/* Right Cutout Dog Image - Mobile (below content, centered) */}
          <div className="relative z-10  flex sm:hidden h-[100px] w-full items-end justify-center">
            <Image
              src={ctaBanner.image || "/dogs/dog1.jpg"}
              alt="Pamper Your Pet"
              fill
              sizes="(max-width: 640px) 100vw, 400px"
              className="object-contain object-bottom"
            />
          </div>

          {/* Right Cutout Dog Image - Tab & Desktop */}
          <div className="hidden sm:flex absolute bottom-0 md:right-[7%] right-0 z-20 w-[300px] md:w-[600px] h-[220px] md:h-[280px]  items-end justify-center">
            <Image
              src={ctaBanner.image || "/dogs/dog1.jpg"}
              alt="Pamper Your Pet"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-contain object-bottom"
            />
          </div>
        </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
