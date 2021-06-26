import React from "react";
import CardComponent from './CardComponent/CardComponent'

// reactstrap components
import {
    Container,
    Row,
    Col

} from "reactstrap";
import Lightbox from 'react-image-lightbox';


const Tabs = (props) => {
    const [showProjectImage, setShowProjectImage] = React.useState(false)
    const [displayImageIndex, setDisplayImageIndex] = React.useState(0)
    const [projectImagesUrl, setProjectImagesUrl] = React.useState(null)
    const showImagesHandler = (imagesUrls, imageIndex) => {
        setProjectImagesUrl(imagesUrls)
        setDisplayImageIndex(imageIndex)
        setShowProjectImage(true)
    }
    return (

        <React.Fragment>
            {projectImagesUrl && showProjectImage &&
                <Lightbox
                    mainSrc={projectImagesUrl[displayImageIndex]}
                    enableZoom={false}
                    nextSrc={projectImagesUrl[(displayImageIndex + 1) % projectImagesUrl.length]}
                    prevSrc={projectImagesUrl[(displayImageIndex + projectImagesUrl.length - 1) % projectImagesUrl.length]}
                    onCloseRequest={() => setShowProjectImage(false)}
                    onMovePrevRequest={() =>
                        setDisplayImageIndex((displayImageIndex + projectImagesUrl.length - 1) % projectImagesUrl.length)
                    }
                    onMoveNextRequest={() =>
                        setDisplayImageIndex((displayImageIndex + 1) % projectImagesUrl.length)

                    }
                    onCloseRequest={() => setShowProjectImage(false)} />}
            <Container style={{ marginTop: '70px', minHeight: '30vh' }}>
                <React.Fragment>
                    {props.projects.slice(0).reverse().map(project => {
                        return <CardComponent
                            key={project._id}
                            _id={project._id}
                            projectname={project.name}
                            date={project.date}
                            onShowImages={(imageIndex) => { showImagesHandler(project.imagesurl, imageIndex) }}
                            technologie={project.technologie}
                            status={project.status}
                            summary={project.summary}
                            platform={project.platform}
                            features={project.features}
                            images={project.imagesurl}
                            github={project.github}
                            filelink={project.filelink}
                            SaveChangesFunction={props.savechanges}
                        />
                    })
                    }
                </React.Fragment>


            </Container>
        </React.Fragment>


    )

}

export default Tabs;
