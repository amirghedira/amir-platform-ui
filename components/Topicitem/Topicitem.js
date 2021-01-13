import React from 'react';
import classes from './Topicitem.module.css';
import { Row, Col, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Nav, UncontrolledTooltip } from 'reactstrap'
import Link from 'next/link'
import FormatDate from '../../utils/FormatDate'
const Topicitem = (props) => {
    return (
        <div>
            <hr style={{ backgroundColor: '#d9d9d9', marginBottom: '20px' }} />
            <Row className={classes.row}>
                <Col xs="10" className={classes.col}>
                    <Row className={classes.linkTopic}>
                        {
                            !props.lockedstate ?
                                <div style={{ display: 'flex', marginRight: '10px' }}>
                                    <i id="lockedicon" className="fas fa-lock" style={{ margin: ' auto' }}></i>
                                    <UncontrolledTooltip target="#lockedicon">
                                        locked
                                        </UncontrolledTooltip>
                                </div>

                                :
                                null
                        }
                        {
                            props.pinnedstate ?
                                <div style={{ backgroundColor: 'green', height: '25px', width: '25px', display: 'flex', borderRadius: '10px', marginRight: '10px' }}>
                                    <i id="pinnedicon" className="fas fa-thumbtack" style={{ color: 'white', margin: 'auto' }}></i>
                                    <UncontrolledTooltip target="#pinnedicon">
                                        pinned
                                        </UncontrolledTooltip>
                                </div>
                                :
                                null

                        }
                        <Link href={'/' + props.type + '/' + props.id}>
                            <a className={classes.linkCustom}>
                                {props.title}
                            </a>
                        </Link>
                    </Row>
                    <Row className={classes.contentBar}>
                        <p className={classes.infotext}> {'Started By'}</p>
                        <h5 className={classes.Topicautor}>{props.autor}</h5>
                        <p className={classes.infotext}>, <FormatDate>{props.date}</FormatDate></p>

                    </Row>



                </Col>


                <Col style={{ display: 'flex' }}>
                    <Row style={{ margin: 'auto' }}>
                        <Col style={{ display: 'flex' }}>
                            {
                                props.token ?
                                    <Nav
                                        className="nav-pills-info nav-pills-just-icons"
                                    >
                                        <UncontrolledDropdown nav>
                                            <DropdownToggle
                                                nav
                                                style={{ margin: 'auto' }}
                                            >
                                                <i className="now-ui-icons ui-1_settings-gear-63" style={{ color: 'black' }}></i>
                                            </DropdownToggle>
                                            <DropdownMenu style={{ marginTop: '-4px', marginRight: '12px' }} right>
                                                <DropdownItem
                                                    onClick={props.closeOpenFunction}>

                                                    Close/Open
                                        </DropdownItem>
                                                <DropdownItem
                                                    onClick={props.pinFunction}>

                                                    Pin/Unpin
                                        </DropdownItem>
                                                <DropdownItem
                                                    onClick={props.deleteTopicFunction}>
                                                    delete
                                        </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </Nav>
                                    :
                                    null
                            }

                            <p className={classes.titles} style={{ margin: 'auto' }}> {props.replies} {props.replies > 1 || props.replies === 0 ? 'Replies' : 'Reply'} </p>

                        </Col>
                    </Row>
                </Col>



            </Row>
        </div>

    )
}


export default Topicitem;