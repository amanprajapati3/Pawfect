import {site} from "@/data"
import Contact from "../components/layout/contact/Contact"

export default function ContactPage(){
    return(
        <>
        <Contact data={site.contactPage}/>
        </>
    )
}