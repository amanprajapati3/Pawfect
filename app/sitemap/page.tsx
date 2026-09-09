import React from "react";
import Sitemap from "../components/layout/sitemap/Sitemap";
import { site } from "@/data";

export default function SitemapPage() {
  return (
    <>
      <Sitemap data={site.sitemapPage} />
    </>
  );
}