import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Navigation() {
    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/">
                    <b>SUBSCRIPTIONS</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav.Link href="/feed-updates/list">
                    Feed Updates
                </Nav.Link>
                <Nav.Link href="/feeds/list">
                    Feeds
                </Nav.Link>
            </Container>
        </Navbar>
    );
  }
