"use client";

import React from "react";
import Image from "next/image";
import {
  FaUser,
  FaCalendarAlt,
  FaFolder,
  FaClock,
} from "react-icons/fa";
import Banner from "../../shared/BannerPage";
import ScrollReveal from "../../shared/ScrollReveal";
import {
  site,
  type PetBlogDetailPost,
  type PetBlogDetailsVariant,
} from "@/data";

interface BlogDetailsProps {
  data?: PetBlogDetailPost;
  variant?: PetBlogDetailsVariant;
}

export default function BlogDetails({ data, variant }: BlogDetailsProps) {
  const post = data ?? site.blogDetails.posts[0];
  const blogDetails = variant ?? site.blogDetails;

  return (
    <div className="w-full bg-white font-sans text-[#1E1B4B]">
      <Banner
        image={blogDetails.banner.backgroundImage}
        title={blogDetails.banner.title}
        homeHref={blogDetails.banner.homeHref}
        current={blogDetails.banner.breadcrumbCurrent}
      />

      <div className="mx-auto max-w-[1270px] px-4 py-12 sm:px-6">
        {/* Main Article Title */}
        <ScrollReveal direction="up">
        <h1 className="text-3xl sm:text-4xl lg:text-[46px] max-w-[900px]  font-bold leading-tight text-[#1E1B4B] tracking-tight">
          {post.title.normal}{" "}
          <span className="text-[#5B21B6]">{post.title.highlighted}</span>
        </h1>
        </ScrollReveal>

        {/* Metadata Bar */}
        <ScrollReveal direction="up">
        <div className="mt-6 flex flex-wrap items-center gap-6 sm:gap-8 text-[13px] sm:text-[14px] font-semibold text-[#64748B]">
          <div className="flex items-center gap-2">
            <FaUser className="h-4 w-4 text-[#5B21B6]" />
            <span className="text-[#1E1B4B]">{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="h-4 w-4 text-[#5B21B6]" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaFolder className="h-4 w-4 text-[#5B21B6]" />
            <span>{post.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="h-4 w-4 text-[#5B21B6]" />
            <span>{post.readTime}</span>
          </div>
        </div>
        </ScrollReveal>

        {/* Featured Image */}
        <ScrollReveal direction="up">
<div className="relative mt-8 w-full overflow-hidden rounded-[24px] shadow-sm">
  <Image
    src={post.mainImage}
    alt={`${post.title.normal} ${post.title.highlighted}`}
    width={1200}
    height={530} // Replace with your image's standard aspect ratio height (or keep it proportional)
    priority
    sizes="(max-width: 1270px) 100vw, 1200px"
    className="w-full h-auto object-cover"
  />
</div>
        </ScrollReveal>

        {/* Blog Paragraphs */}
        <ScrollReveal direction="up">
        <div className="mt-10 space-y-6 text-[15px] sm:text-[16px] leading-[1.8] text-[#64748B] font-normal">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </div>
  );
}