import TopicsPage from "../../../components/TopicsPage/TopicsPage"
import Head from 'next/head'
import React from 'react'
import axios from "../../../utils/axios"


const SuggestionsPage = ({ topics }) => {
    return (
        <React.Fragment>
            <Head>
                <title>{`Suggestions | Amir Platform`}</title>
                <meta name="title" content={`Suggestions | Amir Platform`} />
                <meta name="description" content="this section is reserved for all user to ask questions about front end or back end development or even about soft skills" />
                <link rel="canonical" href={`https://www.amir-ghedira.com/topics/suggestions`} />
                <meta property="og:url" content={`https://www.amir-ghedira.com/topics/suggestions`} />
                <meta property="og:title" content={`Suggestions`} />
                <meta property="og:description" content="this section is reserved for all user to ask questions about front end or back end development or even about soft skills" />
                <meta property="og:image" content="https://www.amir-ghedira.com/logo.png" />

            </Head>
            <main>
                <TopicsPage Topics={topics} Type={'suggestions'} />
            </main>
        </React.Fragment>
    )
}

export default SuggestionsPage




export const getServerSideProps = async () => {


    const result = await axiosInstance.get(`/topic/suggestions`)
    return {
        props: {
            topics: result.data.result
        },
    }

}