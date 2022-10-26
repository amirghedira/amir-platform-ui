import React from "react";
import Tabs from "../components/Tabs/Tabs";
import Support from "../components/Support/Support.js";
import { Row, Col, Container } from "reactstrap";
import SidebarLeft from '../components/SidebarLeft/SidebarLeft'
import SidebarRight from '../components/SidebarRight/SidebarRight'
import classes from '../styles/index.module.css'
import Head from 'next/head'
import axios from "../utils/axios";
function Index(props) {

    const [projects, setProjects] = React.useState(props.projects)

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.classList.add("profile-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        return function cleanup() {
            document.body.classList.remove("profile-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }, [])

    const savechangesHandler = (info) => {
        const index = projects.findIndex(project => { return project._id === info.id })
        const Newproject = {
            ...projects[index],
            summary: info.content
        }
        axios.patch('/project/' + info.id, { propName: 'summary', value: info.content })
            .then(result => {
                const NewProjects = [...projects]
                NewProjects[index] = Newproject
                setProjects([...NewProjects])
            })
            .catch(err => { context.ErrorAccureHandler(); })

    }

    const deleteProjectHandler = (id) => {
        axios.delete('/project/deleteproject/' + id)
            .then(res => {
                const newProjects = [...projects];
                const projectIndex = projects.findIndex(project => project._id === id)
                newProjects.splice(projectIndex, 1);
                setProjects([...newProjects])
            })
            .catch(err => {
                console.log(err)
                // ErrorAccureHandler(500, "Connection to server has timedout")
            })
    }
    return (
        <main>
            <Head>
                <title>{`Amir Platform`}</title>
                <meta name="title" content={`Amir Platform`} />
                <meta property="og:url" content={`https://www.amir-ghedira.com`} />
                <meta property="og:title" content={'Amir Platform'} />
                <meta property="og:description" content="I'am an ISSATSO student ,studing software engineering am a web developper and an advanced javascript programmer dedicated to build backend applications with different technologies , Also am a React and Angular fan and i have a good knowledge about them." />
                <meta property="description" content="I'am an ISSATSO student ,studing software engineering am a web developper and an advanced javascript programmer dedicated to build backend applications with different technologies , Also am a React and Angular fan and i have a good knowledge about them." />
                <meta property="og:image" content="https://www.amir-ghedira.com/logo.png" />

            </Head>
            <Container fluid style={{ padding: '0' }}>
                <Row style={{ justifyContent: 'center' }}>
                    <Col className={classes.sideBarMenu} >
                        <SidebarLeft xs="2" md="3" lg="2" />
                    </Col>
                    <Col xs="12" sm="12" md="9" lg="8">
                        <Tabs projects={projects} deleteProject={deleteProjectHandler} savechanges={savechangesHandler} />
                    </Col>
                    <Col className={classes.sideBarProjects} xs="3" lg="2">
                        <SidebarRight projects={projects} topicsCount={props.topicsCount} />
                    </Col>
                </Row>
                <Support />
            </Container>
        </main>

    );
}

export const getServerSideProps = async () => {

    const result = await axios.get(`/project`)
    const resultCount = await axios.get('/topic/counttopic')
    return {
        props: {
            projects: result.data.result,
            topicsCount: resultCount.data.result
        },
    }
}

export default Index;
