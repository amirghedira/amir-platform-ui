import React from "react";
import { Container } from "reactstrap";
import Link from "next/link";
import getConfig from 'next/config'
const { publicRuntimeConfig: config } = getConfig()

function DarkFooter() {
    return (
        <footer className="footer" data-background-color="black">
            <Container>
                <nav>
                    <ul>
                        <li>
                            <Link href="/aboutus"> About us </Link>
                        </li>
                    </ul>
                </nav>
                <div className="copyright" id="copyright">
                    © {new Date().getFullYear()}{" "}
                    <a
                        href="https://gitlab.com/amir-platform/amir-platform-ui"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        version
                        <span style={{ marginLeft: '5px', fontWeight: '800', color: 'white', textDecoration: 'underline' }}>
                            {config.VERSION}
                        </span>
                    </a>
                    .

                </div>

            </Container>
        </footer>
    );
}

export default DarkFooter;
