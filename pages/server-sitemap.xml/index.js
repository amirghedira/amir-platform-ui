import { getServerSideSitemap } from 'next-sitemap'
import Axios from "axios";


export default function Site() {

}



export const getServerSideProps = async (context) => {

    const result = await Axios.get(`https://mywebrestapi.herokuapp.com/project`)
    const fields = result.data.result.map(project => ({
        loc: `https://amir-ghedira.com/project/${project.name}/${project.technologie.replaceAll(' ', '-')}/${project._id}`,
        lastmod: new Date().toISOString()
    }))
    return getServerSideSitemap(context, fields)
}
