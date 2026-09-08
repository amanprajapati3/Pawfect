import ServiceArea from "../components/layout/location/ServiceArea"
import {site} from "@/data"

export default function ServiceAreaPage(){
    return(
        <>
        <ServiceArea data={site.serviceAreas}/>
        </>
    )
}
