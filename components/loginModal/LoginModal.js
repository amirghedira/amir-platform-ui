import React from 'react'
import { Button, Modal, Input, Container, Row, Card, Form, CardHeader, CardTitle, CardBody, InputGroup, CardFooter, InputGroupAddon, InputGroupText, Label } from 'reactstrap';
const LoginModal = (props) => {
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    const [username, Setusername] = React.useState('');
    const [password, setpassword] = React.useState('');

    return (
        <div>
            <Modal isOpen={props.show} toggle={props.handleClose} style={{ width: '350px' }}>
                <Container>
                    <Row>
                        <Card className="card-signup" data-background-color="blue">
                            <Form action="" className="form" method="">
                                <CardHeader className="text-center">
                                    <CardTitle className="title-up" tag="h3">
                                        Staff login
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <InputGroup
                                        className={
                                            "no-border" + (firstFocus ? " input-group-focus" : "")
                                        }
                                    >
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="now-ui-icons users_circle-08"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Username"
                                            type="text"
                                            onChange={(event) => { Setusername(event.target.value) }}
                                            onFocus={() => { setFirstFocus(true); props.focusgained() }}
                                            onBlur={() => setFirstFocus(false)}
                                        ></Input>
                                    </InputGroup>
                                    <InputGroup
                                        className={
                                            "no-border" + (lastFocus ? " input-group-focus" : "")
                                        }
                                    >
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="now-ui-icons text_caps-small"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            onChange={(event) => { setpassword(event.target.value) }}
                                            onFocus={() => { setLastFocus(true) }}
                                            onBlur={() => setLastFocus(false)}
                                        ></Input>
                                    </InputGroup>

                                </CardBody>
                                <CardFooter className="text-center">
                                    <Button
                                        className="btn-neutral btn-round"
                                        color="info"
                                        onClick={() => {
                                            props.connectcheck(
                                                {
                                                    username: username,
                                                    password: password
                                                }

                                            )
                                        }}
                                        size="lg"
                                    >
                                        Login
                                   </Button>
                                    <InputGroup>
                                        <Label style={{ margin: 'auto' }}>
                                            {props.error}
                                        </Label>
                                    </InputGroup>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Row>

                </Container>
            </Modal>
        </div >
    );
}
export default LoginModal