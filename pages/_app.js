import '../styles/globals.css'
import "../styles/css/bootstrap.min.css";
import "../styles/scss/now-ui-kit.css";
import React from 'react'
import AppContext from '../context/AppContext'
import IndexNavbar from '../components/IndexNavbar/IndexNavbar'
import IndexHeader from '../components/Headers/IndexHeader'
import DarkFooter from '../components/Footers/DarkFooter'
import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (

    <React.Fragment>

      <Head>
        <meta charset="utf-8" />
        <link rel="icon" type="image/png" href="%PUBLIC_URL%/favicon.png" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/apple-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@1,900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800&display=swap" rel="stylesheet" />
      </Head>
      <AppContext>
        <IndexHeader />
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          showSpinner={false}
          options={{ showSpinner: false }}
          height="3"
        />
        <IndexNavbar />
        <Component {...pageProps} />
        <DarkFooter />
      </AppContext>
    </React.Fragment>
  )
}

export default MyApp
