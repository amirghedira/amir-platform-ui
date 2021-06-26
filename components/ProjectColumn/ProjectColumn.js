import React from 'react';
import classes from './ProjectColumn.module.css';
import { Nav, Button } from 'reactstrap';
import FormatDate from '../../utils/FormatDate'
const ProjectColumn = (props) => {
    return (
        <div className={classes.firstdiv} >
            <Nav className={classes.itemsNavbar}>
                <h1 className={classes.projecttitle} style={{ margin: 'auto', padding: '20px', fontSize: '16px' }}>
                    {props.project.name}
                </h1>
            </Nav>

            <div className={classes.sidebarContainers}>
                <div style={{ display: 'flex' }}>
                    <div>
                        <span className={classes.sidebarTitle}>
                            Posted:{' '}
                        </span>
                        <span>
                            <FormatDate>{props.project.date}</FormatDate>
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div>
                        <span className={classes.sidebarTitle}>
                            Started: {' '}
                        </span>
                        <span>
                            {props.project.started}
                        </span>
                    </div>

                </div>
                <div style={{ display: 'flex' }}>
                    <div>
                        <span className={classes.sidebarTitle}>
                            Status: {' '}
                        </span>
                        <span>
                            {props.project.status}
                        </span>
                    </div>
                    <div style={{ flex: '1' }}></div>
                    <i
                        className="fas fa-edit"
                        onClick={() => { props.editFunction({ sectionname: 'project status', defaultvalue: props.project.status, propname: 'status' }) }}
                        style={{ display: props.logstatus ? 'inline' : 'none' }}

                    ></i>

                </div>
                <div style={{ display: 'flex' }}>
                    <div>
                        <span className={classes.sidebarTitle}>
                            Technologies: {' '}
                        </span>
                        <span>
                            {props.project.technologie}
                        </span>
                    </div>
                    <div style={{ flex: '1' }}></div>
                    <i
                        className="fas fa-edit"
                        style={{ display: props.logstatus ? 'inline' : 'none' }}
                        onClick={() => { props.editFunction({ sectionname: 'technologies', defaultvalue: props.project.technologie, propname: 'technologie' }) }}
                    ></i>

                </div>


            </div>
            <div className={classes.sidebarContainers}>
                <div>
                    <span className={classes.sidebarTitle}>
                        comments: {' '}
                    </span>
                    <span>
                        {props.project.commentsCount}
                    </span>
                </div>
                {props.project.status === "Public" && <React.Fragment>
                    <div>
                        <span className={classes.sidebarTitle}>
                            Download count: {' '}
                        </span>
                        <span>
                            {props.project.downloadcount}
                        </span>
                    </div>
                    <div>
                        <span className={classes.sidebarTitle}>
                            Git viewers: {' '}
                        </span>
                        <span>
                            {props.project.gitViewers}
                        </span>
                    </div>
                </React.Fragment>}

            </div>
            {props.project.status === 'Public' && <div className={classes.downloadsection}>
                <a href={props.project.github} target="_blank" rel="noopener noreferrer">
                    <Button className={classes.button} color="warning" onClick={props.githubButtonFunction}>
                        <i className="fab fa-github fa-2x"></i>
                        Github
                    </Button>
                </a>

                <div style={{ flex: '1' }}></div>
                <a href={props.project.filelink} download onClick={props.downloadButtonFunction}>
                    <Button color="success" className={classes.button}>
                        <i className="fas fa-download fa-2x"></i>
                        Download
                    </Button>
                </a>

            </div>}
        </div >
    )
}

export default ProjectColumn;