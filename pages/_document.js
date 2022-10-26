
import Document, { Html, Main, NextScript, Head } from 'next/document'
export default class CustomDocument extends Document {


    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="google-site-verification" content="srWyQk73mi7vKyZuRzJVmq-4-E7qDQEljmKUSu_AAfk" />
                    <meta property="og:type" content="article" />
                    <meta property="og:site_name" content="Amir Platform" />
                    <meta name="theme-color" content="#2c2c2c" />
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="Amir Platform" />
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
                    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@1,900&display=swap" rel="stylesheet" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" />
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800&display=swap" rel="stylesheet" />

                </Head>
                <body>
                    <Main />
                </body>
                <NextScript />
            </Html>
        )
    }
}