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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2c2c2c" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="I'am AMIR GHEDIRA,I'am an ISSATSO student ,studing software engineering am a web developper and an advanced javascript programmer dedicated to build backend applications with different technologies like nodejs mongodb mysql nestjs graphql, Also am a React and Angular fan and i have a good knowledge about them.." />
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
