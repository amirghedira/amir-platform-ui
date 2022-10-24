import React from 'react';
import classes from './ProjectField.module.css';
import { Nav, Col } from 'reactstrap';

import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
// import 'highlight.js/styles/a11y-light.css';
import 'highlight.js/styles/default.css';


const markdown = MarkdownIt({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return (
                    '<pre><code class="hljs">' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    "</code></pre>"
                );
            } catch (__) { }
        }
        return (
            '<pre><code class="hljs">' +
            markdown.utils.escapeHtml(str) +
            "</code></pre>"
        );
    },
});

const ProjectField = (props) => {
    const [contentMarkdown, setContentMarkDown] = React.useState('')


    React.useEffect(() => {
        const convertHtml = async () => {
            const res = await markdown.render(props.content);
            setContentMarkDown(res)

        }
        convertHtml()

    }, [])
    const enderText = (content) => {
        const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        return content.replace(reg, "<a href='$1$2'>$1$2</a>");
    }
    return (
        <div>
            <Nav className={classes.itemsNavbar}>
                {props.logstatus &&
                    < div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '30px' }}>
                        <i className="fas fa-edit fa"
                            onClick={() => { props.editFunction({ sectionname: props.sectionname, defaultvalue: props.content, propname: props.propname }) }}

                        ></i>
                        <h6>Edit</h6>
                    </div>
                }


            </Nav>
            <Col className={classes.seconddiv}>
                <div >
                    <div className="doc" dangerouslySetInnerHTML={{
                        __html: enderText(contentMarkdown)
                    }} />


                    {/* {props.content.split('###').map((item, index) => {
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
                    } */}

                </div>

            </Col>

        </div>

    )


}
export default ProjectField