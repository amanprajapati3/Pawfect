import Banner from "../../homesection/Banner";
import {site} from "@/data"
import Location from "../../homesection/Location";
import AboutSection from "../../homesection/AboutSection";
import Services from "../../homesection/Services";
import TeamSection from "../../homesection/TeamSection";
import FaqSection from "../../homesection/FaqSection";

export default function(){
    return(
        <>
        <Banner data={site.banner}/>
        <Location data={site.serviceAreas}/>
        <AboutSection data={site.aboutSection}/>
        <Services data={site.services}/>
        <TeamSection data={site.team}/>
        <FaqSection data={site.faq}/>
        </>
    )
}