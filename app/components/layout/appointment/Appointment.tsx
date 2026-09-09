"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaPaw,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaChevronDown,
  FaRegEdit,
  FaShieldAlt,
} from "react-icons/fa";
import Banner from "../../shared/BannerPage";
import { PetAppointmentVariant } from "@/type/typeSection";

interface AppointmentProps {
  data: PetAppointmentVariant;
}

export default function Appointment({ data }: AppointmentProps) {
  const appointmentData = data;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <div className="w-full bg-[#FAFAFC] font-sans text-[#1E1B4B]">
      <Banner
        image={appointmentData.banner.backgroundImage}
        title={appointmentData.banner.title}
        homeHref={appointmentData.banner.homeHref}
        current={appointmentData.banner.breadcrumbCurrent}
      />

      <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Card Component */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="h-full w-full rounded-[28px] bg-[#F8F6FE] overflow-hidden border border-purple-100/60 shadow-xs flex flex-col text-center lg:text-left">
              {/* Image Section with Overlay Icon */}
              <div className="relative w-full h-[260px] sm:h-[300px] shrink-0">
                <Image
                  src={appointmentData.card.image}
                  alt={appointmentData.card.title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-[#5B21B6] text-white shadow-md border-4 border-[#F8F6FE]">
                  <FaPaw className="h-5 w-5" />
                </div>
              </div>

              {/* Text & Features Section */}
              <div className="p-2 sm:p-8 pt-10 flex-1 flex flex-col justify-between items-center lg:items-start">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B4B] leading-snug text-center">
                    {appointmentData.card.title}{" "}
                    <span className="block text-[#1E1B4B]">
                      {appointmentData.card.highlightTitle}
                    </span>
                  </h3>

                  <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-[#64748B] text-center">
                    {appointmentData.card.description}
                  </p>
                </div>

                {/* 2x2 Feature Icons Grid */}
                <div className="mt-8 grid grid-cols-2 gap-y-6 gap-x-6 w-full relative">
                  {/* Vertical Divider Line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-purple-200/60 -translate-x-1/2 pointer-events-none" />

                  {appointmentData.card.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 relative pb-5 ${
                        idx < 2 ? "border-b border-purple-200/60" : ""
                      }`}
                    >
                      {/* Icon Circle */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EFEAFE] text-[#5B21B6] shadow-xs">
                        <FaPaw className="h-5 w-5" />
                      </div>

                      {/* Feature Title */}
                      <span className="text-[13px] sm:text-[14px] font-extrabold text-[#1E1B4B] leading-tight text-left">
                        {feature.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Booking Form & Notice Container */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="h-full w-full rounded-[28px] bg-white p-3 sm:p-8 md:p-10 border border-gray-100 shadow-xs flex flex-col justify-between">
              <div>
                {/* Section Badge */}
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-extrabold uppercase tracking-widest text-[#5B21B6] mb-2">
                  <FaPaw className="h-3.5 w-3.5" />
                  <span>{appointmentData.badge}</span>
                </div>

                {/* Section Heading */}
                <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#1E1B4B] leading-tight text-center lg:text-left">
                  {appointmentData.heading.normal}{" "}
                  <span className="text-[#5B21B6] block sm:inline">
                    {appointmentData.heading.highlighted}
                  </span>
                </h2>

                <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-[#64748B] text-center lg:text-left mb-8">
                  {appointmentData.description}
                </p>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-[#5B21B6] pointer-events-none">
                        <FaUser className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full rounded-2xl bg-[#FAFAFC] pl-11 pr-4 py-3.5 text-[13px] text-[#1E1B4B] placeholder:text-[#94A3B8] border border-gray-200/80 focus:border-[#5B21B6] focus:bg-white focus:outline-hidden transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-[#5B21B6] pointer-events-none">
                        <FaEnvelope className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-2xl bg-[#FAFAFC] pl-11 pr-4 py-3.5 text-[13px] text-[#1E1B4B] placeholder:text-[#94A3B8] border border-gray-200/80 focus:border-[#5B21B6] focus:bg-white focus:outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-[#5B21B6] pointer-events-none">
                        <FaPhoneAlt className="h-4 w-4" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-2xl bg-[#FAFAFC] pl-11 pr-4 py-3.5 text-[13px] text-[#1E1B4B] placeholder:text-[#94A3B8] border border-gray-200/80 focus:border-[#5B21B6] focus:bg-white focus:outline-hidden transition-all"
                      />
                    </div>

                    {/* Select Service Dropdown */}
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-[#5B21B6] pointer-events-none">
                        <FaPaw className="h-4 w-4" />
                      </div>
                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-2xl bg-[#FAFAFC] pl-11 pr-10 py-3.5 text-[13px] text-[#1E1B4B] border border-gray-200/80 focus:border-[#5B21B6] focus:bg-white focus:outline-hidden transition-all"
                      >
                        {appointmentData.form.serviceOptions.map((opt, idx) => (
                          <option key={idx} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 text-gray-400 pointer-events-none">
                        <FaChevronDown className="h-3 w-3" />
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative flex items-start">
                    <div className="absolute left-4 top-4 text-[#5B21B6] pointer-events-none">
                      <FaRegEdit className="h-4 w-4" />
                    </div>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-[#FAFAFC] pl-11 pr-4 py-3.5 text-[13px] text-[#1E1B4B] placeholder:text-[#94A3B8] border border-gray-200/80 focus:border-[#5B21B6] focus:bg-white focus:outline-hidden transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#5B21B6] py-4 text-[14px] font-bold text-white shadow-md hover:bg-[#4C1D95] transition-all cursor-pointer mt-2"
                  >
                    <FaPaw className="h-4 w-4" />
                    <span>{appointmentData.form.submitButtonText}</span>
                  </button>
                </form>
              </div>

              {/* Bottom Combined Priority Notice Card */}
              <div className="mt-6 rounded-[20px] bg-[#F8F6FE] p-5 sm:p-6 border border-purple-100/60 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 text-left">
                {/* Left Section: Priority Shield Note */}
                <div className="flex items-center gap-3.5 w-full sm:w-1/2">
                  {/* Solid Purple Shield Icon Circle */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-white shadow-xs">
                    <FaShieldAlt className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-[14px] font-extrabold text-[#1E1B4B] leading-tight">
                      {appointmentData.bottomNotice.priorityTitle}
                    </h5>
                    <p className="text-[12px] text-[#64748B] mt-1 leading-snug">
                      {appointmentData.bottomNotice.prioritySubtitle}
                    </p>
                  </div>
                </div>

                {/* Dotted Vertical Divider for Desktop / Horizontal Divider for Mobile */}
                <div className="w-full h-[1px] sm:w-[1px] sm:h-12 border-t sm:border-t-0 sm:border-l border-dashed border-purple-300/70" />

                {/* Right Section: Immediate Phone Assistance */}
                <div className="flex items-center gap-3.5 w-full sm:w-1/2 sm:pl-2">
                  {/* Light Outlined Phone Icon Circle */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EFEAFE] text-[#5B21B6] border border-purple-200/50 shadow-xs">
                    <FaPhoneAlt className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-[#1E1B4B] block leading-tight">
                      {appointmentData.bottomNotice.phoneTitle}
                    </span>
                    <a
                      href={`tel:${appointmentData.bottomNotice.phoneNumber}`}
                      className="text-[16px] font-black text-[#5B21B6] hover:underline block leading-tight mt-0.5"
                    >
                      {appointmentData.bottomNotice.phoneNumber}
                    </a>
                    <span className="text-[11px] text-[#64748B] block mt-0.5">
                      {appointmentData.bottomNotice.phoneSubtext}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
