"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaPaw,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaHeadphones,
} from "react-icons/fa";
import Banner from "../../shared/BannerPage";
import CtaBanner from "../../shared/CtaBanner";
import SectionHeader from "../../shared/SectionHeader";
import ScrollReveal from "../../shared/ScrollReveal";
import { ContactPageVariant } from "@/type/typeSection";

interface ContactProps {
  data: ContactPageVariant;
}

export default function Contact({ data }: ContactProps) {
  const contactData = data;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const getInfoIcon = (iconType: string) => {
    switch (iconType) {
      case "phone":
        return <FaPhoneAlt className="h-6 w-6 sm:w-10 sm:h-10 text-[#5B21B6]" />;
      case "location":
        return <FaMapMarkerAlt className="h-6 w-6 sm:w-10 sm:h-10 text-[#5B21B6]" />;
      case "email":
        return <FaEnvelope className="h-6 w-6 sm:w-10 sm:h-10 text-[#5B21B6]" />;
      case "clock":
        return <FaClock className="h-6 w-6 sm:w-10 sm:h-10 text-[#5B21B6]" />;
      default:
        return <FaPaw className="h-6 w-6 sm:w-10 sm:h-10 text-[#5B21B6]" />;
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <FaFacebookF className="h-3.5 w-3.5" />;
      case "twitter":
        return <FaTwitter className="h-3.5 w-3.5" />;
      case "instagram":
        return <FaInstagram className="h-3.5 w-3.5" />;
      case "whatsapp":
        return <FaWhatsapp className="h-3.5 w-3.5" />;
      case "youtube":
        return <FaYoutube className="h-3.5 w-3.5" />;
      default:
        return <FaPaw className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="w-full bg-[#FAFAFC] font-sans text-[#1E1B4B]">
      <Banner
        image={contactData.banner.backgroundImage}
        title={contactData.banner.title}
        homeHref={contactData.banner.homeHref}
        current={contactData.banner.breadcrumbCurrent}
      />

      <div className="mx-auto max-w-[1240px] px-4  sm:px-6 lg:px-8 py-12 space-y-12">
        <SectionHeader
          badge={contactData.badge}
          title={contactData.heading}
          description={contactData.description}
          className="relative mx-auto max-w-2xl"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT: Info Cards */}
          <ScrollReveal
            direction="right"
            className="lg:col-span-5 flex flex-col justify-between space-y-2"
          >
            <div className="space-y-2 flex-1 flex flex-col justify-between">
              {contactData.infoCards.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-[20px] bg-white p-5 border border-gray-100/80 shadow-xs transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex h-14 w-14 sm:w-20 sm:h-20 shrink-0 items-center justify-center rounded-full bg-[#F3F0FF] text-[#5B21B6]">
                    {getInfoIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-extrabold text-[#5B21B6]">
                      {item.title}
                    </h4>
                    <p className="text-[14px] font-bold text-[#1E1B4B] mt-0.5">
                      {item.value}
                    </p>
                    {item.subtext && (
                      <p className="text-[12px] text-[#64748B] mt-0.5">
                        {item.subtext}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons Strip */}
            <div className="pt-2">
              <span className="text-[13px] font-extrabold text-[#1E1B4B] block mb-3">
                Follow Us
              </span>
              <div className="flex items-center gap-2.5">
                {contactData.socials.map((soc, idx) => (
                  <Link
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.platform}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5B21B6] text-white hover:bg-[#4C1D95] transition-all hover:-translate-y-0.5 shadow-xs"
                  >
                    {getSocialIcon(soc.platform)}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: Send Message Form */}
          <ScrollReveal
            direction="left"
            className="lg:col-span-7 flex flex-col"
          >
            <div className="h-full w-full rounded-[28px] bg-[#F8F6FE] p-6 sm:p-8 border border-purple-100/60 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#1E1B4B] mb-1">
                  {contactData.form.title}
                </h3>
                <p className="text-[13px] text-[#64748B] mb-6 leading-relaxed">
                  {contactData.form.subtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name*"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-white px-4 py-5 text-[15px] text-[#1E1B4B] placeholder:text-[#94A3B8] border border-transparent focus:border-[#5B21B6] focus:bg-white focus:outline-hidden transition-all shadow-2xs"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your Email*"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-white px-4 py-5 text-[15px] text-[#1E1B4B] placeholder:text-[#94A3B8] border border-transparent focus:border-[#5B21B6] focus:bg-white focus:outline-hidden transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="Subject*"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-white px-4 py-5 text-[15px] text-[#1E1B4B] placeholder:text-[#94A3B8] border border-transparent focus:border-[#5B21B6] focus:bg-white focus:outline-hidden transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Your Message*"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-white px-4 py-5 text-[15px] text-[#1E1B4B] placeholder:text-[#94A3B8] border border-transparent focus:border-[#5B21B6] focus:bg-white focus:outline-hidden transition-all shadow-2xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#5B21B6] px-7 py-5 text-[17px] font-semmibold text-white shadow-sm hover:bg-[#4C1D95] transition-all hover:-translate-y-0.5 cursor-pointer mt-2"
                  >
                    <span>{contactData.form.submitButtonText}</span>
                    <FaPaw className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up">
          <div className="w-full overflow-hidden rounded-[28px] border border-gray-200/80 shadow-xs h-[320px] sm:h-[400px]">
            <iframe
              src={contactData.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
            />
          </div>
        </ScrollReveal>

        <CtaBanner
          items={[
            {
              icon: <FaHeadphones className="h-7 w-7" />,
              title: contactData.immediateAssistance.title,
              subtitle: contactData.immediateAssistance.subtitle,
              action: {
                text: contactData.immediateAssistance.phone,
                href: `tel:${contactData.immediateAssistance.phone}`,
              },
            },
          ]}
        />
      </div>
    </div>
  );
}