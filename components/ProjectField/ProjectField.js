import React from 'react';
import classes from './ProjectField.module.css';
import { Nav, Col } from 'reactstrap';

import SyntaxHighlighter from 'react-syntax-highlighter';

const ProjectField = (props) => {

    const enderText = (content) => {
        const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        return content.replace(reg, "<a href='$1$2'>$1$2</a>");
    }
    return (
        <div>
            <Nav className={classes.itemsNavbar}>
                {props.icon}
                <h1 className={classes.NavItems}>{props.sectionname}</h1>
                <div style={{ flex: '1' }}></div>
                {props.logstatus ?
                    < div style={{ display: 'inline-flex', margin: 'auto', paddingRight: '30px' }}>
                        <i className="fas fa-edit fa"
                            onClick={() => { props.editFunction({ sectionname: props.sectionname, defaultvalue: props.content, propname: props.propname }) }}

                        ></i>
                        <h6>Edit</h6>
                    </div>
                    :
                    null
                }


            </Nav>
            <Col className={classes.seconddiv}>
                <div >

                    {props.content.split('###').map((item, index) => {
                        if (index % 2 === 0) {
                            return (
                                <pre key={index} style={{ whiteSpace: 'pre-line' }} className={classes.textContent}>
                                    <div dangerouslySetInnerHTML={{
                                        __html: enderText(item)
                                    }} />

                                </pre>
                            )
                        } else {
                            return (
                                <SyntaxHighlighter key={index} showLineNumbers={true} wrapLines={true} language="javascript"  >
                                    {item}
                                </SyntaxHighlighter>
                            )
                        }
                    })
                    }

                </div>

            </Col>

        </div>

    )


}
export default ProjectField