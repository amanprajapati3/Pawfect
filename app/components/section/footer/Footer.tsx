import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { FaPaw } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { site as siteData } from "@/data";
import type { PetFooterData } from "@/type/typeSection";

const footerData: PetFooterData = siteData.footer;

const socialIconMap: Record<string, React.ElementType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaTwitter,
};

export default function Footer() {
  const {
    logoImage,
    desc,
    badges,
    columns,
    footerContact,
    socialLinks,
    copyright,
    legalLinks,
  } = footerData;

  return (
    <footer className="w-full bg-[#FAFAFC] text-[#2D234C] font-sans border-t border-gray-100">
      {/* Main Container */}
      <div className="mx-auto sm:px-6 px-3 py-5  ">
        <div className="grid grid-cols-1  gap-5 md:gap-0 lg:grid-cols-12">
          
          {/* Brand & Left Info Section */}
          <div className="flex flex-col sm:flex-row md:flex-col justify-between lg:col-span-4 ">
            <div>
              {/* Logo */}
              <Link href="/" className="inline-block  mb-4">
                {logoImage ? (
                  <Image
                    src={logoImage}
                    alt="PawFect"
                    width={180}
                    height={60}
                    sizes="(max-width: 640px) 168px, 336px"
                    className="h-14 sm:h-28 w-auto object-contain"
                  />
                ) : (
                  <span className="text-3xl font-extrabold text-[#3B1578]">
                    Paw<span className="text-[#3B1578]">Fect</span>
                  </span>
                )}
              </Link>


              {/* Description */}
              <p className="text-[15px]  sm:max-w-[250px]  text-[#252525] max-w-sm mb-8 md:ml-3">
                {desc}
              </p>
            </div>

            {/* Bottom 3 Badges */}
            <div className="grid grid-cols-3  gap-0 md:gap-7 pt-4 border-t border-gray-200/60">
              <div className="flex items-center  gap-2.5">
                <div className="flex sm:h-12 h-8 w-8 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#ECE7F8] text-[#3B1578]">
                  <FaPaw className="sm:h-6 h-4 w-4 sm:w-6" />
                </div>
                <span className="sm:text-sm text-xs font-bold text-[#3B1578] leading-tight">
                  Trusted<br />Care
                </span>
              </div>

              <div className="flex items-center  gap-2.5">
                <div className="flex sm:h-12 h-8 w-8 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#ECE7F8] text-[#3B1578]">
                  <IoShieldCheckmarkSharp className="sm:h-6 h-4 w-4 sm:w-6" />
                </div>
                <span className="sm:text-sm text-xs font-bold text-[#3B1578] leading-tight">
                  Expert<br />Veterinarians
                </span>
              </div>

              <div className="flex items-center gap-2.5 ml-4 sm:ml-0">
                <div className="flex sm:h-12 h-8 w-8 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#ECE7F8] text-[#3B1578]">
                  <FaHeart className="sm:h-6 h-4 w-4 sm:w-6" />
                </div>
                <span className="sm:text-sm text-xs font-bold text-[#3B1578] leading-tight">
                  Happy<br />Pets
                </span>
              </div>
            </div>
          </div>

          {/* Nav Links Grid & Contact (Right side) */}
          <div className="grid grid-cols-2  flex-wrap items-center gap-2 text-center sm:grid-cols-2 sm:items-start sm:text-left lg:col-span-8 lg:grid-cols-4 lg:border-l lg:border-gray-200/80 sm:pl-5">
            
            {/* Dynamic Link Columns */}
            {columns?.map((col, i) => (
              <div key={i} className="flex -ml-5 md:ml-3 flex-col items-center sm:items-start">
                <h3 className="mb-3 text-[15px] font-bold uppercase tracking-wider text-[#1C0D3F]">
                  {col.title}
                </h3>
                <div className="mb-3 h-[2px] w-8 bg-[#3B1578] sm:mb-3"></div>

                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-[14px] font-medium text-[#4A4458] transition-colors duration-200 hover:text-[#3B1578]"
                      >
                        <ChevronRight className="mr-1.5 h-3.5 w-3.5 text-[#3B1578] transition-transform duration-200 group-hover:translate-x-0.5" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Get In Touch Column */}
            <div className="flex  flex-col items-center gap-3 sm:items-start">
              <h3 className="mb-0 text-[15px] font-bold uppercase tracking-wider text-[#1C0D3F]">
                GET IN TOUCH
              </h3>
              <div className="mb-0 h-[2px] w-8 bg-[#3B1578]"></div>

              <div className="flex  flex-col gap-6">
                {/* Phone */}
                {footerContact?.phone && (
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ECE7F8] text-[#3B1578]">
                      <Phone className="h-6 w-6 fill-current stroke-none" />
                    </div>
                    <div>
                      <a
                        href={footerContact.phoneHref || `tel:${footerContact.phone}`}
                        className="block text-sm font-bold text-[#1C0D3F] transition-colors hover:text-[#3B1578]"
                      >
                        {footerContact.phone}
                      </a>
                      {footerContact.phoneNote && (
                        <span className="text-xs text-gray-500 font-medium">
                          {footerContact.phoneNote}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Email */}
                {footerContact?.email && (
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ECE7F8] text-[#3B1578]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <a
                        href={`mailto:${footerContact.email}`}
                        className="block text-sm font-bold text-[#1C0D3F] transition-colors hover:text-[#3B1578]"
                      >
                        {footerContact.email}
                      </a>
                      {footerContact.emailNote && (
                        <span className="text-xs text-gray-500 font-medium">
                          {footerContact.emailNote}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Address */}
                {footerContact?.address && (
                  <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ECE7F8] text-[#3B1578]">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="text-xs leading-relaxed">
                      <span className="block font-bold text-[#1C0D3F]">
                        {footerContact.address}
                      </span>
                      {footerContact.addressNote && (
                        <span className="whitespace-pre-line text-gray-500 font-medium">
                          {footerContact.addressNote}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar Section */}
      <div className="border-t border-gray-200/80 bg-white pt-4">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 md:flex-row lg:px-12">
          
          {/* Copyright & Tagline */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-md text-gray-600 sm:justify-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ECE7F8] text-[#3B1578]">
              <FaPaw className="h-6 w-6" />
            </div>
            <div>            
            <span>{copyright}</span> <br />
            <p className="font-semibold text-[#3B1578] ml-1">
              Happy Pets. Happy Lives.
            </p>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-md font-medium text-gray-600">
            {legalLinks?.map((link, i) => (
              <React.Fragment key={i}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-[#3B1578]"
                >
                  {link.label}
                </Link>
                {i < legalLinks.length - 1 && (
                  <span className="text-gray-300">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-3">
            <span className="text-md font-bold text-[#3B1578]">Follow Us</span>
            <div className="flex gap-2">
              {socialLinks?.map((s, i) => {
                const Icon = socialIconMap[s.label.toLowerCase()] ?? FaFacebookF;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3B1578]/20 text-[#3B1578] transition-all hover:bg-[#3B1578] hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="">
          
            <FaPaw className="-rotate-12 w-20 h-20 text-[#ECE7F8]"/>
           
          </div>

        </div>
      </div>
    </footer>
  );
}