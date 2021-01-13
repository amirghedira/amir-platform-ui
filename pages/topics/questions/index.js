import TopicsPage from "../../../components/TopicsPage/TopicsPage"
import Axios from 'axios'




const QuestionsPage = ({ topics }) => {


    return <TopicsPage Topics={topics} Type={'questions'} />
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