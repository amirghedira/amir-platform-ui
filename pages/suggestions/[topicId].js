import Topic from '../../components/Topic/Topic'
import React from 'react'
import Head from 'next/head'
import axios from '../../utils/axios'

const TopicPage = ({ topic }) => {
    <React.Fragment>
        <Head>
            <title>{`${topic.title} | Amir Platform`}</title>
            <meta name="title" content={`${topic.title} | Amir Platform`} />
            <meta name="description" content={topic.content} />
            <meta property="og:url" content={`https://www.amirghedira.com/suggestions/${topic._id}`} />
            <meta property="og:title" content={`${topic.title}`} />
            <meta property="og:description" content={topic.content} />
            <meta property="og:image" content="https://www.amirghedira.com/logo.png" />
        </Head>
        <main>
            <Topic Topic={topic} type={'suggestions'} />
        </main>
    </React.Fragment>
}


export const getServerSideProps = async (context) => {

    const result = await axios.get('/topic/' + context.params.topicId)
    return {
        props: {
            topic: result.data.result
        }
    }


}


export default TopicPage;