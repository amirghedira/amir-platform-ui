import React from "react";
import Lightbox from 'react-image-lightbox';
import FormatDate from '../../utils/FormatDate'
import 'react-image-lightbox/style.css';
// reactstrap components
import {
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    UncontrolledTooltip,
    Col
} from "reactstrap";

// core components
import ProfilePageHeader from "../../components/Headers/ProfilePageHeader.js";
import GlobalContext from '../../context/GlobalContext'
import classes from './Profilepage.module.css'
import Head from 'next/head'
import Axios from "axios";

const ProfilePage = ({ UserProfile }) => {
    const [pills, setPills] = React.useState("2");
    const [showImage, setShowimage] = React.useState(null)
    const [MenuButtonClicked, setMenuButtonClicked] = React.useState({
        photos: false,
        moreinfo: true,
        news: false
    });
    const context = React.useContext(GlobalContext)

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
        setShowimage(
            <Lightbox
                mainSrc={image}
                enableZoom={false}
                onCloseRequest={() => setShowimage(null)} />
        )

    }

    return (
        <React.Fragment>

            <Head>
                <title>
                    {`${UserProfile.name} | Amir Platform`}
                </title>
                <meta name="title" content={`${UserProfile.name} | Amir Platform`} />
                <meta name="description" content={UserProfile.aboutme} />
                <link rel="canonical" href='https://www.amir-ghedira.com/amirghedira' />
                <meta property="og:url" content='https://www.amir-ghedira.com/amirghedira' />
                <meta property="og:title" content={UserProfile.name} />
                <meta property="og:description" content={UserProfile.aboutme} />
                <meta property="og:image" content={UserProfile.profileimage} />

            </Head>
            <main>
                <div className="wrapper">
                    {showImage}
                    <Container style={{
                        borderRadius: '3px',
                        marginTop: '50px', marginBottom: '50px', boxShadow: '0px 5px 25px 0px rgba(0, 0, 0, 0.4)', backgroundColor: 'white'
                    }}>

                        < Row >
                            <Col>
                                <Row >
                                    <ProfilePageHeader
                                        projectsnum={context.projects?.length
                                        }
                                        profileinfo={UserProfile}
                                        showprofileimageFunction={showprojectimageHandler}
                                    />

                                </Row>
                                <Row>
                                    <Col>
                                        <h3 className={classes.aboutMeText}>
                                            About me
                                </h3>
                                        <pre className={classes.description}>
                                            {UserProfile.aboutme}
                                        </pre>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="ml-auto mr-auto" md="6">
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
                                                            setMenuButtonClicked({
                                                                photos: true,
                                                                news: false,
                                                                moreinfo: false
                                                            })
                                                        }}
                                                    >
                                                        <h4 className={classes.itemContentText} style={{ margin: 'auto', color: MenuButtonClicked.photos ? 'white' : 'black' }}>Photos</h4>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className={classes.navItem}>
                                                    <NavLink
                                                        className={pills === "2" ? "active" : ""}
                                                        onClick={() => {
                                                            setPills("2");
                                                            setMenuButtonClicked({
                                                                photos: false,
                                                                news: false,
                                                                moreinfo: true
                                                            })
                                                        }}
                                                    >
                                                        <h4 className={classes.itemContentText} style={{ margin: 'auto', color: MenuButtonClicked.moreinfo ? 'white' : 'black' }}>More info</h4>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className={classes.navItem}>
                                                    <NavLink
                                                        className={pills === "3" ? "active" : ""}
                                                        onClick={() => {
                                                            setPills("3");
                                                            setMenuButtonClicked({
                                                                photos: false,
                                                                news: true,
                                                                moreinfo: false
                                                            })
                                                        }}
                                                    >
                                                        <h4 className={classes.itemContentText} style={{ margin: 'auto', color: MenuButtonClicked.news ? 'white' : 'black' }}>News</h4>
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </Col>
                                    <Col className="ml-auto mr-auto" md="12" style={{ marginTop: '50px' }}>
                                        <TabContent className="gallery" activeTab={"pills" + pills}>
                                            <TabPane tabId="pills1">
                                                <Row className="collections" style={{ display: 'flex' }}>
                                                    <Col md="6" style={{ padding: '10px' }}>
                                                        {
                                                            UserProfile.images.map((image, i) => {
                                                                if (i < UserProfile.images.length / 2) {
                                                                    return (
                                                                        <img
                                                                            key={i}
                                                                            alt="..."
                                                                            className="img-raised"
                                                                            src={image}
                                                                            onClick={() => { showprojectimageHandler(image) }}
                                                                        ></img>)
                                                                }
                                                                else
                                                                    return null
                                                            })}
                                                    </Col>
                                                    <Col md="6">
                                                        {UserProfile.images.map((image, i) => {
                                                            if (i >= UserProfile.images.length / 2) {
                                                                return (
                                                                    <img
                                                                        key={i}
                                                                        alt="..."
                                                                        className="img-raised"
                                                                        src={image}
                                                                        onClick={() => { showprojectimageHandler(image) }}
                                                                        style={{ margin: '10px' }}
                                                                    ></img>)
                                                            }

                                                            else
                                                                return null
                                                        })}
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="pills2">
                                                <Col className="ml-auto mr-auto" md="10">
                                                    <Row className="collections">
                                                        <Col>
                                                            <div style={{ margin: '20px' }}>
                                                                <h4 className={classes.categoryText} >Personal information</h4>
                                                                <hr style={{ backgroundColor: '#bfbfbf' }} />
                                                                <Row style={{ paddingLeft: '20px', paddingTop: '30px' }}>
                                                                    <Col>
                                                                        <Row style={{ marginBottom: '30px' }}>
                                                                            <Col style={{ display: 'flex', alignItems: 'center' }}>
                                                                                <h4 className={classes.fieldName}>Gender</h4>
                                                                            </Col>
                                                                            <Col style={{ display: 'flex', alignItems: 'center' }} >
                                                                                <i className="fas fa-venus-mars fa-2x" style={{ marginRight: '10px', color: 'red' }}></i>
                                                                                <h4 className={classes.fieldValue}>
                                                                                    {UserProfile.gender}</h4>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row style={{ marginBottom: '30px' }}>
                                                                            <Col style={{ display: 'flex', alignItems: 'center' }} >
                                                                                <h4 className={classes.fieldName}>Birthday</h4>
                                                                            </Col>
                                                                            <Col style={{ display: 'flex', alignItems: 'center' }}>
                                                                                <i className="fas fa-birthday-cake fa-2x" style={{ color: 'pink', marginRight: '20px' }}></i>
                                                                                <h4 className={classes.fieldValue}>
                                                                                    {UserProfile.birthday}</h4>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row style={{ marginBottom: '30px' }}>
                                                                            <Col xs="2" style={{ display: 'flex', alignItems: 'center' }} >
                                                                                <h4 className={classes.fieldName}>Skills</h4>
                                                                            </Col>
                                                                            <Col >
                                                                                <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                                    {UserProfile.skills.map(skill => {
                                                                                        return (
                                                                                            <Col xs="3" xl="1" lg="2" key={skill._id} style={{ margin: '10px' }}>
                                                                                                <img id={skill.description} src={skill.icon} style={{ height: '40px', width: '40px', margin: '0' }} alt='...' />
                                                                                                <UncontrolledTooltip target={"#" + skill.description}>
                                                                                                    {skill.description}
                                                                                                </UncontrolledTooltip>
                                                                                            </Col>


                                                                                        )
                                                                                    })

                                                                                    }
                                                                                </Row>

                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>

                                                            </div>
                                                            <div style={{ margin: '20px' }}>
                                                                <h4 className={classes.categoryText}>Contact Methods</h4>
                                                                <hr style={{ backgroundColor: '#bfbfbf' }} />
                                                                <Row style={{ paddingLeft: '20px' }}>
                                                                    <Col>
                                                                        <Row className={classes.mainRow}>
                                                                            <Col className={classes.mainCol} xs="1">
                                                                                <h4 className={classes.fieldName}>Email</h4>
                                                                            </Col>
                                                                            <Col className={classes.mainCol}>

                                                                                <a style={{ margin: 'auto' }} href={`mailto:${UserProfile.email}`}>
                                                                                    <img src={'/gmailicon.png'} alt="..." style={{ height: '23px', width: '30px', margin: 'auto' }} /></a>

                                                                            </Col>
                                                                        </Row>
                                                                        <Row className={classes.mainRow}>
                                                                            <Col className={classes.mainCol} xs="1">
                                                                                <h4 className={classes.fieldName}>Github</h4>
                                                                            </Col>
                                                                            <Col className={classes.mainCol}>
                                                                                <a style={{ margin: 'auto' }} href={UserProfile.github} target='_blank' rel="noopener noreferrer" >
                                                                                    <i className="fab fa-github-square fa-2x" style={{ color: 'black' }}></i>
                                                                                </a>

                                                                            </Col>
                                                                        </Row>
                                                                        <Row className={classes.mainRow}>
                                                                            <Col className={classes.mainCol} xs="1">
                                                                                <h4 className={classes.fieldName}>Skype</h4>
                                                                            </Col>
                                                                            <Col className={classes.mainCol}>

                                                                                <a href={`skype:${UserProfile.skype}?chat`} style={{ margin: 'auto' }} >
                                                                                    <i className="fab fa-skype fa-2x" style={{ size: '30px', color: '#00aff0' }}></i>
                                                                                </a>

                                                                            </Col>
                                                                        </Row>
                                                                        <Row className={classes.mainRow}>
                                                                            <Col className={classes.mainCol} xs="1">
                                                                                <h4 className={classes.fieldName}>Facebook</h4>
                                                                            </Col>
                                                                            <Col className={classes.mainCol}>
                                                                                <a style={{ margin: 'auto' }} href={UserProfile.facebook} target='_blank' rel="noopener noreferrer" >
                                                                                    <i className="fab fa-facebook-square fa-2x" style={{ color: '#4267B2' }}></i>
                                                                                </a>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className={classes.mainRow}>
                                                                            <Col className={classes.mainCol} xs="1">
                                                                                <h4 className={classes.fieldName}>LinkedIn</h4>
                                                                            </Col>
                                                                            <Col className={classes.mainCol}>
                                                                                <a style={{ margin: 'auto' }} href={UserProfile.linkedin} target='_blank' rel="noopener noreferrer" >
                                                                                    <i className="fab fa-linkedin fa-2x" style={{ size: '40px', color: '#2867B2' }}> </i>
                                                                                </a>

                                                                            </Col>
                                                                        </Row>
                                                                        <Row className={classes.mainRow}>
                                                                            <Col className={classes.mainCol} xs="1">
                                                                                <h4 className={classes.fieldName}>Phone</h4>
                                                                            </Col>
                                                                            <Col className={classes.mainCol}>
                                                                                <h4 style={{ fontWeight: 'normal', margin: 'auto' }}>
                                                                                    <i className="fas fa-phone fa-2x" style={{ size: '20px', color: '#2867B2' }}></i>{UserProfile.Phone}</h4>
                                                                            </Col>
                                                                        </Row>

                                                                    </Col>
                                                                </Row>


                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </TabPane>
                                            <TabPane tabId="pills3">
                                                <Col className="ml-auto mr-auto" md="10">
                                                    <Row className="collections">
                                                        <Col md="12">
                                                            {
                                                                UserProfile.news.length > 0 ?
                                                                    UserProfile.news.slice(0).reverse().map((onenews) => {
                                                                        return (
                                                                            <Row key={onenews._id} style={{ backgroundColor: "white", boxShadow: '0px 5px 25px 0px rgba(0, 0, 0, 0.2)', marginTop: '20px' }}>
                                                                                <Col >
                                                                                    <Row >
                                                                                        <Col >
                                                                                            <div style={{ display: 'flex' }}>

                                                                                                <div style={{ display: 'inline-flex' }}>
                                                                                                    <img className="rounded-circle img-raised" style={{ height: '50px', width: '50px', marginTop: '10px' }} alt="..." src={UserProfile.profileimage} />
                                                                                                    <h4 className={classes.newsProfileName}>{UserProfile.name}</h4>
                                                                                                </div>
                                                                                                <div style={{ flex: '1' }}></div>

                                                                                            </div>
                                                                                            <h5 style={{ fontSize: '12px', marginTop: '-40px', marginLeft: '60px' }}>{
                                                                                                <FormatDate>{onenews.date}</FormatDate>
                                                                                            }</h5>
                                                                                            <hr style={{ marginTop: '-2px' }} />
                                                                                        </Col>

                                                                                    </Row>
                                                                                    <Row>
                                                                                        <Col>

                                                                                            <h4 className={classes.newsTitle}>
                                                                                                {onenews.title}
                                                                                            </h4>

                                                                                            <hr />
                                                                                        </Col>

                                                                                    </Row>
                                                                                    <Row>
                                                                                        <Col style={{ minHeight: '150px', width: '100%' }}>
                                                                                            <pre style={{ whiteSpace: 'pre-line' }} className={classes.newsContent}>
                                                                                                {onenews.content}
                                                                                            </pre>
                                                                                        </Col>
                                                                                    </Row>


                                                                                </Col>
                                                                            </Row>)
                                                                    })
                                                                    :
                                                                    <h3>No recent news</h3>
                                                            }
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </TabPane>
                                        </TabContent>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Container >
                </div >
            </main>
        </React.Fragment>
    )
}

export const getServerSideProps = async () => {
    const res = await Axios.get('https://mywebrestapi.herokuapp.com/user')
    return {
        props: {
            UserProfile: res.data
        },
    }
}

export default ProfilePage;
