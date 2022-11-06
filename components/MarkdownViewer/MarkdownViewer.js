import React from 'react';
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

const MarkdownViewer = (props) => {
    const [contentMarkdown, setContentMarkDown] = React.useState('')


    React.useEffect(() => {
        const convertHtml = async () => {
            const res = await markdown.render(props.content);
            setContentMarkDown(res)

        }
        convertHtml()

    }, [props.content])
    const enderText = (content) => {
        const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        return content.replace(reg, "<a href='$1$2'>$1$2</a>");
    }
    return (

        <div >
            <div className="doc" dangerouslySetInnerHTML={{
                __html: contentMarkdown
            }} />


        </div>


    )


}
export default MarkdownViewer