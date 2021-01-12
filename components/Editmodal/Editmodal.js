import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import TextareaAutosize from 'react-autosize-textarea';


const Editmodal = (props) => {
    let inputcomponent = null;
    if (props.objectedit === 'project status')
        inputcomponent = (
            <Input type="select" name="select" id="editedzone">
                <option>Finished</option>
                <option>Unfinished</option>
            </Input>)
    else
        inputcomponent = (
            <TextareaAutosize
                id="editedzone"
                defaultValue={props.defaultvalue}
                type="textarea"
                style={{ minWidth: '100%' }}
            ></TextareaAutosize>
        )
    return (

        <div>
            <Modal isOpen={props.show} toggle={props.handleClose}>
                <ModalHeader toggle={props.handleClose}>Edit {props.objectedit}</ModalHeader>
                <ModalBody>
                    {inputcomponent}
                    <br />
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={() => {

                        props.savechangesfunction({
                            propname: props.propname,
                            value: document.getElementById('editedzone').value
                        })
                    }}>
                        Edit
                    </Button>{' '}
                    <Button color="secondary" onClick={props.handleClose}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div >
    );
}

export default Editmodal