import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import GlobalContext from 'context/GlobalContext'
import Loading from '../../Pages/LoadingPage/LoadingPage'

const CenteredModal = (props) => {
    const [projectImages, SetProjectImages] = React.useState([]);
    const [modalError, SetModalError] = React.useState('')
    return (

        <GlobalContext.Consumer>
            {context => (
                <Modal isOpen={props.show} toggle={props.handleClose}>
                    {props.loading ? (<Loading minHeight='40vh' />)
                        :

                        <div>
                            <ModalHeader toggle={props.handleClose}>Add new project</ModalHeader>
                            <ModalBody>
                                <Input
                                    id="name"
                                    defaultValue=""
                                    placeholder="Project Name"
                                    color="danger"
                                    type="text"
                                    onFocus={() => { SetModalError('') }}
                                ></Input>
                                <br />
                                <Input
                                    id="started"
                                    defaultValue=""
                                    placeholder="Started date"
                                    type="text"
                                    onFocus={() => { SetModalError('') }}
                                ></Input>
                                <br />
                                <Input
                                    id="overview"
                                    defaultValue=""
                                    placeholder="Overview"
                                    type="textarea"
                                    onFocus={() => { SetModalError('') }}
                                ></Input>
                                <br />
                                <Input
                                    id="whatlearned"
                                    defaultValue=""
                                    placeholder="What I learned"
                                    type="textarea"
                                    onFocus={() => { SetModalError('') }}
                                ></Input>
                                <br />
                                <Input
                                    id="technologie"
                                    defaultValue=""
                                    placeholder="technologie"
                                    type="text"
                                    onFocus={() => { SetModalError('') }}
                                ></Input>
                                <br />
                                <Input
                                    id="summary"
                                    defaultValue=""
                                    placeholder="Summary"
                                    type="textarea"
                                    onFocus={() => { SetModalError('') }}
                                ></Input>
                                <br />
                                <Label for="exampleSelect">Project Status</Label>
                                <Input type="select" name="select" id="select" onFocus={() => { SetModalError('') }}>
                                    <option>Finished</option>
                                    <option>Unfinished</option>
                                </Input>
                                <br />
                                <Input
                                    id="platform"
                                    defaultValue=""
                                    placeholder="Platform / libraries"
                                    type="textarea"
                                    onFocus={() => { SetModalError('') }}
                                ></Input>
                                <br />
                                <Input
                                    id="features"
                                    defaultValue=""
                                    placeholder="Features"
                                    type="textarea"
                                    onFocus={() => { SetModalError('') }}
                                ></Input>
                                <br />
                                <Input
                                    id="github"
                                    defaultValue=""
                                    placeholder="Github"
                                    type="text"
                                    onFocus={() => { SetModalError('') }}
                                ></Input>
                                <br />
                                <Input
                                    id="images"
                                    type="file"
                                    multiple
                                    onChange={(event) => { SetProjectImages(event.target.files) }}
                                    onFocus={() => { SetModalError('') }}
                                ></Input>
                                <br />
                                <Input
                                    id="filelink"
                                    type="text"
                                    onFocus={() => { SetModalError('') }}
                                ></Input>
                                <br />
                                <Label style={{ marginLeft: '120px', color: 'red' }}>
                                    {modalError}
                                </Label>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="info" onClick={() => {
                                    if (document.getElementById('name').value === ''
                                        || document.getElementById('select').value === ''
                                        || document.getElementById('platform').value === ''
                                        || document.getElementById('github').value === ''
                                        || document.getElementById('features').value === ''
                                        || document.getElementById('summary').value === ''
                                        || document.getElementById('started').value === ''
                                        || document.getElementById('overview').value === ''
                                        || document.getElementById('whatlearned').value === ''
                                        || document.getElementById('technologie').value === ''
                                        || document.getElementById('filelink').value === '')
                                        SetModalError('Fill all the fields');
                                    else
                                        context.addProjectHandler({
                                            name: document.getElementById('name').value,
                                            status: document.getElementById('select').value,
                                            platform: document.getElementById('platform').value,
                                            github: document.getElementById('github').value,
                                            features: document.getElementById('features').value,
                                            summary: document.getElementById('summary').value,
                                            started: document.getElementById('started').value,
                                            overview: document.getElementById('overview').value,
                                            whatlearned: document.getElementById('whatlearned').value,
                                            technologie: document.getElementById('technologie').value,
                                            filelink: document.getElementById('filelink').value,
                                            projectimages: projectImages
                                        })
                                }}>
                                    Add project
                    </Button>{' '}
                                <Button color="secondary" onClick={props.handleClose}>Cancel</Button>
                            </ModalFooter>
                        </div>

                    }

                </Modal>
            )}
        </GlobalContext.Consumer >
    );
}

export default CenteredModal