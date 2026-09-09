"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaPaw,
  FaPlus,
  FaMinus,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import Banner from "../../shared/BannerPage";
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
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#5B21B6] mb-2">
            <FaPaw className="h-3 w-3" />
            <span>{faqData.badge}</span>
            <FaPaw className="h-3 w-3" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black leading-tight text-[#1E1B4B] tracking-tight">
            {faqData.heading.normal}{" "}
            <span className="text-[#5B21B6]">
              {faqData.heading.highlighted}
            </span>
          </h2>

          <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#64748B]">
            {faqData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Accordion Items (Shows First on Mobile) */}
          <div className="lg:col-span-8 space-y-4 flex flex-col justify-start">
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
          </div>

          {/* RIGHT: Contact Information Side-Card */}
          <div className="lg:col-span-4 flex flex-col">
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
          </div>
        </div>

        <div className="rounded-[28px] bg-[#F8F6FE] p-6 sm:p-8 border border-purple-100/60 flex flex-col md:flex-row items-center justify-between gap-6 md:px-32">
          <div className="flex   items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-white shadow-md">
              <FaPaw className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1E1B4B]">
                {faqData.callout.title}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#64748B] mt-0.5">
                {faqData.callout.subtitle}
              </p>
            </div>
          </div>
<div className="hidden md:block h-16 w-px bg-purple-200" />

          <Link
            href={faqData.callout.buttonHref}
            className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-[#5B21B6] px-8 py-3.5 text-[14px] font-bold text-white shadow-sm hover:bg-[#4C1D95] transition-all hover:-translate-y-0.5"
          >
            <FaPaw className="h-4 w-4" />
            <span>{faqData.callout.buttonText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}