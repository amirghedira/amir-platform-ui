import TopicsPage from "../../../components/TopicsPage/TopicsPage"
import React from 'react'
import Head from 'next/head'
import axios from "../../../utils/axios"



const QuestionsPage = ({ topics }) => {


    return (
        <React.Fragment>
            <Head>
                <title>{`Questions | Amir Platform`}</title>
                <meta name="title" content={`Questions | Amir Platform`} />
                <meta name="description" content="this section is reserved for all user to ask questions about front end or back end development or even about soft skills" />
                <meta property="og:url" content={`https://www.amirghedira.com/topics/questions`} />
                <meta property="og:title" content={`Questions`} />
                <meta property="og:description" content="this section is reserved for all user to ask questions about front end or back end development or even about soft skills" />
                <meta property="og:image" content="https://www.amirghedira.com/logo.png" />
            </Head>
            <main>
                <TopicsPage Topics={topics} Type={'questions'} />
            </main>
        </React.Fragment>
    )
}

export default QuestionsPage




export const getServerSideProps = async () => {


    const result = await axios.get(`/topic/questions`)
    return {
        props: {
            topics: result.data.result
        },
    }

}