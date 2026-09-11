"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MoveRight,
  Phone,
  Plus,
  Minus,
  PawPrint,
  ChevronDown,
  Shield,
} from "lucide-react";
import { FaPaw } from "react-icons/fa";
import SectionHeader from "../shared/SectionHeader";
import ScrollReveal from "../shared/ScrollReveal";
import { site, type PetFaqData } from "@/data";

interface FaqSectionProps {
  data?: PetFaqData;
}

export default function FaqSection({ data }: FaqSectionProps) {
  const faqData = data ?? site.faq;
  const {
    badge,
    title,
    description,
    faqs = [],
    sideImage,
    sideBubble,
    sideBadge,
    contactCta,
  } = faqData;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full overflow-hidden bg-[#FAFAFC] py-8 md:py-12">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <ScrollReveal direction="right" className="lg:col-span-6 xl:col-span-7">
            <SectionHeader badge={badge} title={title} description={description} align="left" />

            {/* FAQ Accordion */}
            {faqs.length > 0 && (
              <div className="flex w-full md:w-[90%] flex-col gap-3">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={index}
                      className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                        isOpen
                          ? "border-[#E9D5FF] shadow-[0_8px_24px_rgba(124,58,237,0.08)]"
                          : "border-[#F1F5F9] shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                      }`}
                    >
                      {/* Question Row */}
                      <button
                        onClick={() => toggleFaq(index)}
                        className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left sm:gap-4 sm:px-6 sm:py-5"
                        aria-expanded={isOpen}
                      >
                        {/* Left + / − icon */}
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                            isOpen
                              ? "bg-[#7C3AED] text-white"
                              : "bg-[#F3E8FF] text-[#7C3AED]"
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                          ) : (
                            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                          )}
                        </div>

                        {/* Question text */}
                        <span className="flex-1 text-[15px] font-semibold text-[#1E1B4B] sm:text-[16px]">
                          {faq.question}
                        </span>

                        {/* Right chevron */}
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-[#94A3B8] transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Answer */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 pl-[52px] text-[14px] leading-[1.65] text-[#64748B] sm:px-6 sm:pb-6 sm:pl-[60px] sm:text-[15px]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom CTAs */}
            {contactCta && (
              <div className="mt-4  w-full flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                {/* Still Have Questions button */}
                <Link
                  href={contactCta.phoneHref || "#"}
                  className="flex h-[52px] w-[60%] border items-center justify-center gap-2.5 rounded-xl bg-[#1E1B4B] px-1 text-[14px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <p className="text-md md:text-lg font-semibold">
                    {contactCta.title}
                  </p>
                  <div className="h-6 w-6 bg-white p-1 rounded-lg flex items-center">
                    <MoveRight className="h-4 w-4 text-[#1E1B4B]" />
                  </div>
                </Link>

                {/* Phone block */}
                {contactCta.phone && (
                  <div className="flex w-full items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white">
                      <Phone className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-medium text-[#64748B]">
                        {contactCta.phoneLabel}
                      </span>
                      <a
                        href={contactCta.phoneHref || `tel:${contactCta.phone}`}
                        className="text-[15px] font-bold text-[#1E1B4B] hover:text-[#7C3AED]"
                      >
                        {contactCta.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal
            direction="left"
            className="relative flex justify-center lg:col-span-6 -mt-32 md:mt-28 xl:col-span-5 lg:justify-end"
          >
            <div className="relative h-[420px] w-full max-w-[420px] sm:h-[480px] sm:max-w-[460px] lg:h-[520px] lg:max-w-[500px]">
              {/* Purple Arch Background */}
              <div className="absolute bottom-0 left-1/2 md:h-[110%] h-[70%] w-[70%] -translate-x-1/2 overflow-hidden rounded-tl-4xl rounded-tr-[60px] bg-[#3b3588]">
                {/* Decorative paw prints inside the arch */}
                <FaPaw
                  className="absolute left-[5%] bottom-[28%] h-10 w-10 rotate-[-20deg] text-white/15"
                  strokeWidth={1.5}
                />
                <FaPaw
                  className="absolute right-[14%] top-[38%] h-10 w-10 rotate-[15deg] text-white/12"
                  strokeWidth={1.5}
                />
                <FaPaw
                  className="absolute bottom-[22%] left-[18%] h-10 w-10 rotate-[-10deg] text-white/10"
                  strokeWidth={1.5}
                />
              </div>

              {/* Dog Image */}
              {sideImage && (
                <div className="absolute bottom-0 top-0 sm:top-20 md:-top-20 left-1/2 z-10 h-[120%] md:h-[140%] md:w-[140%] w-[120%] -translate-x-1/2">
                  <Image
                    src={sideImage.src}
                    alt={sideImage.alt || "Happy golden retriever"}
                    fill
                    sizes="(max-width: 640px) 360px, 440px"
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
              )}

              {/* Speech Bubble */}
              {sideBubble && (
                <div className="absolute right-0 top-[48%] z-20 max-w-[150px] sm:right-[-8px] sm:max-w-[160px]">
                  {/* Question mark circle */}
                  <div className="absolute left-[30%] -top-10 border-4 border-white z-20 flex h-12 w-12 items-center justify-center rounded-full bg-[#37336b] text-[16px] font-bold text-white shadow-md">
                    <p className="text-3xl">?</p>
                  </div>

                  <div className="relative rounded-2xl rounded-tl-none bg-white px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                    <p className="text-[13px] font-medium leading-[1.45] text-[#37336b]">
                      {sideBubble}
                    </p>
                    {/* Speech bubble tail */}
                    <div className="absolute -left-2 top-4 h-0 w-0 border-b-[8px] border-r-[10px] border-t-[8px] border-b-transparent border-r-white border-t-transparent" />
                  </div>
                </div>
              )}

              {/* Trusted Care Badge */}
              {sideBadge && (
                <div className="absolute bottom-6 left-0 z-20 flex max-w-[220px] items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.12)] sm:bottom-8 sm:left-[-10px] sm:max-w-[240px]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#37336b]">
                    <Shield className="h-7 w-7 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[#1E1B4B]">
                      {sideBadge.title}
                    </p>
                    <p className="text-[13px] font-medium leading-[1.45] text-[#37336b]">
                      {sideBadge.desc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
