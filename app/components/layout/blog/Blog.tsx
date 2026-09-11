import Banner from "../../shared/BannerPage";
import BlogSection from "../../homesection/BlogSection";
import { site, type PetBlogData } from "@/data";

interface BlogProps {
  data?: PetBlogData;
}

export default function Blog({ data }: BlogProps) {
  const blogData = data ?? site.blog;
  const { banner } = blogData;

  return (
    <main className="w-full bg-white font-sans">
      <Banner
        image={banner.backgroundImage}
        title={banner.breadcrumbHome}
        homeHref={banner.homeHref}
        current={banner.breadcrumbCurrent}
      />
      <BlogSection data={blogData} layout="grid" />
    </main>
  );
}
