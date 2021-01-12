import React from 'react';
import { Row, Col, Container } from 'reactstrap';


const Banned = () => {
    return (
        <Container>
            <Row style={{ display: 'flex', minHeight: '59.6vh' }}>
                <Col style={{ margin: 'auto' }}>
                    <Row style={{ margin: '20px 20px' }}>
                        <Col style={{ display: 'flex' }}>
                            <i className="fas fa-exclamation-circle fa-8x" style={{ margin: 'auto' }}></i>
                        </Col>

                    </Row>
                    <Row style={{ margin: '20px 20px' }}>
                        <Col style={{ display: 'flex' }}>
                            <h3 style={{ margin: 'auto', fontWeight: '600', fontSize: '18px' }}>You are banned, You can't create a new topic!</h3>
                        </Col>
                    </Row>

                </Col>

            </Row>
        </Container>
    )
}

export default Banned;