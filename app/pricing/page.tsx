import React from "react";
import { site } from "@/data";
import Pricing from "../components/layout/pricing/Pricing";

export default function PricingPage() {
  return (
    <>
      <Pricing data={site.pricingPage} />
    </>
  );
}