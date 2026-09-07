// --- Base & Utility Interfaces ---

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CtaButton {
  label: string;
  href: string;
  variant?: string;
  icon?: string;
}

export interface ImageRef {
  src: string;
  alt: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface LegalLink {
  label: string;
  href: string;
}

export interface NavChild {
  label: string;
  href: string;
}

export interface MenuItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface SeoMeta {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
}

// --- Header & Footer Data ---

export interface PetTopBarData {
  address: string;
  email: string;
  socialLinks: SocialLink[];
  ctaButton: CtaButton;
}

export interface PetSiteData {
  siteName: string;
  tagline: string;
  logo: {
    light: string;
  };
  TopBar: PetTopBarData;
  copyright: string;
}

export interface PetHeaderData {
  site: PetSiteData;
  meta: SeoMeta;
  nav: MenuItem[];
}

export interface FooterColumn {
  title: string;
  links: NavChild[];
}

export interface FooterBadge {
  icon: string;
  label: string;
}

export interface PetFooterContact {
  phone: string;
  phoneHref: string;
  phoneNote?: string;
  email: string;
  emailNote?: string;
  address: string;
  addressNote?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface LegalLink {
  label: string;
  href: string;
}

export interface PetFooterData {
  logoImage: string;
  desc: string;
  badges?: FooterBadge[];
  columns: FooterColumn[];
  footerContact: PetFooterContact;
  socialLinks: SocialLink[];
  copyright: string;
  legalLinks: LegalLink[];
}

// --- Banner ---

export interface PetBannerData {
  badge: string;
  title: string;
  highlightedTitle: string;
  desc: string;
  buttons: CtaButton[];
  bgImageUrl: string;
}

// --- Service Areas ---

export interface PetServiceAreaCity {
  id: number;
  name: string;
  state: string;
  image: string;
  slug:string;
}

export interface PetServiceAreasData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  desc: string;
  cities: PetServiceAreaCity[];
}

// --- About Section ---

export interface PetAboutFeatureItem {
  id: number;
  iconName: string;
  title: string;
  desc: string;
}

export interface PetAboutStat {
  id: number;
  number: string;
  suffix: string;
  label: string;
  iconName: string;
}

export interface PetAboutSideImage {
  src: string;
  alt: string;
  caption: string;
}

export interface PetAboutStatBadge {
  number: string;
  label: string;
}

export interface PetAboutSectionData {
  badge: string;
  title: string;
  highlightedTitle: string;
  desc: string;
  features: PetAboutFeatureItem[];
  button: {
    label: string;
    href: string;
  };
  sideImage: PetAboutSideImage;
  statBadge: PetAboutStatBadge;
  smallCaption?: string;
  stats: PetAboutStat[];
}

// --- Services ---

export interface PetServicesBanner {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  title: string;
  backgroundImage: string;
  homeHref: string;
}

export interface PetServiceItem {
  id: string;
  slug: string;
  iconName: string;
  title: string;
  description: string;
  image: ImageRef;
  href: string;
  linkText?: string;
}

export interface PetServicesData {
  banner?: PetServicesBanner;
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  description: string;
  services: PetServiceItem[];
}

// --- Team ---

export interface PetTeamMember {
  id: number;
  slug: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface PetTeamData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  desc: string;
  members: PetTeamMember[];
}

// --- FAQ ---

export interface PetFaqItem {
  question: string;
  answer: string;
}

export interface PetFaqSideBadge {
  title: string;
  desc: string;
}

export interface PetFaqContactCta {
  title: string;
  buttonText: string;
  phoneLabel: string;
  phone: string;
  phoneHref: string;
}

export interface PetFaqData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  description: string;
  faqs: PetFaqItem[];
  sideImage: ImageRef;
  sideBubble: string;
  sideBadge: PetFaqSideBadge;
  contactCta: PetFaqContactCta;
}

// --- Why Choose Us ---

export interface PetWhyChooseUsFeature {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface PetWhyChooseUsStatBadge {
  number: string;
  label: string;
}

export interface PetWhyChooseUsPhone {
  label: string;
  number: string;
  href: string;
}

export interface PetWhyChooseUsData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  description: string;
  images: {
    main: string;
    secondary: string;
  };
  statBadge: PetWhyChooseUsStatBadge;
  features: PetWhyChooseUsFeature[];
  bulletPoints: string[];
  button: {
    label: string;
    href: string;
  };
  phone: PetWhyChooseUsPhone;
}

// --- Testimonial ---

export interface PetTestimonialItem {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

export interface PetTestimonialData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  desc: string;
  testimonialItems: PetTestimonialItem[];
}

// --- Blog ---

export interface PetBlogPost {
  id: number;
  slug: string;
  image: string;
  date: string;
  author: string;
  title: string;
  description?: string;
  readMoreText: string;
}

export interface PetBlogData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  desc: string;
  posts: PetBlogPost[];
}