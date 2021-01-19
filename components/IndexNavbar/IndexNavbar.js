import React from "react";
import LoginModal from '../loginModal/LoginModal'
import GlobalContext from '../../context/GlobalContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommonLoading } from 'react-loadingg';
import { useRouter } from 'next/router'
import classes from './IndexNavbar.module.css'
// reactstrap components
import {
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    UncontrolledTooltip,
    Badge,
    Input
} from "reactstrap";
import Link from "next/link";
import { RotateCircleLoading } from 'react-loadingg';
import axios from '../../utils/axios';
const IndexNavbar = () => {
    const context = React.useContext(GlobalContext)
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    const [loginerror, setloginerror] = React.useState('')
    const [showloginmodal, setshowloginmodal] = React.useState(false);
    const [LoadingImage, SetLoadingImage] = React.useState(true)
    const [navbarColor, setNavbarColor] = React.useState('navbar-transparent');
    const [LoadingNotification, SetLoadingNotification] = React.useState(true)
    const [focusSearch, setFocusSearch] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState('')
    const router = useRouter()

    React.useEffect(() => {
        if (context.UserProfile)
            SetLoadingImage(false)

        if (context.Notifications)
            SetLoadingNotification(false)


    }, [context.token, context.UserProfile, context.Notifications])


    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 199 ||
                document.body.scrollTop > 199
            ) {
                setNavbarColor('');
            } else if (
                document.documentElement.scrollTop < 200 ||
                document.body.scrollTop < 200
            ) {
                setNavbarColor("navbar-transparent");
            }
        };
        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };

    });
    const DisconnectHandler = () => {
        toast.success("Successfully disconnected", { position: toast.POSITION.BOTTOM_RIGHT })
        context.disconnectHandler();
    }
    const keyPressedHandler = (e) => {
        if (e.key === 'Enter') {
            router.push({ pathname: "/search", query: { searchTerm: searchQuery } })
        }
    }
    const loginHandler = (logininfo) => {
        axios.post('/user/login', { username: logininfo.username, password: logininfo.password })
            .then(result => {

                if (result.status === 200) {
                    setshowloginmodal(false)
                    setloginerror('')
                    toast.success(result.data.message, { position: toast.POSITION.BOTTOM_RIGHT })
                    context.loginHandler(result.data.token)
                } else
                    setloginerror(result.data.message)

            })
            .catch(err => {
                context.ErrorAccureHandler();
            })

    }
    const hideshowHandler = () => {

        setshowloginmodal(!showloginmodal)
    }

    const focusgainedHandler = () => {
        setloginerror('')
    }

    let profileImageComponent = null;
    if (context.token) {
        profileImageComponent = (
            <Nav
                className="nav-pills-info nav-pills-just-icons"
            >
                <UncontrolledDropdown nav>
                    <DropdownToggle

                        nav
                    >
                        {LoadingImage ?

                            <RotateCircleLoading
                                size="small"
                                color='white'
                                style={{ width: '25px', height: '25px' }}
                            />
                            :
                            <img
                                alt="..."
                                className="rounded-circle img-raised"
                                style={{
                                    witdh: '30px',
                                    height: '30px'
                                }}
                                src={context.UserProfile.profileimage}
                            />
                        }

                    </DropdownToggle>
                    <DropdownMenu right>
                        <Link href="/amirghedira"
                            style={{ color: 'black' }}
                            onClick={() => {
                                setCollapseOpen(false)

                            }}>
                            <DropdownItem>
                                profile
                            </DropdownItem>
                        </Link>
                        <Link href="/settings"
                            style={{ color: 'black' }}
                            onClick={() => {
                                setCollapseOpen(false)

                            }}>
                            <DropdownItem>
                                Settings
                             </DropdownItem>
                        </Link>
                        <DropdownItem
                            onClick={() => { setCollapseOpen(false); DisconnectHandler(); }}
                        >
                            Disconnect
                </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>

        )
    }
    else
        profileImageComponent =
            (<NavItem>
                <NavLink
                    onClick={hideshowHandler}
                    id="login-tooltip"
                >
                    <i className="fas fa-user fa-2x" style={{ marginTop: '5px' }}></i>
                </NavLink>
                <UncontrolledTooltip target="#login-tooltip">
                    Staff Login
          </UncontrolledTooltip>
            </NavItem>)

    return (
        <>
            {collapseOpen ? (
                <div
                    id="bodyClick"
                    onClick={() => {

                        document.documentElement.classList.toggle("nav-open");
                        setCollapseOpen(!collapseOpen);


                    }}
                />
            ) : null}
            <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand
                            onClick={() => {
                                setCollapseOpen(false)
                            }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Link href="/">
                                    <h5 className={classes.navLink} style={{ margin: 0, cursor: 'pointer' }}>
                                        Home
                                </h5>
                                </Link>
                                <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                                    <i className={`fas fa-search ${classes.searchIcon}`}></i>
                                    <Input className={classes.searchInput}
                                        onKeyPress={keyPressedHandler}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{ borderColor: focusSearch ? '#2CA8FF' : 'white' }}
                                        onBlur={() => { setFocusSearch(false) }}
                                        onFocus={() => { setFocusSearch(true) }}

                                        placeholder='Search...' />
                                </div>

                            </div>
                        </NavbarBrand>
                        <button
                            className="navbar-toggler navbar-toggler"
                            onClick={() => {
                                document.documentElement.classList.toggle("nav-open");
                                setCollapseOpen(!collapseOpen);
                            }}
                            aria-expanded={collapseOpen}
                            type="button"
                        >
                            <span className="navbar-toggler-bar top-bar"></span>
                            <span className="navbar-toggler-bar middle-bar"></span>
                            <span className="navbar-toggler-bar bottom-bar"></span>
                        </button>
                    </div>
                    <Collapse
                        className="justify-content-end"
                        isOpen={collapseOpen}
                        navbar>
                        <Nav navbar style={{ display: 'flex', alignItems: 'center' }}>

                            <NavItem className={classes.navItem}>
                                <NavLink
                                    onClick={() => {
                                        setCollapseOpen(false)

                                    }}

                                >
                                    <Link
                                        href="/topics/questions"
                                        onClick={() => {
                                            setCollapseOpen(false)

                                        }}
                                    >
                                        <div className={classes.navItemContainer}>
                                            <i className={`fas fa-question ${classes.navIcon}`}></i>
                                            <h5 className={classes.navItemContent}>Questions</h5>
                                        </div>
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem className={classes.navItem}>
                                <NavLink

                                    onClick={() => {
                                        setCollapseOpen(false)

                                    }}
                                >
                                    <Link href="/topics/suggestions">
                                        <div className={classes.navItemContainer}>
                                            <i className={`fas fa-lightbulb ${classes.navIcon}`}></i>
                                            <h5 className={classes.navItemContent}>Suggestions</h5>
                                        </div>
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem className={classes.navItem}>
                                <NavLink
                                    onClick={() => {
                                        setCollapseOpen(false)

                                    }}

                                >
                                    <Link href="/amirghedira">
                                        <div className={classes.navItemContainer}>
                                            <i className={`fas fa-address-card ${classes.navIcon}`}></i>
                                            <h5 className={classes.navItemContent}>Profile</h5>
                                        </div>
                                    </Link>
                                </NavLink>
                            </NavItem>
                            {context.token ?
                                <NavItem>
                                    <Nav
                                        className="nav-pills-info nav-pills-just-icons">
                                        <UncontrolledDropdown nav>
                                            <DropdownToggle nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                <i className={`fas fa-bell ${classes.navIcon}`} style={{ margin: 'auto' }}>
                                                    {!LoadingNotification && context.Notifications.filter(notification => { return notification.read === false }).length > 0 ?
                                                        < Badge style={{ witdh: '20px', height: '20px', borderRadius: '100px', fontSize: '14px' }} color="danger">
                                                            {
                                                                context.Notifications.filter(notification => { return notification.read === false }).length
                                                            }
                                                        </Badge>
                                                        : null}
                                                </i>


                                            </DropdownToggle>
                                            <DropdownMenu right style={{ maxHeight: '250px', overflowY: 'auto', height: 'fit-content', padding: '0', display: !LoadingNotification && context.Notifications.length === 0 ? 'flex' : 'block' }}>
                                                {
                                                    !LoadingNotification ?
                                                        context.Notifications.length > 0 ?
                                                            context.Notifications.slice(0).reverse().map(notification => {
                                                                return (
                                                                    <React.Fragment key={notification._id}>
                                                                        <Link href={notification.link}
                                                                            style={{ color: 'black' }}
                                                                            onClick={() => {
                                                                                setCollapseOpen(false)

                                                                            }}>
                                                                            <DropdownItem
                                                                                style={{
                                                                                    minHeight: '50px',
                                                                                    backgroundColor:
                                                                                        !notification.read && !collapseOpen ? '#f2f2f2' : notification.read && !collapseOpen ? 'white' :
                                                                                            !notification.read && collapseOpen ? '#999999' : 'b3b3b3'
                                                                                    , margin: '0'
                                                                                }}
                                                                                onClick={() => { context.makeasRead(notification._id) }}>

                                                                                {notification.read ?
                                                                                    <p style={{ width: '300px', overflow: 'hidden', whiteSpace: 'pre-wrap' }}>{notification.content}</p>
                                                                                    :
                                                                                    <strong style={{ maxWidth: '200px' }}> {notification.content}</strong>
                                                                                }
                                                                            </DropdownItem>
                                                                        </Link>
                                                                        <hr style={{ margin: '0', backgroundColor: '#cccccc' }} />
                                                                    </React.Fragment>
                                                                )
                                                            })


                                                            :
                                                            <DropdownItem style={{ margin: 'auto', backgroundColor: 'white' }}>No notifications available yet..</DropdownItem>
                                                        :
                                                        <CommonLoading />


                                                }
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </Nav>
                                </NavItem>
                                :
                                null
                            }
                            {profileImageComponent}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
            <LoginModal
                id="loginmodal"
                show={showloginmodal}
                handleClose={hideshowHandler}
                connectcheck={loginHandler}
                focusgained={focusgainedHandler}
                error={loginerror}
            />
            <ToastContainer />
        </>
    );
}
export default IndexNavbar;
