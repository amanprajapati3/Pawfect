import Blog from "../components/layout/blog/Blog"
import {site} from "@/data"

export default function BlogsPage(){
    return(
        <>
        <Blog data={site.blog}/>
        </>
    )
}
