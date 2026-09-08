"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FaPaw,
  FaPlay,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaVideo,
} from "react-icons/fa";
import Banner from "@/app/components/shared/BannerPage";
import type { GalleryData, GalleryImageItem, GalleryVideoItem } from "@/type/typeSection";

interface GalleryProps {
  data: GalleryData;
}

export default function Gallery({ data }: GalleryProps) {
  const { imageGallery: rawImageGallery, videoGallery: rawVideoGallery, banner } = data;

  const imageGallery = {
    badge: rawImageGallery.badge,
    titleFirst: rawImageGallery.title.normal,
    titleHighlight: rawImageGallery.title.highlighted,
    subtitle: rawImageGallery.desc,
    categories: rawImageGallery.categories,
    items: rawImageGallery.items.map((item) => ({
      id: String(item.id),
      src: item.src,
      alt: item.alt,
      category: item.category,
    })),
  };

  const videoGallery = {
    badge: rawVideoGallery.badge,
    titleFirst: rawVideoGallery.title.normal,
    titleHighlight: rawVideoGallery.title.highlighted,
    subtitle: rawVideoGallery.desc,
    items: rawVideoGallery.items.map((item) => ({
      id: String(item.id),
      thumbnail: item.thumbnail,
      videoUrl: item.videoUrl,
      title: item.title,
      duration: item.duration,
    })),
  };

  // Filter state for Image Gallery
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Modal State for Image Slider
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Modal State for Video Player
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideoItem | null>(
    null
  );

  // Filtered Image list based on active category
  const filteredImages =
    selectedCategory === "All"
      ? imageGallery.items
      : imageGallery.items.filter((item) => item.category === selectedCategory);

  // Open Image Modal
  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  // Close Image Modal
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  // Image Navigation Handlers
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages.length]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [filteredImages.length]);

  // Keyboard navigation for image modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isImageModalOpen) return;
      if (e.key === "Escape") closeImageModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isImageModalOpen, prevImage, nextImage]);

  return (
    <div className="w-full bg-[#FAFAFC] font-sans text-[#1E1B4B]">
      {/* Dynamic Header Banner */}
      <Banner
        image={banner.backgroundImage}
        title={banner.title}
        homeHref={banner.homeHref}
        current={banner.breadcrumbCurrent}
      />

      <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* ================= SECTION 1: IMAGE GALLERY ================= */}
        <div className="text-center">
          {/* Section Sub-heading Badge */}
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="h-[2px] w-6 bg-[#5B21B6]" />
            <FaPaw className="h-3.5 w-3.5 text-[#5B21B6]" />
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-widest text-[#1E1B4B]">
              {imageGallery.badge}
            </span>
            <FaPaw className="h-3.5 w-3.5 text-[#5B21B6]" />
            <span className="h-[2px] w-6 bg-[#5B21B6]" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#1E1B4B] leading-tight">
            {imageGallery.titleFirst}
            <span className="text-[#5B21B6]">
              {imageGallery.titleHighlight}
            </span>
          </h2>

          <p className="mt-2 text-[14px] sm:text-[15px] text-[#64748B]">
            {imageGallery.subtitle}
          </p>

          {/* Filter Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {imageGallery.categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-5 py-2 text-[13px] sm:text-[14px] font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-[#5B21B6] text-white shadow-md shadow-purple-200"
                      : "bg-white text-[#475569] border border-gray-200 hover:border-purple-300 hover:text-[#5B21B6]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Images Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredImages.map((item: GalleryImageItem, idx: number) => (
              <div
                key={item.id}
                onClick={() => openImageModal(idx)}
                className="group relative h-[240px] sm:h-[260px] w-full cursor-pointer overflow-hidden rounded-[20px] bg-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#5B21B6] shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <FaPaw className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 2: VIDEO GALLERY ================= */}
        <div className="mt-20 sm:mt-24 text-center">
          {/* Section Sub-heading Badge */}
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="h-[2px] w-6 bg-[#5B21B6]" />
            <FaVideo className="h-3.5 w-3.5 text-[#5B21B6]" />
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-widest text-[#1E1B4B]">
              {videoGallery.badge}
            </span>
            <FaPaw className="h-3.5 w-3.5 text-[#5B21B6]" />
            <span className="h-[2px] w-6 bg-[#5B21B6]" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#1E1B4B] leading-tight">
            {videoGallery.titleFirst}
            <span className="text-[#5B21B6]">
              {videoGallery.titleHighlight}
            </span>
          </h2>

          <p className="mt-2 text-[14px] sm:text-[15px] text-[#64748B]">
            {videoGallery.subtitle}
          </p>

          {/* Videos Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoGallery.items.map((item: GalleryVideoItem) => (
              <div key={item.id} className="flex flex-col text-center">
                {/* Video Card Thumbnail */}
                <div
                  onClick={() => setSelectedVideo(item)}
                  className="group relative h-[210px] sm:h-[220px] w-full cursor-pointer overflow-hidden rounded-[20px] bg-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Play Button Icon Center */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/30 transition-colors duration-300">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#1E1B4B] shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <FaPlay className="h-4 w-4 ml-0.5 text-[#1E1B4B]" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
                    {item.duration}
                  </div>
                </div>

                {/* Video Title */}
                <h4 className="mt-3.5 text-[15px] font-extrabold text-[#1E1B4B]">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= MODAL 1: IMAGE SLIDER LIGHTBOX ================= */}
      {isImageModalOpen && filteredImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          {/* Close Button */}
          <button
            onClick={closeImageModal}
            className="absolute top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close modal"
          >
            <FaTimes className="h-5 w-5" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/30"
            aria-label="Previous image"
          >
            <FaChevronLeft className="h-5 w-5" />
          </button>

          {/* Image Display */}
          <div className="relative max-h-[85vh] max-w-[90vw] sm:max-w-[80vw] h-[550px] w-[800px] rounded-2xl overflow-hidden">
            <Image
              src={filteredImages[currentImageIndex].src}
              alt={filteredImages[currentImageIndex].alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/30"
            aria-label="Next image"
          >
            <FaChevronRight className="h-5 w-5" />
          </button>

          {/* Image Counter Indicator */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-[13px] font-semibold text-white">
            {currentImageIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}

      {/* ================= MODAL 2: VIDEO PLAYER ================= */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl rounded-2xl bg-black overflow-hidden shadow-2xl">
            {/* Header / Close */}
            <div className="flex items-center justify-between bg-zinc-900 px-5 py-3 text-white">
              <h3 className="text-base font-bold">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>

            {/* Video Iframe Container */}
            <div className="relative aspect-video w-full">
              <iframe
                src={`${selectedVideo.videoUrl}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}