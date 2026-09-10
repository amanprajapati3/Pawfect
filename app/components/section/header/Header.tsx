"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Menu as MenuIcon, X, ChevronDown, ChevronUp } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { site as siteData } from "@/data";
import type { PetHeaderData } from "@/type/typeSection";
import { SlCalender } from "react-icons/sl";

const headerData: PetHeaderData = siteData.header;

const socialIconMap: Record<string, React.ElementType> = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  instagram: FaInstagram,
  youtube: FaLinkedinIn,
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openNavIndex, setOpenNavIndex] = useState<number | null>(null);
  const pathname = usePathname();

  const { site: siteInfo, nav } = headerData;

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Info Bar */}
      <div className="hidden w-full bg-[#001D4C] px-4 py-2 text-white lg:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between font-sans text-[13px]">
          <div className="flex items-center gap-3">
            {siteInfo.TopBar?.address && (
              <span className="flex items-center gap-2 text-white font-medium">
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[#3B1264]">
                  <MapPin
                    className="h-5 w-5 text-white"
                    strokeWidth={2.5}
                  />
                </span>
                {siteInfo.TopBar.address}
              </span>
            )}

            {siteInfo.TopBar?.address && siteInfo.TopBar?.email && (
              <span className="text-[#ffffff] font-bold mx-1">/</span>
            )}

            {siteInfo.TopBar?.email && (
              <span className="flex items-center gap-2 text-white font-medium">
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[#3B1264]">
                  <Mail className="h-4 w-4 text-white" strokeWidth={2.5} />
                </span>
                {siteInfo.TopBar.email}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {siteInfo.TopBar?.socialLinks?.map((s, i) => {
              const Icon = socialIconMap[s.label.toLowerCase()] ?? FaFacebookF;
              return (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white hover:text-[#D9A6FF] transition-colors duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-white px-4 py-3 shadow-[0_4px_20px_rgba(107,33,168,0.08)] sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 flex-col items-start">
            {siteInfo.logo?.light ? (
              <Image
                src={siteInfo.logo.light}
                alt={siteInfo.siteName || "PawFect"}
                width={180}
                height={60}
                sizes="(max-width: 640px) 120px, 240px"
                className="h-10 w-auto object-contain sm:h-20"
              />
            ) : (
              <span className="text-2xl font-extrabold tracking-tight text-[#6B21A8] sm:text-3xl">
                Paw<span className="text-[#EC4899]">Fect</span>
              </span>
            )}

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item, index) => {
              const isActive = pathname === item.href;
              const hasChildren = item.children && item.children.length > 0;
              return (
                <div key={index} className="group relative">
                  <Link
                    href={item.href || "#"}
                    className={`flex items-center gap-1 py-2 text-[15px] font-semibold transition-colors duration-300 ${
                      isActive
                        ? "text-[#6B21A8]"
                        : "text-gray-700 hover:text-[#6B21A8]"
                    }`}
                  >
                    {item.label}
                    {hasChildren && (
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#EC4899] transition-all duration-500 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>

                  {hasChildren && (
                    <div className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-2 rounded-2xl border border-purple-100 bg-white p-2 opacity-0 shadow-[0_20px_50px_rgba(107,33,168,0.15)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.children!.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-xl px-4 py-2.5 text-[14px] font-medium transition-colors duration-200 ${
                              isChildActive
                                ? "bg-[#F3E8FF] text-[#6B21A8]"
                                : "text-gray-700 hover:bg-[#F9F5FF] hover:text-[#6B21A8]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden rounded-full bg-gradient-to-r from-[#6B21A8] to-[#A855F7] px-6 py-3 text-[15px] font-bold text-white shadow-md transition-all duration-300 hover:shadow-[0_6px_20px_rgba(168,85,247,0.35)] lg:flex gap-2">
            <div className="mt-1">
              <SlCalender />
            </div>
            {siteInfo.TopBar?.ctaButton && (
              <Link
                href={siteInfo.TopBar.ctaButton.href || "/contact-us"}
                className=""
              >
                {siteInfo.TopBar.ctaButton.label || "Get A Quote"}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E8FF] text-[#6B21A8] transition-colors duration-300 hover:bg-[#E9D5FF] lg:hidden"
            aria-label="Open Menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Mobile Drawer — slides in from the left */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-[82%] max-w-[320px] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            {siteInfo.logo?.light ? (
              <Image
                src={siteInfo.logo.light}
                alt={siteInfo.siteName || "PawFect"}
                width={150}
                height={50}
                sizes="108px"
                className="h-9 w-auto object-contain"
              />
            ) : (
              <span className="text-xl font-extrabold tracking-tight text-[#6B21A8]">
                Paw<span className="text-[#EC4899]">Fect</span>
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3E8FF] text-[#6B21A8] transition-colors duration-300 hover:bg-[#E9D5FF]"
            aria-label="Close Menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Nav */}
        <div className="flex flex-1 flex-col px-5 py-3">
          {nav.map((item, index) => {
            const isActive = pathname === item.href;
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openNavIndex === index;
            return (
              <div key={index} className="border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href || "#"}
                    onClick={() => {
                      if (!hasChildren) closeMenu();
                    }}
                    className={`flex-1 py-4 text-[15px] font-semibold transition-colors duration-300 ${
                      isActive
                        ? "text-[#6B21A8]"
                        : "text-gray-700 hover:text-[#6B21A8]"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenNavIndex(isOpen ? null : index)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3E8FF] text-[#6B21A8]"
                      aria-label={`Toggle ${item.label} menu`}
                    >
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
                {hasChildren && isOpen && (
                  <div className="mb-2 flex flex-col gap-1 pl-4">
                    {item.children!.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                          className={`rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors duration-200 ${
                            isChildActive
                              ? "bg-[#F3E8FF] text-[#6B21A8]"
                              : "text-gray-600 hover:bg-[#F9F5FF] hover:text-[#6B21A8]"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Drawer Contact / CTA */}
        <div className="mt-auto flex flex-col gap-3 border-t border-gray-100 p-5">
          {siteInfo.TopBar?.address && (
            <div className="flex items-center gap-3 rounded-xl bg-[#F9F5FF] p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3E8FF] text-[#6B21A8]">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {siteInfo.TopBar.address}
              </span>
            </div>
          )}

          {siteInfo.TopBar?.ctaButton && (
            <Link
              href={siteInfo.TopBar.ctaButton.href || "/quote"}
              onClick={closeMenu}
              className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#6B21A8] to-[#A855F7] py-3 text-[15px] font-bold text-white"
            >
              {siteInfo.TopBar.ctaButton.label || "Get A Quote"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
