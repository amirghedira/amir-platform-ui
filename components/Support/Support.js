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
                            color="facebook"
                            href="https://www.facebook.com/ghedira.amir"
                            id="tooltip735272548"
                            size="lg"
                            target="_blank"
                        >
                            <i className="fab fa-facebook-square"></i>
                        </Button>
                        <UncontrolledTooltip delay={0} target="tooltip735272548">
                            Follow me on Facebook
              </UncontrolledTooltip>
                        <Button
                            className="btn-neutral btn-icon btn-round"
                            color="linkedin"
                            href="https://www.linkedin.com/in/amir-ghedira-1053991a2/"
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
                            color="github"
                            href="https://github.com/amirghedira"
                            id="tooltip331904895"
                            size="lg"
                            target="_blank"
                        >
                            <i className="fab fa-github"></i>
                        </Button>
                        <UncontrolledTooltip delay={0} target="tooltip331904895">
                            My Github Repository
              </UncontrolledTooltip>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default Download;
