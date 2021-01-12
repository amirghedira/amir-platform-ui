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
                        <Row>
                            <p className={classes.titles}>
                                <i className="far fa-arrow-alt-circle-right"></i>
                                {' '} Questions/Answer</p>
                        </Row>
                        <Row>
                            <Col>
                                <Link href="/topics/questions" className={classes.items}>
                                    <i style={{ color: 'black' }} className="far fa-question-circle">
                                        Questions
                                    </i>
                                </Link>

                                <Link href="/add-topic/questions" className={classes.items}>
                                    <i style={{ color: 'black' }} className="far fa-comments">
                                        Post a question
                                    </i>
                                </Link>

                            </Col>

                        </Row>

                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Row >
                            <p className={classes.titles}>
                                <i className="far fa-arrow-alt-circle-right"></i>
                                {' '}Suggestions</p>
                        </Row>
                        <Row >
                            <Col>
                                <Link href="/topics/suggestions" className={classes.items}>
                                    <i style={{ color: 'black' }} className="fas fa-lightbulb">
                                        Suggestions
                                    </i>
                                </Link>
                                <Link href="/add-topic/suggestions" className={classes.items}>
                                    <i style={{ color: 'black' }} className="far fa-comments">
                                        Post a Suggestion
                                    </i>
                                </Link>
                            </Col>

                        </Row>

                    </Row>
                </Col>
            </Row>

        </div >
    )
}
export default Sidebar;