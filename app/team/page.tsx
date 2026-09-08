import Team from "../components/layout/team/Team"
import {site} from "@/data"

export default function TeamPage(){
    return(
        <>
        <Team data={site.team}/>
        </>
    )
}
