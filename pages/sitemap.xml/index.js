import axios from '../../utils/axios'

function generateSiteMap(projects) {

    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://www.amirghedira.com</loc>
       <lastmod>${new Date().toISOString()}</lastmod>

     </url>

     <url>
       <loc>https://www.amirghedira.com/aboutus</loc>
       <lastmod>${new Date().toISOString()}</lastmod>

     </url>
     <url>
     <loc>https://www.amirghedira.com/profile</loc>
     <lastmod>${new Date().toISOString()}</lastmod>

   </url>
   <url>
   <loc>https://www.amirghedira.com/questions</loc>
   <lastmod>${new Date().toISOString()}</lastmod>


 </url>
 <url>
 <loc>https://www.amirghedira.com/suggestions</loc>
 <lastmod>${new Date().toISOString()}</lastmod>


</url>
     ${projects.map(project => {
        return `
       <url>
           <loc>${`https://www.amirghedira.com/project/${project.name?.replace(/ /g, '-')}/${project._id}`}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>


       </url>
     `;
    })
            .join('')
        }
   </urlset >
    `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    const result = await axios.get(`/project`)

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(result.data.result)

    res.setHeader('Content-Type', 'text/xml')
    // we send the XML to the browser
    res.write(sitemap)
    res.end()

    return {
        props: {}
    }
}

export default SiteMap