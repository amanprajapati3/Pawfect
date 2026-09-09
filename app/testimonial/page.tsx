import { site } from "@/data";
import Testimonial from "../components/layout/testimonial/Testimonial";

export default function TestimonialPage() {
  return (
    <>
      <Testimonial data={site.testimonialPage} />
    </>
  );
}