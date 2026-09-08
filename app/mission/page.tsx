import Mission from "../components/layout/mission/Mission"
import FaqSection from "../components/homesection/FaqSection"
import {site} from "@/data"

export default function MissionPage(){
    return(
        <>
        <Mission data={site.mission}/>
        <FaqSection data={site.faq}/>
        </>
    )
}
