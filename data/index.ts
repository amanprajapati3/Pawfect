import petData from "./site.json";
import {
  PetTeamMember,
  PetServiceAreaCity,
  ServiceDetailsItem,
  PetTeamMemberDetail,
  PetTeamDetailsVariant,
  PetBlogDetailPost,
  PetBlogDetailsVariant,
PetServiceAreaDetail,
  PetServiceAreaDetailsVariant,
  PetFaqPageVariant,
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
export type PetAboutUsData =
  typeof petData.PetIndustries.sections.AboutUs.variants.PetAboutUs1;

export type PetMissionData =
  typeof petData.PetIndustries.sections.Mission.variants.PetMission1;

export type PetGalleryData =
  typeof petData.PetIndustries.sections.Gallery.variants.PetGallery1;

export type PetBlogDetailsData =
  typeof petData.PetIndustries.sections.BlogDetails.variants.PetBlogDetails1;

export type PetServiceAreaDetailsData =
  typeof petData.PetIndustries.sections.ServiceAreaDetails.variants.PetServiceAreaDetails1;
export type PetFaqPageData =
  typeof petData.PetIndustries.sections.FaqPage.variants.PetFaqPage1;
export type ContactPageData =
  typeof petData.PetIndustries.sections.ContactPage.variants.PetContactPage1;

export type PetAppointmentData =
  typeof petData.PetIndustries.sections.AppointmentPage.variants.PetAppointmentPage1;

  export type PetPricingData =
  typeof petData.PetIndustries.sections.PricingPage.variants.PetPricingPage1;

  export type PetTestimonialPageData =
  typeof petData.PetIndustries.sections.TestimonialPage.variants.PetTestimonialPage1;

  export type PetPartnersPageData =
  typeof petData.PetIndustries.sections.PartnersPage.variants.PetPartnersPage1;

  export type PetTermsAndConditionsPageData =
  typeof petData.PetIndustries.sections.LegalPage.variants.PetTermsAndConditionsPage1;

  export type PetPrivacyPolicyPageData =
  typeof petData.PetIndustries.sections.LegalPage.variants.PetPrivacyPolicyPage1;

  export type PetCookiePolicyPageData =
  typeof petData.PetIndustries.sections.LegalPage.variants.PetCookiePolicyPage1;

  export type PetDisclaimerPageData =
  typeof petData.PetIndustries.sections.LegalPage.variants.PetDisclaimerPage1;

export type PetNotFoundPageData =
  typeof petData.PetIndustries.sections.NotFoundPage.variants.PetNotFoundPage1;

export type PetSitemapPageData =
  typeof petData.PetIndustries.sections.SitemapPage.variants.PetSitemapPage1;

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
  aboutUs: sec.AboutUs.variants.PetAboutUs1,
  mission: sec.Mission.variants.PetMission1,
  gallery: sec.Gallery.variants.PetGallery1,
blogDetails: sec.BlogDetails.variants.PetBlogDetails1,
serviceAreaDetails: sec.ServiceAreaDetails.variants.PetServiceAreaDetails1,
faqPage: sec.FaqPage.variants.PetFaqPage1,
contactPage: sec.ContactPage.variants.PetContactPage1,
appointmentPage: sec.AppointmentPage.variants.PetAppointmentPage1,
pricingPage: sec.PricingPage.variants.PetPricingPage1,
testimonialPage: sec.TestimonialPage.variants.PetTestimonialPage1,
partnersPage: sec.PartnersPage.variants.PetPartnersPage1,
termsPage: sec.LegalPage.variants.PetTermsAndConditionsPage1,
privacyPolicyPage: sec.LegalPage.variants.PetPrivacyPolicyPage1,
cookiePolicyPage: sec.LegalPage.variants.PetCookiePolicyPage1,
disclaimerPage: sec.LegalPage.variants.PetDisclaimerPage1,
notFoundPage: sec.NotFoundPage.variants.PetNotFoundPage1,
  sitemapPage: sec.SitemapPage.variants.PetSitemapPage1,
};

export function getFaqPageVariant(): PetFaqPageVariant {
  return sec.FaqPage.variants.PetFaqPage1 as PetFaqPageVariant;
}

const serviceDetailItems =
  sec.ServiceDetails.variants.PetServices1.services as ServiceDetailsItem[];

const teamDetailMembers =
  sec.TeamDetails.variants.PetTeamDetails1.members as PetTeamMemberDetail[];

const blogDetailPosts =
  sec.BlogDetails.variants.PetBlogDetails1.posts as PetBlogDetailPost[];

const serviceAreaDetailLocations =
  sec.ServiceAreaDetails.variants.PetServiceAreaDetails1
    .locations as PetServiceAreaDetail[];

export function getServiceBySlug(slug: string): ServiceDetailsItem | null {
  return serviceDetailItems.find((service) => service.slug === slug) || null;
}

export function getServiceSlugs(): ServiceDetailsItem[] {
  return serviceDetailItems;
}

export function getBlogDetailBySlug(slug: string): PetBlogDetailPost | null {
  const cleanSlug = slug.replace(/^blogs\//, "");
  return (
    blogDetailPosts.find(
      (post) => post.slug === cleanSlug || post.slug.endsWith(cleanSlug)
    ) || null
  );
}

export function getBlogDetailSlugs(): PetBlogDetailPost[] {
  return blogDetailPosts;
}

export function getBlogDetailsVariant(): PetBlogDetailsVariant {
  return sec.BlogDetails.variants.PetBlogDetails1 as PetBlogDetailsVariant;
}

export function getTeamMemberBySlug(slug: string): PetTeamMember | null {
  const members = sec.Team.variants.PetTeam1.members as PetTeamMember[];
  return members.find((member) => member.slug === slug) || null;
}

export function getTeamMemberDetailBySlug(
  slug: string,
): PetTeamMemberDetail | null {
  return (
    teamDetailMembers.find((member) => member.slug === slug) || null
  );
}

export function getTeamDetailSlugs(): PetTeamMemberDetail[] {
  return teamDetailMembers;
}

export function getTeamDetailsVariant(): PetTeamDetailsVariant {
  return sec.TeamDetails.variants.PetTeamDetails1 as PetTeamDetailsVariant;
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

export function getServiceAreaDetailBySlug(
  slug: string,
): PetServiceAreaDetail | null {
  const cleanSlug = slug.replace(/^service-area\//, "");
  return (
    serviceAreaDetailLocations.find(
      (loc) => loc.slug === cleanSlug || loc.slug.endsWith(cleanSlug)
    ) || null
  );
}

export function getServiceAreaDetailSlugs(): PetServiceAreaDetail[] {
  return serviceAreaDetailLocations;
}

export function getServiceAreaDetailsVariant(): PetServiceAreaDetailsVariant {
  return sec.ServiceAreaDetails.variants
    .PetServiceAreaDetails1 as PetServiceAreaDetailsVariant;
}

export default petData;