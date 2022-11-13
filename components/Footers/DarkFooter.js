import React from "react";
import { Container } from "reactstrap";
import Link from "next/link";

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
                    Coded by{" "}
                    <a
                        href="https://www.linkedin.com/in/amirghedira"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Amir Ghedira
                    </a>
                    .
                </div>
            </Container>
        </footer>
    );
}

export default DarkFooter;
