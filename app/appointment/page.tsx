import {site} from "@/data"
import Appointment from "../components/layout/appointment/Appointment"

export default function AppointmentPage(){
    return(
        <>
        <Appointment data={site.appointmentPage}/>
        </>
    )
}