import Banner from "../components/shared/BannerPage"
import ChooseSection from "../components/homesection/Choose"
import FaqSection from "../components/homesection/FaqSection"
import {site} from "@/data"


export default function WhyChoosePage(){
    const { banner } = site.whyChooseUs
    return(
        <>
        <Banner
          image={banner.bgImageUrl}
          title={banner.breadcrumbHome}
          current={banner.breadcrumbCurrent}
        />
        <ChooseSection data={site.whyChooseUs} hideActions />
        <FaqSection data={site.faq}/>
        </>
    )
}
