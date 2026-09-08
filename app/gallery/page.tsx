import Gallery from "../components/layout/gallery/Gallery";
import {site} from "@/data"


export default function GalleryPage(){
    return(
        <>
        <Gallery data={site.gallery}/>
        </>
    )
}