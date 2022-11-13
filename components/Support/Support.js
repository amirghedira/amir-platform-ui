import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

// core components

function Download() {
    return (
        <div
            className="section section-download"
            data-background-color="black"
            id="download-section"
            style={{ height: '100px' }}    >
            <Container>

                <Row className="justify-content-md-center sharing-area text-center">
                    <Col className="text-center" lg="8" md="12">
                        <Button
                            className="btn-neutral btn-icon btn-round"
                            style={{ margin: '0px 5px 0px 5px' }}
                            color="github"
                            href="https://join.slack.com/t/amir-platform/shared_invite/zt-1is1vbal1-mqqCpxiH36L3z2Ir7K0zJQ"
                            id="tooltip331904ee895"
                            size="lg"
                            target="_blank"
                        >
                            <div style={{ display: 'flex', height: '100%', width: '100%' }}>

                                <img style={{ height: '25px', width: '25px', margin: 'auto' }} src="/slack.png" />
                            </div>
                        </Button>
                        <UncontrolledTooltip delay={0} target="tooltip331904ee895">
                            My Slack workspace
                        </UncontrolledTooltip>
                        <Button
                            className="btn-neutral btn-icon btn-round"
                            style={{ margin: '0px 5px 0px 5px' }}
                            href="https://www.youtube.com/channel/UCptn1tAPBr3GrdPWMziB8Sg"
                            id="tooltip735272548"
                            color="youtube"
                            size="lg"
                            target="_blank"
                        >
                            <i className="fab fa-youtube"></i>
                        </Button>
                        <UncontrolledTooltip delay={0} target="tooltip735272548">
                            Follow me on Youtube
                        </UncontrolledTooltip>
                        <Button
                            className="btn-neutral btn-icon btn-round"
                            style={{ margin: '0px 5px 0px 5px' }}
                            color="linkedin"
                            href="https://www.linkedin.com/in/amirghedira"
                            id="tooltip647117716"
                            size="lg"
                            target="_blank"
                        >
                            <i className="fab fa-linkedin"></i>
                        </Button>
                        <UncontrolledTooltip delay={0} target="tooltip647117716">
                            Follow me on LinkedIn
                        </UncontrolledTooltip>
                        <Button
                            className="btn-neutral btn-icon btn-round"
                            style={{ margin: '0px 5px 0px 5px' }}
                            color="github"
                            href="https://github.com/amirghedira"
                            id="tooltip331904895"
                            size="lg"
                            target="_blank"
                        >
                            <i className="fab fa-github"></i>
                        </Button>
                        <UncontrolledTooltip delay={0} target="tooltip331904895">
                            My Github Account
                        </UncontrolledTooltip>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default Download;
