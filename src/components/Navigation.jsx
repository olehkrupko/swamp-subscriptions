import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import styled from 'styled-components';


export default function Navigation() {
    const NavbarDarker = styled(Navbar)`
        background-color: rgba(0,0,0, 0.25);
        font-weight: bold;
    `;

    return (
        <NavbarDarker>
            <Container>
                <Navbar.Brand href="/updates/">
                    SUBSCRIPTIONS
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav.Link href="/feeds/list">
                    Feeds
                </Nav.Link>
                <Nav.Link href="/feeds/create">
                    Create
                </Nav.Link>
            </Container>
        </NavbarDarker>
    );
  }
