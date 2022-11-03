import React from 'react'
import classes from './Addtopic.module.css';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Container, Row, Col, Input, Label, Button, Nav, NavItem, NavLink } from 'reactstrap'
import Link from 'next/link'
import GlobalContext from '../../context/GlobalContext'
import Banned from '../../components/Banned/Banned'
import axios from '../../utils/axios'
import { useRouter } from 'next/router'
import Head from 'next/head'

const AddTopic = (props) => {
    const [errmessage, SeterrorMessage] = React.useState('');
    const [commentContentfocus, setcommentContentfocus] = React.useState(false)
    const [commentTitlefocus, setcommentTitlefocus] = React.useState(false)
    const [isRedirectCancel, setRedirectCancel] = React.useState(false)
    const [isRedirectPost, setRedirectPost] = React.useState({ state: false, path: null })
    const context = React.useContext(GlobalContext)
    const router = useRouter()

    const submitTopicHandler = (obj) => {

        if (obj.autor === "")
            SeterrorMessage('Taper votre nom')
        else if (obj.autor === 'admin' && !context.currentUser)
            SeterrorMessage("Ce nom n'est pas valide")
        else if (obj.title === "")
            SeterrorMessage('Taper votre titre')
        else if (obj.content === "")
            SeterrorMessage('Taper votre contenu')
        else {

            axios.post('/topic',
                {
                    ip: context.memberInfo.ip,
                    title: obj.title,
                    autor: obj.autor,
                    content: obj.content,
                    date: new Date(),
                    type: props.type,
                    replies: []
                }).then(result => {
                    setRedirectPost({ state: true, path: `/${props.type}/${result.data.id}` })
                    if (obj.autor !== 'admin')
                        context.addNotificationTopic(result.data.id, obj.autor, props.type)


                })
                .catch(err => {
                    context.ErrorAccureHandler();
                })

        }
    }
    const getBanStatus = () => {
        if (context.bannedUsers && context.memberInfo) {
            const ips = context.bannedUsers.map(banneduser => banneduser.ip)
            return ips.includes(context.memberInfo.ip)
        }
        return false;
    }

    if (isRedirectCancel)
        router.push("/topics/" + props.type)
    else if (isRedirectPost.state)
        router.push(isRedirectPost.path)

    if (getBanStatus())
        return (<Banned />)
    else
        return (
            <React.Fragment>
                <Head>
                    <title>{`Create new ${props.type} | Amir Platform`}</title>
                    <meta name="title" content={`Create new ${props.type} | Amir Platform`} />
                    <meta name="description" content="Feel free to post a new topic here if you have a question or a suggestion for us, Its a pleasure to answer you!" />
                    <meta property="og:url" content={`https://www.amir-ghedira.com/add-topic/${props.type}`} />
                    <meta property="og:title" content={`Create new ${props.type}`} />
                    <meta property="og:description" content="Feel free to post a new topic here if you have a question or a suggestion for us, Its a pleasure to answer you!" />
                    <meta property="og:image" content="https://www.amir-ghedira.com/logo.png" />
                </Head>
                <main>
                    <Row style={{ margin: '0' }}>
                        <Col style={{ padding: '0' }}>
                            <Nav className={classes.Navbar} expand="lg">
                                <NavItem style={{ height: '100%', display: 'flex', alignItems: 'center' }} >
                                    <NavLink href='/' tag={Link}>
                                        <strong style={{ color: '#2CA8FF', fontSize: '12px', cursor: 'pointer' }}> Home </strong>
                                    </NavLink>
                                </NavItem>

                                <NavItem style={{ height: '100%', display: 'flex', alignItems: 'center' }} >
                                    <NavLink href={`/topics/${props.type}`} tag={Link}>
                                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                            <img style={{ height: '36px', width: '36px' }} alt='...' src={'/chevron.png'} />
                                            <strong style={{ color: '#2CA8FF', fontSize: '12px' }} > {props.type} </strong>
                                        </div>
                                    </NavLink>

                                </NavItem>
                                <NavItem style={{ height: '100%', display: 'flex', alignItems: 'center' }} >
                                    <NavLink >
                                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                            <img style={{ height: '36px', width: '36px' }} alt='...' src={'/chevron.png'} />
                                            <strong style={{ color: '#2CA8FF', fontSize: '12px' }}> Create new Topic </strong>
                                        </div>
                                    </NavLink>

                                </NavItem>
                            </Nav>
                        </Col>
                    </Row>
                    <Row className={classes.sectionTitle}>
                        <Col style={{ padding: '0', margin: 'auto' }}>
                            <h3>Create New Topic</h3>
                        </Col>
                    </Row>
                    <Container style={{ marginBottom: '70px' }}>

                        <Row className={classes.commentSection}>
                            <Col xs="3" md='1' style={{ display: 'flex' }}>
                                <div style={{ borderStyle: 'solid', borderColor: '#e6e6e6', width: '50px', borderWidth: '1px', margin: 'auto', marginTop: '10px' }}>
                                    {context.currentUser ?
                                        <img src={context.UserProfile?.profileimage} style={{ height: '50px', width: '50px' }} alt="Amir ghedira" />
                                        :
                                        <img src={'/default-avatar.png'} style={{ height: '50px', width: '50px' }} alt="Javascript programmer" />

                                    }
                                </div>
                            </Col>

                            <Col>
                                <Row style={{ marginTop: '10px', marginBottom: '30px' }}>
                                    <Col style={{ padding: '0' }} >
                                        <Input
                                            id="title"
                                            className={classes.FirstInputComment}
                                            placeholder="Title"
                                            style={{
                                                borderColor: '#e6e6e6',
                                                borderStyle: 'solid', borderWidth: '1px',
                                                backgroundColor: 'white',
                                                borderRadius: '0',
                                                width: '100%'
                                            }}

                                        />
                                    </Col>
                                </Row>

                                <Row style={{ padding: '30px 20px 20px 20px', borderColor: '#e6e6e6', borderWidth: '1px', borderStyle: 'solid' }}>
                                    {
                                        !context.currentUser ?
                                            <Input
                                                id="username"
                                                className={classes.FirstInputComment}
                                                placeholder="Your Name"
                                                onFocus={() => { setcommentTitlefocus(true); SeterrorMessage('') }}
                                                onBlur={() => { setcommentTitlefocus(false) }}
                                                style={{
                                                    borderColor: commentTitlefocus ? '#1ab2ff' : 'transparent',
                                                    borderStyle: 'solid', borderWidth: '2px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '0',
                                                    marginBottom: '20px'
                                                }}

                                            />
                                            : null

                                    }

                                    <TextareaAutosize
                                        className={classes.SecondInputComment}
                                        id="content"
                                        placeholder="Write the topic content"
                                        type="textarea"
                                        onFocus={() => { setcommentContentfocus(true); SeterrorMessage('') }}
                                        onBlur={() => { setcommentContentfocus(false) }}
                                        style={{
                                            paddingLeft: '20px', width: '100%', paddingTop: '20px', borderColor: commentContentfocus ? '#1ab2ff' : 'transparent', borderStyle: 'solid', borderWidth: '2px'
                                            , backgroundColor: 'white', borderRadius: '0'
                                        }}

                                    />

                                </Row>

                            </Col>

                        </Row>

                        <Row>

                            <Label style={{ color: 'red', fontSize: '14px', margin: 'auto', marginTop: '20px' }}>
                                {errmessage}
                            </Label>
                        </Row>

                        <Row>
                            <Col>
                                <div style={{ display: 'flex', marginTop: '20px' }}>
                                    <div style={{ margin: 'auto' }}>

                                        <Button
                                            color="info"
                                            onClick={() => submitTopicHandler(
                                                {
                                                    title: document.getElementById('title').value,
                                                    autor: context.currentUser ? "admin" : document.getElementById('username').value,
                                                    content: document.getElementById('content').value

                                                })}
                                        >
                                            Submit
                                        </Button>
                                        <Button
                                            color="danger"
                                            onClick={() => { setRedirectCancel(true) }}>
                                            Cancel
                                        </Button>

                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </main >
            </React.Fragment>
        )
}

export const getServerSideProps = async (context) => {


    return {
        props: {
            type: context.params.type
        }
    }


}



export default AddTopic;