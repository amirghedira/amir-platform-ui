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
        <Row className={classes.sidebar}>
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
                            <Link
                                href="/topics/questions"
                                style={{ margin: 'auto' }}
                                className={classes.items}>
                                {props.topicsCount.questions}
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
                            <Link
                                href="/topics/suggestions"
                                style={{ margin: 'auto' }}
                                className={classes.items}>
                                {props.topicsCount.suggestions}

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
                                <Link
                                    href={`/project/${mostSeen.name.replace(/ /g, '-')}/${mostSeen.technologie.replace(/ /g, '-')}/${mostSeen._id}`}
                                    className={classes.items}>
                                    {mostSeen.name}
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
                                    <Link
                                        href={`/project/${mostDownload.name.replace(/ /g, '-')}/${mostDownload.technologie.replace(/ /g, '-')}/${mostDownload._id}`}
                                        className={classes.items}>
                                        {mostDownload.name}
                                    </Link>

                                    :
                                    <p className={classes.textItem}>No projects yet!</p>
                            }
                        </Col>

                    </Row>


                </Row>
            </Col>
        </Row>
    );
}
export default Sidebar;