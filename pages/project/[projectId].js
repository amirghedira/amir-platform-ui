import React from 'react'
import classes from './ProjectDetails.module.css'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {
    Container, Row, Col, Button, Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,

} from 'reactstrap'
import axios from '../../utils/axios'
import defaultAxios from 'axios'
import Editmodal from '../../components/Editmodal/Editmodal'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import ProjectField from '../../components/ProjectField/ProjectField';
import ProjectColumn from '../../components/ProjectColumn/ProjectColumn';
import { ToastContainer, toast } from 'react-toastify';
import GlobalContext from '../../context/GlobalContext'
import 'react-toastify/dist/ReactToastify.css';
import PostCard from '../../components/PostCard/PostCard';
import CommentSection from '../../components/CommentSection/CommentSection'


const Details = ({ project }) => {
    const context = React.useContext(GlobalContext)
    //Loading Handlers
    const [isLoadingPage, SetisLoadingPage] = React.useState(true)
    const [isloadingOverview, SetisLoadingOverview] = React.useState(false)
    const [isloadingwhat, SetisLoadingWhat] = React.useState(false)
    const [isloadingplatform, SetisLoadingPlatform] = React.useState(false)
    const [isloadingFeatures, SetisLoadingFeatures] = React.useState(false)

    //========
    const [errorMessages, SetErrorMessqge] = React.useState('');
    const [pills, setPills] = React.useState("2");
    const [projectimagemodal, setShowprojectimage] = React.useState(null)
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


    const showprojectimageHandler = (image) => {
        setShowprojectimage(
            <Lightbox
                mainSrc={image}
                enableZoom={false}
                onCloseRequest={() => setShowprojectimage(null)} />
        )

    }

    const submitCommentHandler = (obj) => {

        if (project.commentsCount === 0 || context.memberInfo.ip !== project.Comments[project.commentsCount - 1].ip) {
            context.postComment(project._id, { ...obj, ip: context.memberInfo.ip })

        } else {

            toast.error('You already posted a comment', { position: toast.POSITION.BOTTOM_RIGHT })
        }



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
        context.deleteCommentHandler(project._id, commentid);
        Deletemodalclosehandler();

    }

    return (
        <div style={{ minHeight: '86.2vh' }}>
            {projectimagemodal}
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
                                    <NavItem>
                                        <NavLink
                                            className={pills === "1" ? "active" : ""}
                                            onClick={() => {
                                                setPills("1");
                                                setMenuButtonClicked({ comment: false, photo: true, main: false });
                                            }}
                                        >
                                            <h4
                                                style={{ margin: 'auto', color: MenuButtonClicked.photo ? 'white' : 'black' }}
                                            >
                                                photos
                                                </h4>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={pills === "2" ? "active" : ""}
                                            onClick={() => {
                                                setPills("2");
                                                setMenuButtonClicked({ comment: false, photo: false, main: true });
                                            }}
                                        >
                                            <h4 style={{ margin: 'auto', color: MenuButtonClicked.main ? 'white' : 'black' }}>
                                                Main
                                                </h4>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={pills === "3" ? "active" : ""}
                                            onClick={() => {
                                                setPills("3");
                                                setMenuButtonClicked({ comment: true, photo: false, main: false });

                                            }}
                                        >
                                            <h4
                                                style={{ margin: 'auto', color: MenuButtonClicked.comment ? 'white' : 'black' }}>
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
                                                            onChange={(event) => { context.addprojectImage(project._id, event.target.files) }}
                                                            ref={inputFile}
                                                            multiple
                                                            type="file" />
                                                    </Col>

                                                </Row>
                                                : null
                                        }
                                        <Row className="collections">
                                            <Col md="6">

                                                {
                                                    project.imagesurl.map((image, i) => {
                                                        if (i < project.imagesurl.length / 2) {
                                                            return (
                                                                <div key={i}>

                                                                    {
                                                                        context.token ?
                                                                            <Button color="danger" onClick={() => { context.deleteProjectImage(project._id, image) }}>Delete</Button>

                                                                            : null
                                                                    }                                                                        <img
                                                                        alt="..."
                                                                        className="img-raised"
                                                                        src={image}
                                                                        onClick={() => { showprojectimageHandler(image) }}
                                                                        style={{ margin: '10px', width: '100%', maxHeight: '200px' }}
                                                                    ></img>

                                                                </div>
                                                            )
                                                        }
                                                        else
                                                            return null
                                                    })}
                                            </Col>
                                            <Col md="6">
                                                {project.imagesurl.map((image, i) => {
                                                    if (i >= project.imagesurl.length / 2) {
                                                        return (
                                                            <div key={i}>
                                                                {
                                                                    context.token ?
                                                                        <Button color="danger" onClick={() => { context.deleteProjectImage(project._id, image) }}>Delete</Button>

                                                                        : null
                                                                }                                                                       <img
                                                                    alt="..."
                                                                    className="img-raised"
                                                                    src={image}
                                                                    onClick={() => { showprojectimageHandler(image) }}
                                                                    style={{ margin: '10px', width: '100%', maxHeight: '200px' }}
                                                                ></img>

                                                            </div>
                                                        )
                                                    }

                                                    else
                                                        return null
                                                })}
                                            </Col>

                                        </Row>
                                    </Col>
                                </TabPane>
                                <TabPane tabId="pills2">
                                    <Row >
                                        <Col className="ml-auto mr-auto" md="10" xl="3" >
                                            <ProjectColumn project={project} githubButtonFunction={() => { context.UpdateGitViewer(project._id) }}
                                                downloadButtonFunction={() => { context.UpdateDownloadCount(project._id) }}
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
                                                image={context.token ? context.UserProfile.profileimage : null}
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
        </div >

    )
}

export const getServerSideProps = async (context) => {

    const projectId = context.params.projectId
    const res = await defaultAxios.get('https://mywebrestapi.herokuapp.com/project/' + projectId)
    return {
        props: {
            project: res.data.result
        }, // will be passed to the page component as props
    }
}


export default Details
