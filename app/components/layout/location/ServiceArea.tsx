import Banner from "../../shared/BannerPage";
import Location from "../../homesection/Location";
import { site, type PetServiceAreasData } from "@/data";

interface ServiceAreaProps {
  data?: PetServiceAreasData;
}

export default function ServiceArea({ data }: ServiceAreaProps) {
  const serviceAreaData = data ?? site.serviceAreas;
  const { banner } = serviceAreaData;

  return (
    <main className="w-full bg-white font-sans">
      <Banner
        image={banner.backgroundImage}
        title={banner.breadcrumbHome}
        homeHref={banner.homeHref}
        current={banner.breadcrumbCurrent}
      />
      <Location data={serviceAreaData} layout="grid" />
    </main>
  );
}
