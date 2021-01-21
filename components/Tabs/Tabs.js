import React from "react";
import CardComponent from './CardComponent/CardComponent'
import GlobalContext from '../../context/GlobalContext'
import axios from '../../utils/axios'
// reactstrap components
import {
    Container,
    Row,
    Col

} from "reactstrap";

const Tabs = (props) => {
    return (

        <Container style={{ marginTop: '70px', minHeight: '30vh' }}>
            <React.Fragment>
                {props.projects.slice(0).reverse().map(project => {
                    return <CardComponent
                        key={project._id}
                        _id={project._id}
                        projectname={project.name}
                        date={project.date}
                        technologie={project.technologie}
                        status={project.status}
                        summary={project.summary}
                        platform={project.platform}
                        features={project.features}
                        github={project.github}
                        filelink={project.filelink}
                        SaveChangesFunction={props.savechanges}
                    />
                })
                }
            </React.Fragment>


        </Container>


    )

}

export default Tabs;
