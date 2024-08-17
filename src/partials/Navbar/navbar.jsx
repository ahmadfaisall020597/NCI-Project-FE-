import { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Stack } from 'react-bootstrap';
import menuNavbar from '../../data/menuNavbar.json';
import './styles.css';

const NavbarComponent = () => {
    const [state, setState] = useState({
        menu: {},
    });

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            menu: menuNavbar,
        }));
    }, []);

    return (
        <Navbar className="custom-navbar" expand="lg" sticky="top">
            <Container fluid>
                {/* <Navbar.Brand href="/">{state.menu.brand}</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {state.menu.links && state.menu.links.map((link, index) => (
                            link.submenu ? (
                                <NavDropdown
                                    key={index}
                                    title={link.name}
                                    id={`nav-dropdown-${index}`}
                                    className="custom-dropdown"
                                >
                                    {link.submenu.map((sublink, subIndex) => (
                                        <NavDropdown.Item key={subIndex} href={sublink.url}>
                                            {sublink.name}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            ) : (
                                <Nav.Link key={index} href={link.url}>{link.name}</Nav.Link>
                            )
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
