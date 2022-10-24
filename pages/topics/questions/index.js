import TopicsPage from "../../../components/TopicsPage/TopicsPage"
import Axios from 'axios'
import React from 'react'
import Head from 'next/head'



const QuestionsPage = ({ topics }) => {


    return (
        <React.Fragment>
            <Head>
                <title>{`Questions | Amir Platform`}</title>
                <meta name="title" content={`Questions | Amir Platform`} />
                <meta name="description" content="this section is reserved for all user to ask questions about front end or back end development or even about soft skills" />
                <link rel="canonical" href={`https://www.amir-ghedira.com/topics/questions`} />
                <meta property="og:url" content={`https://www.amir-ghedira.com/topics/questions`} />
                <meta property="og:title" content={`Questions`} />
                <meta property="og:description" content="this section is reserved for all user to ask questions about front end or back end development or even about soft skills" />
                <meta property="og:image" content="https://www.amir-ghedira.com/logo.png" />
            </Head>
            <main>
                <TopicsPage Topics={topics} Type={'questions'} />
            </main>
        </React.Fragment>
    )
}

export default QuestionsPage




export const getServerSideProps = async () => {


    const result = await Axios.get(`http://localhost:5000/topic/questions`)
    return {
        props: {
            topics: result.data.result
        },
    }

}