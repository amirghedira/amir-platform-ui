import React from "react";
import Tabs from "../components/Tabs/Tabs";
import Support from "../components/Support/Support.js";
import GlobalContext from "../context/GlobalContext";
import { Row, Col } from "reactstrap";
import SidebarLeft from '../components/SidebarLeft/SidebarLeft'
import SidebarRight from '../components/SidebarRight/SidebarRight'
function Index() {

  const context = React.useContext(GlobalContext);
  const [width, setwitdh] = React.useState(0);
  React.useEffect(() => {
    document.title = 'Home'
  }, [context])
  const handelFunction = function () {
    setwitdh(window.innerWidth)
  }

  React.useEffect(() => {
    window.addEventListener('resize', handelFunction)

    return () => {
      window.removeEventListener('resize', handelFunction);
    }
  }, []);

  React.useEffect(() => {
    document.title = 'Home'
    document.documentElement.scrollTop = 0;
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [])
  return (
    <div>
      <div className="wrapper">
        <div >
          {width > 767 ?
            <Row>
              <Col xs="2">
                <SidebarLeft />
              </Col>
              <Col>
                <Tabs />
              </Col>
              <Col xs="2">
                <SidebarRight />
              </Col>
            </Row>
            :
            <Tabs />

          }


          <Support />
        </div>
      </div>
    </div>
  );
}

export default Index;
