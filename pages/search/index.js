import React from 'react'
import Tabs from '../../components/Tabs/Tabs'
import axios from '../../utils/axios'
const SearchPage = ({ projects, searchTerm }) => {
    return (
        <div style={{ minHeight: '70vh' }}>
            <div>
                <h2 style={{ fontSize: '18px', fontWeight: '500', padding: '50px 0px 0px 30px' }}>
                    Search results for <span style={{ fontWeight: '600' }}>{searchTerm}</span>:
                </h2>
            </div>
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
    const results = await axios.get(`/project/search?searchTerm=${context.query.searchTerm}`)
    return {
        props: {
            projects: results.data.projects,
            searchTerm: context.query.searchTerm
        }
    }
}

export default SearchPage;