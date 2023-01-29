import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

interface Props {
    brandName: string;
    links: {title:string, path:string}[];
}

const Header: React.FC<Props> = ({ brandName, links }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">{brandName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {links.map((link) => (
                        <Nav.Link href={link.path}>{link.title}</Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
