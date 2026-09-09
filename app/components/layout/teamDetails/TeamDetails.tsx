"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPaw,
  FaGraduationCap,
  FaAward,
  FaSmile,
} from "react-icons/fa";
import { LuHeartPulse } from "react-icons/lu";
import { TbMicroscope } from "react-icons/tb";
import { FaStethoscope } from "react-icons/fa";


import { PetTeamMemberDetail, PetTeamDetailsVariant } from "@/type/typeSection";
import Banner from "../../shared/BannerPage";

interface TeamDetailsProps {
  data: PetTeamMemberDetail;
  variant: PetTeamDetailsVariant;
}

export default function TeamDetails({ data, variant }: TeamDetailsProps) {
  const member = data;
  const teamDetails = variant;

  // Icon Resolver Helper
  const getInfoIcon = (iconType: string) => {
    switch (iconType) {
      case "education":
        return <FaGraduationCap className="h-5 sm:w-10 sm:h-10 w-5 text-[#5B21B6]" />;
      case "experience":
        return <FaAward className="h-5 w-5 sm:w-8 sm:h-8 text-[#5B21B6]" />;
      case "specialization":
        return <LuHeartPulse className="h-5 w-5 sm:w-8 sm:h-8 text-[#5B21B6]" />;
      case "languages":
      case "paw":
        return <FaPaw className="h-5 w-5 sm:w-8 sm:h-8 text-[#5B21B6]" />;
      default:
        return <FaPaw className="h-5 w-5 sm:w-8 sm:h-8 text-[#5B21B6]" />;
    }
  };

  const getExpertiseIcon = (iconType: string) => {
    switch (iconType) {
      case "stethoscope":
        return <FaStethoscope className="w-10 h-10 text-[#5B21B6]" />;
      case "heart":
        return <LuHeartPulse className="w-10 h-10 text-[#5B21B6]" />;
      case "microscope":
        return <TbMicroscope className="w-10 h-10 text-[#5B21B6]" />;
      case "paw":
          return <FaPaw className="w-10 h-10 text-[#5B21B6]" />;
    }
  };

  return (
    <div className="w-full bg-[#FAFAFC] font-sans text-[#1E1B4B]">
      <Banner
        image={teamDetails.banner.backgroundImage}
        title={teamDetails.banner.title}
        homeHref={teamDetails.banner.homeHref}
        current={teamDetails.banner.breadcrumbCurrent}
      />

      <div className="mx-auto max-w-[1240px] px-3 py-12 sm:px-6 lg:px-8 lg:py-16 space-y-12 sm:space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Member Portrait Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative h-[380px] sm:h-[460px] w-full max-w-[420px] overflow-hidden rounded-[28px] bg-slate-200 shadow-lg">
              <Image
                src={member.image}
                alt={`${member.name.first} ${member.name.last}`}
                fill
                priority
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Right: Member Bio & Quick Badges */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Badge Indicator */}
            <div className="inline-flex items-center gap-2 mb-2">
              <FaPaw className="h-4 w-4 text-[#5B21B6]" />
              <span className="text-[14px] font-bold uppercase tracking-widest text-[#1E1B4B]">
                {member.badge || "OUR TEAM"}
              </span>
              <span className="h-[2px] w-8 bg-[#5B21B6]" />
            </div>

            {/* Name & Role */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black leading-tight text-[#1E1B4B]">
              {member.name.first}{" "}
              <span className="text-[#5B21B6]">{member.name.last}</span>
            </h2>
            <p className="mt-1.5 text-base sm:text-lg font-bold text-[#5B21B6]">
              {member.role}
            </p>

            {/* Decorative Paw Divider */}
            <div className="mt-4 flex items-center gap-3">
              <span className="h-[1.5px] w-12 bg-purple-500" />
              <FaPaw className="h-3.5 w-3.5 text-[#5B21B6]" />
              <span className="h-[1.5px] w-12 bg-purple-500" />
            </div>

            {/* Bio */}
            <p className="mt-5 text-[14px] sm:text-[15px] leading-relaxed text-[#1a1a1a] md:max-w-[540px]">
              {member.bio}
            </p>

            {/* Quick Info Grid Badges */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-0">
              {member.quickInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="flex gap-2 rounded-[18px] transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex h-11 sm:h-14 sm:w-14 w-11 bg-purple-100 shrink-0 items-center justify-center rounded-full  text-[#5B21B6] shadow-sm">
                    {getInfoIcon(info.icon)}
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-[#1E1B4B]">
                      {info.title}
                    </h4>
                    <p className="text-[13px]  min-h-10 font-medium text-[#64748B]">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-2 sm:gap-8 items-stretch">
          {/* Left Card: About */}
          <div className="flex flex-col justify-between rounded-[28px] bg-[#F8F6FE]/70 p-2 border border-purple-50/50">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#5B21B6] mb-2">
                {member.about.title}
              </h3>
              <div className="h-[1.5px] w-12 bg-purple-500 my-3" />
              
              <div className="space-y-4 text-[14px] sm:text-[15px] leading-relaxed text-[#171718]">
                {member.about.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Stats Block (Pinned to Bottom) */}
            <div className="mt-8 grid  grid-cols-2 sm:gap-4 gap-1">
              {member.about.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center sm:gap-3.5 gap-1 rounded-[20px] bg-[#F3F0FF] p-4 shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full  text-[#5B21B6]">
                    {stat.icon === "smile" ? (
                      <FaSmile className="h-5 sm:w-7 sm:h-7 w-5 text-[#5B21B6]" />
                    ) : (
                      <FaPaw className="h-5 sm:w-7 sm:h-7 w-5 text-[#5B21B6]" />
                    )}
                  </div>
                  <div>
                    <div className="text-xl font-black text-[#1E1B4B]">
                      {stat.value}
                    </div>
                    <div className="text-[12px] font-medium text-[#64748B]">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card: Professional Skills */}
          <div className="flex flex-col justify-between rounded-[28px] bg-[#F8F6FE]/70 p-2  border border-purple-50/50">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#5B21B6] mb-6">
                {member.skills.title}
              </h3>
              <div className="space-y-5">
                {member.skills.items.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-[13px] font-bold">
                      <div className="flex items-center gap-2 text-[#1E1B4B]">
                        <FaPaw className="h-3 w-3 text-[#5B21B6]" />
                        <span>{skill.name}</span>
                      </div>
                      <span className="text-[#1E1B4B]">{skill.percentage}%</span>
                    </div>
                    {/* Skill Progress Bar Track */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-purple-100/70">
                      <div
                        className="h-full rounded-full bg-[#5B21B6] transition-all duration-700 ease-out"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center sm:pt-4">
          <div className="inline-flex flex-col items-center justify-center gap-1.5 mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-[#1E1B4B]">
              {member.areasOfExpertise.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="h-[1.5px] w-8 bg-purple-500" />
              <FaPaw className="h-4 w-4 text-[#5B21B6]" />
              <span className="h-[1.5px] w-8 bg-purple-500" />
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {member.areasOfExpertise.items.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center rounded-[24px] bg-white p-6 sm:p-7 text-center shadow-sm border border-gray-100/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-purple-200"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl  text-[#5B21B6] transition-transform duration-300 group-hover:scale-110">
                  {getExpertiseIcon(item.icon)}
                </div>
                <h4 className="text-base font-bold text-[#1E1B4B] mb-2">
                  {item.title}
                </h4>
                <p className="text-[13px] leading-relaxed text-[#070707]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}