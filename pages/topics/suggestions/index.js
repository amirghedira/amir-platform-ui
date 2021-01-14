import TopicsPage from "../../../components/TopicsPage/TopicsPage"
import Axios from 'axios'
import Head from 'next/head'
import React from 'react'


const SuggestionsPage = ({ topics }) => {
    return (
        <React.Fragment>
            <Head>
                <title>Suggestions</title>
                <meta name="description" content="this section is reserved for all user to propose ideas opnions or even advices to that can improve this website or improve my development skills" />

            </Head>
            <main>
                <TopicsPage Topics={topics} Type={'suggestions'} />
            </main>
        </React.Fragment>
    )
}

export default SuggestionsPage




export const getServerSideProps = async () => {


    const result = await Axios.get(`https://mywebrestapi.herokuapp.com/topic/suggestions`)
    return {
        props: {
            topics: result.data.result
        },
    }

}