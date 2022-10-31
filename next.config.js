/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    compiler: {
        emotion: true,
    },
    output: 'standalone',
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
    }
}
