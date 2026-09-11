import Banner from "../../shared/BannerPage";
import TeamSection from "../../homesection/TeamSection";
import { site, type PetTeamData } from "@/data";

interface TeamProps {
  data?: PetTeamData;
}

export default function Team({ data }: TeamProps) {
  const teamData = data ?? site.team;
  const { banner } = teamData;

  return (
    <main className="w-full bg-white font-sans">
      <Banner
        image={banner.backgroundImage}
        title={banner.breadcrumbHome}
        homeHref={banner.homeHref}
        current={banner.breadcrumbCurrent}
      />
      <TeamSection data={teamData} layout="grid" />
    </main>
  );
}
