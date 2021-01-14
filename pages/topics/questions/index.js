import TopicsPage from "../../../components/TopicsPage/TopicsPage"
import Axios from 'axios'
import React from 'react'
import Head from 'next/head'



const QuestionsPage = ({ topics }) => {


    return (
        <React.Fragment>
            <Head>
                <title>Questions</title>
                <meta name="description" content="this section is reserved for all user to ask questions about front end or back end development or even about soft skills" />

            </Head>
            <main>
                <TopicsPage Topics={topics} Type={'questions'} />
            </main>
        </React.Fragment>
    )
}

export default QuestionsPage




export const getServerSideProps = async () => {


    const result = await Axios.get(`https://mywebrestapi.herokuapp.com/topic/questions`)
    return {
        props: {
            topics: result.data.result
        },
    }

}