import classes from './Aboutus.module.css'
import { Row, Container, Col } from 'reactstrap'
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
const Aboutus = () => {

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.classList.add("index-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("index-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }, [])

    return (
        <React.Fragment>
            <Head>
                <title>{`About us | Amir Platform`}</title>
                <meta name="title" content={`About us | Amir Platform`} />
                <meta name="description" content="this section is reserved for to know about us" />
                <meta property="og:url" content={`https://www.amir-ghedira.com/aboutus`} />
                <meta property="og:title" content={`About us`} />
                <meta property="og:description" content="this section is reserved for to know about us" />
                <meta property="og:image" content="https://www.amir-ghedira.com/logo.png" />

            </Head>
            <main>
                <h1 style={{ opacity: 0, margin: 0 }}>About us</h1>
                <Container className="main" style={{ marginTop: '40px', marginBottom: '40px', boxShadow: '0px 5px 25px 0px rgba(0, 0, 0, 0.2)' }}>
                    <Row style={{ display: 'flex' }}>
                        <Col xs='4' style={{ marginTop: '300px' }}>
                            <hr />
                        </Col>
                        <Col xs='4' style={{ display: 'flex', marginTop: '100px' }}>
                            <img alt='...' src={'/logo.png'} style={{ margin: 'auto' }} />
                        </Col>
                        <Col xs='4' style={{ marginTop: '300px' }}>
                            <hr />
                        </Col>
                    </Row>
                    <Row className="section" >
                        <Col xs="10">
                            <div>
                                <div id="introduction" style={{ paddingTop: '50px' }}>
                                    <h2 className={classes.title}>Introduction</h2>
                                    <pre className={classes.paragraphe}>
                                        This website is dedicated to display my current projects , each new projects will be uploaded with in
                                        the link to github and also it will be available to be downloaded directly.
                                        This platform provide more information about each project made , with full details and provide a comment section
                                        in which you can comment each project and give your opinion and your feedback .
                                        also any question or suggestion will be taken under consideration.
                                        Please ,if you have a <Link href="/">question</Link> or <Link href="/">suggestion</Link> dont hesistate to post them .

                                    </pre>
                                </div>
                                <div id="rules" style={{ paddingTop: '50px' }} >
                                    <h2 className={classes.title}>Rules</h2>
                                    <pre className={classes.paragraphe} >
                                        {`For a better experience to our users , several rules must be respected.
                         1. Do not spam the comment section , infact you are allowed to post a single post in a row.
                         2. Do not use any swearing words or insults , be respectful!
                         3. Do not use names containing a bad words , or a bad meaning, it will be grate to put your real name.
                         4. Do not fight with other users or insult them.
                         5. Questions must be related to development and software ingineering , not anything else.(no personal questions)
                         6. Suggestions must be related to this platform in order to improve it. (no personal suggestion)
                         `

                                        }

                                    </pre>
                                </div>
                                <div id="goal" style={{ paddingTop: '50px' }}>
                                    <h2 className={classes.title}>Goals</h2>
                                    <p className={classes.paragraphe} >
                                        The main goals of this platform ,  are presented in two ways.
                                        The first one is related to me, I build this platform to arrange my projects and to be more presice
                                        in presenting my projects and describing them.
                                        The second goal is related to you ,guys. Actually am giving those details and descriptions of each project
                                        to provide support and help to beginners ,who have difficulties to begin a project with any technologie
                                        Not also details of projects are helpful but <Link href='topics/questions'>question</Link> section is available to answer
                                        to your questions in a breve delay and to satisfy your needs.
                                        I will try my best to cover most popular technologies such as react nodejs angular...
                                    </p>
                                </div>


                            </div>
                        </Col>
                        <Col className={classes.sidebarNavigation}>
                            <ul>
                                <li className={classes.itemList}>
                                    <a className={classes.itemtext} href="#introduction"><strong>Introduction</strong></a>
                                </li>
                                <li className={classes.itemList}>
                                    <a className={classes.itemtext} href="#rules"><strong>Rules</strong></a>
                                </li>
                                <li className={classes.itemList}>
                                    <a className={classes.itemtext} href="#goal"><strong>Goals</strong></a>
                                </li>

                            </ul>
                        </Col>
                    </Row>
                </Container>
            </main>
        </React.Fragment>
    );
}

export default Aboutus
