import React from "react";
import { notFound } from "next/navigation";
import {
  getBlogDetailBySlug,
  getBlogDetailSlugs,
  getBlogDetailsVariant,
} from "@/data";
import BlogDetails from "@/app/components/layout/blogdetails/BlogDetails";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getBlogDetailSlugs().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogDetailBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title.normal} ${post.title.highlighted} | PawFect`,
    description: post.content[0] || undefined,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const post = getBlogDetailBySlug(slug);
  const blogDetails = getBlogDetailsVariant();

  if (!post || !blogDetails) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <BlogDetails data={post} variant={blogDetails} />
    </main>
  );
}