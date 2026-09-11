import Banner from "../../shared/BannerPage";
import ServicesPage from "../../homesection/Services";
import { site, type PetServicesData } from "@/data";

interface ServiceProps {
  data?: PetServicesData;
}

export default function Service({ data }: ServiceProps) {
  const serviceData = data ?? site.services;
  const { banner } = serviceData;

  return (
    <main className="w-full -pt-10 bg-white font-sans">
      <Banner
        image={banner.backgroundImage}
        title={banner.breadcrumbHome}
        homeHref={banner.homeHref}
        current={banner.breadcrumbCurrent}
      />
      <ServicesPage data={serviceData} layout="grid" />
    </main>
  );
}
