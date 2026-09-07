import petData from "./site.json";
import {
  PetServiceItem,
  PetBlogPost,
  PetTeamMember,
  PetServiceAreaCity,
} from "@/type/typeSection";

export type RawPetData = typeof petData;

export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

export type PetHeaderData =
  typeof petData.PetIndustries.sections.Header.variants.PetHeader1;
export type PetFooterData =
  typeof petData.PetIndustries.sections.Footer.variants.PetFooter1;
export type PetBannerData =
  typeof petData.PetIndustries.sections.Banner.variants.PetBanner1;
export type PetServiceAreasData =
  typeof petData.PetIndustries.sections.ServiceAreas.variants.PetServiceAreas1;
export type PetAboutSectionData =
  typeof petData.PetIndustries.sections.AboutSection.variants.PetAboutSection1;
export type PetServicesData =
  typeof petData.PetIndustries.sections.Services.variants.PetServices1;
export type PetTeamData =
  typeof petData.PetIndustries.sections.Team.variants.PetTeam1;
export type PetFaqData =
  typeof petData.PetIndustries.sections.Faq.variants.PetFaq1;
export type PetWhyChooseUsData =
  typeof petData.PetIndustries.sections.WhyChooseUs.variants.PetWhyChooseUs1;
export type PetTestimonialData =
  typeof petData.PetIndustries.sections.Testimonial.variants.PetTestimonial1;
export type PetBlogData =
  typeof petData.PetIndustries.sections.Blog.variants.PetBlog1;

const sec = petData.PetIndustries.sections;

export const site = {
  header: sec.Header.variants.PetHeader1,
  footer: sec.Footer.variants.PetFooter1,
  banner: sec.Banner.variants.PetBanner1,
  serviceAreas: sec.ServiceAreas.variants.PetServiceAreas1,
  aboutSection: sec.AboutSection.variants.PetAboutSection1,
  services: sec.Services.variants.PetServices1,
  team: sec.Team.variants.PetTeam1,
  faq: sec.Faq.variants.PetFaq1,
  whyChooseUs: sec.WhyChooseUs.variants.PetWhyChooseUs1,
  testimonial: sec.Testimonial.variants.PetTestimonial1,
  blog: sec.Blog.variants.PetBlog1,
};

export function getServiceBySlug(slug: string): PetServiceItem | null {
  const services = sec.Services.variants.PetServices1.services as PetServiceItem[];
  return services.find((service) => service.slug === slug) || null;
}

export function getBlogBySlug(slug: string): PetBlogPost | null {
  const posts = sec.Blog.variants.PetBlog1.posts as PetBlogPost[];
  return posts.find((post) => post.slug === slug) || null;
}

export function getTeamMemberBySlug(slug: string): PetTeamMember | null {
  const members = sec.Team.variants.PetTeam1.members as PetTeamMember[];
  return members.find((member) => member.slug === slug) || null;
}

export function getServiceAreaByCity(
  cityName: string,
): PetServiceAreaCity | null {
  const cities = sec.ServiceAreas.variants.PetServiceAreas1
    .cities as PetServiceAreaCity[];
  return (
    cities.find(
      (city) => city.name.toLowerCase() === cityName.toLowerCase(),
    ) || null
  );
}

export default petData;