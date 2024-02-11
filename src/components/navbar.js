import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import styled from 'styled-components';


export default function Navigation() {
    const NavbarDarker = styled(Navbar)`
        background-color: rgba(0,0,0, 0.25);
    `;

    return (
        <NavbarDarker>
            <Container>
                <Navbar.Brand href="/">
                    <b>SUBSCRIPTIONS</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav.Link href="/feed-updates/list">
                    <b>Updates</b>
                </Nav.Link>
                <Nav.Link href="/feeds/list">
                    <b>Feeds</b>
                </Nav.Link>
            </Container>
        </NavbarDarker>
    );
  }
