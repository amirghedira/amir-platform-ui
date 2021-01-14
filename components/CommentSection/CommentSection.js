import React from 'react'
import classes from './CommentSection.module.css';
import TextareaAutosize from 'react-autosize-textarea';
import { Row, Col, Input, Label, Button } from 'reactstrap'




const CommentSection = (props) => {
    const [commentContentfocus, setcommentContentfocus] = React.useState(false)
    const [commentTitlefocus, setcommentTitlefocus] = React.useState(false)
    const [width, setwitdh] = React.useState(1000)
    const [errormessage, SeterrorMessage] = React.useState('')
    const [commentFocused, SetcommentFocus] = React.useState(null)


    const handleFunction = function () {
        setwitdh(window.innerWidth)
    }

    React.useEffect(() => {
        setwitdh(window.innerWidth)
        window.addEventListener('resize', handleFunction)
        return () => {
            window.removeEventListener('resize', handleFunction);
        }
    }, [])

    const mostlargeword = (text) => {
        let splitted = text.split(' ');
        let maxsplitted = splitted[0].length;
        for (let splitteditem of splitted) {
            if (splitteditem.length > maxsplitted)
                maxsplitted = splitteditem
        }
        return maxsplitted
    }

    const submitCommmentFunction = (obj) => {
        if (obj.autor === "")
            SeterrorMessage('Write your name')
        else if (obj.autor === 'admin' && !props.token)
            SeterrorMessage("Invalide name")
        else if (obj.content === "")
            SeterrorMessage('Write your comment')
        else if (mostlargeword(obj.autor) > 14)
            SeterrorMessage('Name too large , use spaces')
        else {
            props.submitCommment(obj)
            SetcommentFocus(false)
        };
    }
    if (props.banned)
        return (
            <Row>

                <Col>
                    <div
                        style={{
                            margin: '10px', padding: '20px',
                            borderColor: '#cccccc', borderRadius: '3px',
                            borderWidth: '2px', borderStyle: 'solid',
                            display: 'flex'
                        }}

                    >
                        <i className="fas fa-exclamation-triangle" style={{ color: 'red', marginTop: '4px', marginRight: '5px' }}></i>
                        <p style={{ color: 'red', fontWeight: '700', fontSize: '14px', marginBottom: 'auto' }}>
                            You are banned , you can't reply</p>
                    </div>
                </Col>
            </Row>)
    else {
        if (props.active)
            return (
                <Row className={classes.commentSection}>
                    {
                        width > 992 ?
                            <Col xs="1" style={{ display: 'flex' }}>
                                <div style={{ width: '50px', margin: 'auto', marginTop: commentFocused ? '35px' : 'auto' }}>
                                    {props.image ?
                                        <img src={props.image} style={{ height: '50px', width: '50px', borderRadius: '100px' }} alt="Amir ghedira" />
                                        :
                                        <img src={'/default-avatar.png'} style={{ height: '50px', width: '50px' }} alt="..." />

                                    }

                                </div>
                            </Col>
                            : null
                    }

                    <Col>

                        {commentFocused ?

                            <div style={{ margin: '50px 10px 10px 10px' }}>
                                {
                                    !props.token ?
                                        <Input
                                            id="namecomment"
                                            className={classes.FirstInputComment}
                                            placeholder="Your Name"
                                            onFocus={() => { setcommentTitlefocus(true); SeterrorMessage('') }}
                                            onBlur={() => { setcommentTitlefocus(false) }}
                                            style={{
                                                borderColor: commentTitlefocus ? '#1ab2ff' : 'transparent',
                                                boxShadow: commentTitlefocus ? '0px 5px 25px 0px rgba(26, 163, 255,0.7)' : 'none',
                                                borderStyle: 'solid', borderWidth: '2px',
                                                backgroundColor: 'white',
                                                borderRadius: '0',
                                                marginBottom: '20px'
                                            }}

                                        />
                                        : null
                                }

                                <TextareaAutosize
                                    className={classes.SecondInputComment}
                                    id="thecomment"
                                    placeholder="Write a Comment here"
                                    type="textarea"
                                    onFocus={() => { setcommentContentfocus(true); SeterrorMessage('') }}
                                    onBlur={() => { setcommentContentfocus(false) }}
                                    style={{
                                        paddingLeft: '20px', width: '100%', paddingTop: '20px', borderColor: commentContentfocus ? '#1ab2ff' : 'transparent', borderStyle: 'solid', borderWidth: '2px'
                                        , backgroundColor: 'white', boxShadow: commentContentfocus ? '0px 5px 25px 0px rgba(26, 163, 255,0.7)' : 'none', borderRadius: '0'
                                    }}

                                />
                                <div style={{ display: 'inline-block', marginTop: '10px' }}>
                                    <Label style={{ color: 'red', fontSize: '14px' }}>
                                        {errormessage}
                                    </Label>
                                    <div >
                                        <Button
                                            color="info"
                                            onClick={() => { submitCommmentFunction({ autor: props.token ? "admin" : document.getElementById('namecomment').value, content: document.getElementById('thecomment').value }) }}
                                        >
                                            Submit
                                                </Button>
                                        <Button
                                            color="danger" onClick={() => SetcommentFocus(false)}>

                                            Cancel
                                                </Button>
                                    </div>

                                </div>
                            </div >



                            :
                            <Input
                                placeholder={props.defaultmessage}
                                onFocusCapture={() => SetcommentFocus(true)}
                                onBlur={() => SetcommentFocus(false)}
                                style={{ margin: '10px', padding: '20px', borderColor: '#ccccc', borderRadius: '3px' }}

                            />}

                    </Col>

                </Row >
            )
        else
            return (
                <Row>
                    {width > 992 ?
                        <Col xs="1" style={{ display: 'flex' }}>
                            <div style={{ borderStyle: 'solid', borderColor: '#cccccc', width: '50px', borderWidth: '2px', margin: 'auto', marginTop: 'auto' }}>
                                <img src={'/default-avatar.png'} style={{ height: '50px', width: '50px' }} alt="JavaScript programmer" />
                            </div>
                        </Col>
                        : null
                    }

                    <Col>
                        <div
                            style={{
                                margin: '10px', padding: '20px',
                                borderColor: '#cccccc', borderRadius: '3px',
                                borderWidth: '2px', borderStyle: 'solid',
                                display: 'flex'
                            }}

                        >
                            <i className="fas fa-exclamation-triangle" style={{ color: 'red', marginTop: '4px', marginRight: '5px' }}></i>
                            <p style={{ color: 'red', fontWeight: '700', fontSize: '14px', marginBottom: 'auto' }}>
                                This topic is now closed to further replies.</p>
                        </div>
                    </Col>
                </Row>
            )
    }

}

export default CommentSection;