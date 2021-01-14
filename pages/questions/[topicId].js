
import Axios from 'axios';
import Topic from '../../components/Topic/Topic'
import React from 'react'
import Head from 'next/head'
const TopicPage = ({ topic }) => {

    return (
        <React.Fragment>
            <Head>
                <title>{topic.title}</title>
                <meta name="description" content={topic.content} />

            </Head>
            <main>
                <Topic Topic={topic} type={'questions'} />
            </main>
        </React.Fragment>
    )
}


export const getServerSideProps = async (context) => {

    const result = await Axios.get('https://mywebrestapi.herokuapp.com/topic/' + context.params.topicId)
    return {
        props: {
            topic: result.data.result,
        },
    }


}


export default TopicPage;