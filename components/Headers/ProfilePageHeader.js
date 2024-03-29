import React from "react";
import { Container } from "reactstrap";
import classes from './ProfilePageHeader.module.css'
// core components
const ProfilePageHeader = (props) => {
    const pageHeader = React.createRef();

    return (


        <div
            className="page-header  page-header-small"
            style={{ paddingBottom: '200px', width: '100%', height: '150px' }}
        >

            <div
                className="page-header-image"
                style={{
                    backgroundImage: "url(" + props.backgroundimage + ")"

                }}
                ref={pageHeader}
            >
            </div>

            <Container>
                <div className="photo-container" style={{ width: '200px', height: '200px', marginTop: '-50px' }}>
                    <img alt="..." src={props.profileimage} onClick={() => { props.showprofileimageFunction(props.profileimage) }} />

                </div>
                <h1 className={classes.title}>
                    {props.name}
                </h1>
                <p className={classes.category}>
                    {props.title}
                </p>
            </Container>

        </div>
    );
}

export default ProfilePageHeader;
