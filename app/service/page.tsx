import Service from "../components/layout/service/Service"
import {site} from "@/data"

export default function ServicePage(){
    return(
        <>
        <Service data={site.services}/>
        </>
    )
}
