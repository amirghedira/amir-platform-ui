import React from 'react';
import classes from './TopicsPage.module.css';
import Topicitem from '../../components/Topicitem/Topicitem'
import { Container, Row, Col, Button, PaginationLink, PaginationItem, Pagination, Nav, NavItem, NavLink } from 'reactstrap'
import GlobalContext from '../../context/GlobalContext';
import axios from '../../utils/axios'
import Link from 'next/link'
import Banned from '../../components/Banned/Banned'
import { toast } from 'react-toastify';

const TopicsPage = ({ Topics, Type }) => {

    const context = React.useContext(GlobalContext)
    const [topics, setTopics] = React.useState(Topics)
    const [currentPosts, SetcurrentPosts] = React.useState({})
    const [currentPage, setcurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(10);
    const indexofLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexofLastPost - postsPerPage;



    React.useEffect(() => {
        SetcurrentPosts(topics.slice(indexofFirstPost, indexofLastPost))
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
    }, [Type])

    React.useEffect(() => {

        return () => {
            if (context.socket)
                context.socket.off('sendtopics')
        }
    }, [context.socket])
    React.useEffect(() => {
        if (context.socket && topics) {
            context.socket.off('sendtopics')
            context.socket.on('sendtopics', (topics) => {
                setTopics(topics)
                SetcurrentPosts(topics.slice(indexofFirstPost, indexofLastPost))

            })
        }
    }, [context.socket, indexofFirstPost, indexofLastPost, topics])

    const editTopicStateHandler = (topicId, topicstate) => {
        axios.patch(`/topic/topicstate/${topicId}`, { state: topicstate })
            .then(result => {
                let newTopics = topics;
                const topicIndex = topics.findIndex(topic => { return topic._id === topicId });
                newTopics[topicIndex] = {
                    ...newTopics[topicIndex],
                    state: topicstate
                }
                if (topicstate)
                    toast.success('Topic openned.', { position: toast.POSITION.BOTTOM_RIGHT })
                else
                    toast.success('Topic closed.', { position: toast.POSITION.BOTTOM_RIGHT })
                context.socket.emit('sendtopics', newTopics)
                setTopics(newTopics)
                SetcurrentPosts(newTopics.slice(indexofFirstPost, indexofLastPost))
            })
            .catch(err => {
                context.ErrorAccureHandler();
            })



    }
    const getBanStatus = () => {
        if (context.bannedUsers && context.memberInfo) {
            const ips = context.bannedUsers.map(banneduser => banneduser.ip)
            return ips.includes(context.memberInfo.ip)
        }
        return false;
    }
    const pinUnpinTopicHandler = (topicId, topicpinstate) => {
        axios.patch(`/topic/topicpin/${topicId}`, { state: topicpinstate })
            .then(result => {
                let newTopics = topics;
                const topicIndex = topics.findIndex(topic => { return topic._id === topicId });
                newTopics[topicIndex] = {
                    ...newTopics[topicIndex],
                    pin: topicpinstate
                }
                if (topicpinstate)
                    toast.success('Topic pinned.', { position: toast.POSITION.BOTTOM_RIGHT })
                else
                    toast.success('Topic unpinned.', { position: toast.POSITION.BOTTOM_RIGHT })
                context.socket.emit('sendtopics', newTopics)
                setTopics(newTopics)
                SetcurrentPosts(newTopics.slice(indexofFirstPost, indexofLastPost))

            })
            .catch(err => {
                context.ErrorAccureHandler();
            })


    }

    const deleteTopicHandler = (id) => {
        axios.delete(`topic/${id}`)
            .then(result => {
                let newTopics = topics;
                const index = newTopics.findIndex(topic => { return topic._id === id })
                context.deleteTopicNotifications(topics[index]._id, Type)
                newTopics.splice(index, 1);
                setTopics(newTopics)
                toast.success('Topic deleted.', { position: toast.POSITION.BOTTOM_RIGHT })
                SetcurrentPosts(newTopics.slice(indexofFirstPost, indexofLastPost))

            })
            .catch(err => {
                console.log(err)
                context.ErrorAccureHandler(500, "Connection to server timedout");
            })

    }

    const getPageNumber = () => {
        let Pagenumber = [];
        for (let i = 1; i <= Math.ceil(topics.length / postsPerPage); i++) {
            Pagenumber.push(i)
        }
        return Pagenumber
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
                            <NavLink >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img style={{ height: '36px', width: '36px' }} alt='...' src={'/chevron.png'} />
                                    <strong style={{ color: '#2CA8FF', fontSize: '12px' }} > {Type} </strong>
                                </div>
                            </NavLink>

                        </NavItem>
                    </Nav>
                </Col>
            </Row>

            <Container className={classes.container}>

                <Row className={classes.createTopic}>
                    <Col>
                        <h3 className={classes.sectionTitle}>{Type}</h3>
                    </Col>
                    <Col style={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <Link href={`/add-topic/${Type}`} legacyBehavior>
                            <Button color="info" >
                                <i className="fas fa-comments fa-2x" style={{ marginRight: '10px', fontSize: '16px' }}></i>
                                Create new Topic

                            </Button>
                        </Link>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        {topics.length > postsPerPage ?
                            <Nav className={classes.PaginationBar} expand="lg">

                                <Pagination
                                    className="pagination pagination-primary"
                                    listClassName="pagination-primary"
                                >                                {
                                        getPageNumber().map(number => {
                                            return (
                                                <PaginationItem key={number} className={currentPage === number ? "active" : ''}>
                                                    <PaginationLink style={{ color: currentPage === number ? 'black' : 'white' }} onClick={() => setcurrentPage(number)}>
                                                        {number}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        })
                                    }
                                </Pagination>
                            </Nav> : null}
                    </Col>
                </Row>
                <Row className={classes.sectionList}>
                    {currentPosts.length > 0 ?
                        <Col>
                            {
                                currentPosts.slice(0).reverse().map(topic => {
                                    if (topic.pin)
                                        return (
                                            <Topicitem
                                                key={topic._id}
                                                id={topic._id}
                                                title={topic.title}
                                                autor={topic.autor}
                                                date={topic.date}
                                                replies={topic.replies.length}
                                                type={Type}
                                                token={context.currentUser}
                                                pinnedstate={topic.pin}
                                                lockedstate={topic.state}
                                                closeOpenFunction={() => { editTopicStateHandler(topic._id, !topic.state) }}
                                                deleteTopicFunction={() => { deleteTopicHandler(topic._id) }}
                                                pinFunction={() => pinUnpinTopicHandler(topic._id, !topic.pin)}

                                            />

                                        )
                                    else return null
                                })
                            }
                            {currentPosts.slice(0).reverse().map(topic => {
                                if (!topic.pin)
                                    return (
                                        <Topicitem
                                            key={topic._id}
                                            id={topic._id}
                                            title={topic.title}
                                            autor={topic.addedBy ? topic.addedBy.name : topic.autor}
                                            date={topic.date}
                                            replies={topic.replies.length}
                                            type={Type}
                                            token={context.currentUser}
                                            pinnedstate={topic.pinned}
                                            lockedstate={topic.state}
                                            closeOpenFunction={() => { editTopicStateHandler(topic._id, !topic.state) }}
                                            deleteTopicFunction={() => { deleteTopicHandler(topic._id) }}
                                            pinFunction={() => pinUnpinTopicHandler(topic._id, !topic.pinned)}

                                        />
                                    )
                                else return null
                            })
                            }

                        </Col>
                        :
                        getBanStatus() ?
                            <Banned />
                            :
                            <Col style={{ marginTop: '50px' }}>
                                <div style={{ display: 'flex', marginBottom: '20px' }}>
                                    <h4 style={{ margin: 'auto' }}> There are no topics in this section yet</h4>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Link href={`/add-topic/${Type}`} style={{ margin: 'auto' }} legacyBehavior>

                                        <Button color="info">
                                            Start the first topic
                                        </Button>
                                    </Link>
                                </div>

                            </Col>

                    }
                </Row>
                <Row>
                    <Col>
                        {topics.length > postsPerPage ?
                            <Nav className={classes.PaginationBar} expand="lg">

                                <Pagination
                                    className="pagination pagination-primary"
                                    listClassName="pagination-primary"
                                >                                {
                                        getPageNumber().map(number => {
                                            return (
                                                <PaginationItem key={number} className={currentPage === number ? "active" : ''}>
                                                    <PaginationLink style={{ color: currentPage === number ? 'black' : 'white' }} onClick={() => setcurrentPage(number)}>
                                                        {number}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        })
                                    }
                                </Pagination>
                            </Nav> : null}
                    </Col>
                </Row>

            </Container>
        </div>
    );
}

export default TopicsPage