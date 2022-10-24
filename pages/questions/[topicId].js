
import Axios from 'axios';
import Topic from '../../components/Topic/Topic'
import React from 'react'
import Head from 'next/head'
const TopicPage = ({ topic }) => {

    return (
        <React.Fragment>
            <Head>
                <title>{`${topic.title} | Amir Platform`}</title>
                <meta name="title" content={`${topic.title} | Amir Platform`} />
                <meta name="description" content={topic.content} />
                <link rel="canonical" href={`https://www.amir-ghedira.com/questions/${topic._id}`} />
                <meta property="og:url" content={`https://www.amir-ghedira.com/questions/${topic._id}`} />
                <meta property="og:title" content={`${topic.title}`} />
                <meta property="og:description" content={topic.content} />
                <meta property="og:image" content="https://www.amir-ghedira.com/logo.png" />

            </Head>
            <main>
                <Topic Topic={topic} type={'questions'} />
            </main>
        </React.Fragment>
    )
}


export const getServerSideProps = async (context) => {

    const result = await Axios.get('http://localhost:5000/topic/' + context.params.topicId)
    return {
        props: {
            topic: result.data.result,
        },
    }


}


export default TopicPage;