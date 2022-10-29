import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col } from 'reactstrap';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import classes from './EditDocumentationModal.module.css'
import MarkdownViewer from '../MarkdownViewer/MarkdownViewer';

const EditDocumentationModal = (props) => {
    const [documentation, setDocumentation] = React.useState('')
    React.useEffect(() => {
        if (props.show)
            setDocumentation(props.defaultValue)
    }, [props.show])
    return (

        <div>
            <Modal contentClassName={classes.content} className={classes.wrapClassName} isOpen={props.show} toggle={props.handleClose}>
                <ModalHeader toggle={props.handleClose}>Edit {props.objectedit}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <TextareaAutosize
                                value={documentation}
                                onChange={(e) => setDocumentation(e.target.value)}
                                type="textarea"
                                style={{ minWidth: '100%' }}
                            ></TextareaAutosize>
                        </Col>
                        <Col>
                            <MarkdownViewer content={documentation} />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={() => { props.savechangesfunction(documentation) }}>
                        Edit
                    </Button>{' '}
                    <Button color="secondary" onClick={props.handleClose}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div >
    );
}

export default EditDocumentationModal