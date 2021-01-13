import React from 'react';
import classes from './SidebarLeft.module.css';
import { Row, Col } from 'reactstrap';
import Link from 'next/link'
const Sidebar = (props) => {
    return (
        <div className={classes.sidebar}>
            <Row>
                <Col className={classes.content} >
                    <Row style={{ marginBottom: '20px' }}>
                        <Col>
                            <Row style={{ marginBottom: '20px' }} >
                                <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <i className="far fa-arrow-alt-circle-right" style={{ fontSize: '17px' }}></i>
                                    <p className={classes.titles}>Questions/Answer</p>
                                </Col>
                            </Row>
                            <Row style={{ marginLeft: '10px' }}>
                                <Col>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col>
                                            <Link href="/topics/questions" className={classes.items}>
                                                <div className={classes.navItemContainer}>
                                                    <i className={`far fa-question-circle ${classes.icon}`}></i>
                                                    <h5 className={classes.navItemText}>Questions</h5>
                                                </div>
                                            </Link>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col>
                                            <Link href="/add-topic/questions" className={classes.items}>
                                                <div className={classes.navItemContainer}>
                                                    <i className={`far fa-comments ${classes.icon}`}></i>
                                                    <h5 className={classes.navItemText}>Post a question</h5>
                                                </div>
                                            </Link>
                                        </Col>
                                    </Row>

                                </Col>

                            </Row>

                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col>
                            <Row style={{ marginBottom: '20px' }} >
                                <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <i className="far fa-arrow-alt-circle-right" style={{ fontSize: '17px' }}></i>
                                    <p className={classes.titles}>Suggestions</p>
                                </Col>
                            </Row>
                            <Row style={{ marginLeft: '10px' }}>
                                <Col>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col>
                                            <Link href="/topics/suggestions" className={classes.items}>
                                                <div className={classes.navItemContainer}>
                                                    <i className={`fas fa-lightbulb ${classes.icon}`}></i>
                                                    <h5 className={classes.navItemText}>Suggestions</h5>
                                                </div>
                                            </Link>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col>
                                            <Link href="/add-topic/suggestions" className={classes.items}>
                                                <div className={classes.navItemContainer}>
                                                    <i className={`far fa-comments ${classes.icon}`}></i>
                                                    <h5 className={classes.navItemText}>Post a Suggestion</h5>
                                                </div>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        </Col>

                    </Row>
                </Col>
            </Row>

        </div >
    )
}
export default Sidebar;