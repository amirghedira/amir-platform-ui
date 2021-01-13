
import React from 'react'
import axios from '../utils/axios'
import io from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify';
import Page404 from '../components/Page404/Page404'
import GlobalContext from './GlobalContext'
import 'react-toastify/dist/ReactToastify.css';

const AppContext = (props) => {

    const [token, Settoken] = React.useState(null);
    const [projects, setProjects] = React.useState(null);
    const [UserProfile, SetUserProfile] = React.useState(null);
    const [PageError, SetPageError] = React.useState({ state: false, statuscode: null, message: null });
    const [memberInfo, setMemberInfo] = React.useState(null)
    const [BannedUsers, SetBannedUsers] = React.useState(null)
    const [Notifications, setNotifications] = React.useState(null)
    const [goload, setgoload] = React.useState(false)
    const [socket, setsocket] = React.useState(null)
    const [subscription, setsubscription] = React.useState(null)
    const [Erroraccured, setErrorAccured] = React.useState(false)


    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            Settoken(localStorage.getItem('token'))
        }
    }, [])
    React.useEffect(() => {

        setsocket(io('http://localhost:5000'))
        axios.get('/banned')
            .then(result => {
                SetBannedUsers(result.data.banned)
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout")
            })
        fetch("https://api.ipgeolocation.io/getip")
            .then(response => {
                return response.json();
            })
            .then(res => {
                setMemberInfo({ ip: res.ip })
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout")
            })
        axios.get('/project')
            .then(result => {
                setProjects(result.data.result)
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout")
            })
        axios.get('/user')
            .then(result => {
                SetUserProfile(result.data)
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout")
            })
        axios.get('/notification')
            .then(result => {
                setNotifications(result.data.result)
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout")
            })
    }, [])
    React.useEffect(() => {
        const publicVadidKey = 'BMUYV7TShfXpU5edFVCfBEO0JwC-kCujoxV6q4pp3WHipuDPF2OE4bMd4LYYsNjKdn9GMtIlxW6vMQinu9qBkUg'
        if ('serviceWorker' in navigator)
            navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/serviceworker.js`, {
                scope: '/'
            })
                .then(register => {
                    register.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(publicVadidKey)
                    })
                        .then(subscription => {
                            setsubscription(subscription)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })



    }, [])


    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    React.useEffect(() => {
        if (socket && Notifications && BannedUsers) {
            if (token) {
                socket.off('sendnotification');
                socket.on('sendnotification', (notification) => {
                    if (token) {
                        axios.post('/subscribe', { subscription: subscription, content: notification.content })
                            .then()
                            .catch(err => {
                                ErrorAccureHandler(500, "Connection to server has timedout")
                            })
                        setNotifications([...Notifications, notification])
                    }

                })
            } else {
                socket.off('sendprojects');
                socket.on('sendprojects', (projects) => {
                    setProjects(projects)
                })
                socket.off('sendbannedmembers')
                socket.on('sendbannedmembers', (NewBannedUsers) => {
                    SetBannedUsers(NewBannedUsers)
                })
            }

        }

    }, [socket, token, Notifications, subscription, BannedUsers])



    const loginHandler = async (token) => {

        Notifications.forEach(notification => {

            if (!notification.read) {
                axios.post('/subscribe', { subscription: subscription, content: notification.content })
                    .then()
                    .catch(err => {
                        ErrorAccureHandler(500, "Connection to server has timedout")
                    })

            }
        })
        localStorage.setItem('token', token)
        Settoken(token);
    }

    const disconnectHandler = () => {

        localStorage.clear()
        Settoken(null);

    }

    const deleteprojectHandler = (id) => {
        const project = projects.find(project => {
            return project._id === id
        })
        axios.patch('/project/deleteproject/' + id, { files: project.imagesurl })
            .then(res => {
                const newProjects = projects;
                newProjects.splice(projects.findIndex(project => {
                    return project._id === id
                }), 1);
                socket.emit('sendprojects', [...newProjects])
                setProjects([...newProjects])

            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout")
            })
    }
    const addProjectHandler = (inputs) => {


        const fd = new FormData();
        if (inputs.projectimages)
            for (const key of Object.keys(inputs.projectimages)) {
                fd.append('projectimages', inputs.projectimages[key])
            }

        fd.append('name', inputs.name);
        fd.append('started', inputs.started);
        fd.append('technologie', inputs.technologie);
        fd.append('summary', inputs.summary);
        fd.append('whatlearned', inputs.whatlearned);
        fd.append('overview', inputs.overview);
        fd.append('status', inputs.status);
        fd.append('platform', inputs.platform);
        fd.append('features', inputs.features);
        fd.append('github', inputs.github);
        fd.append('filelink', inputs.filelink);

        axios.post('/project', fd)
            .then(result => {
                let newProject = {
                    _id: result.data._id,
                    name: inputs.name,
                    date: result.data.date,
                    summary: inputs.summary,
                    overview: inputs.overview,
                    whatlearned: inputs.whatlearned,
                    technologie: inputs.technologie,
                    commentsCount: 0,
                    gitViewers: 0,
                    downloadcount: 0,
                    status: inputs.status,
                    platform: inputs.platform,
                    features: inputs.features,
                    github: inputs.github,
                    Comments: [],
                    imagesurl: result.data.imagesurl

                }
                socket.emit('sendprojects', [...projects, newProject])
                setProjects([
                    ...projects,
                    newProject
                ])


            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout")
            })


    }
    const addprojectImageHandler = (projectid, images) => {

        const fd = new FormData();
        if (images)
            for (const key of Object.keys(images)) {
                fd.append('projectimages', images[key])
            }
        axios.patch('/project/addprojectimages/' + projectid, fd)
            .then(result => {
                const index = projects.findIndex(project => { return project._id === projectid })
                UpdateProjects(index, {
                    ...projects[index],
                    imagesurl: [...projects[index].imagesurl, result.data.imageurl]
                })
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout")
            })

    }
    const deleteProjectImageHandler = (projectid, image) => {

        const index = projects.findIndex(project => { return project._id === projectid })
        const imageindex = projects[index].imagesurl.findIndex(projectimage => { return projectimage === image });
        const newimages = projects[index].imagesurl;
        newimages.splice(imageindex, 1);
        axios.patch('/project/deleteprojectimage/' + projectid, { imagetodelete: image, newimages: newimages })
            .then(result => {
                UpdateProjects(index, {
                    ...projects[index],
                    imagesurl: newimages
                })
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout")
            })

    }
    const deleteCommentHandler = (projectid, commentid) => {

        const index = projects.findIndex((project) => { return project._id === projectid })
        const commentIndex = projects[index].Comments.findIndex(comment => { return comment._id === commentid })
        let newComments = projects[index].Comments
        newComments.splice(commentIndex, 1)
        axios.patch('/project/deletecomment/' + projectid, { Comments: newComments, commentsCount: newComments.length })
            .then(() => {
                const newProject = {
                    ...projects[index],
                    Comments: newComments,
                    commentsCount: newComments.length
                }
                UpdateProjects(index, newProject)
                axios.delete(`/notification/${commentid}`)
                    .then()
                    .catch(err => {
                        ErrorAccureHandler(500, "Connection to server has timedout");
                    })

            })

            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout");
            })
    }
    const postCommentHandler = (projectId, obj) => {

        const index = projects.findIndex(project => { return project._id === projectId })

        const NewComment = { ip: obj.ip, content: obj.content, autor: obj.autor }
        axios.post('/project/postcomments/' + projects[index]._id, { comment: NewComment, commentsCount: projects[index].commentsCount + 1 })
            .then(result => {
                UpdateProjects(index,
                    {
                        ...projects[index],
                        Comments: [...projects[index].Comments, { ...NewComment, _id: result.data._id, date: result.data.date }],
                        commentsCount: projects[index].commentsCount + 1
                    }

                )
                if (obj.autor !== 'admin')
                    axios.post('/notification', { id: result.data._id, content: `user ${obj.autor} has commented ${projects[index].name} project`, link: `/project/${projects[index]._id}` })
                        .then(result => { })
                        .catch(err => {
                            ErrorAccureHandler(500, "Connection to server has timedout");
                        })
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout");
            })
    }
    const UpdateDownloadCount = (projectid) => {
        const index = projects.findIndex((project) => { return project._id === projectid })
        axios.patch('/project/updatedownloads/' + projectid, { downloadcount: projects[index].downloadcount + 1 })
            .then(result => {
                const newProject =
                {
                    ...projects[index],
                    downloadcount: projects[index].downloadcount + 1

                }
                UpdateProjects(index, newProject)
            })
            .catch(err => { ErrorAccureHandler(500, "Connection to server has timedout") })
    }
    const UpdateGitViewer = (projectid) => {
        const index = projects.findIndex((project) => { return project._id === projectid })
        axios.patch('/project/updategitviewers/' + projectid, { gitviewers: projects[index].gitViewers + 1 })
            .then(result => {
                const newProject = {
                    ...projects[index],
                    gitViewers: projects[index].gitViewers + 1
                }
                UpdateProjects(index, newProject)
            })
            .catch(err => { ErrorAccureHandler(500, "Connection to server has timedout") })

    }
    const UpdateProfile = (newprofile) => {
        SetUserProfile(newprofile)
    }

    const unBanMemberHandler = (id) => {

        axios.delete(`/banned/${id}`)
            .then(result => {
                const index = BannedUsers.findIndex(banneduser => { return banneduser._id === id })
                let newBannedUsers = BannedUsers;
                newBannedUsers.splice(index, 1);
                socket.emit('sendbannedmembers', newBannedUsers)
                SetBannedUsers(newBannedUsers);
                setgoload(!goload)
                toast.success('User is successfully unbanned!', { position: toast.POSITION.BOTTOM_RIGHT })
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout")
            })
    }

    const BanMemberHandler = (member) => {


        let ips = BannedUsers.map(banneduser => { return banneduser.ip })
        if (ips.includes(member.ip)) {
            toast.error('User already banned!', { position: toast.POSITION.BOTTOM_RIGHT })
        }
        else {
            axios.post('/banned', member)
                .then(result => {
                    let newBannedUsers = BannedUsers
                    newBannedUsers.push({
                        ...member,
                        date: result.data.date,
                        _id: result.data._id
                    })
                    socket.emit('sendbannedmembers', newBannedUsers)
                    SetBannedUsers(newBannedUsers)
                    toast.success('User is successfully banned.', { position: toast.POSITION.BOTTOM_RIGHT })

                })
                .catch(err => {
                    ErrorAccureHandler(500, "Connection to server has timedout")
                })
        }
    }

    const getBanStatusHandler = () => {
        if (BannedUsers && memberInfo) {
            const ips = BannedUsers.map(banneduser => banneduser.ip)
            return ips.includes(memberInfo.ip)
        }
        return false;
    }
    const makeasReadHandler = (notificationid) => {
        axios.patch(`/notification/markasread/${notificationid}`)
            .then(result => {
                const index = Notifications.findIndex(notification => notificationid === notification._id)
                let newNotifications = Notifications;
                newNotifications[index].read = true;
                setNotifications([
                    ...newNotifications
                ])
            })
            .catch(err => {
                ErrorAccureHandler(500, err.reponse.message)
            })
    }
    const deleteTopicNotificationsHandler = (topicid, type) => {
        axios.patch(`/notification/topicnotifications/${topicid}`, { link: `/${type}/${topicid}` })
            .then(result => {
                let newNotifications = Notifications.filter(notification => { return notification.link !== `/${type}/${topicid}` });
                setNotifications([...newNotifications])
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout");
            })
    }
    const deleteReplyNotificationHandler = (replyId) => {
        axios.delete(`/notification/${replyId}`)
            .then(result => {
                const index = Notifications.findIndex(notification => notification.id === replyId)
                let newNotifications = Notifications;
                newNotifications.splice(index, 1)
                setNotifications([...newNotifications])

            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout");
            })
    }



    const addNotificationReplyHandler = (id, autor, topicid, topictitle, type) => {


        axios.post('/notification', { id: id, content: `user ${autor} has replied in ${topictitle}`, link: `/${type}/${topicid}` })
            .then(result => {
                let newNotifications = Notifications
                newNotifications.push({
                    _id: result.data.notification._id,
                    link: result.data.notification.link,
                    content: result.data.notification.content,
                    date: result.data.notification.date,
                    read: false

                })
                socket.emit('sendnotification',
                    {
                        _id: result.data.notification._id,
                        link: result.data.notification.link,
                        content: result.data.notification.content,
                        date: result.data.notification.date,
                        read: false


                    })
                setNotifications([...newNotifications])
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout");
            })
    }
    const addNotificationTopicHandler = (id, autor, Type) => {
        axios.post('/notification', { id: id, content: `user ${autor} has created a new Topic`, link: `/${Type}/${id}` })
            .then(result => {
                let newNotifications = Notifications
                newNotifications.push({
                    _id: result.data.notification._id,
                    link: result.data.notification.link,
                    content: result.data.notification.content,
                    date: result.data.notification.date,
                    read: false

                })
                socket.emit('sendnotification', {
                    _id: result.data.notification._id,
                    link: result.data.notification.link,
                    content: result.data.notification.content,
                    date: result.data.notification.date,
                    read: false
                })
                setNotifications([...newNotifications])
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout");
            })
    }
    const ErrorAccureHandler = (statuscode, message) => {
        SetPageError({
            statuscode: statuscode,
            message: message
        })
        setErrorAccured(true)

    }
    const UpdateProjects = (index, newProject) => {

        let NewProjects = projects
        NewProjects[index] = newProject
        socket.emit('sendprojects', NewProjects)
        setProjects(NewProjects)
        setgoload(!goload)

    }
    if (Erroraccured)
        return <Page404 statuscode={PageError.statuscode} message={PageError.message} />
    else
        return (
            <GlobalContext.Provider value={
                {
                    PageError: PageError,
                    UserProfile: UserProfile,
                    socket: socket,
                    setsocket: setsocket,
                    memberInfo: memberInfo,
                    UpdateProfile: UpdateProfile,
                    token: token,
                    loginHandler: loginHandler,
                    disconnectHandler: disconnectHandler,
                    projects: projects,
                    addProjectHandler: addProjectHandler,
                    deleteprojectHandler: deleteprojectHandler,
                    addprojectImage: addprojectImageHandler,
                    deleteProjectImage: deleteProjectImageHandler,
                    UpdateProjects: UpdateProjects,
                    UpdateGitViewer: UpdateGitViewer,
                    postComment: postCommentHandler,
                    deleteCommentHandler: deleteCommentHandler,
                    UpdateDownloadCount: UpdateDownloadCount,
                    BannedUsers: BannedUsers,
                    banMember: BanMemberHandler,
                    unbanMember: unBanMemberHandler,
                    getBanStatus: getBanStatusHandler,
                    Notifications: Notifications,
                    makeasRead: makeasReadHandler,
                    deleteTopicNotifications: deleteTopicNotificationsHandler,
                    deleteReplyNotification: deleteReplyNotificationHandler,
                    addNotificationReply: addNotificationReplyHandler,
                    addNotificationTopic: addNotificationTopicHandler,
                    ErrorAccureHandler: ErrorAccureHandler

                }
            }>
                {props.children}
                <ToastContainer />
            </GlobalContext.Provider>
        )
}


export default AppContext;