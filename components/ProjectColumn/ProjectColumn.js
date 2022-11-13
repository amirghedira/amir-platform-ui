import React from 'react';
import classes from './ProjectColumn.module.css';
import { Nav, Button, Col, Row } from 'reactstrap';
import FormatDate from '../../utils/FormatDate'
import GlobalContext from '../../context/GlobalContext';
import Lightbox from 'react-18-image-lightbox'
import axios from '../../utils/axios'

const ProjectColumn = (props) => {


    const context = React.useContext(GlobalContext)
    const inputFile = React.useRef(null)
    const [displayImageIndex, setDisplayImageIndex] = React.useState(null)


    const clickedImageHandler = (image) => {
        const imageIndex = props.project.imagesurl.findIndex(i => i === image)
        setDisplayImageIndex(imageIndex)
    }
    return (

        <Row className={classes.firstdiv} >
            <Col>
                {displayImageIndex !== null &&
                    <Lightbox
                        mainSrc={props.project.imagesurl[displayImageIndex]}
                        enableZoom={false}
                        nextSrc={props.project.imagesurl[(displayImageIndex + 1) % props.project.imagesurl.length]}
                        prevSrc={props.project.imagesurl[(displayImageIndex + props.project.imagesurl.length - 1) % props.project.imagesurl.length]}
                        onCloseRequest={() => setDisplayImageIndex(null)}
                        onMovePrevRequest={() =>
                            setDisplayImageIndex((displayImageIndex + props.project.imagesurl.length - 1) % props.project.imagesurl.length)
                        }
                        onMoveNextRequest={() =>
                            setDisplayImageIndex((displayImageIndex + 1) % props.project.imagesurl.length)

                        } />
                }

                <Row>
                    <Col>
                        <Nav className={classes.itemsNavbar}>
                            <h1 className={classes.projecttitle} style={{ margin: 'auto', padding: '20px', fontSize: '16px' }}>
                                {props.project.name}{displayImageIndex}
                            </h1>
                        </Nav>
                    </Col>
                </Row>

                <Row className={classes.sidebarContainers}>
                    <Col>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <span className={classes.sidebarTitle}>
                                    Posted:{' '}
                                </span>
                                <span>
                                    <FormatDate>{props.project.date}</FormatDate>
                                </span>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <span className={classes.sidebarTitle}>
                                    Started: {' '}
                                </span>
                                <span>
                                    {props.project.started}
                                </span>
                            </div>

                        </div>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <span className={classes.sidebarTitle}>
                                    Status: {' '}
                                </span>
                                <span>
                                    {props.project.status}
                                </span>
                            </div>
                            <div style={{ flex: '1' }}></div>
                            <i
                                className="fas fa-edit"
                                onClick={() => { props.editFunction({ sectionname: 'project status', defaultvalue: props.project.status, propname: 'status' }) }}
                                style={{ display: props.logstatus ? 'inline' : 'none' }}

                            ></i>

                        </div>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <span className={classes.sidebarTitle}>
                                    Technologies: {' '}
                                </span>
                                <span>
                                    {props.project.technologie}
                                </span>
                            </div>
                            <div style={{ flex: '1' }}></div>
                            <i
                                className="fas fa-edit"
                                style={{ display: props.logstatus ? 'inline' : 'none' }}
                                onClick={() => { props.editFunction({ sectionname: 'technologies', defaultvalue: props.project.technologie, propname: 'technologie' }) }}
                            ></i>

                        </div>
                    </Col>


                </Row>
                <Row className={classes.sidebarContainers}>
                    <Col>
                        <div>
                            <span className={classes.sidebarTitle}>
                                comments: {' '}
                            </span>
                            <span>
                                {props.project.commentsCount}
                            </span>
                        </div>
                        {props.project.status === "Public" && <React.Fragment>
                            <div>
                                <span className={classes.sidebarTitle}>
                                    Download count: {' '}
                                </span>
                                <span>
                                    {props.project.downloadcount}
                                </span>
                            </div>
                            <div>
                                <span className={classes.sidebarTitle}>
                                    Git viewers: {' '}
                                </span>
                                <span>
                                    {props.project.gitViewers}
                                </span>
                            </div>
                        </React.Fragment>}
                    </Col>

                </Row>
                {props.project.status === 'Public' && <Row>


                    <Col md="12" lg="6" className={classes.downloadsection}>
                        <a href={props.project.github} target="_blank" rel="noopener noreferrer">
                            <Button className={classes.button} color="warning" onClick={props.githubButtonFunction}>
                                <i className="fab fa-github fa-2x" style={{ marginRight: '10px' }} ></i>
                                Github
                            </Button>
                        </a>
                    </Col>
                    <Col md="12" lg="6">
                        <a href={props.project.filelink} download onClick={props.downloadButtonFunction}>
                            <Button color="success" className={classes.button}>
                                <i className="fas fa-download fa-2x" style={{ marginRight: '10px' }} ></i>
                                Download
                            </Button>
                        </a>
                    </Col>

                </Row>
                }

                <Row>
                    <Col>
                        {
                            context.currentUser ?
                                <Row>
                                    <Col className={classes.Navbar}>
                                        <Button color="warning"
                                            style={{ width: '100%' }}
                                            onClick={() => { inputFile.current.click() }}>
                                            <strong>Add new image</strong>
                                        </Button>

                                        <input
                                            style={{ display: 'none' }}
                                            onChange={(event) => { props.addprojectImage(event.target.files) }}
                                            ref={inputFile}
                                            multiple
                                            type="file" />
                                    </Col>

                                </Row>
                                : null
                        }
                        <Row style={{ maxHeight: '30vh', overflowY: 'auto' }}>
                            {
                                props.project.imagesurl.map(image => (
                                    <Col xs="3" md="6" key={image} style={{ display: 'flex', justifyContent: 'center' }} >
                                        <div className={classes.projectImageContainer} >
                                            {context.currentUser && <div className={classes.deleteContainer}>
                                                <i className={`fas fa-times-circle ${classes.deleteIcon}`} onClick={() => props.deleteProjectImage(image)}></i>
                                            </div>}
                                            <img
                                                alt="..."
                                                onClick={() => clickedImageHandler(image)}
                                                className={classes.projectImage}
                                                src={image} />
                                        </div>

                                    </Col>
                                ))}
                        </Row>
                    </Col>
                </Row>
            </Col >
        </Row >
    )
}

export default ProjectColumn;