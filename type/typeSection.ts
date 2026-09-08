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
  banner?: PetServicesBanner;
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
  banner?: PetServicesBanner;
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

export interface PetWhyChooseUsBanner {
  breadcrumbCurrent: string;
  breadcrumbHome: string;
  bgImageUrl: string;
}

export interface PetWhyChooseUsData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  banner: PetWhyChooseUsBanner;
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
  banner?: PetServicesBanner;
  title: {
    normal: string;
    highlighted: string;
  };
  desc: string;
  posts: PetBlogPost[];
}

export interface PetAboutFeature {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface PetAboutBanner{
  breadcrumbCurrent:string;
  breadcrumbHome:string;
  bgImageUrl:string;
}

export interface PetAboutData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  paragraphs: string[];
  images: {
    main: string;
    secondary: string;
  };
  banner:PetAboutBanner;
  features: PetAboutFeature[];
}

export interface PetMissionCard {
  id: string;
  title: string;
  description: string;
  image: string;
  badgeIcon: string;
}

export interface PetValueItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PetMissionBanner {
  breadcrumbCurrent: string;
  breadcrumbHome: string;
  bgImageUrl: string;
}

export interface PetMissionData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  banner: PetMissionBanner;
  subtitle: string;
  cards: PetMissionCard[];
  values: PetValueItem[];
}

export interface ServiceDetailsQuickBenefit {
  id: string;
  title: string;
}

export interface ServiceDetailsBenefitItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ServiceDetailsProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServiceDetailsData {
  badge: string;
  title: string;
  description: string[];

  quickBenefits: ServiceDetailsQuickBenefit[];

  gallery: {
    mainImage: string;
    badgeText: string;
    badgeSubtext: string;
    sideImages: string[];
  };

  benefitsSection: {
    title: string;
    items: ServiceDetailsBenefitItem[];
  };

  whatsIncluded: {
    title: string;
    list: string[];
  };

  processSection: {
    title: string;
    steps: ServiceDetailsProcessStep[];
  };

  ctaBanner: {
    title: string;
    subtitle: string;
    image: string;
  };
}


export interface ServiceDetailsItem {
  id: string;
  slug: string;
  iconName: string;
  title: string;
  description: string;

  image: {
    src: string;
    alt: string;
  };

  href: string;
  linkText: string;

  detailData: ServiceDetailsData;
}


export interface ServiceDetailsBanner {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  title: string;
  backgroundImage: string;
  homeHref: string;
}

export interface ServiceDetailsPageData {
  banner: ServiceDetailsBanner;

  badge: string;

  title: {
    normal: string;
    highlighted: string;
  };

  description: string;

  services: ServiceDetailsItem[];
}

export interface ServiceDetailsVariants {
  PetServices1: ServiceDetailsPageData;
}

export interface ServiceDetails {
  variants: ServiceDetailsVariants;
}

export interface GalleryImageItem {
  id: number | string;
  src: string;
  alt: string;
  category: string;
}

export interface GalleryVideoItem {
  id: number | string;
  thumbnail: string;
  videoUrl: string;
  title: string;
  duration: string;
}

export interface GalleryData {
  badge: string;
  banner: {
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    title: string;
    backgroundImage: string;
    homeHref: string;
  };
  imageGallery: {
    badge: string;
    title: {
      normal: string;
      highlighted: string;
    };
    desc: string;
    categories: string[];
    items: GalleryImageItem[];
  };
  videoGallery: {
    badge: string;
    title: {
      normal: string;
      highlighted: string;
    };
    desc: string;
    items: GalleryVideoItem[];
  };
}