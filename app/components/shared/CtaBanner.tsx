"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { FaPaw } from "react-icons/fa";

export interface CtaBannerAction {
  text: string;
  href: string;
  icon?: ReactNode;
}

export interface CtaBannerItem {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: CtaBannerAction;
}

export interface CtaBannerProps {
  items: CtaBannerItem[];
  className?: string;
}

export default function CtaBanner({ items, className = "" }: CtaBannerProps) {
  const single = items.length === 1;

  // Single block: exact FAQ callout design
  if (single) {
    const { icon, title, subtitle, action } = items[0];

    return (
      <div
        className={`rounded-[28px] bg-[#F8F6FE] p-6 sm:p-8  border-purple-100/60 flex flex-col md:flex-row items-center justify-between gap-6  ${className}`}
      >
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-white shadow-md">
              {icon ?? <FaPaw className="h-7 w-7" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1E1B4B]">{title}</h3>
              {subtitle && (
                <p className="text-[13px] sm:text-[14px] text-[#64748B] mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {action && (
            <>
              <div className="hidden md:block h-16 w-px bg-purple-200" />

              <Link
                href={action.href}
                className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-[#5B21B6] px-8 py-3.5 text-[14px] font-bold text-white shadow-sm hover:bg-[#4C1D95] transition-all hover:-translate-y-0.5"
              >
                {action.icon ?? <FaPaw className="h-4 w-4" />}
                <span>{action.text}</span>
              </Link>
            </>
          )}
      </div>
    );
  }

  // Split layout: keeps multiple blocks (e.g. pricing) in a FAQ-style container
  const [first, ...rest] = items;
  const last = rest[rest.length - 1];

  return (
    <div
      className={`rounded-[28px] bg-[#F8F6FE] p-6 sm:p-8 border border-purple-100/60 flex flex-col md:flex-row items-center justify-between gap-6 ${className}`}
    >
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left md:w-5/12">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-white shadow-xs">
            {first.icon ?? <FaPaw className="h-7 w-7" />}
          </div>
          <div>
            <h4 className="text-[15px] font-extrabold text-[#1E1B4B]">
              {first.title}
            </h4>
            {first.subtitle && (
              <p className="text-[12px] text-[#64748B] mt-1 leading-relaxed">
                {first.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="hidden md:block h-12 w-[1px] border-l border-dashed border-purple-300" />
        <div className="block md:hidden w-full h-[1px] border-t border-dashed border-purple-300" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full md:w-7/12">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-white shadow-xs">
              {last.icon ?? <FaPaw className="h-7 w-7" />}
            </div>
            <div>
              <h4 className="text-[15px] font-extrabold text-[#1E1B4B]">
                {last.title}
              </h4>
              {last.subtitle && (
                <p className="text-[12px] text-[#64748B] mt-1 leading-relaxed">
                  {last.subtitle}
                </p>
              )}
            </div>
          </div>

          {last.action && (
            <Link
              href={last.action.href}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5B21B6] px-6 py-3.5 text-[13px] font-bold text-white shadow-md hover:bg-[#4C1D95] transition-all whitespace-nowrap self-stretch sm:self-auto text-center shrink-0"
            >
              {last.action.icon ?? <FaPaw className="h-3.5 w-3.5" />}
              <span>{last.action.text}</span>
            </Link>
          )}
        </div>
    </div>
  );
}