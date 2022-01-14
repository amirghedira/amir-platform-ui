import React from 'react'
import classes from './ProjectDetails.module.css'
import Lightbox from 'react-image-lightbox';
import {
    Container, Row, Col, Button, Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,

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
import Head from 'next/head'


const Details = (props) => {
    const context = React.useContext(GlobalContext)
    //Loading Handlers
    const [project, setProject] = React.useState(props.project)
    const [isloadingOverview, SetisLoadingOverview] = React.useState(false)
    const [isloadingwhat, SetisLoadingWhat] = React.useState(false)
    const [isloadingplatform, SetisLoadingPlatform] = React.useState(false)
    const [isloadingFeatures, SetisLoadingFeatures] = React.useState(false)

    //========
    const [errorMessages, SetErrorMessqge] = React.useState('');
    const [pills, setPills] = React.useState("2");
    const [showProjectImage, setShowProjectImage] = React.useState(false)
    const [displayImageIndex, setDisplayImageIndex] = React.useState(0)
    const [MenuButtonClicked, setMenuButtonClicked] = React.useState({
        comments: false,
        main: true,
        photos: false
    })

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
    const inputFile = React.useRef(null)



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
                console.log(err)
                context.ErrorAccureHandler(500, "Connection to server has timedout")
            })

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

    const deleteProjectImageHandler = (image) => {
        const imageindex = project.imagesurl.findIndex(projectimage => { return projectimage === image });
        const newimages = project.imagesurl;
        newimages.splice(imageindex, 1);
        axios.patch('/project/deleteprojectimage/' + project._id, { imagetodelete: image, newimages: newimages })
            .then(result => {
                setProject({
                    ...project,
                    imagesurl: newimages
                })
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout")
            })
    }
    const editFieldHandler = (infos) => {
        let loadingComponent = null
        switch (infos.propname) {
            case 'overview':
                loadingComponent = (val) => { SetisLoadingOverview(val) }
                break;
            case 'features':
                loadingComponent = (val) => { SetisLoadingFeatures(val) }
                break;
            case 'platform':
                loadingComponent = (val) => { SetisLoadingPlatform(val) }
                break;
            default:
                loadingComponent = (val) => { SetisLoadingWhat(val) }
                break;
        }
        loadingComponent(true)
        axios.patch('/project/' + project._id, { propName: infos.propname, value: infos.value })
            .then(result => {
                const value = infos.value
                const item = infos.propname;
                setProject({
                    ...project,
                    [item]: value
                })
                loadingComponent(false)
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
                <link rel="canonical" href={`https://www.amir-ghedira.com/project/${project.name.replace(/ /g, '-')}/${project.technologie.replace(/ /g, '-')}/${project._id}`} />
                <meta property="og:url" content={`https://www.amir-ghedira.com/project/${project.name.replace(/ /g, '-')}/${project.technologie.replace(/ /g, '-')}/${project._id}`} />
                <meta property="og:title" content={project.name} />
                <meta name="robots" content="index,nofollow" />
                <meta name="googlebot" content="index,nofollow" />
                <meta property="og:description" content={project.overview} />
                {project.imagesurl.length > 0 ?
                    <meta property="og:image" content={project.imagesurl[Math.floor(Math.random() * project.imagesurl.length)]} />
                    :
                    <meta property="og:image" content="https://www.amir-ghedira.com/logo.png" />

                }

            </Head>
            <main>
                <article style={{ minHeight: '86.2vh' }}>
                    {showProjectImage &&
                        <Lightbox
                            mainSrc={project.imagesurl[displayImageIndex]}
                            enableZoom={false}
                            nextSrc={project.imagesurl[(displayImageIndex + 1) % project.imagesurl.length]}
                            prevSrc={project.imagesurl[(displayImageIndex + project.imagesurl.length - 1) % project.imagesurl.length]}
                            onCloseRequest={() => setShowProjectImage(false)}
                            onMovePrevRequest={() =>
                                setDisplayImageIndex((displayImageIndex + project.imagesurl.length - 1) % project.imagesurl.length)
                            }
                            onMoveNextRequest={() =>
                                setDisplayImageIndex((displayImageIndex + 1) % project.imagesurl.length)

                            }
                            onCloseRequest={() => setShowProjectImage(false)} />}
                    <div className="section" style={{ backgroundColor: 'transparent', marginTop: '40px' }}>
                        <Container>
                            <Row style={{ maxHeight: 'px' }}>
                                <Col className="ml-auto mr-auto" md="12" xl="12">
                                    <div className="nav-align-center">
                                        <Nav
                                            className="nav-pills-info"
                                            pills
                                            role="tablist"
                                        >
                                            <NavItem className={classes.navItem}>
                                                <NavLink
                                                    className={pills === "1" ? "active" : ""}
                                                    onClick={() => {
                                                        setPills("1");
                                                        setMenuButtonClicked({ comment: false, photo: true, main: false });
                                                    }}
                                                >
                                                    <h4 className={classes.itemContentText} style={{ margin: 'auto', color: MenuButtonClicked.photo ? 'white' : 'black' }}>
                                                        photos
                                                    </h4>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className={classes.navItem}>
                                                <NavLink
                                                    className={pills === "2" ? "active" : ""}
                                                    onClick={() => {
                                                        setPills("2");
                                                        setMenuButtonClicked({ comment: false, photo: false, main: true });
                                                    }}
                                                >
                                                    <h4 className={classes.itemContentText} style={{ margin: 'auto', color: MenuButtonClicked.main ? 'white' : 'black' }}>
                                                        Main
                                                    </h4>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className={classes.navItem}>
                                                <NavLink
                                                    className={pills === "3" ? "active" : ""}
                                                    onClick={() => {
                                                        setPills("3");
                                                        setMenuButtonClicked({ comment: true, photo: false, main: false });

                                                    }}>

                                                    <h4 className={classes.itemContentText} style={{ margin: 'auto', color: MenuButtonClicked.comment ? 'white' : 'black' }}>
                                                        Comments
                                                    </h4>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </Col>
                                <Col className="ml-auto mr-auto" md="12" style={{ marginTop: '50px' }}>
                                    <TabContent className="gallery" activeTab={"pills" + pills}>

                                        <TabPane tabId="pills1">
                                            <Col className="ml-auto mr-auto" md="10">
                                                {
                                                    context.token ?
                                                        <Row>
                                                            <Col className={classes.Navbar}>
                                                                <Button color="warning"
                                                                    onClick={() => { inputFile.current.click() }}>
                                                                    <strong>Add new image</strong>
                                                                </Button>

                                                                <input
                                                                    style={{ display: 'none' }}
                                                                    onChange={(event) => { addprojectImageHandler(event.target.files) }}
                                                                    ref={inputFile}
                                                                    multiple
                                                                    type="file" />
                                                            </Col>

                                                        </Row>
                                                        : null
                                                }
                                                <Row>
                                                    {
                                                        project.imagesurl.map((image, i) => {

                                                            return (
                                                                <Col xs="12" md="6" key={i}>
                                                                    <div className={classes.projectImageContainer}>
                                                                        {context.token && <div className={classes.deleteContainer}>
                                                                            <i className={`fas fa-times-circle ${classes.deleteIcon}`} onClick={() => deleteProjectImageHandler(image)}></i>
                                                                        </div>}
                                                                        <img
                                                                            alt="..."
                                                                            className={`img-raised ${classes.projectImage}`}
                                                                            src={image}
                                                                            onClick={() => { setDisplayImageIndex(i + 1); setShowProjectImage(true) }}
                                                                            style={{ margin: '10px', width: '100%', maxHeight: '200px', cursor: 'pointer', objectFit: 'cover' }} />
                                                                    </div>

                                                                </Col>
                                                            )


                                                        })}
                                                </Row>
                                            </Col>
                                        </TabPane>
                                        <TabPane tabId="pills2">
                                            <Row >
                                                <Col className="ml-auto mr-auto" md="10" xl="3" >
                                                    <ProjectColumn project={project} githubButtonFunction={UpdateGitViewerHandler}
                                                        downloadButtonFunction={updateDownloadHandler}
                                                        editFunction={editHandler} logstatus={context.token} />
                                                </Col>
                                                <Col className="ml-auto mr-auto" md="10" xl="9">
                                                    <ProjectField
                                                        key='1'
                                                        sectionname="Overview"
                                                        propname='overview'
                                                        loadingstatus={isloadingOverview}
                                                        logstatus={context.token}
                                                        editFunction={editHandler}
                                                        content={project.overview}
                                                        icon={<i className="fas fa-globe fa-3x" style={{ marginBottom: '20px' }}></i>} />
                                                    <ProjectField key='2'
                                                        sectionname="Features / Technologies"
                                                        propname='features'
                                                        loadingstatus={isloadingFeatures}
                                                        logstatus={context.token}
                                                        editFunction={editHandler}
                                                        content={project.features}
                                                        icon={<i className="fas fa-hockey-puck fa-3x" style={{ marginBottom: '20px' }}></i>} />

                                                    <ProjectField key='3'
                                                        sectionname="Platform & Libraries"
                                                        propname='platform'
                                                        loadingstatus={isloadingplatform}
                                                        logstatus={context.token}
                                                        editFunction={editHandler}
                                                        content={project.platform}
                                                        icon={< i className="fas fa-bookmark fa-3x" style={{ marginBottom: '20px' }
                                                        }></i >} />
                                                    < ProjectField key='4'
                                                        sectionname="What I learned ?"
                                                        propname='whatlearned'
                                                        loadingstatus={isloadingwhat}
                                                        logstatus={context.token}
                                                        editFunction={editHandler}
                                                        content={project.whatlearned}
                                                        icon={< i className="fas fa-graduation-cap fa-3x" style={{ marginBottom: '20px' }
                                                        }></i >} />
                                                </Col >
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="pills3">
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
                                        </TabPane>
                                    </TabContent>
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
    const res = await axios.get('/project/' + projectId)
    return {
        props: {
            project: res.data.result
        }
    }
}


export default Details
