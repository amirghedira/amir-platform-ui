/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

const IndexHeader = () => {
    React.useEffect(() => {
    })
    return (


        <div id="indexheader" style={{ maxHeight: '250px' }} >
            <div
                style={{
                    backgroundImage: "url(/background.webp)",
                    height: '250px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'

                }
                }
            ></div >
            <Container style={{ top: '35px', left: '0', position: 'absolute' }}  >
                <Row>
                    <img
                        alt="..."
                        className="n-logo"
                        src={"/weblogo.png"}
                    ></img>
                </Row>
            </Container>
        </div >

    );
}

export default IndexHeader;
