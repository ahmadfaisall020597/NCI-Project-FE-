import { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Stack, Button } from 'react-bootstrap';
import { menuNavbar } from '../../data/menuNavbar';
import './styles.css';
import { objectRouter } from '../../utils/router/objectRouter';
import { Images } from '../../helpers/images';
import { useMediaQuery } from 'react-responsive';

const NavbarComponent = () => {
    const [state, setState] = useState({
        menu: {},
        isAuthenticated: false,
        isMenuOpen: false,
    });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    useEffect(() => {
        const authToken = localStorage.getItem('authorization');
        setState(prevState => ({
            ...prevState,
            menu: menuNavbar,
            isAuthenticated: !!authToken,
        }));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authorization');
        setState(prevState => ({
            ...prevState,
            isAuthenticated: false,
        }));
        window.location.href = objectRouter.dashboard.path;
    };

    const handleToggle = () => {
        setState(prevState => ({
            ...prevState,
            isMenuOpen: !prevState.isMenuOpen,
        }));
    };

    return (
        <Navbar className="custom-navbar" expand="lg">
            <Container fluid>
                <Navbar.Brand href={objectRouter.dashboard.path} className="d-flex align-items-center">
                    <img
                        src={Images.logoNci}
                        alt='brand logo'
                        className='logo-image'
                        style={{
                            paddingLeft: isMobile ? '10px' : '40px'
                        }}
                    />
                    <h6 className="mb-0 ml-2 px-2 text-white">Nusa Citra Indonesia</h6>
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={handleToggle}
                    className={state.isMenuOpen ? 'toggled' : ''}
                />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav className='ml-auto'>
                        {state.menu.links && state.menu.links.map((link, index) => (
                            link.submenu ? (
                                <NavDropdown
                                    key={index}
                                    title={
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <span>{link.name}</span>
                                            {isMobile && <span className="dropdown-arrow">&#x25BC;</span>}
                                        </div>
                                    }
                                    id={`nav-dropdown-${index}`}
                                    className="custom-dropdown"
                                >
                                    {link.submenu.map((sublink, subIndex) => (
                                        <NavDropdown.Item
                                            key={subIndex}
                                            href={sublink.url}
                                            className="custom-nav-link"
                                        >
                                            {sublink.name}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            ) : (
                                <Nav.Link
                                    key={index}
                                    href={link.url}
                                    className="custom-nav-link"
                                >
                                    {link.name}
                                </Nav.Link>
                            )
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
