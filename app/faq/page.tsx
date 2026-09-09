import React from "react";
import Faq from "../components/layout/faq/Faq";
import { site } from "@/data";

export default function FaqPage() {
  

  return (
    <>
      <Faq data={site.faqPage} />
    </>
  );
}