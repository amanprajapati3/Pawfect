import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServiceSlugs } from "@/data";
import ServiceDetails from "@/app/components/layout/serviceDetails/ServiceDetails";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getServiceSlugs().map((service) => ({
    slug: service.slug,
  }));
}


export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service || !service.detailData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <ServiceDetails
        data={service.detailData}
        serviceTitle={service.title}
      />
    </main>
  );
}