"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import ScrollReveal from "../shared/ScrollReveal";

export interface PetBlogPost {
  id: number;
  slug: string;
  image: string;
  date: string;
  author: string;
  title: string;
  description?: string;
  readMoreText: string;
}

export interface PetBlogData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  desc: string;
  posts: PetBlogPost[];
}

interface BlogSectionProps {
  data: PetBlogData;
  layout?: "home" | "grid";
}

export default function BlogSection({ data, layout = "home" }: BlogSectionProps) {
  const { badge, title, desc, posts = [] } = data || {};
  const isGrid = layout === "grid";

  // Restrict to 3 posts for the homepage section
  const displayPosts = posts.slice(0, 3);
  const featuredPost = displayPosts[0];
  const sidePosts = displayPosts.slice(1);

  if (posts.length === 0) return null;

  const renderHorizontalCard = (post: PetBlogPost) => (
    <div className="flex flex-col sm:flex-row items-center rounded-3xl bg-[#F8F8FC] p-4 sm:p-5 gap-4 sm:gap-5 transition-all duration-300 hover:shadow-lg h-full">
      {/* Horizontal Image Container */}
      <div className="relative aspect-[4/3] w-full sm:w-[240px] md:w-full lg:w-[300px] sm:shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, 200px"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Right/Side Content Container */}
      <div className="flex flex-col justify-between flex-grow w-full py-1">
        <div>
          {/* Meta Info */}
          <div className="mb-2 flex items-center gap-3 text-[12px] font-medium text-[#64748B]">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-[#7C3AED]" />
              {post.date}
            </span>
            <span className="h-3 w-px bg-[#CBD5E1]" />
            <span className="flex items-center gap-1">
              <User className="h-4 w-4 text-[#7C3AED]" />
              {post.author}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-[16px] sm:text-[17px] font-bold text-[#1E1B4B] leading-snug line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          {post.description && (
            <p className="mb-4 text-[13px] leading-relaxed text-[#64748B] line-clamp-2">
              {post.description}
            </p>
          )}
        </div>

        {/* Read More Button */}
        <div className="flex md:justify-end">
          <Link
            href={`/blog-details/${post.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#3436a1] px-4 sm:px-6 sm:py-3 py-2 text-[13px] font-semibold text-white transition-all hover:bg-[#4F46E5]"
          >
            {post.readMoreText}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );

  const renderVerticalCard = (post: PetBlogPost) => (
    <div className="flex flex-col items-center rounded-3xl bg-[#F8F8FC] p-4 sm:p-5 transition-all duration-300 hover:shadow-lg h-full">
      {/* Image on top */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content below, centered */}
      <div className="flex flex-col items-left text-left flex-grow w-full pt-5 px-1 pb-1">
        {/* Meta Info */}
        <div className="mb-2 flex items-left gap-3 text-[12px] font-medium text-[#64748B]">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-[#7C3AED]" />
            {post.date}
          </span>
          <span className="h-3 w-px bg-[#CBD5E1]" />
          <span className="flex items-center gap-1">
            <User className="h-4 w-4 text-[#7C3AED]" />
            {post.author}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-[17px] sm:text-[18px] font-bold text-[#1E1B4B] leading-snug line-clamp-2">
          {post.title}
        </h3>

        {/* Description */}
        {post.description && (
          <p className="mb-4 text-[13px] leading-relaxed text-[#64748B] line-clamp-2">
            {post.description}
          </p>
        )}

        {/* Read More Button */}
        <div className="mt-auto pt-2">
          <Link
            href={`/blog-details/${post.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#3436a1] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#4F46E5]"
          >
            {post.readMoreText}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-white py-8 md:py-12 font-sans">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6">
        <SectionHeader badge={badge} title={title} description={desc} className="mb-8" />

        {isGrid ? (
          /* GRID: all posts, 3 per row desktop / 2 tablet / 1 mobile, vertical card design */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <ScrollReveal
                key={post.id}
                direction="up"
                staggerChildren={0.12}
                index={index}
                className="h-full"
              >
                <div className="h-full">{renderVerticalCard(post)}</div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal direction="up">
          <div className="grid grid-cols-1 gap-8 md:gap-6 lg:grid-cols-12 lg:gap-8 items-stretch">
            {/* LEFT: FEATURED MAIN POST */}
            {featuredPost && (
              <div className="lg:col-span-6 flex">
                <div className="flex w-full flex-col justify-between rounded-3xl bg-[#F8F8FC] p-4 sm:p-5 transition-all duration-300 hover:shadow-lg">
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow justify-between pt-5 px-2 pb-2">
                    <div>
                      {/* Meta Info */}
                      <div className="mb-3 flex items-center gap-4 text-[13px] font-medium text-[#64748B]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-[#7C3AED]" />
                          {featuredPost.date}
                        </span>
                        <span className="h-3 w-px bg-[#CBD5E1]" />
                        <span className="flex items-center gap-1.5">
                          <User className="h-4 w-4 text-[#7C3AED]" />
                          {featuredPost.author}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-[20px] font-bold text-[#1E1B4B] sm:text-[22px] leading-snug">
                        {featuredPost.title}
                      </h3>

                      {/* Description */}
                      {featuredPost.description && (
                        <p className="mb-6 text-[14px] leading-relaxed text-[#64748B] line-clamp-3">
                          {featuredPost.description}
                        </p>
                      )}
                    </div>

                    {/* Read More Button */}
                    <div>
                      <Link
                        href={`/blog-details/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#6366F1] px-5 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-[#4F46E5]"
                      >
                        {featuredPost.readMoreText}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RIGHT: TWO SMALLER HORIZONTAL POSTS */}
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-6 flex-col justify-between">
              {sidePosts.map((post) => (
                <div key={post.id}>{renderHorizontalCard(post)}</div>
              ))}
            </div>
          </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}