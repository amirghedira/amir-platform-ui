import '../styles/globals.css'
import "../styles/css/bootstrap.min.css";
import "../styles/scss/now-ui-kit.css";
import '../styles/react-lightbox.css'

import React from 'react'
import AppContext from '../context/AppContext'
import IndexNavbar from '../components/IndexNavbar/IndexNavbar'
import IndexHeader from '../components/Headers/IndexHeader'
import DarkFooter from '../components/Footers/DarkFooter'
import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar';
import SlackFeedback from 'react-slack-feedback'
import axios from '../utils/axios';
function MyApp({ Component, pageProps }) {



    const [isOpenSlackFeedback, setIsOpenSlackFeedback] = React.useState(false)


    const sendFeedbackToSlack = (payload, success, error) => {
        console.log(payload)
        return axios.post('/slack-feedback', payload.attachments[0])
            .then(res => {
                success()
            })
            .catch(err => {
                error()
            })
    }

    const uploadImageHandler = (image, success, error) => {
        const form = new FormData()
        form.append('images', image)
        return axios.post('/upload', form)
            .then(res => {
                success(res.data.fileLinks[0])
            })
            .catch(err => {
                error()
            })
    }
    return (

        <React.Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <AppContext>
                <IndexHeader />
                <NextNprogress
                    color="#29D"
                    startPosition={0.3}
                    stopDelayMs={200}
                    showSpinner={false}
                    options={{ showSpinner: false }}

                />
                <IndexNavbar />
                <Component {...pageProps} />
                <SlackFeedback
                    open={isOpenSlackFeedback}
                    channel="#feedback"
                    disabled={false}
                    errorTimeout={8 * 1000}
                    onClose={() => { setIsOpenSlackFeedback(false) }}
                    onOpen={() => { setIsOpenSlackFeedback(true) }}
                    sentTimeout={5 * 1000}
                    showChannel={true}
                    showIcon={true}
                    // theme={themes.dark}
                    user="Anonymous"
                    onSubmit={(payload, success, error) => { sendFeedbackToSlack(payload, success, error) }}
                    onImageUpload={(file, success, error) => { uploadImageHandler(file, success, error) }}
                />
                <DarkFooter />
            </AppContext>
        </React.Fragment>
    )
}

export default MyApp
