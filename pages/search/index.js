import React from 'react'
import Axios from 'axios'
import Tabs from '../../components/Tabs/Tabs'
const SearchPage = ({ projects }) => {
    return (
        <div style={{ minHeight: '70vh' }}>
            {projects.length > 0 ?
                <Tabs noEdit projects={projects} />
                :
                <div style={{ height: '70vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h5>No projects found!</h5>
                </div>

            }
        </div>
    )
}


export const getServerSideProps = async (context) => {
    const results = await Axios.get(`https://mywebrestapi.herokuapp.com/project/search?searchTerm=${context.query.searchTerm}`)
    return {
        props: {
            projects: results.data.projects
        }
    }
}

export default SearchPage;