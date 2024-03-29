import React from 'react'
import {
    Container, Row, Col, Input, NavItem, NavLink, Nav, TabPane, TabContent, Button, DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown, Label, Table
} from 'reactstrap';
import axios from '../../utils/axios'
import classes from './AccountSettings.module.css'
import InputField from '../../components/InputField/InputField'
import { toast } from 'react-toastify';
import LinearProgress from '@mui/material/LinearProgress';
import Loading from '../../components/LoadingPage/LoadingPage'
import GlobalContext from '../../context/GlobalContext'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormatDate from '../../utils/FormatDate'
import EditDocumentationModal from '../../components/EditDocumentationModal/EditDocumentationModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { Checkbox } from '@mui/material';

const AccountSettings = () => {
    const context = React.useContext(GlobalContext)
    const [userProfile, setUserProfile] = React.useState(null)
    const [numberOfProjects, setNumberOfProjects] = React.useState(0)

    const [pills, setPills] = React.useState("1");
    const [newsboxFocused, setnewsBoxFocused] = React.useState(false);
    const [hoveronprofileimg, sethoveronprofileimg] = React.useState(false)
    const [editablePersonal, SetEditablePersonal] = React.useState(false)
    const [editableUsername, SetEditableUsername] = React.useState(false)
    const [editablePassword, setEditablePassword] = React.useState(false);
    const [editableContact, SetEditableContact] = React.useState(false)
    const [loadingPage, SetLoadingPage] = React.useState(true);
    const [LoadingImage, setloadingImage] = React.useState(false);
    const [progress, setprogress] = React.useState(null);
    const [editTitle, SetEdittile] = React.useState(false);
    const [editContent, Seteditcontent] = React.useState(false);
    const [projectImages, setProjectImages] = React.useState(null);
    const [projectErrField, SetProjectErrField] = React.useState('')
    const [selectedimage, setSelectedimage] = React.useState(null);
    const [selectedCvFile, setSelectedCvFile] = React.useState(null)
    const [NewscontentFocused, setNewscontentFocused] = React.useState(false)
    const [addSkill, setaddSkill] = React.useState(false)
    const [iconFile, setIconfile] = React.useState(null)
    const [MenuButtonClicked, setMenuButtonClicked] = React.useState({
        general: true,
        photosetting: false,
        addproject: false,
        news: false,
        banlist: false,
    })

    const [showEditDocumentationModal, setShowEditDocumentationModal] = React.useState(false)
    const [newProject, setNewProject] = React.useState({})


    const inputFile = React.useRef(null);
    const inputFile2 = React.useRef(null);


    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.title = 'Settings'
        document.body.classList.add("index-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("index-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }, [])

    React.useEffect(() => {
        if (!context.loadingContext) {
            if (context.currentUser) {
                axios.get('/user')
                    .then(res => {
                        setUserProfile(res.data)
                        SetLoadingPage(false)
                    })
                axios.get('/project/number')
                    .then(res => {
                        setNumberOfProjects(res.data.projects)
                    })
            } else {
                context.ErrorAccureHandler(401, 'You are not authorized to access this page');
            }

        }
    }, [context.loadingContext, context.bannedUsers])

    const onUploadProgress = (ProgressEvent) => {
        var percentcompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
        setprogress(percentcompleted)

    }

    const savePersonalHandler = (info) => {
        let newProfile = { ...userProfile }
        for (let element of info) {
            newProfile[element.propName] = element.value;
        }
        const onUploadProgress = (ProgressEvent) => {
            var percentcompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            setprogress(percentcompleted)

        }
        axios.patch('/user', info, { onUploadProgress: onUploadProgress })
            .then(result => {
                setUserProfile({ ...newProfile });
                SetEditablePersonal(false)
                setprogress(0)
            })
            .catch(err => {
                context.ErrorAccureHandler();
            })
    }
    const saveSecurityHandler = (info) => {


        const onUploadProgress = (ProgressEvent) => {
            var percentcompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            setprogress(percentcompleted)

        }
        if (editableUsername && !editablePassword) {
            let newProfile = { ...userProfile }
            newProfile['username'] = info.username;
            let obj = [{ propName: 'username', value: info.username }];
            axios.patch('/user', obj, { onUploadProgress: onUploadProgress })
                .then(result => {
                    setUserProfile({ ...newProfile });
                    SetEditableUsername(false)
                    setprogress(0)
                })
                .catch(err => {
                    setprogress(0)
                    context.ErrorAccureHandler();
                })

        }
        else {

            axios.patch('/user/updatepassword', {
                username: userProfile.username,
                oldpassword: info.oldpassword,
                password: info.newpassword
            }, { onUploadProgress: onUploadProgress })
                .then(result => {
                    toast.success(result.data.message, { position: toast.POSITION.BOTTOM_RIGHT })
                    setEditablePassword(false)
                    SetEditableUsername(false)
                    setprogress(0)

                })
                .catch(err => {
                    if (err.response.status === 409) {
                        toast.error(err.response.data.message, { position: toast.POSITION.BOTTOM_RIGHT })
                        setprogress(0)

                    }
                })
        }


    }
    const saveContactHandler = (info) => {
        let newProfile = { ...userProfile }
        for (let element of info) {
            newProfile[element.propName] = element.value;
        }

        axios.patch('/user', info, { onUploadProgress: onUploadProgress })
            .then(result => {
                setUserProfile({ ...newProfile });
                SetEditableContact(false)
                setprogress(0)
            })
            .catch(err => {
                context.ErrorAccureHandler();
            })
    }
    const saveCvFileHandler = () => {
        if (selectedCvFile) {
            const fd = new FormData();
            fd.append("cvfile", selectedCvFile);

            axios.patch('/user/upload-cv', fd, { onUploadProgress: onUploadProgress })
                .then(result => {
                    setUserProfile({
                        ...userProfile,
                        cvFile: result.data.fileUrl
                    })
                    setprogress(0)
                })
                .catch(err => {
                    context.ErrorAccureHandler()
                });

        } else {
            toast.error('No files entered', { position: toast.POSITION.BOTTOM_RIGHT })
        }
    }
    const saveimageHandler = () => {
        if (selectedimage) {
            const fd = new FormData();
            fd.append("bgimage", selectedimage);
            fd.append("oldimagelink", userProfile.backgroundimage)

            axios.patch('/user/updatebgimage', fd, { onUploadProgress: onUploadProgress })
                .then(result => {
                    setUserProfile({
                        ...userProfile,
                        backgroundimage: result.data.imageurl
                    })
                    setprogress(0)
                })
                .catch(err => {
                    context.ErrorAccureHandler()
                });



        } else {
            toast.error('No files entered', { position: toast.POSITION.BOTTOM_RIGHT })
        }

    }
    const deleteSkillHandler = (id) => {
        axios.delete('/user/deleteskill/' + id, { onUploadProgress: onUploadProgress })
            .then(result => {

                setUserProfile({
                    ...userProfile,
                    skills: [...result.data.skills]
                })
                setprogress(0)

            })
            .catch(err => {
                context.ErrorAccureHandler()
            });
    }
    const addIconHandler = (desc) => {
        const fd = new FormData();
        fd.append("skillicon", iconFile);
        fd.append("description", desc);
        axios.patch('/user/addskill', fd, { onUploadProgress: onUploadProgress })
            .then(result => {
                setUserProfile({
                    ...userProfile,
                    skills: [...userProfile.skills, result.data.skill]
                })
                setprogress(0)
            })
            .catch(err => {
                context.ErrorAccureHandler()
            });

    }
    const editprofileImageHandler = (file) => {
        if (file) {
            const fd = new FormData();

            fd.append("profileimage", file);
            fd.append("oldimagelink", userProfile.profileimage)
            setloadingImage(true);
            axios.patch('/user/updateprofileimg', fd, { onUploadProgress: onUploadProgress })
                .then(result => {
                    setUserProfile({
                        ...userProfile,
                        profileimage: result.data.imageurl
                    })
                    setloadingImage(false);
                    setprogress(0)
                })
                .catch(err => {
                    context.ErrorAccureHandler()

                });


        }
    }
    const addImageHandler = (file) => {
        const fd = new FormData();
        fd.append("imagesofprofile", file);

        axios.patch('/user/uploadimage', fd, { onUploadProgress: onUploadProgress })
            .then(result => {
                let newImages = userProfile.images;
                newImages.push(result.data.imageurl)
                setUserProfile({
                    ...userProfile,
                    images: newImages
                })
                setprogress(0)
            })
            .catch(err => {
                context.ErrorAccureHandler()

            });



    }
    const deleteImageHandler = (image) => {
        const index = userProfile.images.findIndex(img => { return image === img });
        let newImages = userProfile.images;
        newImages.splice(index, 1);
        axios.patch('/user/deleteimage', { imagelink: image, images: newImages }
            , { onUploadProgress: onUploadProgress })
            .then(result => {
                setUserProfile(
                    {
                        ...userProfile,
                        images: newImages
                    }

                )
                setprogress(0)
            })
            .catch(err => { context.ErrorAccureHandler() })

    }
    const postNewsHandler = (info) => {

        setnewsBoxFocused(false)
        axios.patch('/user/postnews', { title: info.title, content: info.content }, { onUploadProgress: onUploadProgress })
            .then(result => {
                setUserProfile(
                    {
                        ...userProfile,
                        news: [...userProfile.news, { _id: result.data._id, title: info.title, content: info.content, date: result.data.date }]
                    }
                )
                setprogress(0);
            })
            .catch(err => { context.ErrorAccureHandler() })
    }
    const deleteNewsHandler = (id) => {
        let newNews = userProfile.news;
        const index = newNews.findIndex(element => { return element.id === id })
        newNews.splice(index, 1);

        axios.patch('/user/changenews', { news: newNews }, { onUploadProgress: onUploadProgress })
            .then(result => {
                setUserProfile({
                    ...userProfile,
                    news: newNews
                })
                setprogress(0)
            })
            .catch(err => { context.ErrorAccureHandler() })

    }
    const keypressedHandler = (keycode, info) => {
        if (keycode === 13) {
            SetEdittile(false);
            const i = userProfile.news.findIndex(element => { return element.id === info.id })
            let newNews = userProfile.news;
            newNews[i].title = info.title


            axios.patch('/user/changenews', { news: newNews }, { onUploadProgress: onUploadProgress })
                .then(result => {
                    setUserProfile({
                        ...userProfile,
                        news: newNews
                    })
                    setprogress(0)
                })
                .catch(err => { context.ErrorAccureHandler() })
        }

    }
    const saveNewsContent = (info) => {
        Seteditcontent(false)
        const i = userProfile.news.findIndex(element => { return element.id === info.id })
        let newNews = userProfile.news;
        newNews[i].content = info.content

        axios.patch('/user/changenews', { news: newNews }, { onUploadProgress: onUploadProgress })
            .then(result => {
                setUserProfile({
                    ...userProfile,
                    news: newNews
                })
                setprogress(0)
            })
            .catch(err => { context.ErrorAccureHandler() })
    }
    const postProjectHandler = () => {
        if (newProject.name === '' || newProject.status === '' || newProject.documentation === '' ||
            newProject.started === '' || newProject.technologie === '') {
            SetProjectErrField({ color: 'red', message: 'Please fill all inputs' });
        }
        else {
            addProjectHandler(newProject)
        }

    }

    const addProjectHandler = (inputs) => {
        const fd = new FormData();
        if (projectImages)
            for (const key of Object.keys(projectImages)) {
                fd.append('projectimages', projectImages[key])
            }

        fd.append('name', inputs.name);
        fd.append('started', inputs.started);
        fd.append('technologie', inputs.technologie);
        fd.append('summary', inputs.summary);
        fd.append('documentation', inputs.documentation);
        fd.append('whatlearned', inputs.whatlearned);
        fd.append('overview', inputs.overview);
        fd.append('status', inputs.status);
        fd.append('platform', inputs.platform);
        fd.append('features', inputs.features);
        fd.append('visibility', inputs.visibility || false);
        fd.append('github', inputs.github);
        fd.append('filelink', inputs.filelink);
        axios.post('/project', fd)
            .then(result => {
                SetProjectErrField({ color: 'green', message: 'Project Added successfully' });
            })
            .catch(err => {
                context.ErrorAccureHandler(500, "Connection to server has timedout")
            })


    }
    let NewsBox = null;
    if (newsboxFocused) {
        NewsBox = (
            <Col >
                <h4 className={classes.sectionTitel}>Post a news</h4>
                <Row >
                    <Col>
                        <Input id="title" type="text" placeholder="Title" style={{ borderRadius: '0 0 0 0' }} />
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <TextareaAutosize id="content" type="textarea" placeholder="News Content"
                            onFocus={() => { setNewscontentFocused(true) }}
                            onBlur={() => { setNewscontentFocused(false) }}
                            style={{
                                paddingLeft: '10px', marginTop: '10px',
                                minHeight: '150px', width: '100%', borderColor: NewscontentFocused ? '#007bff' : 'transparent'
                                , backgroundColor: NewscontentFocused ? 'white' : 'transparent'
                            }} />

                    </Col>
                </Row>
                <Row style={{ display: 'flex', paddingRight: '10px' }} >
                    <div style={{ flex: '1' }}></div>
                    <div>
                        <Button color="info" onClick={() => {
                            postNewsHandler({
                                title: document.getElementById('title').value,
                                content: document.getElementById('content').value
                            })
                        }}>Post</Button>
                        <Button color="danger"
                            style={{ marginLeft: '10px' }}
                            onClick={() => { setnewsBoxFocused(false) }}>
                            Cancel</Button>
                    </div>
                </Row>


            </Col>
        )
    } else {
        NewsBox = (<Col >
            <h4 className={classes.sectionTitel}>Post a news</h4>
            <Row >
                <Col>
                    <Input
                        type="text"
                        placeholder="New post"
                        onClick={() => { setnewsBoxFocused(true) }}
                        style={{ borderRadius: '0 0 0 0', marginBottom: '20px' }} />
                </Col>
            </Row>

        </Col>)
    }

    if (loadingPage) {
        return (<LoadingSpinner />)
    }
    else
        return (
            <div>
                <div>
                    {progress > 0 ?
                        <LinearProgress
                            variant="determinate"
                            color="secondary"
                            min={0}
                            value={progress}
                            style={{ position: 'fixed', top: '65px', left: '0', width: '100%', height: '5px', zIndex: '100' }}

                        />
                        :
                        null
                    }


                </div>
                <div className="section" style={{ backgroundColor: 'transparent', marginTop: '40px' }}>

                    <Container>
                        <Row>
                            <div className="nav-align-center">
                                <Nav
                                    className="nav-pills-info"
                                    pills
                                    role="tablist"
                                >
                                    <NavItem >
                                        <NavLink
                                            className={pills === "1" ? "active" : ""}
                                            onClick={() => {
                                                setPills("1");
                                                setMenuButtonClicked(
                                                    { general: true, photosetting: false, news: false, addproject: false, banlist: false }
                                                );
                                            }}
                                        >
                                            <h4 style={{ margin: 'auto', fontSize: '13px', color: MenuButtonClicked.general ? 'white' : 'black' }}>General</h4>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={pills === "2" ? "active" : ""}
                                            onClick={() => {
                                                setPills("2");
                                                setMenuButtonClicked(
                                                    { general: false, photosetting: true, news: false, addproject: false, banlist: false }
                                                );
                                            }}
                                        >
                                            <h4 style={{ margin: 'auto', fontSize: '13px', color: MenuButtonClicked.photosetting ? 'white' : 'black' }}>Photos Settings</h4>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={pills === "3" ? "active" : ""}
                                            onClick={() => {
                                                setPills("3");
                                                setMenuButtonClicked(
                                                    { general: false, photosetting: false, news: true, addproject: false, banlist: false }
                                                );
                                            }}
                                        >
                                            <h4 style={{ margin: 'auto', fontSize: '13px', color: MenuButtonClicked.news ? 'white' : 'black' }}>News</h4>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={pills === "4" ? "active" : ""}
                                            onClick={() => {
                                                setPills("4");
                                                setMenuButtonClicked(
                                                    { general: false, photosetting: false, news: false, addproject: true, banlist: false }
                                                );
                                            }}
                                        >
                                            <h4 style={{ margin: 'auto', fontSize: '13px', color: MenuButtonClicked.addproject ? 'white' : 'black' }}>Add new project</h4>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={pills === "5" ? "active" : ""}
                                            onClick={() => {
                                                setPills("5");
                                                setMenuButtonClicked(
                                                    { general: false, photosetting: false, news: false, addproject: false, banlist: true }
                                                );
                                            }}
                                        >
                                            <h4 style={{ margin: 'auto', fontSize: '13px', color: MenuButtonClicked.banlist ? 'white' : 'black' }}>Ban list</h4>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </Row>
                        <Row style={{ marginTop: '40px' }}>
                            <Col style={{ marginTop: '20px' }} className="ml-auto mr-auto" md="10" xl="3">
                                <Row > {LoadingImage ? <Loading /> : null} </Row>
                                <Row className={classes.settingsCards} style={{ paddingTop: '30px' }}>
                                    <Col style={{ width: '100%' }}>
                                        <div className="photo-container" style={{ display: 'flex' }} >
                                            <div style={{ margin: 'auto' }}>
                                                <div style={{
                                                    backgroundColor: 'rgba(0, 0, 0, 0.72)',
                                                    opacity: hoveronprofileimg ? '1' : '0',
                                                    marginTop: '100px',
                                                    position: 'absolute',
                                                    marginLeft: '1px',
                                                    height: '110px',
                                                    width: '209px',
                                                    borderBottomLeftRadius: '360px',
                                                    borderBottomRightRadius: '360px',


                                                }}
                                                    onMouseEnter={() => { sethoveronprofileimg(true) }}
                                                    onMouseLeave={() => { sethoveronprofileimg(false) }}
                                                >
                                                    <input type='file' id='file' ref={inputFile2} style={{ display: 'none' }} onChange={event => { editprofileImageHandler(event.target.files[0]) }} />
                                                    <i className="fas fa-edit fa-2x"
                                                        style={{ marginTop: '50px', marginLeft: '90px', color: 'white' }}
                                                        onClick={() => { inputFile2.current.click() }}
                                                    ></i>
                                                </div>
                                                <img className="rounded-circle"
                                                    style={{ height: '210px', width: '210px', margin: 'auto' }}
                                                    alt="..."
                                                    src={userProfile.profileimage} />
                                            </div>



                                        </div>

                                        <div >
                                            <h4 style={{ textAlign: 'center' }}>{userProfile.name}</h4>
                                        </div>

                                        <div >
                                            <h5 style={{ textAlign: 'center' }}>{userProfile.title}</h5>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={classes.settingsCards} style={{ padding: '30px' }}>
                                    <Col>
                                        <div style={{ display: 'flex' }}>
                                            <i style={{ margin: 'auto', color: '#007bff' }} className="fas fa-project-diagram fa-4x"></i>
                                        </div>
                                        <div style={{ marginTop: '20px' }} >
                                            {/* <h1 style={{ textAlign: 'center', marginBottom: '-10px' }}>{context.projects.length}</h1> */}
                                            <h1 style={{ textAlign: 'center', marginBottom: '-10px' }}>{numberOfProjects}</h1>

                                            <h5 style={{ textAlign: 'center' }}>Projects</h5>
                                        </div>

                                    </Col>

                                </Row>


                            </Col>

                            <Col style={{ margin: '20px' }} className="ml-auto mr-auto" md="10" xl="8">
                                <TabContent className="gallery" activeTab={"pills" + pills}>

                                    <TabPane tabId="pills1">
                                        <Row className={classes.settingsCards}>
                                            <Col >
                                                <Row style={{ paddingLeft: '20px' }}>
                                                    <h4 className={classes.sectionTitel}>Personal Details</h4>
                                                    <div style={{ flex: '1' }}></div>
                                                    <div style={{ display: 'inline-flex', margin: 'auto', paddingRight: '30px' }}>
                                                        <i className="fas fa-edit fa"
                                                            onClick={() => { SetEditablePersonal(true) }}></i>
                                                        <h6>Edit</h6>
                                                    </div>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Name</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <InputField id="name" value={userProfile.name} editable={editablePersonal} type="text" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Title</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <InputField id="title" value={userProfile.title} editable={editablePersonal} type="text" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Gender</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <InputField id="gender" value={userProfile.gender} editable={editablePersonal} type="text" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Birthday</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <InputField id="birthday" value={userProfile.birthday} editable={editablePersonal} type="text" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>About me</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <InputField id="aboutme" value={userProfile.aboutme} type="textarea" editable={editablePersonal} />
                                                    </Col>
                                                </Row>
                                                <Row >
                                                    {editablePersonal ?
                                                        <div style={{ margin: 'auto' }}>
                                                            <Button color="info" onClick={() => {
                                                                savePersonalHandler([
                                                                    { propName: 'title', value: document.getElementById('title').value },
                                                                    { propName: 'aboutme', value: document.getElementById('aboutme').value },
                                                                    { propName: 'birthday', value: document.getElementById('birthday').value },
                                                                    { propName: 'name', value: document.getElementById('name').value },
                                                                    { propName: 'gender', value: document.getElementById('gender').value }
                                                                ])
                                                            }}>
                                                                Save</Button>
                                                            <Button color="danger" onClick={() => { SetEditablePersonal(false) }}>Cancel</Button>
                                                        </div>
                                                        : null
                                                    }

                                                </Row>

                                            </Col>
                                        </Row>
                                        <Row className={classes.settingsCards}>
                                            <Col >
                                                <Row style={{ paddingLeft: '20px' }}>
                                                    <h4 className={classes.sectionTitel}>Security</h4>

                                                </Row>

                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Username</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <InputField id="username" value={userProfile.username} editable={editableUsername} type="text" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Password</h5>
                                                    </Col>
                                                    <Col xs="6">
                                                        <InputField id="oldpassword" placeholder="Actual Password" editable={editablePassword} type="text" />
                                                        <InputField id="newpassword" placeholder="New Password" editable={editablePassword} type="text" style={{ marginTop: '10px' }} />


                                                    </Col>
                                                    <Col xs="3" style={{ marginTop: '-35px' }} >
                                                        <div style={{ display: 'inline-flex', paddingRight: '30px' }}>
                                                            <i className="fas fa-edit fa"
                                                                onClick={() => { SetEditableUsername(true) }}></i>
                                                            <h6>Edit</h6>
                                                        </div>
                                                        <div style={{ display: 'inline-flex', paddingRight: '30px', marginTop: '5px' }}>
                                                            <i className="fas fa-edit fa"
                                                                onClick={() => { setEditablePassword(true) }}></i>

                                                            <h6>Edit</h6>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row >
                                                    {editableUsername || editablePassword ?
                                                        <div style={{ margin: 'auto' }}>
                                                            <Button color="info" onClick={() => {
                                                                if (editableUsername && !editablePassword)
                                                                    saveSecurityHandler(
                                                                        {
                                                                            username: document.getElementById('username').value
                                                                        }
                                                                    )
                                                                else if (editablePassword)
                                                                    saveSecurityHandler(
                                                                        {
                                                                            oldpassword: document.getElementById('oldpassword').value,
                                                                            newpassword: document.getElementById('newpassword').value
                                                                        }
                                                                    )
                                                                else
                                                                    saveSecurityHandler(
                                                                        {
                                                                            username: document.getElementById('username').value,
                                                                            oldpassword: document.getElementById('oldpassword').value,
                                                                            newpassword: document.getElementById('newpassword').value
                                                                        }
                                                                    )

                                                            }}>Save</Button>
                                                            <Button color="danger" onClick={() => { SetEditableUsername(false); setEditablePassword(false) }}>Cancel</Button>
                                                        </div>
                                                        : null
                                                    }

                                                </Row>


                                            </Col>
                                        </Row>
                                        <Row className={classes.settingsCards}>
                                            <Col >
                                                <Row style={{ paddingLeft: '20px' }}>

                                                    <Col xs="9">
                                                        <h4 className={classes.sectionTitel}>Skills</h4>
                                                    </Col>
                                                    < Col xs="3" style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Button color="warning" onClick={() => { setaddSkill(true) }}><strong>Add new skill</strong></Button>
                                                    </Col>


                                                </Row>

                                                {userProfile.skills.length > 0 ?
                                                    userProfile.skills.map(skill => {
                                                        return (
                                                            <Row key={skill._id} style={{ padding: '0px 0px 0px 120px', marginBottom: '20px' }}>
                                                                <Col style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <img src={skill.icon} style={{ height: '40px', width: '40px' }} alt='...' />
                                                                </Col>
                                                                <Col style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <InputField id="icondescription" value={skill.description} type="text" />
                                                                </Col>
                                                                <Col style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <i className="far fa-trash-alt" onClick={() => { deleteSkillHandler(skill._id) }}></i>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }) : null}
                                                {
                                                    addSkill ?
                                                        <Row style={{ marginTop: '40px' }}>
                                                            <Col xs="4" style={{ display: 'flex', alignItems: 'center' }}>
                                                                <input id="iconfile" type="file" onChange={(event) => { setIconfile(event.target.files[0]) }} />
                                                            </Col>
                                                            <Col xs="4" style={{ display: 'flex', alignItems: 'center' }}>
                                                                <Input id="description" placeholder="description" type="text" />
                                                            </Col>
                                                            <Col xs="4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                <Button onClick={() => addIconHandler(document.getElementById('description').value)}><stong>Add</stong></Button>
                                                            </Col>
                                                        </Row>
                                                        : null

                                                }

                                                <Row >
                                                    {editableUsername || editablePassword ?
                                                        <div style={{ margin: 'auto' }}>
                                                            <Button color="info" onClick={() => {
                                                                if (editableUsername && !editablePassword)
                                                                    saveSecurityHandler(
                                                                        {
                                                                            username: document.getElementById('username').value
                                                                        }
                                                                    )
                                                                else if (editablePassword)
                                                                    saveSecurityHandler(
                                                                        {
                                                                            oldpassword: document.getElementById('oldpassword').value,
                                                                            newpassword: document.getElementById('newpassword').value
                                                                        }
                                                                    )
                                                                else
                                                                    saveSecurityHandler(
                                                                        {
                                                                            username: document.getElementById('username').value,
                                                                            oldpassword: document.getElementById('oldpassword').value,
                                                                            newpassword: document.getElementById('newpassword').value
                                                                        }
                                                                    )

                                                            }}>Save</Button>
                                                            <Button color="danger" onClick={() => { SetEditableUsername(false); setEditablePassword(false) }}>Cancel</Button>
                                                        </div>
                                                        : null
                                                    }

                                                </Row>


                                            </Col>
                                        </Row>
                                        <Row className={classes.settingsCards}>
                                            <Col >
                                                <Row style={{ paddingLeft: '20px' }}>
                                                    <h4 className={classes.sectionTitel}>Contact Informations</h4>
                                                    <div style={{ flex: '1' }}></div>
                                                    <div style={{ display: 'inline-flex', margin: 'auto', paddingRight: '30px' }}>
                                                        <i className="fas fa-edit fa"
                                                            onClick={() => { SetEditableContact(true) }}></i>
                                                        <h6>Edit</h6>
                                                    </div>
                                                </Row>

                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Email</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <InputField id="email" value={userProfile.email} editable={editableContact} type="text" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Skype</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <InputField id="skype" value={userProfile.skype} editable={editableContact} type="text" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Youtube</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <InputField id="youtube" value={userProfile.youtube} editable={editableContact} type="text" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>LinkedIn</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <InputField id="linkedin" value={userProfile.linkedin} editable={editableContact} type="text" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Phone</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <InputField id="Phone" value={userProfile.Phone} editable={editableContact} type="text" />

                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Github</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <InputField id="github" value={userProfile.github} editable={editableContact} type="text" />

                                                    </Col>
                                                </Row>
                                                <Row >
                                                    {editableContact ?
                                                        <div style={{ margin: 'auto' }}>
                                                            <Button color="info" onClick={() => {
                                                                saveContactHandler(
                                                                    [
                                                                        { propName: 'email', value: document.getElementById('email').value },
                                                                        { propName: 'youtube', value: document.getElementById('youtube').value },
                                                                        { propName: 'skype', value: document.getElementById('skype').value },
                                                                        { propName: 'linkedin', value: document.getElementById('linkedin').value },
                                                                        { propName: 'Phone', value: document.getElementById('Phone').value },
                                                                        { propName: 'github', value: document.getElementById('github').value }

                                                                    ])
                                                            }}>Save</Button>
                                                            <Button color="danger" onClick={() => { SetEditableContact(false) }}>Cancel</Button>
                                                        </div>
                                                        : null
                                                    }
                                                </Row>


                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="pills2">
                                        <Row className={classes.settingsCards}>
                                            <Col style={{ margin: '20px' }}>
                                                <img
                                                    alt="..."
                                                    className="rounded-circle"
                                                    src={selectedimage ? URL.createObjectURL(selectedimage) : userProfile.backgroundimage}
                                                ></img>
                                            </Col>
                                            <Col xs="5" >
                                                <h4 className={classes.sectionTitel}>Change background image</h4>
                                                <Row>
                                                    <Col style={{ margin: 'auto' }} >
                                                        <Input type='file' onChange={event => { setSelectedimage(event.target.files[0]) }} />
                                                    </Col>
                                                </Row>
                                                <Row >
                                                    <div style={{ margin: 'auto', marginTop: '40px' }}>
                                                        <Button color="info" onClick={saveimageHandler}>Save</Button>
                                                    </div>

                                                </Row>


                                            </Col>
                                        </Row>
                                        <Row className={classes.settingsCards}>
                                            <Col style={{ margin: '20px' }}>
                                                <iframe src={selectedCvFile ? URL.createObjectURL(selectedCvFile) : userProfile.cvFile} width="100%" height="500px">
                                                </iframe>
                                            </Col>
                                            <Col xs="5" >
                                                <h4 className={classes.sectionTitel}>Change CV File</h4>
                                                <Row>
                                                    <Col style={{ margin: 'auto' }} >
                                                        <Input type='file' onChange={event => { setSelectedCvFile(event.target.files[0]) }} />
                                                    </Col>
                                                </Row>
                                                <Row >
                                                    <div style={{ margin: 'auto', marginTop: '40px' }}>
                                                        <Button color="info" onClick={saveCvFileHandler}>Save</Button>
                                                    </div>

                                                </Row>


                                            </Col>
                                        </Row>
                                        <Row className={classes.settingsCards}>
                                            <Col >
                                                <h4 className={classes.sectionTitel}>Content Images</h4>
                                                <Row className="collections">
                                                    {userProfile.images.map((image, i) => {
                                                        return (
                                                            <Col key={i} md="3" style={{ marginBottom: '10px' }}>
                                                                <div style={{ display: 'flex' }}>
                                                                    <div style={{ flex: '1' }}></div>
                                                                    <div style={{ position: 'relative', float: 'left' }}>
                                                                        <i className={"fas fa-backspace "} style={{ color: 'black' }} onClick={() => { deleteImageHandler(image) }}></i>
                                                                    </div>
                                                                </div>
                                                                <img
                                                                    alt="..."
                                                                    className="rounded-circle"
                                                                    src={image}
                                                                ></img>

                                                            </Col>

                                                        )
                                                    })}

                                                    <Col md="3" style={{ marginBottom: '10px' }}>
                                                        <div className={classes.addimageContainer}>
                                                            <div style={{ display: 'flex' }}>
                                                                <i className={"fas fa-plus fa-3x " + classes.addimageIcon} onClick={() => { inputFile.current.click() }}></i>
                                                            </div>
                                                            <div>
                                                                <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={(event) => { addImageHandler(event.target.files[0]) }} />
                                                                <h5 className={classes.addimagetext}> Add new image</h5>
                                                            </div>

                                                        </div>

                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="pills3">
                                        <Row className={classes.settingsCards}>
                                            {NewsBox}
                                        </Row>
                                        {userProfile.news.slice(0).reverse().map((onenews) => {
                                            return (
                                                <Row key={onenews._id} className={classes.settingsCards}>
                                                    <Col >
                                                        <Row >
                                                            <Col >
                                                                <div style={{ display: 'flex' }}>

                                                                    <div style={{ display: 'inline-flex' }}>
                                                                        <img className="rounded-circle" style={{ height: '50px', width: '50px', marginTop: '10px' }} alt="..." src={userProfile.profileimage} />
                                                                        <h4 className={classes.newsProfileName}>{userProfile.name}</h4>
                                                                    </div>
                                                                    <div style={{ flex: '1' }}></div>
                                                                    <Nav>
                                                                        <UncontrolledDropdown >
                                                                            <DropdownToggle nav>
                                                                                <i className="fas fa-ellipsis-h" style={{ marginTop: '5px', color: 'black' }}></i>
                                                                            </DropdownToggle>
                                                                            <DropdownMenu right style={{ marginTop: '-20px' }}>
                                                                                <DropdownItem
                                                                                    onClick={() => { SetEdittile(true) }}
                                                                                >
                                                                                    Edit title
                                                                                </DropdownItem>
                                                                                <DropdownItem
                                                                                    onClick={() => { Seteditcontent(true) }}
                                                                                >
                                                                                    Edit post
                                                                                </DropdownItem>
                                                                                <DropdownItem
                                                                                    onClick={() => { deleteNewsHandler(onenews.id) }}
                                                                                >
                                                                                    Delete
                                                                                </DropdownItem>
                                                                            </DropdownMenu>
                                                                        </UncontrolledDropdown>
                                                                    </Nav>

                                                                </div>
                                                                <h5 className={classes.dateContent}><FormatDate>{onenews.date}</FormatDate></h5>
                                                                <hr style={{ marginTop: '-2px' }} />
                                                            </Col>

                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                {editTitle ?
                                                                    <Input
                                                                        className={classes.inputField}
                                                                        style={{ width: '100%' }}
                                                                        id="titlenews"
                                                                        defaultValue={onenews.title}
                                                                        onKeyUp={(event) => { keypressedHandler(event.keyCode, { id: onenews.id, title: document.getElementById('titlenews').value }) }}
                                                                    />
                                                                    :
                                                                    <h4 className={classes.newsTitle}>
                                                                        {onenews.title}
                                                                    </h4>}

                                                                <hr />
                                                            </Col>

                                                        </Row>
                                                        <Row>
                                                            <Col style={{ minHeight: '150px', width: '100%' }}>
                                                                {editContent ?
                                                                    <div>
                                                                        <TextareaAutosize
                                                                            className={classes.inputField}
                                                                            style={{ width: '100%', minHeight: '100px', padding: '15px' }}
                                                                            type="textarea"
                                                                            id="newscontent"
                                                                            defaultValue={onenews.content}
                                                                        />
                                                                        <div style={{ textAlign: 'right' }}>
                                                                            <Button color="info" onClick={() => { saveNewsContent({ id: onenews.id, content: document.getElementById('newscontent').value }) }}>
                                                                                Save</Button>
                                                                            <Button color="danger" onClick={() => { Seteditcontent(false) }}>Cancel</Button>
                                                                        </div>


                                                                    </div>


                                                                    :
                                                                    <pre style={{ whiteSpace: 'pre-line' }} className={classes.newsContent}>
                                                                        {onenews.content}
                                                                    </pre>}
                                                            </Col>
                                                        </Row>


                                                    </Col>
                                                </Row>
                                            )
                                        })}
                                    </TabPane>
                                    <TabPane tabId="pills4">
                                        <Row className={classes.settingsCards}>
                                            <Col >
                                                <h4 className={classes.sectionTitel}>Add new project</h4>
                                                <Row style={{ padding: '0px 0px 0px 120px', marginBottom: '20px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Project Name</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <TextareaAutosize
                                                            value={newProject.name || ''}
                                                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                                            className={classes.projectInputfield}
                                                            onFocus={() => { SetProjectErrField({ color: 'red', message: '' }) }}

                                                        />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px', marginBottom: '20px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Started date</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <TextareaAutosize
                                                            value={newProject.started || ''}
                                                            onChange={(e) => setNewProject({ ...newProject, started: e.target.value })}
                                                            className={classes.projectInputfield}
                                                            onFocus={() => { SetProjectErrField({ color: 'red', message: '' }) }}

                                                        />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px', marginBottom: '20px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Project status</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <Input
                                                            type="select"
                                                            value={newProject.status || 'Public'}
                                                            onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                                                            onFocus={() => { SetProjectErrField({ color: 'red', message: '' }) }}>
                                                            <option value={"Pulic"}>Public</option>
                                                            <option value={"Private"}>Private</option>
                                                        </Input>
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px', marginBottom: '20px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Visibility</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <Checkbox onChange={(e) => setNewProject({ ...newProject, visibility: e.target.checked })} checked={newProject.visibility || false} />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px', marginBottom: '20px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Technologies</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <TextareaAutosize
                                                            value={newProject.technologie || ''}
                                                            onChange={(e) => setNewProject({ ...newProject, technologie: e.target.value })}
                                                            className={classes.projectInputfield}
                                                            onFocus={() => { SetProjectErrField({ color: 'red', message: '' }) }}

                                                        />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px', marginBottom: '20px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Github link</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <TextareaAutosize
                                                            value={newProject.github || ''}
                                                            onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                                                            className={classes.projectInputfield}
                                                            onFocus={() => { SetProjectErrField({ color: 'red', message: '' }) }}

                                                        />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px', marginBottom: '20px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Download link</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <TextareaAutosize
                                                            value={newProject.filelink || ''}
                                                            onChange={(e) => setNewProject({ ...newProject, filelink: e.target.value })}
                                                            className={classes.projectInputfield}
                                                            onFocus={() => { SetProjectErrField({ color: 'red', message: '' }) }}

                                                        />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px', marginBottom: '20px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Pictures</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <Input
                                                            type="file"
                                                            multiple
                                                            onChange={(event) => { setProjectImages(event.target.files) }}
                                                            className={classes.projectInputfield}
                                                            onFocus={() => { SetProjectErrField({ color: 'red', message: '' }) }}

                                                        />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px', marginBottom: '20px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Summary</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <TextareaAutosize
                                                            value={newProject.summary || ''}
                                                            onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                                                            className={classes.projectInputfield}
                                                            onFocus={() => { SetProjectErrField({ color: 'red', message: '' }) }}

                                                        />
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: '0px 0px 0px 120px', marginBottom: '20px' }}>
                                                    <Col xs="3">
                                                        <h5 className={classes.itemsTitle}>Documentation</h5>
                                                    </Col>
                                                    <Col xs="9">
                                                        <Button onClick={() => { setShowEditDocumentationModal(true) }}>Edit</Button>
                                                        <EditDocumentationModal
                                                            show={showEditDocumentationModal}
                                                            savechangesfunction={(doc) => { setNewProject({ ...newProject, documentation: doc }); setShowEditDocumentationModal(false) }}
                                                            handleClose={() => setShowEditDocumentationModal(false)}
                                                            defaultValue={newProject.documentation || ''}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row >
                                                    <div style={{ margin: 'auto' }}>
                                                        <Label style={{ color: projectErrField.color }}>
                                                            {projectErrField.message}
                                                        </Label>
                                                    </div>

                                                </Row>
                                                <Row >
                                                    <div style={{ margin: 'auto' }}>
                                                        <Button color="info" onClick={() => { postProjectHandler(newProject) }}>Save</Button>
                                                    </div>

                                                </Row>


                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="pills5">
                                        <Row style={{ display: 'flex' }} className={classes.settingsCards}>
                                            {
                                                context.bannedUsers.length > 0 ?
                                                    <Table>
                                                        <thead>
                                                            <tr>
                                                                <th>IP address</th>
                                                                <th>Name</th>
                                                                <th>Content</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                context.bannedUsers.map(banneduser => {
                                                                    return (
                                                                        <tr key={banneduser._id}>
                                                                            <td>{banneduser.ip}</td>
                                                                            <td>{banneduser.name}</td>
                                                                            <td>{banneduser.content}</td>
                                                                            <td style={{ display: 'flex' }}
                                                                            >
                                                                                <Button
                                                                                    color='success'
                                                                                    style={{ margin: 'auto' }}
                                                                                    onClick={() => { context.unbanMember(banneduser._id) }}>
                                                                                    <strong>Unban</strong>
                                                                                </Button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })

                                                            }
                                                        </tbody>
                                                    </Table>
                                                    :
                                                    <strong style={{ margin: 'auto' }}>
                                                        banned list is empty right now!
                                                    </strong>}
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div >



        )
}

export default AccountSettings