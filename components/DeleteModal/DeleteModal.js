import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteModal = (props) => {

    return (
        <div>
            <Modal isOpen={props.show} toggle={props.handleClose}>
                <ModalHeader toggle={props.handleClose}>Delete {props.commentorname}'s Comment</ModalHeader>
                <ModalBody>
                    <p >Are you sure ?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => { props.deleteCommentFunction(props.commentorid) }}>
                        Delete
                    </Button>{' '}
                    <Button color="secondary" onClick={props.handleClose}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div >
    )
}
export default DeleteModal;