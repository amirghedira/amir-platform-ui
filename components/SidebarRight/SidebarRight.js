import React from 'react';
import classes from './SidebarRight.module.css';
import { Row, Col } from 'reactstrap';
import Link from 'next/link'

const Sidebar = (props) => {
    const [mostDownload, SetMostDownload] = React.useState(null)
    const [mostSeen, SetMostseen] = React.useState(null)


    React.useEffect(() => {
        if (props.projects) {
            if (props.projects.length > 0) {
                let mostdownloaded = props.projects[0];
                for (let project of props.projects) {
                    if (project.downloadcount > mostdownloaded.downloadcount)
                        mostdownloaded = project
                }
                SetMostDownload(mostdownloaded)

            } else SetMostDownload(null)
            if (props.projects.length > 0) {
                let mostseenproject = props.projects[0];
                for (let project of props.projects) {
                    if (project.gitViewers > mostseenproject.gitViewers)
                        mostseenproject = project
                }
                SetMostseen(mostseenproject)

            } else SetMostseen(null)
        }


    }, [props.projects])
    return (
        <div className={classes.sidebar}>
            <Row>
                <Col className={classes.content}>
                    <Row>
                        <Row>

                            <Col xs="6">
                                <p className={classes.titles}>Total Projects</p>
                            </Col>

                            <Col style={{ display: 'flex' }}>

                                <p style={{ margin: 'auto' }} className={classes.textItem}>{props.projects.length}</p>


                            </Col>

                        </Row>


                    </Row>
                    <hr />
                    <Row>
                        <Row>


                            <Col>
                                <p className={classes.titles}>Total Questions</p>
                            </Col>

                            <Col style={{ display: 'flex' }}>
                                <Link href="/topics/questions">
                                    <a style={{ margin: 'auto' }} className={classes.items}>{props.topicsCount.questions}</a>
                                </Link>
                            </Col>

                        </Row>


                    </Row>
                    <hr />
                    <Row>
                        <Row>


                            <Col xs="6">
                                <p className={classes.titles}>Total Suggestions</p>
                            </Col>

                            <Col style={{ display: 'flex' }}>
                                <Link href="/topics/suggestions">
                                    <a style={{ margin: 'auto' }} className={classes.items}>{props.topicsCount.suggestions}</a>

                                </Link>
                            </Col>

                        </Row>


                    </Row>
                    <hr />
                    <Row>
                        <Row>


                            <Col xs="6" xl="6">
                                <p className={classes.titles}>Most seen project</p>
                            </Col>

                            <Col xs="6" xl="6">


                                {mostSeen ?
                                    <Link href={`/project/${mostSeen._id}`}>
                                        <a className={classes.items}>{mostSeen.name}</a>
                                    </Link>
                                    :
                                    <p className={classes.textItem}>No projects yet!</p>
                                }


                            </Col>

                        </Row>


                    </Row>
                    <hr />
                    <Row>
                        <Row>


                            <Col xs="6" xl="6">
                                <p className={classes.titles}>Most Downloaded project</p>
                            </Col>

                            <Col xs="6" xl="6">
                                {
                                    mostDownload ?
                                        <Link href={`/project/${mostDownload._id}`}>
                                            <a className={classes.items}>{mostDownload.name}</a>
                                        </Link>

                                        :
                                        <p className={classes.textItem}>No projects yet!</p>
                                }
                            </Col>

                        </Row>


                    </Row>
                </Col>
            </Row>

        </div >
    )
}
export default Sidebar;