import React from "react";
import { Container } from "reactstrap";
// core components
const ProfilePageHeader = (props) => {
  let pageHeader = React.createRef();

  return (


    <div
      className="page-header  page-header-small"
      style={{ paddingBottom: '200px', width: '100%', height: '150px' }}
    >

      <div
        className="page-header-image"
        style={{
          backgroundImage: "url(" + props.profileinfo.backgroundimage + ")"

        }}
        ref={pageHeader}
      >
      </div>

      <Container>
        <div className="photo-container" style={{ width: '200px', height: '200px', marginTop: '-50px' }}>
          <img alt="..." src={props.profileinfo.profileimage} onClick={() => { props.showprofileimageFunction(props.profileinfo.profileimage) }} />

        </div>
        <h3 className="title">
          {props.profileinfo.name}
        </h3>
        <p className="category">
          {props.profileinfo.title}
        </p>
      </Container>

    </div>
  );
}

export default ProfilePageHeader;
