import React from 'react'
import classes from './ProjectDetails.module.css'
import Lightbox from 'react-image-lightbox';
import {
    Container, Row, Col

} from 'reactstrap'
import Editmodal from '../../../../components/Editmodal/Editmodal'
import DeleteModal from '../../../../components/DeleteModal/DeleteModal'
import ProjectField from '../../../../components/ProjectField/ProjectField';
import ProjectColumn from '../../../../components/ProjectColumn/ProjectColumn';
import { ToastContainer, toast } from 'react-toastify';
import GlobalContext from '../../../../context/GlobalContext'
import 'react-toastify/dist/ReactToastify.css';
import PostCard from '../../../../components/PostCard/PostCard';
import CommentSection from '../../../../components/CommentSection/CommentSection'
import axios from '../../../../utils/axios';
import Axios from 'axios';
import Head from 'next/head'

const Details = (props) => {
    const context = React.useContext(GlobalContext)
    //Loading Handlers
    const [project, setProject] = React.useState(props.project)

    //========
    const [errorMessages, SetErrorMessqge] = React.useState('');

    const [modalprops, setmodalprops] = React.useState({
        value: null,
        show: false,
        sectionname: null,
        propname: null
    })
    const [deletemodalprops, setdeletemodalprops] = React.useState({
        show: false,
        id: null,
        commentorname: null
    });



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


    const updateDownloadHandler = () => {
        axios.patch('/project/updatedownloads/' + project._id, { downloadcount: project.downloadcount + 1 })
            .then(result => {

                setProject(
                    {
                        ...project,
                        downloadcount: project.downloadcount + 1

                    }
                )
            })
            .catch(err => { context.ErrorAccureHandler(500, "Connection to server has timedout") })
    }

    const submitCommentHandler = (obj) => {

        if (project.commentsCount === 0 || context.memberInfo.ip !== project.Comments[project.commentsCount - 1].ip) {

            axios.post('/project/postcomments/' + project._id, { comment: NewComment, commentsCount: project.commentsCount + 1 })
                .then(async (result) => {
                    setProject(
                        {
                            ...project,
                            Comments: [...project.Comments, { ...NewComment, _id: result.data._id, date: result.data.date }],
                            commentsCount: project.commentsCount + 1
                        }

                    )
                    if (obj.autor !== 'admin')
                        await axios.post('/notification', { id: result.data._id, content: `user ${obj.autor} has commented ${project.name} project`, link: `/project/${project.name}/${project.technologie}/${project._id}` })

                })
                .catch(err => {
                    context.ErrorAccureHandler(500, "Connection to server has timedout");
                })

        } else {

            toast.error('You already posted a comment', { position: toast.POSITION.BOTTOM_RIGHT })
        }



    }

    const UpdateGitViewerHandler = () => {
        axios.patch('/project/updategitviewers/' + project._id, { gitviewers: project.gitViewers + 1 })
            .then(result => {
                const newProject = {
                    ...project,
                    gitViewers: project.gitViewers + 1
                }
                setProject(newProject)
            })
            .catch(err => { context.ErrorAccureHandler(500, "Connection to server has timedout") })
    }

    const editFieldHandler = (infos) => {
        axios.patch('/project/' + project._id, { propName: infos.propname, value: infos.value })
            .then(result => {
                const value = infos.value
                const item = infos.propname;
                console.log(item)
                setProject({
                    ...project,
                    [item]: value
                })
            })
            .catch(err => { context.ErrorAccureHandler(); })
        closehandler()
    }
    const closehandler = () => {
        setmodalprops({
            value: null,
            show: false,
            sectionname: null,
            propname: null
        })
    }
    const Deletemodalclosehandler = () => {
        setdeletemodalprops({
            show: false,
            commentorname: null,
            id: null
        })
    }
    const editHandler = (infos) => {
        setmodalprops({
            defaultvalue: infos.defaultvalue,
            show: true,
            sectionname: infos.sectionname,
            propname: infos.propname
        })
    }
    const showdeletemodalHandler = (info) => {
        setdeletemodalprops({
            show: true,
            id: info._id,
            commentorname: info.autor
        })


    }
    const deleteCommentHandler = (commentid) => {

        const commentIndex = project.Comments.findIndex(comment => { return comment._id === commentid })
        let newComments = project.Comments
        newComments.splice(commentIndex, 1)
        axios.patch('/project/deletecomment/' + project._id, { Comments: newComments, commentsCount: newComments.length })
            .then(() => {
                const newProject = {
                    ...project,
                    Comments: newComments,
                    commentsCount: newComments.length
                }
                setProject({ ...newProject })
                axios.delete(`/notification/${commentid}`)
                    .then()
                    .catch(err => {
                        ErrorAccureHandler(500, "Connection to server has timedout");
                    })

            })

            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout");
            })
        Deletemodalclosehandler();

    }

    return (
        <React.Fragment>
            <Head>
                <title>{`${project.name} | Amir Platform`}</title>
                <meta name="title" content={`${project.name} | Amir Platform`} />
                <meta name="description" content={project.overview} />
                <link rel="canonical" href={`https://www.amir-ghedira.com/project/${project.name}/${project.technologie}/${project._id}`} />
                <meta property="og:url" content={`https://www.amir-ghedira.com/project/${project.name}/${project.technologie}/${project._id}`} />
                <meta property="og:title" content={project.name} />
                <meta name="robots" content="all" />
                <meta property="og:description" content={project.overview} />
                {project.imagesurl.length > 0 ?
                    <meta property="og:image" content={project.imagesurl[Math.floor(Math.random() * project.imagesurl.length)]} />
                    :
                    <meta property="og:image" content="https://www.amir-ghedira.com/logo.png" />

                }

            </Head>
            <main>
                <article style={{ minHeight: '86.2vh' }}>
                    <div className="section" style={{ backgroundColor: 'transparent', marginTop: '40px' }}>
                        <Container fluid>
                            <Row >
                                <Col md="10" xl="3" >
                                    <ProjectColumn project={project} githubButtonFunction={UpdateGitViewerHandler}
                                        downloadButtonFunction={updateDownloadHandler}
                                        editFunction={editHandler} logstatus={context.token} />
                                </Col>
                                <Col md="10" xl="9">
                                    <ProjectField
                                        key='1'
                                        sectionname="Overview"
                                        propname='documentation'
                                        logstatus={context.token}
                                        editFunction={editHandler}
                                        content={project.documentation}
                                        icon={<i className="fas fa-globe fa-3x" style={{ marginBottom: '20px' }}></i>} />
                                </Col >
                            </Row>
                            {
                                project.Comments.length > 0 ?
                                    project.Comments.map((comment) => {
                                        return <PostCard key={comment._id}
                                            ip={comment.ip} autor={comment.autor}
                                            content={comment.content}
                                            date={comment.date}
                                            token={context.token}
                                            banMemberFunction={() => { context.banMember({ name: comment.autor, ip: comment.ip, content: comment.content }) }}
                                            deleteFunction={() => showdeletemodalHandler({ autor: comment.autor, _id: comment._id })} />
                                    })
                                    :
                                    <Row>
                                        <Col style={{ display: 'flex', minHeight: '40vh' }}>
                                            <div style={{ margin: 'auto' }}>
                                                <h5><strong>No comments yet!</strong></h5>
                                            </div>
                                        </Col>
                                    </Row>

                            }

                            <Row style={{ margin: '20px' }}>
                                <Col className={classes.commentSection}>
                                    <CommentSection
                                        token={context.token}
                                        image={context.UserProfile?.profileimage}
                                        submitCommment={submitCommentHandler}
                                        errormessage={errorMessages}
                                        active={true}
                                        banned={context.getBanStatus()}
                                        defaultmessage='Post a comment'
                                        clearErrorMsg={() => SetErrorMessqge('')}
                                    />
                                </Col>
                            </Row>

                        </Container>
                    </div>
                    <Editmodal
                        show={modalprops.show}
                        savechangesfunction={editFieldHandler}
                        handleClose={closehandler}
                        defaultvalue={modalprops.defaultvalue}
                        propname={modalprops.propname}
                        objectedit={modalprops.sectionname}
                    />
                    <DeleteModal
                        show={deletemodalprops.show}
                        deleteCommentFunction={deleteCommentHandler}
                        handleClose={Deletemodalclosehandler}
                        commentorname={deletemodalprops.commentorname}
                        commentorid={deletemodalprops.id}
                    />
                    <ToastContainer />
                </article >
            </main>
        </React.Fragment>

    )
}

export const getServerSideProps = async (context) => {

    const projectId = context.params.projectId
    const res = await Axios.get('http://localhost:5000/project/' + projectId)
    return {
        props: {
            project: res.data.result
        }
    }
}


export default Details
