
import React from 'react'
import axios, { API_URL } from '../utils/axios'
import io from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify';
import Page404 from '../components/Page404/Page404'
import GlobalContext from './GlobalContext'
import 'react-toastify/dist/ReactToastify.css';
import LocalStorageService from '../utils/localStorageService';

const AppContext = (props) => {
    const [UserProfile, SetUserProfile] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState(null)
    const [PageError, SetPageError] = React.useState({ state: false, statuscode: null, message: null });
    const [memberInfo, setMemberInfo] = React.useState(null)
    const [bannedUsers, SetBannedUsers] = React.useState(null)
    const [Notifications, setNotifications] = React.useState(null)
    const [socket, setsocket] = React.useState(null)
    const [subscription, setsubscription] = React.useState(null)
    const [Erroraccured, setErrorAccured] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        if (LocalStorageService.getAccessToken()) {
            axios.get('/user/connected-user')
                .then(result => {
                    result.data.notifications.forEach(notification => {

                        if (!notification.read) {
                            axios.post('/subscribe', { subscription: subscription, content: notification.content })
                                .then()
                                .catch(err => {
                                    ErrorAccureHandler(500, "Connection to server has timedout")
                                })

                        }
                    })
                    setNotifications(result.data.notifications)
                    setCurrentUser(result.data.user)
                    setLoading(false)
                })
                .catch(err => {
                    ErrorAccureHandler(500, "Connection to server has timedout")
                })
        } else {
            setLoading(false)
        }
    }, [])
    React.useEffect(() => {
        setsocket(io(API_URL))
        axios.get('/user')
            .then(res => {
                SetUserProfile(res.data)
            })
        axios.get('/user/banned')
            .then(res => {
                SetBannedUsers(res.data.banned)
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
            })
    }, [])
    React.useEffect(() => {
        if (currentUser) {
            const publicVadidKey = 'BMUYV7TShfXpU5edFVCfBEO0JwC-kCujoxV6q4pp3WHipuDPF2OE4bMd4LYYsNjKdn9GMtIlxW6vMQinu9qBkUg'
            if ('serviceWorker' in navigator)
                navigator.serviceWorker.register("/serviceworker.js")
                    .then(register => {
                        register.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(publicVadidKey)
                        })
                            .then(subscription => {
                                setsubscription(subscription)
                            })
                            .catch(err => {
                            })
                    })
                    .catch(err => {
                    })
        }

    }, [currentUser])


    const urlBase64ToUint8Array = (base64String) => {
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
        if (socket && Notifications && bannedUsers) {
            if (currentUser) {
                socket.off('sendnotification');
                socket.on('sendnotification', (notification) => {
                    if (currentUser) {
                        axios.post('/subscribe', { subscription: subscription, content: notification.content })
                            .then()
                            .catch(err => {
                                ErrorAccureHandler(500, "Connection to server has timedout")
                            })
                        setNotifications([...Notifications, notification])
                    }

                })
            } else {
                socket.off('sendbannedmembers')
                socket.on('sendbannedmembers', (NewBannedUsers) => {
                    SetBannedUsers(NewBannedUsers)
                })
            }

        }

    }, [socket, currentUser, Notifications, subscription, bannedUsers])


    const unBanMemberHandler = (id) => {

        axios.delete(`/banned/${id}`)
            .then(result => {
                const index = bannedUsers.findIndex(banneduser => { return banneduser._id === id })
                let newBannedUsers = bannedUsers;
                newBannedUsers.splice(index, 1);
                socket.emit('sendbannedmembers', newBannedUsers)
                SetBannedUsers(newBannedUsers);
                toast.success('User is successfully unbanned!', { position: toast.POSITION.BOTTOM_RIGHT })
            })
            .catch(err => {
                ErrorAccureHandler(500, "Connection to server has timedout")
            })
    }

    const BanMemberHandler = (member) => {


        let ips = bannedUsers.map(banneduser => { return banneduser.ip })
        if (ips.includes(member.ip)) {
            toast.error('User already banned!', { position: toast.POSITION.BOTTOM_RIGHT })
        }
        else {
            axios.post('/banned', member)
                .then(result => {
                    let newBannedUsers = bannedUsers
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
        if (bannedUsers && memberInfo) {
            const ips = bannedUsers.map(banneduser => banneduser.ip)
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
    if (Erroraccured)
        return <Page404 statuscode={PageError.statuscode} message={PageError.message} />
    else
        return (
            <GlobalContext.Provider value={
                {
                    PageError: PageError,
                    currentUser: currentUser,
                    loadingContext: loading,
                    UserProfile: UserProfile,
                    socket: socket,
                    setsocket: setsocket,
                    memberInfo: memberInfo,
                    bannedUsers: bannedUsers,
                    banMember: BanMemberHandler,
                    unbanMember: unBanMemberHandler,
                    getBanStatus: getBanStatusHandler,
                    Notifications: Notifications,
                    makeasRead: makeasReadHandler,
                    deleteTopicNotifications: deleteTopicNotificationsHandler,
                    deleteReplyNotification: deleteReplyNotificationHandler,
                    addNotificationReply: addNotificationReplyHandler,
                    addNotificationTopic: addNotificationTopicHandler,
                    ErrorAccureHandler: ErrorAccureHandler,

                }
            }>

                {props.children}
                < ToastContainer />

            </GlobalContext.Provider>
        )
}


export default AppContext;