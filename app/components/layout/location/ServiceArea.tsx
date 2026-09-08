import Banner from "../../shared/BannerPage";
import Location from "../../homesection/Location";
import type { PetServiceAreasData } from "@/data";

interface ServiceAreaProps {
  data: PetServiceAreasData;
}

export default function ServiceArea({ data }: ServiceAreaProps) {
  const { banner } = data;

  return (
    <main className="w-full bg-white font-sans">
      <Banner
        image={banner.backgroundImage}
        title={banner.breadcrumbHome}
        homeHref={banner.homeHref}
        current={banner.breadcrumbCurrent}
      />
      <Location data={data} layout="grid" />
    </main>
  );
}
