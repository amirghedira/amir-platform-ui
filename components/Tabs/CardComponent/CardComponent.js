import React from 'react'
import Link from "next/link";
import GlobalContext from '../../../context/GlobalContext'
import {
    Card,
    CardHeader,
    CardBody,
    Badge,
    Nav,
    Col,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    Row,
    Button,
    CardFooter
} from "reactstrap";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormatDate from '../../../utils/FormatDate';
import classes from './CardComponent.module.css';

const CardComponent = (props) => {

    const context = React.useContext(GlobalContext)
    const [focusedDownload, setfocusedDownload] = React.useState(false);
    const [focusedReadmore, setfocusedReadmore] = React.useState(false);
    const [focusedGithub, setfocusedGithub] = React.useState(false);
    const [EditPost, setEditPost] = React.useState(false);


    const settings = React.useMemo(() => {
        return {
            dots: false,
            infinite: true,
            centerMode: true,
            autoPlay: false,
            focusOnSelect: false,
            speed: 500,
            arrows: true,
            slidesToShow: props.images.length < 3 ? props.images.length : 3,
            slidesToScroll: 1,

        }
    }, [props.images]);
    return (
        <article>
            <Row>
                <Col key={props._id} className="ml-auto mr-auto" md="12" xl="8" >
                    <Card className={classes.cardContainer} style={{ backgroundColor: props.visibility ? 'white' : '#cacaca' }}>
                        <CardHeader>
                            <Row style={{ padding: '10px' }}>


                                <Col style={{ display: 'flex', alignItems: 'center' }}>
                                    <Link href={'/profile'} legacyBehavior>

                                        <img
                                            alt="amir ghedira profile image"
                                            className="rounded-circle"
                                            src={props.userImage}
                                        />
                                    </Link>
                                    <div style={{ marginLeft: '10px' }}>
                                        <Link
                                            href={`/project/${props.projectname.replace(/ /g, '-')}/${props._id}`}
                                            style={{ color: '#2CA8FF', fontSize: '16px', fontWeight: '600', margin: '0', cursor: 'pointer' }}>

                                            {props.projectname}

                                        </Link>
                                        <h5 style={{ color: '#808080', fontSize: '12px', margin: '0', fontWeight: '300' }}>Posted{' '}
                                            <FormatDate>{props.date}</FormatDate></h5>

                                    </div>

                                </Col>

                                <Col xs="12" md="3" className={classes.finishAndEditContainer}>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div>
                                            {props.status === "Public" ?
                                                <Badge color="success" className="mr-1">Public</Badge>
                                                :
                                                <Badge color="danger" className="mr-1">Private</Badge>}
                                        </div>
                                        <div >
                                            {context.currentUser ? (<Nav
                                                className="nav-pills-info nav-pills-just-icons"
                                            >
                                                <UncontrolledDropdown nav>
                                                    <DropdownToggle

                                                        nav
                                                    >
                                                        <i className="fas fa-ellipsis-h" style={{ color: 'black' }}></i>

                                                    </DropdownToggle>
                                                    <DropdownMenu right>
                                                        <DropdownItem header tag="a">
                                                            Settings
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onClick={() => { setEditPost(true) }}
                                                        >
                                                            Edit Post
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onClick={() => { props.updateProjectVisibility(props._id) }}
                                                        >
                                                            {`Mark as ${props.visibility ? 'hidden' : 'visible'}`}
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onClick={() => { props.deleteProject(props._id) }}
                                                        >
                                                            Delete
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Nav>) : null}
                                        </div>
                                    </div>

                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody style={{ minHeight: '200px', minWidth: '40px', padding: '30px 20px 0px 20px' }}>
                            {EditPost ?
                                <div>
                                    <TextareaAutosize
                                        id="editedpost"
                                        style={{ minWidth: '100%' }}
                                        rows={11}
                                        defaultValue={props.summary} />
                                    <Button
                                        color="info"
                                        onClick={() => {
                                            setEditPost(false)
                                            props.SaveChangesFunction({
                                                id: props._id,
                                                content: document.getElementById('editedpost').value
                                            })
                                        }}
                                    > Save </Button>
                                    <Button
                                        color="danger"
                                        onClick={() => { setEditPost(false) }}
                                    > Cancel
                                    </Button>
                                </div>

                                :
                                <pre className={classes.textContent}>
                                    {props.summary}
                                </pre>
                            }
                        </CardBody>
                        <CardFooter>
                            <hr style={{ width: '100%', marginBottom: '0' }} />
                            <Row style={{ margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                {props.status === 'Public' &&
                                    <Col sm="12" md="4"  >
                                        <a href={props.filelink} download
                                            onClick={() => { props.updateDownloadCount(props._id); }}>
                                            <Button
                                                onMouseEnter={() => { setfocusedDownload(true) }}
                                                onMouseLeave={() => { setfocusedDownload(false) }}
                                                style={{ margin: 'auto', backgroundColor: focusedDownload ? '#d9d9d9' : 'transparent', color: 'black', width: '100%', fontWeight: 'bold' }}>
                                                <div>
                                                    <i className="fas fa-download fa-2x" ></i>
                                                    <p style={{ margin: '0', fontWeight: '700', textAlign: 'center' }}>Download</p>
                                                </div>
                                            </Button>
                                        </a>

                                    </Col>}
                                <Col sm="12" md="4" >
                                    <Link
                                        href={`/project/${props.projectname.replace(/ /g, '-')}/${props._id}`}
                                        style={{ color: 'black', textDecoration: 'none' }}
                                        legacyBehavior>
                                        <Button
                                            style={{ margin: 'auto', backgroundColor: focusedReadmore ? '#d9d9d9' : 'transparent', color: 'black', width: '100%', fontWeight: 'bold' }}
                                            onMouseEnter={() => { setfocusedReadmore(true) }}
                                            onMouseLeave={() => { setfocusedReadmore(false) }}
                                        >
                                            <div>
                                                <i className="fas fa-book-reader fa-2x" ></i>
                                                <p style={{ margin: '0', fontWeight: '700', textAlign: 'center' }}>Read More</p>

                                            </div>
                                        </Button>
                                    </Link>
                                </Col>

                                {props.status === 'Public' &&
                                    <Col sm="12" md="4" >
                                        <a
                                            href={props.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: 'black', textDecoration: 'none' }}
                                            onClick={() => props.updateGitViewer(props._id)}>
                                            <Button
                                                onMouseEnter={() => { setfocusedGithub(true) }}
                                                onMouseLeave={() => { setfocusedGithub(false) }}
                                                style={{ margin: 'auto', backgroundColor: focusedGithub ? '#d9d9d9' : 'transparent', color: 'black', width: '100%', fontWeight: 'bold' }}>
                                                <div>
                                                    <i className="fab fa-github fa-2x" ></i>
                                                    <p style={{ margin: '0', fontWeight: '700', fontSize: '14px', textAlign: 'center' }}>Github</p>
                                                </div>

                                            </Button>
                                        </a>
                                    </Col>}
                            </Row>

                        </CardFooter>
                    </Card >
                </Col >
            </Row>
        </article >
    );

}

export default CardComponent