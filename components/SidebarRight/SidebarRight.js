import React from 'react';
import classes from './SidebarRight.module.css';
import { Row, Col } from 'reactstrap';
import GlobalContext from '../../context/GlobalContext'
import axios from '../../utils/axios'
const Sidebar = (props) => {
    const context = React.useContext(GlobalContext)
    const [topicCounts, SetTopicCounts] = React.useState(null)
    const [mostDownload, SetMostDownload] = React.useState(null)
    const [mostSeen, SetMostseen] = React.useState(null)

    React.useEffect(() => {
        axios.get('/topic/counttopic')
            .then(result => {
                SetTopicCounts(result.data.result)
            })
    }, [])
    React.useEffect(() => {
        if (context.projects) {
            if (context.projects.length > 0) {
                let mostdownloaded = context.projects[0];
                for (let project of context.projects) {
                    if (project.downloadcount > mostdownloaded.downloadcount)
                        mostdownloaded = project
                }
                SetMostDownload(mostdownloaded)

            } else SetMostDownload(null)
            if (context.projects.length > 0) {
                let mostseenproject = context.projects[0];
                for (let project of context.projects) {
                    if (project.gitViewers > mostseenproject.gitViewers)
                        mostseenproject = project
                }
                SetMostseen(mostseenproject)

            } else SetMostseen(null)
        }


    }, [context.projects])
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
                                {!topicCounts || !context.projects ?
                                    <img src={'/loading.gif'} style={{ height: '25px', width: '25px' }} alt='...' />
                                    :
                                    <p style={{ margin: 'auto' }} className={classes.textItem}>{context.projects.length}</p>
                                }

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
                                {!topicCounts ?
                                    <img src={loadingimage} style={{ height: '25px', width: '25px' }} alt='...' />
                                    :
                                    <a href="/topics/questions" style={{ margin: 'auto' }} className={classes.items}>{topicCounts.questions}</a>}
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
                                {!topicCounts ?
                                    <img src={loadingimage} style={{ height: '25px', width: '25px' }} alt='...' />
                                    :
                                    <a href="/topics/suggestions" style={{ margin: 'auto' }} className={classes.items}>{topicCounts.suggestions}</a>}
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
                                {!topicCounts || !context.projects ?
                                    <img src={loadingimage} style={{ height: '25px', width: '25px' }} alt='...' />
                                    :
                                    mostSeen ?
                                        <a href={`/project/${mostSeen._id}`} className={classes.items}>{mostSeen.name}</a>
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
                                {!topicCounts ?
                                    <img src={loadingimage} style={{ height: '25px', width: '25px' }} alt='...' />
                                    :
                                    mostDownload ?
                                        <a href={`/project/${mostDownload._id}`} className={classes.items}>{mostDownload.name}</a>
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