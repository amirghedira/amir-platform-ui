import TopicsPage from "../../../components/TopicsPage/TopicsPage"
import Axios from 'axios'




const SuggestionsPage = ({ topics }) => {


    return <TopicsPage Topics={topics} Type={'suggestions'} />
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