import About from "../components/layout/about/About"
import Mission from "../components/layout/mission/Mission"
import ChooseSection from "../components/homesection/Choose"
import FaqSection from "../components/homesection/FaqSection"
import {site} from "@/data"


export default function AboutPage(){
    return(
        <>
        <About data={site.aboutUs}/>
        <Mission data={site.mission} showBanner={false}/>
        <ChooseSection data={site.whyChooseUs}/>
        <FaqSection data={site.faq}/>
        </>
    )
}
