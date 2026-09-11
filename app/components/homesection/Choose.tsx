"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPaw,
  FaStethoscope,
  FaPlus,
  FaPhoneAlt,
  FaArrowUp,
} from "react-icons/fa";
import SectionHeader from "../shared/SectionHeader";
import ScrollReveal from "../shared/ScrollReveal";
import { site, type PetWhyChooseUsData } from "@/data";

interface ChooseSectionProps {
  data?: PetWhyChooseUsData;
}

// Fallback dynamic icon mapper
const renderIcon = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case "plus":
    case "facility":
    case "cross":
      return <FaPlus className="h-5 w-5 text-white" />;
    case "stethoscope":
    case "vet":
    default:
      return <FaStethoscope className="h-5 w-5 text-white" />;
  }
};

export default function ChooseSection({ data }: ChooseSectionProps) {
  const chooseData = data ?? site.whyChooseUs;
  // Safe extraction with default fallbacks
  const badge = chooseData.badge || "WHY CHOOSE US";
  const title = chooseData.title || {
    normal: "Trusted care,",
    highlighted: "tailored for every pet",
  };
  const description =
    chooseData.description ||
    "We're committed to delivering reliable care, expert guidance, and high-quality services that support your pet's health, comfort, and happiness at every stage of their life.";

  const mainImage =
    chooseData.images?.main ||
    "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=800&auto=format&fit=crop";
  const secondaryImage =
    chooseData.images?.secondary ||
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop";

  const statBadge = chooseData.statBadge || {
    number: "98%",
    label: "Pets Receive Personalized Care",
  };

  const features = chooseData.features?.length
    ? chooseData.features
    : [
        {
          id: "1",
          iconName: "stethoscope",
          title: "Expert Veterinarians",
          description:
            "Our certified team provides compassionate care and personalized attention.",
        },
        {
          id: "2",
          iconName: "plus",
          title: "Modern & Safe Facility",
          description:
            "Advanced tools and updated practices ensure safer, faster, and more effective treatment.",
        },
      ];

  const bulletPoints = chooseData.bulletPoints?.length
    ? chooseData.bulletPoints
    : [
        "Preventive care through early detection, timely vaccinations, and wellness plans.",
        "State-of-the-art technology to deliver accurate diagnosis and effective treatment.",
        "Customized care plans tailored to your pet's unique needs and lifestyle.",
      ];

  const button = chooseData.button || {
    label: "Discover More",
    href: "/about",
  };

  const phone = chooseData.phone || {
    label: "Call Us Anytime",
    number: "+1 (123) 456-7890",
    href: "tel:+11234567890",
  };

  return (
    <section className="w-full overflow-hidden bg-[#FAFAFC] py-8 md:py-12 font-sans">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-stretch">
          <ScrollReveal direction="right" className="lg:col-span-6 relative flex flex-col justify-between">
            {/* Main Outer Image Grid Container */}
            <div className="relative w-full max-w-[540px] mx-auto lg:max-w-none min-h-[480px] sm:min-h-[540px] lg:min-h-full">
              {/* Image 1: Top Left Main Image */}
              <div className="absolute top-0 left-0 w-[68%] h-[60%] sm:h-[62%] rounded-[28px] overflow-hidden shadow-sm">
                <Image
                  src={mainImage}
                  alt="Veterinarian caring for dog"
                  fill
                  sizes="(max-width: 1024px) 70vw, 35vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Purple Stat Card: Right of Top Image */}
              <div className="absolute top-[15%] border-b-white border-b-4 right-[20%] z-30 w-[38%] max-w-[140px] rounded-[24px] bg-[#5B34A3] p-4 text-white shadow-xl sm:p-5">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <FaPaw className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-2xl font-black leading-none sm:text-3xl">
                  {statBadge.number}
                </h4>
                <p className="mt-1.5 text-[11px] font-medium leading-tight text-white/90 sm:text-[12px]">
                  {statBadge.label}
                </p>
              </div>

              {/* Image 2: Overlapping Bottom Right Image */}
              <div className="absolute bottom-0 right-0 w-[66%] h-[58%] sm:h-[60%] rounded-[28px] overflow-hidden shadow-md z-20 border-[6px] border-[#FAFAFC]">
                <Image
                  src={secondaryImage}
                  alt="Veterinarian team examining dog"
                  fill
                  sizes="(max-width: 1024px) 70vw, 35vw"
                  className="object-cover"
                />
              </div>

              {/* Circular Badge: Left Bottom Overlay */}

              <div className="absolute left-[18%] bottom-[27%] z-30 flex h-[100px] w-[100px] sm:h-[115px] sm:w-[115px] items-center justify-center rounded-full bg-[#5B34A3] p-2 text-white shadow-xl">
                <div className="relative flex h-full w-full items-center justify-center">
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute h-full w-full overflow-visible"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>

                    <g>
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        dur="8s"
                        repeatCount="indefinite"
                      />

                      <text className="fill-white text-[10.5px] font-bold uppercase tracking-[1.8px]">
                        <textPath href="#circlePath" startOffset="0%">
                          • Care • Compassion • Commitment
                        </textPath>
                      </text>
                    </g>
                  </svg>

                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5B34A3]">
                    <span className="text-3xl">♥</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" className="lg:col-span-6 flex flex-col justify-between py-1">
            <div>
              <SectionHeader badge={badge} title={title} description={description} align="left" />

              {/* Feature Cards Grid (Vet & Facility) */}
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {features.map((item) => (
                  <div key={item.id} className="flex items-start gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5B34A3]">
                      {renderIcon(item.iconName)}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#100A26]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-snug text-[#64748B]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bullet Points Container */}
              <div className="mt-7 flex flex-col gap-3.5 rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/80">
                {bulletPoints.map((pt, idx) => (
                  <div key={idx} className="flex  gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EFE9FA]">
                      <FaPaw className="h-5 w-5 text-[#5B34A3]" />
                    </div>
                    <p className="text-[15px] font-medium leading-tight text-[#3F3F46]">
                      {pt}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions Row (CTA Button & Phone Number) */}
            <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8">
              {/* Button */}
              <Link
                href={button.href}
                className="inline-flex items-center gap-3 rounded-xl bg-[#0C1025] px-6 py-3.5 text-[14px] font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <span>{button.label}</span>
                <div className="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-white">
                  <FaArrowUp className="h-3 w-3 rotate-45" />
                </div>
              </Link>

              {/* Phone Action */}
              <div className="flex items-center gap-3">
                <a
                  href={phone.href}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5B34A3] text-white transition-transform hover:scale-105"
                  aria-label="Call phone number"
                >
                  <FaPhoneAlt className="h-4 w-4" />
                </a>
                <div className="flex flex-col">
                  <a
                    href={phone.href}
                    className="text-[16px] font-black text-[#100A26] hover:text-[#5B34A3]"
                  >
                    {phone.number}
                  </a>~
                  <span className="text-[12px] font-semibold text-[#71717A]">
                    {phone.label}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
