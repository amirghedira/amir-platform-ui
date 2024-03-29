import React from "react";
import CardComponent from './CardComponent/CardComponent'

// reactstrap components
import {
    Row,
    Col,
    Container

} from "reactstrap";
import Lightbox from 'react-18-image-lightbox'


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

                    } />}
            <Row style={{ marginTop: '70px', minHeight: '30vh' }}>
                <Col>
                    {props.projects.slice(0).reverse().map(project => {
                        return <CardComponent
                            deleteProject={props.deleteProject}
                            updateProjectVisibility={props.updateProjectVisibility}
                            updateGitViewer={props.updateGitViewer}
                            updateDownloadCount={props.updateDownloadCount}
                            key={project._id}
                            _id={project._id}
                            userImage={project.addedBy.profileimage}
                            projectname={project.name}
                            date={project.date}
                            onShowImages={(imageIndex) => { showImagesHandler(project.imagesurl, imageIndex) }}
                            technologie={project.technologie}
                            status={project.status}
                            visibility={project.visibility}
                            summary={project.summary}
                            platform={project.platform}
                            features={project.features}
                            images={project.imagesurl?.slice(0, 3)}
                            github={project.github}
                            filelink={project.filelink}
                            SaveChangesFunction={props.savechanges}
                        />
                    })
                    }
                </Col>
            </Row>
        </React.Fragment>

    )

}

export default Tabs;
