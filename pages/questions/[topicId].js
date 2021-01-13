
import Axios from 'axios';
import Topic from '../../components/Topic/Topic'

const TopicPage = ({ topic }) => {

    return <Topic Topic={topic} type={'questions'} />
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