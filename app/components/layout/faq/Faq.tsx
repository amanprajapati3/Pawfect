"use client";

import React, { useState } from "react";
import {
  FaPlus,
  FaMinus,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import Banner from "../../shared/BannerPage";
import CtaBanner from "../../shared/CtaBanner";
import SectionHeader from "../../shared/SectionHeader";
import ScrollReveal from "../../shared/ScrollReveal";
import { PetFaqPageVariant } from "@/type/typeSection";

interface FaqProps {
  data: PetFaqPageVariant;
}

export default function Faq({ data }: FaqProps) {
  const faqData = data;
  const [openId, setOpenId] = useState<string>("1");

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="w-full bg-[#FAFAFC] font-sans text-[#1E1B4B]">
      <Banner
        image={faqData.banner.backgroundImage}
        title={faqData.banner.title}
        homeHref={faqData.banner.homeHref}
        current={faqData.banner.breadcrumbCurrent}
      />

      <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8 md:py-12 space-y-12">
        <SectionHeader
          badge={faqData.badge}
          title={faqData.heading}
          description={faqData.description}
          className="mx-auto max-w-2xl lg:mx-0"
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Accordion Items (Shows First on Mobile) */}
          <ScrollReveal
            direction="up"
            className="lg:col-span-8 space-y-4 flex flex-col justify-start"
          >
            {faqData.questions.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-[20px] bg-white border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#5B21B6] shadow-sm"
                      : "border-gray-100 hover:border-purple-200"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors"
                  >
                    <div className="flex items-center gap-4 pr-2">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-white text-[13px] font-bold">
                        {item.number}
                      </span>
                      <span className="text-[15px] sm:text-[16px] font-bold text-[#1E1B4B]">
                        {item.question}
                      </span>
                    </div>
                    <span className="shrink-0 text-[#5B21B6]">
                      {isOpen ? (
                        <FaMinus className="h-4 w-4" />
                      ) : (
                        <FaPlus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  {/* Expanded Content Box */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1">
                      <div className="rounded-[16px] bg-[#F8F6FE] p-4 text-[13px] sm:text-[14px] leading-relaxed text-[#64748B] flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[#5B21B6] shadow-xs">
                          <FaCalendarAlt className="h-3.5 w-3.5" />
                        </div>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </ScrollReveal>

          {/* RIGHT: Contact Information Side-Card */}
          <ScrollReveal
            direction="left"
            className="lg:col-span-4 flex flex-col"
          >
            <div className="h-full w-full md:rounded-[28px] md:bg-[#F8F6FE]  md:p-8 md:border md:border-purple-100/60 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-[#1E1B4B]">
                  {faqData.contactBox.title}
                </h3>
                <h4 className="text-2xl font-black text-[#5B21B6] mt-1 mb-6">
                  {faqData.contactBox.subtitle}
                </h4>

                <p className="text-[13px] pb-3 border-b-1 border-b-gray-200 text-[#64748B] mb-6 leading-relaxed">
                  Call us directly, submit a sample or email us!
                </p>

                <div className="space-y-6 ">
                  {/* Phone Item */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-white shadow-xs">
                      <FaPhoneAlt className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="text-[14px] font-bold text-[#1E1B4B]">
                        {faqData.contactBox.phone.label}
                      </h5>
                      <a
                        href={`tel:${faqData.contactBox.phone.value}`}
                        className="text-[14px] font-extrabold text-[#1E1B4B] hover:text-[#5B21B6] block transition-colors"
                      >
                        {faqData.contactBox.phone.value}
                      </a>
                      <p className="text-[12px] text-[#64748B] mt-0.5">
                        {faqData.contactBox.phone.subtext}
                      </p>
                    </div>
                  </div>

                  <hr className="border-purple-200/50" />

                  {/* Email Item */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-white shadow-xs">
                      <FaEnvelope className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="text-[14px] font-bold text-[#1E1B4B]">
                        {faqData.contactBox.email.label}
                      </h5>
                      <a
                        href={`mailto:${faqData.contactBox.email.value}`}
                        className="text-[14px] font-semibold text-[#64748B] hover:text-[#5B21B6] block transition-colors"
                      >
                        {faqData.contactBox.email.value}
                      </a>
                      <p className="text-[12px] text-[#64748B] mt-0.5">
                        {faqData.contactBox.email.subtext}
                      </p>
                    </div>
                  </div>

                  <hr className="border-purple-200/50" />

                  {/* Location Item */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-white shadow-xs">
                      <FaMapMarkerAlt className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="text-[14px] font-bold text-[#1E1B4B]">
                        {faqData.contactBox.location.label}
                      </h5>
                      <p className="text-[13px] text-[#64748B] leading-relaxed mt-0.5">
                        {faqData.contactBox.location.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <CtaBanner
          items={[
            {
              title: faqData.callout.title,
              subtitle: faqData.callout.subtitle,
              action: {
                text: faqData.callout.buttonText,
                href: faqData.callout.buttonHref,
              },
            },
          ]}
        />
      </div>
    </div>
  );
}