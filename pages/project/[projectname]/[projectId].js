import React from 'react'
import classes from './ProjectDetails.module.css'

import {
    Container, Row, Col

} from 'reactstrap'
import Editmodal from '../../../components/Editmodal/Editmodal'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import ProjectField from '../../../components/ProjectField/ProjectField';
import ProjectColumn from '../../../components/ProjectColumn/ProjectColumn';
import { toast } from 'react-toastify';
import GlobalContext from '../../../context/GlobalContext'
import PostCard from '../../../components/PostCard/PostCard';
import CommentSection from '../../../components/CommentSection/CommentSection'
import axios from '../../../utils/axios';
import Head from 'next/head'
import EditDocumentationModal from '../../../components/EditDocumentationModal/EditDocumentationModal';

const Details = (props) => {
    const context = React.useContext(GlobalContext)
    const [project, setProject] = React.useState(props.project)
    const [errorMessages, SetErrorMessqge] = React.useState('');
    const [showEditDocumentationModal, setShowEditDocumentationModal] = React.useState(false)
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
        axios.patch('/project/updategitviewers/' + project._id)
            .then(result => {
                const newProject = {
                    ...project,
                    gitViewers: result.data.gitViewers
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
                setProject({
                    ...project,
                    [item]: value
                })
            })
            .catch(err => { context.ErrorAccureHandler(); })
        closehandler()
    }
    const editDocumentationHandler = (value) => {

        axios.patch('/project/' + project._id, { propName: 'documentation', value: value })
            .then(result => {
                setShowEditDocumentationModal(false)
                setProject({
                    ...project,
                    documentation: value
                })
            })
            .catch(err => { context.ErrorAccureHandler(); })
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
    const addprojectImageHandler = (images) => {
        const fd = new FormData();
        if (images)
            for (const key of Object.keys(images)) {
                fd.append('projectimages', images[key])
            }
        axios.patch('/project/addprojectimages/' + project._id, fd)
            .then(result => {
                setProject({
                    ...project,
                    imagesurl: [...project.imagesurl, ...result.data.imageurls]
                })
            })
            .catch(err => {
                context.ErrorAccureHandler(500, "Connection to server has timedout")
            })

    }
    const deleteProjectImageHandler = (image) => {
        const imageindex = project.imagesurl.findIndex(projectimage => { return projectimage === image });
        const newimages = [...project.imagesurl];
        newimages.splice(imageindex, 1);
        axios.patch('/project/deleteprojectimage/' + project._id, { imagetodelete: image, newimages: newimages })
            .then(result => {
                setProject({
                    ...project,
                    imagesurl: newimages
                })
            })
            .catch(err => {
                context.ErrorAccureHandler(500, "Connection to server has timedout")
            })
    }


    return (
        <React.Fragment>
            <Head>
                <title>{`${project.name} | Amir Platform`}</title>
                <meta name="title" content={`${project.name} | Amir Platform`} />
                <meta name="description" content={project.overview} />
                <meta property="og:url" content={`https://www.amirghedira.com/project/${project.name.replace(/ /g, '-')}/${project.technologie.replace(/ /g, '-')}/${project._id}`} />
                <meta property="og:title" content={project.name} />
                <meta property="og:description" content={project.overview} />
                {project.imagesurl.length > 0 ?
                    <meta property="og:image" content={project.imagesurl[Math.floor(Math.random() * project.imagesurl.length)]} />
                    :
                    <meta property="og:image" content="https://www.amirghedira.com/logo.png" />

                }

            </Head>
            <main>
                <article style={{ minHeight: '86.2vh' }}>
                    <div className="section" style={{ backgroundColor: 'transparent', marginTop: '40px' }}>
                        <Container fluid>
                            <Row >
                                <Col sm="12" md="4" xl="3" >
                                    <ProjectColumn
                                        project={project}
                                        addprojectImage={addprojectImageHandler}
                                        deleteProjectImage={deleteProjectImageHandler}
                                        githubButtonFunction={UpdateGitViewerHandler}
                                        downloadButtonFunction={updateDownloadHandler}
                                        editFunction={editHandler} logstatus={context.currentUser} />
                                </Col>
                                <Col sm="12" md="8" xl="9">
                                    <ProjectField
                                        key='1'
                                        sectionname="Documentation"
                                        propname='documentation'
                                        logstatus={context.currentUser}
                                        editFunction={() => setShowEditDocumentationModal(true)}
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
                                            addedBy={comment.addedBy}
                                            connected={context.currentUser || false}
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
                                        connected={context.currentUser || false}
                                        image={context.currentUser?.profileimage}
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
                    <EditDocumentationModal
                        show={showEditDocumentationModal}
                        savechangesfunction={editDocumentationHandler}
                        handleClose={() => setShowEditDocumentationModal(false)}
                        defaultValue={project.documentation}
                    />
                    <DeleteModal
                        show={deletemodalprops.show}
                        deleteCommentFunction={deleteCommentHandler}
                        handleClose={Deletemodalclosehandler}
                        commentorname={deletemodalprops.commentorname}
                        commentorid={deletemodalprops.id}
                    />
                </article >
            </main>
        </React.Fragment>
    );
}

export const getServerSideProps = async (context) => {

    const projectId = context.params.projectId
    const res = await axios.get('/project/' + projectId)

    return {
        props: {
            project: res.data.result
        }
    }
}


export default Details
