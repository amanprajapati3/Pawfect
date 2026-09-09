import React from "react";
import { site } from "@/data";
import Partners from "../components/layout/partners/Partners";

export default function PartnersPage() {
  return (
    <>
      <Partners data={site.partnersPage} />
    </>
  );
}