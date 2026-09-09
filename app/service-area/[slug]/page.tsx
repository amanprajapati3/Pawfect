import React from "react";
import { notFound } from "next/navigation";
import {
  getServiceAreaDetailBySlug,
  getServiceAreaDetailSlugs,
  getServiceAreaDetailsVariant,
} from "@/data";
import LocationDetails from "@/app/components/layout/locationDetails/LocationDetails";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getServiceAreaDetailSlugs().map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const location = getServiceAreaDetailBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  return {
    title: `${location.name} Pet Care Services | PawFect`,
    description: location.description,
  };
}

export default async function ServiceAreaDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const location = getServiceAreaDetailBySlug(slug);
  const variant = getServiceAreaDetailsVariant();

  if (!location || !variant) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <LocationDetails data={location} variant={variant} />
    </main>
  );
}