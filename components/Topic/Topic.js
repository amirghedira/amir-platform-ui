import React from 'react'
import classes from './Topic.module.css';
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import PostCard from '../PostCard/PostCard'
import CommentSection from '../CommentSection/CommentSection'
import axios from '../../utils/axios'
import Link from 'next/link'
import GlobalContext from '../../context/GlobalContext'
import { toast } from 'react-toastify';
import FormatDate from '../../utils/FormatDate'
import { useRouter } from 'next/router'


const Topic = ({ Topic, type }) => {
    const context = React.useContext(GlobalContext)
    const [topic, setTopic] = React.useState(Topic)
    const router = useRouter()

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
    }, [context.socket, topic])

    const submitCommentHandler = (obj) => {

        if (topic.replies.length === 0 || context.memberInfo.ip !== topic.replies[topic.replies.length - 1].ip) {

            axios.patch('/topic/postcomment/' + topic._id, { ip: context.memberInfo.ip, autor: obj.autor, content: obj.content })
                .then(response => {
                    const newTopic = {
                        ...topic,
                        replies: [...topic.replies, { _id: response.data.id, ip: context.memberInfo.ip, autor: obj.autor, content: obj.content, date: response.data.date }]
                    }
                    setTopic(newTopic)
                    context.socket.emit('sendtopic', newTopic)

                    if (!obj.autor && context.currentUser)
                        context.addNotificationReply(response.data.id, obj.autor, topic._id, topic.title, type)
                })
                .catch(err => {
                    console.log(err)
                    if (err.response)
                        context.ErrorAccureHandler(err.response.status, err.response.message);
                })

        } else {

            toast.error('You already posted a comment', { position: toast.POSITION.BOTTOM_RIGHT })
        }


    }
    const OpenCloseTopicHandler = (topicstate) => {

        axios.patch('/topic/topicstate/' + topic._id, { state: topicstate })
            .then(result => {
                const newTopic = {
                    ...topic,
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

        axios.delete('/topic/' + topic._id)
            .then(result => {
                router.push(`/topics/${type}`)
            })
            .catch(err => {
                context.ErrorAccureHandler();
            })

    }

    const deleteReplyHandler = (replyId) => {

        const replyIndex = topic.replies.findIndex(reply => { return reply._id === replyId })
        let newReplies = topic.replies;
        newReplies.splice(replyIndex, 1)
        axios.patch('/topic/deletecomment/' + topic._id, { newreplies: newReplies })
            .then(result => {
                const newTopic = {
                    ...topic,
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
                        <NavItem style={{ height: '100%', display: 'flex', alignItems: 'center' }} >
                            <NavLink href='/' tag={Link}>
                                <strong style={{ color: '#2CA8FF', fontSize: '12px', cursor: 'pointer' }}> Home </strong>
                            </NavLink>
                        </NavItem>

                        <NavItem style={{ height: '100%', display: 'flex', alignItems: 'center' }} >
                            <NavLink href={`/topics/${type}`} tag={Link}>
                                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <img style={{ height: '36px', width: '36px' }} alt='...' src={'/chevron.png'} />
                                    <strong style={{ color: '#2CA8FF', fontSize: '12px' }} > {type} </strong>
                                </div>
                            </NavLink>

                        </NavItem>
                        <NavItem style={{ height: '100%', display: 'flex', alignItems: 'center' }} >
                            <NavLink >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img style={{ height: '36px', width: '36px' }} alt='...' src={'/chevron.png'} />
                                    <strong style={{ color: '#2CA8FF', fontSize: '12px' }} > {topic.title} </strong>
                                </div>
                            </NavLink>

                        </NavItem>
                    </Nav>
                </Col>
            </Row>
            <Container className={classes.Container}>
                <Row style={{ marginBottom: '50px', margin: 'auto' }}>

                    <Col className="ml-auto mr-auto" xs="3" sm="2" md="1" style={{ justifyContent: 'flex-start', display: 'flex' }}>

                        <div style={{ margin: '0' }}>
                            {
                                topic.addedBy ?
                                    <img src={topic.addedBy.profileimage} style={{ height: '50px', width: '50px', borderRadius: '100px' }} alt="Amir ghedira" />
                                    :
                                    <img src={"/default-avatar.png"} style={{ height: '50px', width: '50px', borderRadius: '100px' }} alt="javascript programmer" />
                            }
                        </div>

                    </Col>
                    <Col >
                        <Row style={{ justifyContent: 'flex-start', display: 'flex' }}>
                            <Col>
                                <h3 className={classes.topicTitle}>{topic.title}</h3>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <div style={{ display: 'flex' }}>
                                    <p className={classes.infotext}> {'By'}</p>
                                    <h5 className={classes.Topicautor}>{topic.addedBy ? topic.addedBy.name : topic.autor}</h5>
                                    <p className={classes.infotext}><FormatDate>{topic.date}</FormatDate></p>
                                </div>
                            </Col>


                        </Row>

                    </Col>


                </Row>
                <PostCard
                    key={topic._id}
                    ip={topic.ip}
                    autor={topic.autor}
                    addedBy={topic.addedBy}
                    date={topic.date}
                    connected={context.currentUser || false}
                    content={topic.content}
                    closeOpenFunction={() => { OpenCloseTopicHandler(!topic.state) }}
                    banMemberFunction={() => { context.banMember({ name: topic.autor, ip: topic.ip, content: topic.content }) }}
                    deleteFunction={deleteTopicHandler}
                />
                {topic.replies.map(reply => {
                    return (
                        <PostCard
                            key={reply._id}
                            ip={reply.ip}
                            addedBy={reply.addedBy}
                            autor={reply.autor}
                            connected={context.currentUser || false}
                            date={reply.date}
                            content={reply.content}
                            banMemberFunction={() => { context.banMember({ name: reply.autor, ip: reply.ip, content: reply.content }) }}
                            deleteFunction={() => deleteReplyHandler(reply._id)}
                        />
                    )
                })
                }
                <CommentSection
                    token={context.currentUser}
                    image={context.currentUser ? context.currentUser.profileimage : null}
                    submitCommment={submitCommentHandler}
                    defaultmessage='Reply to this topic'
                    active={topic.state}
                    banned={context.getBanStatus()}
                />

            </Container >

        </div>

    )
}

export default Topic