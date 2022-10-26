import React from 'react';
import classes from './ProjectField.module.css';
import { Nav, Col, Row } from 'reactstrap';
import MarkdownViewer from '../MarkdownViewer/MarkdownViewer';

const ProjectField = (props) => {
    return (
        <Row className={classes.seconddiv}>
            {props.logstatus &&
                < div style={{ position: 'absolute', top: '10px', right: '0', cursor: 'pointer', zIndex: '99', width: '100px', display: 'flex' }}>
                    <i className="fas fa-edit fa"
                        onClick={() => { props.editFunction({ sectionname: props.sectionname, defaultvalue: props.content, propname: props.propname }) }}

                    ></i>
                    <h6>Edit</h6>
                </div>
            }
            <Col >
                <MarkdownViewer content={props.content} />
            </Col>

        </Row>

    )


}
export default ProjectField