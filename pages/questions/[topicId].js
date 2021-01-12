import React from 'react'
import classes from '../../styles/Topicpage.module.css';
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import PostCard from '../../components/PostCard/PostCard'
import CommentSection from '../../components/CommentSection/CommentSection'
import axios from '../../utils/axios'
import Link from 'next/link'
import GlobalContext from '../../context/GlobalContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormatDate from '../../utils/FormatDate'
import Axios from 'axios';
import { useRouter } from 'next/router'



const TopicPage = ({ Topic }) => {
    const context = React.useContext(GlobalContext)
    const type = 'questions';
    const [width, setwitdh] = React.useState(1000)
    const router = useRouter()


    const handleFunction = function () {
        setwitdh(window.innerWidth)
    }

    React.useEffect(() => {

        window.addEventListener('resize', handleFunction)
        return () => {
            window.removeEventListener('resize', handleFunction);
        }
    }, [])

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.classList.add("index-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");

        return function cleanup() {
            document.body.classList.remove("index-page");
            document.body.classList.remove("sidebar-collapse");


        };
    }, [])

    React.useEffect(() => {
        return function cleanup() {
            if (context.socket) {
                context.socket.off('sendtopic')
                context.socket.off('redirect')
            }
        }
    }, [context.socket])
    React.useEffect(() => {
        if (context.socket) {

            context.socket.off('sendtopic')
            context.socket.on('sendtopic', (topic) => {
                setTopic(topic)

            })
        }
    }, [context.socket, Topic])

    const submitCommentHandler = (obj) => {

        if (Topic.replies.length === 0 || context.memberInfo.ip !== Topic.replies[Topic.replies.length - 1].ip) {

            axios.patch('/topic/postcomment/' + Topic._id, { ip: context.memberInfo.ip, autor: obj.autor, content: obj.content })
                .then(response => {
                    const newTopic = {
                        ...Topic,
                        replies: [...Topic.replies, { _id: response.data.id, ip: context.memberInfo.ip, autor: obj.autor, content: obj.content, date: response.data.date }]
                    }
                    setTopic(newTopic)
                    context.socket.emit('sendtopic', newTopic)

                    if (obj.autor !== 'admin')
                        context.addNotificationReply(response.data.id, obj.autor, Topic._id, Topic.title, type)
                })
                .catch(err => {
                    context.ErrorAccureHandler(err.response.status, err.response.message);
                })

        } else {

            toast.error('You already posted a comment', { position: toast.POSITION.BOTTOM_RIGHT })
        }


    }
    const OpenCloseTopicHandler = (topicstate) => {

        axios.patch('/topic/topicstate/' + Topic._id, { state: topicstate })
            .then(result => {
                const newTopic = {
                    ...Topic,
                    state: topicstate
                }
                setTopic(newTopic)
                context.socket.emit('sendtopic', newTopic)
                if (topicstate)
                    toast.success('Topic openned.', { position: toast.POSITION.BOTTOM_RIGHT })
                else
                    toast.success('Topic closed.', { position: toast.POSITION.BOTTOM_RIGHT })
            })
            .catch(err => {
                context.ErrorAccureHandler();
            })
    }

    const deleteTopicHandler = () => {

        axios.delete('/topic/' + Topic._id)
            .then(result => {

                context.deleteTopicNotifications(Topic._id, type)
                router.push(`/topics/${type}`)




            })
            .catch(err => {
                context.ErrorAccureHandler();
            })

    }

    const deleteReplyHandler = (replyId) => {

        const replyIndex = Topic.replies.findIndex(reply => { return reply._id === replyId })
        let newReplies = Topic.replies;
        newReplies.splice(replyIndex, 1)
        axios.patch('/topic/deletecomment/' + Topic._id, { newreplies: newReplies })
            .then(result => {
                const newTopic = {
                    ...Topic,
                    replies: newReplies
                }
                setTopic(newTopic)
                context.socket.emit('sendtopic', newTopic)

                toast.success('Reply deleted.', { position: toast.POSITION.BOTTOM_RIGHT })
                context.deleteReplyNotification(replyId)


            })
            .catch(err => {
                context.ErrorAccureHandler(500, "Connection to server timedout");
            })


    }

    return (
        <div>
            <Row style={{ margin: '0' }}>
                <Col style={{ padding: '0' }}>
                    <Nav className={classes.Navbar} expand="lg">
                        <NavItem >
                            <NavLink style={{ marginTop: '-6px' }} tag={Link} href='/home'>
                                <strong style={{ fontSize: width < 455 ? '10px' : null }}> Home </strong>
                            </NavLink>
                        </NavItem>

                        <NavItem >
                            <NavLink style={{ marginTop: '-10px' }} tag={Link} href={`/topics/${type}`} >
                                <div>
                                    <img style={{ height: '36px', width: '36px', marginTop: '-6px' }} alt='...' src={'/chevron.png'} />
                                    <strong style={{ fontSize: width < 455 ? '10px' : null }}> {type} </strong>
                                </div>
                            </NavLink>

                        </NavItem>
                        <NavItem >
                            <NavLink style={{ marginTop: '-10px' }}>
                                <div>
                                    <img style={{ height: '36px', width: '36px', marginTop: '-6px' }} alt='...' src={'/chevron.png'} />
                                    <strong style={{ color: '#2CA8FF', fontSize: width < 455 ? '10px' : null }}> {Topic.title} </strong>
                                </div>
                            </NavLink>

                        </NavItem>
                    </Nav>
                </Col>
            </Row>
            <Container className={classes.Container}>
                <ToastContainer />
                <Row style={{ marginBottom: '50px', margin: 'auto' }}>

                    <Col className="ml-auto mr-auto" md="6" xl="1" style={{ justifyContent: 'flex-start', display: 'flex' }}>

                        <div style={{ width: '50px', height: '50px', margin: '0' }}>
                            {
                                Topic.autor === 'admin' ?
                                    <img src={context.UserProfile.profileimage} style={{ height: '50px', width: '50px', borderRadius: '100px' }} alt="" />
                                    :
                                    <img src={"/default-avatar.png"} style={{ height: '50px', width: '50px', borderRadius: '100px' }} alt="" />
                            }
                        </div>

                    </Col>
                    <Col >
                        <Row style={{ justifyContent: 'flex-start', display: 'flex' }}>
                            <Col>
                                <h3 className={classes.topicTitle}>{Topic.title}</h3>
                            </Col>

                        </Row>
                        <Row>
                            <p className={classes.infotext}> {'By'}</p>
                            <h5 className={classes.Topicautor}>{Topic.autor === 'admin' ? context.UserProfile.name : Topic.autor}</h5>
                            <p className={classes.infotext}><FormatDate>{Topic.date}</FormatDate></p>

                        </Row>

                    </Col>


                </Row>
                <PostCard
                    key={Topic._id}
                    ip={Topic.ip}
                    autor={Topic.autor}
                    date={Topic.date}
                    token={context.token}
                    content={Topic.content}
                    closeOpenFunction={() => { OpenCloseTopicHandler(!Topic.state) }}
                    banMemberFunction={() => { context.banMember({ name: Topic.autor, ip: Topic.ip, content: Topic.content }) }}
                    deleteFunction={deleteTopicHandler}
                />
                {Topic.replies.map(reply => {
                    return (
                        <PostCard
                            key={reply._id}
                            ip={reply.ip}
                            autor={reply.autor}
                            token={context.token}
                            date={reply.date}
                            content={reply.content}
                            banMemberFunction={() => { context.banMember({ name: reply.autor, ip: reply.ip, content: reply.content }) }}
                            deleteFunction={() => deleteReplyHandler(reply._id)}
                        />
                    )
                })
                }
                <CommentSection
                    token={context.token}
                    image={context.token ? context.UserProfile.profileimage : null}
                    submitCommment={submitCommentHandler}
                    defaultmessage='Reply to this topic'
                    active={Topic.state}
                    banned={context.getBanStatus()}
                />

            </Container >

        </div>

    )
}

export const getServerSideProps = async (context) => {

    const result = await Axios.get('https://mywebrestapi.herokuapp.com/topic/' + context.params.topicId)
    return {
        props: {
            Topic: result.data.result
        }, // will be passed to the page component as props
    }


}


export default TopicPage;