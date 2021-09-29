const siteUrl = "https://amir-ghedira.com"
module.exports = {
    siteUrl,
    robotsTxtOptions: {

        additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
    },
    generateRobotsTxt: true
}