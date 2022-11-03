import React from 'react';
import classes from './PostCard.module.css';
import { Nav, Row, Col, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, NavItem, NavLink } from 'reactstrap'
import GlobalContext from '../../context/GlobalContext'
import FormatDate from '../../utils/FormatDate'
import Link from 'next/link'
const PostCard = (props) => {
    const context = React.useContext(GlobalContext)
    const isadmin = props.autor === 'admin' ? true : false;
    const [width, setwidth] = React.useState(0)

    React.useEffect(() => {
        setwidth(window.innerWidth)
        window.addEventListener('resize', handleFunction)
        return () => {
            window.removeEventListener('resize', handleFunction);
        }
    }, [])

    const enderText = (content) => {
        const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        return content.replace(reg, "<a href='$1$2'>$1$2</a>");
    }
    const handleFunction = function () {
        setwidth(window.innerWidth)
    }

    return (
        <div>
            <div style={{ marginBottom: '50px' }}>
                <Row>
                    <Col >
                        <Nav className={classes.Navbar} style={{ minHeight: width < 800 ? '80px' : null, height: 'fit-content' }} expand="lg">
                            {width < 800 ?
                                <NavItem style={{ display: 'flex' }}>
                                    <img
                                        className='rounded-circle'
                                        src={isadmin ? context.UserProfile?.profileimage : '/default-avatar.png'}
                                        alt="JavaScript programmer" />
                                </NavItem>
                                : null
                            }
                            <NavItem style={{ display: width > 525 ? 'flex' : 'flex', width: '170px' }}>
                                {
                                    <NavLink href='/profile' style={{ padding: '0', display: width > 525 ? 'flex' : 'block', margin: 'auto' }} tag={isadmin ? Link : 'div'} legacyBehavior>
                                        <a style={{ width: '100%', display: width < 525 ? 'block' : 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <strong className={classes.postname} style={{ textAlign: 'center', color: 'white', width: '120px', maxWidth: '120px' }}>{
                                                isadmin ? context.UserProfile?.name : props.autor} </strong>
                                            {width < 525 ?
                                                <div style={{ display: 'block', margin: 'auto' }}>
                                                    <h5 className={classes.postinfo} style={{ color: 'white', margin: '0' }}>Posted:{' '}
                                                        <FormatDate >{props.date}</FormatDate>
                                                    </h5>

                                                    {
                                                        props.connected ?
                                                            <p style={{ color: 'white', fontStyle: 'italic', fontSize: '14px', fontWeight: '500' }}>{props.ip}</p>
                                                            :
                                                            null
                                                    }
                                                </div>
                                                :
                                                null}
                                        </a>
                                    </NavLink>


                                }
                            </NavItem>

                            {width > 525 ?
                                <NavItem style={{ display: width > 525 ? 'flex' : 'block' }}>
                                    <h5 className={classes.postinfo} style={{ color: 'white', margin: 'auto', paddingLeft: '10px' }}>Posted:{' '}
                                        <FormatDate >{props.date}</FormatDate>
                                    </h5>
                                </NavItem>
                                : null
                            }



                            <NavItem style={{ flex: '1' }}> </NavItem>
                            {width > 525 && props.connected ?
                                <NavItem style={{ marginLeft: '10px', display: 'flex' }} >
                                    <p style={{ color: 'white', fontStyle: 'italic', fontSize: '14px', margin: 'auto', fontWeight: '500' }}>{props.ip}</p>
                                </NavItem>
                                : null}

                            <NavItem style={{ display: 'flex' }} >
                                {
                                    props.connected ?
                                        <UncontrolledDropdown style={{ margin: 'auto' }}>
                                            <DropdownToggle
                                                nav
                                            >
                                                <i className="now-ui-icons ui-1_settings-gear-63" style={{ color: 'white' }}></i>
                                            </DropdownToggle>
                                            <DropdownMenu style={{ marginTop: '-8px', marginRight: '8px' }} right>
                                                {props.closeOpenFunction ?
                                                    <DropdownItem
                                                        onClick={props.closeOpenFunction}>
                                                        Open/Close
                                                    </DropdownItem>
                                                    : null
                                                }
                                                <DropdownItem
                                                    onClick={props.deleteFunction}>
                                                    Delete
                                                </DropdownItem>
                                                <DropdownItem
                                                    onClick={props.banMemberFunction}
                                                >
                                                    Ban
                                                </DropdownItem>

                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        :
                                        null

                                }

                            </NavItem>
                        </Nav>
                    </Col>

                </Row>
                <Row className={classes.topicContent}>
                    {width > 800 ?

                        <Col md="3" xl="2" style={{ display: 'flex', marginRight: '12px' }}>

                            <img className="img-raised" src={isadmin ? context.UserProfile?.profileimage : '/default-avatar.png'}
                                style={{
                                    borderRadius: '50%', height: '150px', width: '150px', margin: 'auto', marginTop: '40px',
                                    boxShadow: 'none'
                                }} alt="Javascript programmer" />
                        </Col>
                        :
                        null
                    }

                    <Col >
                        <pre style={{ whiteSpace: 'pre-wrap', marginTop: '40px', paddingLeft: '20px', fontSize: '14px' }}>
                            <div dangerouslySetInnerHTML={{
                                __html: enderText(props.content)
                            }} />
                        </pre>
                    </Col>

                </Row>
            </div>

        </div >
    )
}

export default PostCard;