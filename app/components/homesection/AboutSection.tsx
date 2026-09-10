"use client";

import React, { ElementType, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

import type {
  PetAboutSectionData,
  PetAboutFeatureItem,
  PetAboutStat,
} from "@/type/typeSection";

import {
  ShieldCheck,
  HeartPulse,
  PlusSquare,
  CalendarDays,
  Users,
  PawPrint,
  Heart,
} from "lucide-react";
import { FaPaw } from "react-icons/fa";
import { LiaAwardSolid } from "react-icons/lia";
import ScrollReveal from "../shared/ScrollReveal";
import { FaRocketchat } from "react-icons/fa6";

const featureIconMap: Record<string, ElementType> = {
  shield: ShieldCheck,
  heart: HeartPulse,
  plus: PlusSquare,
};

const statsIconMap: Record<string, ElementType> = {
  calendar: CalendarDays,
  users: Users,
  chat: FaRocketchat,
  badgecheck: LiaAwardSolid,
};

interface AboutSectionProps {
  data: PetAboutSectionData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const {
    badge,
    title,
    highlightedTitle,
    desc,
    features,
    button,
    sideImage,
    statBadge,
    stats,
  } = data || {};

  const statsRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [statsInView, setStatsInView] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const element = statsRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!statsInView || !stats?.length) return;

    const numericValues = stats.reduce<Record<string, number>>((acc, stat) => {
      acc[stat.id] =
        parseInt(String(stat.number).replace(/[^0-9]/g, ""), 10) || 0;

      return acc;
    }, {});

    const duration = 2200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const nextCounts = Object.entries(numericValues).reduce<
        Record<string, number>
      >((acc, [id, value]) => {
        acc[id] = Math.floor(value * easedProgress);
        return acc;
      }, {});

      setCounts(nextCounts);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [statsInView, stats]);

  return (
    <section className="w-full overflow-hidden bg-[#001D4C] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-10 lg:py-[70px]">
      <div className="mx-auto max-w-[1250px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-8 xl:gap-12">
          {/* LEFT CONTENT - stays on top on mobile/tablet */}
          <ScrollReveal direction="right" className="order-1 lg:order-1">
            {badge && (
              <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
                <FaPaw className="h-8 w-8 fill-[#A23BD1] text-[#A23BD1]" />

                <span className="text-[13px] sm:text-[18px] font-bold uppercase tracking-wide text-[#A970E8]">
                  {badge}
                  <div className="h-[2px] mt-2 w-[85px] bg-[#A23BD1]" />
                </span>
              </div>
            )}
            <h2 className="max-w-[590px] text-center text-[40px] font-extrabold leading-[1.08] tracking-tight sm:text-[48px] lg:text-left lg:text-[52px] xl:text-[56px]">
              {title}
              <br />
              <span className="bg-[#A23BD1] bg-clip-text text-transparent">
                {highlightedTitle}
              </span>
            </h2>

            <div className="mt-5 mb-4 flex items-center justify-center lg:justify-start">
              <div className="h-px w-[145px] bg-[#A23BD1]" />
              <FaPaw className="mx-2 h-6 w-6 fill-[#A23BD1] text-[#A23BD1]" />
              <div className="h-px w-[145px] bg-[#A23BD1]/30" />
            </div>

            {desc && (
              <p className="max-w-[500px] text-center text-[15px] font-semibold leading-[1.65] text-[#D7DCE7] sm:text-[15.5px] lg:text-left">
                {desc}
              </p>
            )}
            {features?.length ? (
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3">
                {features.map((feature: PetAboutFeatureItem, index: number) => {
                  const Icon =
                    featureIconMap[feature.iconName.toLowerCase()] ||
                    ShieldCheck;

                  return (
                    <div
                      key={feature.id}
                      className={`min-h-[118px] flex flex-col items-center text-center ${
                        index > 0
                          ? "border-t border-white/15 pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0"
                          : ""
                      } ${
                        index < features.length - 1
                          ? "pb-5 sm:pr-5 sm:pb-0"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="mb-2 flex h-10 w-10 items-center justify-center text-[#A23BD1] sm:h-20 sm:w-20">
                          <Icon
                            className="h-9 w-9 sm:h-14 sm:w-14"
                            strokeWidth={1.5}
                          />
                        </div>

                        <h4 className="text-[15px] font-bold sm:text-[16px]">
                          {feature.title}
                        </h4>

                        <p className="mt-1 max-w-[145px] text-[14px] font-medium leading-[1.45] text-[#C9CEDA]">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {button && (
              <div className="mt-7">
                <Link
                  href={button.href}
                  className="inline-flex h-[42px] items-center gap-3 rounded-[10px] bg-gradient-to-r from-[#7132C5] to-[#A53CCB] px-8 text-[13px] sm:text-[16px] font-bold uppercase tracking-wide shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {button.label}
                  <MoveRight className="h-5 w-5" />
                </Link>
              </div>
            )}
          </ScrollReveal>

          {/* RIGHT SIDE GRAPHICS & IMAGE - below content on mobile/tablet */}
          <ScrollReveal
            direction="left"
            className="order-2 flex justify-center lg:order-2 lg:justify-end"
          >
            <div className="relative flex h-[340px] w-[340px] items-center justify-center sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px] xl:h-[480px] xl:w-[480px]">
              {/* Outer dashed circle (top-left accent like reference) */}
              <div className="absolute -left-3 -top-3 h-[70%] w-[70%] rounded-full border-[2.5px] border-dashed border-[#A946D3]/70 sm:left-5 sm:top-4" />

              {/* Middle/inner solid purple ring */}
              <div className="absolute inset-[12px] rounded-full border-[4px] border-[#8128C1]/90 sm:inset-[14px]" />

              {/* Central Image Mask */}
              <div className="absolute inset-[22px] z-10 overflow-hidden rounded-full sm:inset-[26px]">
                {sideImage && (
                  <Image
                    src={sideImage.src}
                    alt={sideImage.alt}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 430px"
                    className="object-cover object-center"
                    priority
                  />
                )}
              </div>
              {statBadge && (
                <div className="absolute -bottom-1 -right-1 z-30 flex h-[105px] w-[105px] flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_12px_28px_rgba(0,0,0,0.28)] sm:bottom-0 sm:right-0 sm:h-[125px] sm:w-[125px]">
                  <Heart
                    className="mb-0.5 h-5 w-5 text-[#8128C1] sm:h-6 sm:w-6"
                    strokeWidth={2}
                    fill="#8128C1"
                  />

                  <span className="text-[20px] font-black leading-none text-[#5B1A93] sm:text-[24px]">
                    {statBadge.number}
                  </span>

                  <span className="mt-0.5 max-w-[80px] whitespace-pre-line text-center text-[10px] font-bold leading-[1.15] text-[#17214A] sm:max-w-[90px] sm:text-[12px]">
                    {statBadge.label}
                  </span>
                </div>
              )}
              <div className="absolute -right-[28px] top-[38%] z-20 sm:-right-[40px] lg:-right-[48px]">
                <PawPrint
                  className="h-[70px] w-[70px] text-[#8128C1]/75 sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px]"
                  strokeWidth={1.1}
                  fill="none"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* BOTTOM STATS ROW */}
        {stats?.length ? (
          <ScrollReveal direction="up">
            <div
              ref={statsRef}
              className="mt-12 rounded-[17px] border border-white/5 bg-[#06255B]/80 px-0 py-5 sm:px-6 lg:mt-14 lg:px-7 lg:py-6"
            >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat: PetAboutStat, index: number) => {
                const Icon = statsIconMap[stat.iconName.toLowerCase()] || Users;

                return (
                  <div
                    key={stat.id}
                    className={`flex items-center gap-1 px-2 sm:gap-4 sm:px-5 lg:px-6 ${
                      index >= 2 ? "mt-7 md:mt-0" : ""
                    } ${index % 2 !== 0 ? "border-l border-white/10" : ""} ${
                      index > 0 ? "md:border-l md:border-white/10" : ""
                    }`}
                  >
                    <div className="flex sm:h-[48px] sm:w-[48px] shrink-0 items-center justify-center text-[#A23BD1] sm:h-[54px] sm:w-[54px]">
                      <Icon
                        className="h-7 w-7 sm:h-11 sm:w-11"
                        strokeWidth={1.4}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-baseline">
                        <span className="sm:text-[25px] text-[20px] font-bold leading-none text-white sm:text-[28px] lg:text-[30px]">
                          {statsInView
                            ? (counts[stat.id] ?? 0).toLocaleString()
                            : "0"}
                        </span>

                        {stat.suffix && (
                          <span className="ml-0.5 sm:text-[25px] text-[18px] font-bold leading-none text-white sm:text-[28px] lg:text-[30px]">
                            {stat.suffix}
                          </span>
                        )}
                      </div>

                      <span className="mt-1 block whitespace-nowrap text-[10px] font-medium leading-tight text-[#D3D8E4] sm:text-[11px] lg:text-[12px]">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
          </ScrollReveal>
        ) : null}
      </div>
    </section>
  );
}
