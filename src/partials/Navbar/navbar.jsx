import { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Stack } from 'react-bootstrap';
import { menuNavbar, menuNavbarAdmin } from '../../data/menuNavbar';
import './styles.css';
import { objectRouter } from '../../utils/router/objectRouter';
import { Images } from '../../helpers/images';
import { useMediaQuery } from 'react-responsive';

const NavbarComponent = () => {
    const [state, setState] = useState({
        isAuthenticated: false,
        isMenuOpen: false,
        Auth: null,
        activeLink: ''
    });

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        const authToken = localStorage.getItem('authorization');
        const currentPath = window.location.pathname;
        setState(prevState => ({
            ...prevState,
            isAuthenticated: !!authToken,
            Auth: authToken,
            activeLink: currentPath
        }));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authorization');
        setState(prevState => ({
            ...prevState,
            isAuthenticated: false,
        }));
        window.location.href = objectRouter.login.path;
    };

    const handleToggle = () => {
        setState(prevState => ({
            ...prevState,
            isMenuOpen: !prevState.isMenuOpen,
        }));
    };

    const handleLinkClick = (url) => {
        setState(prevState => ({
            ...prevState,
            activeLink: url,
        }));
    };

    // Choose menu based on authentication status
    const menuToDisplay = state.isAuthenticated ? menuNavbarAdmin : menuNavbar;

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
                        {menuToDisplay.links && menuToDisplay.links.map((link, index) => {
                            const isActiveParent = state.activeLink === link.url ||
                                (link.submenu && link.submenu.some(sub => state.activeLink === sub.url));
                            if (link.requiresAuth && !state.isAuthenticated) return null;

                            return link.submenu ? (
                                <NavDropdown
                                    key={index}
                                    title={
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <span className={`custom-nav-link ${isActiveParent ? 'active' : ''}`}>
                                                {link.name}
                                            </span>
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
                                            className={`custom-nav-link ${state.activeLink === sublink.url ? 'active' : ''}`}
                                            onClick={() => handleLinkClick(sublink.url)}
                                        >
                                            {sublink.name}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            ) : (
                                <Nav.Link
                                    key={index}
                                    href={link.url}
                                    className={`custom-nav-link ${isActiveParent ? 'active' : ''}`}
                                    onClick={() => handleLinkClick(link.url)}
                                >
                                    {link.name}
                                </Nav.Link>
                            );
                        })}
                        <Stack>
                            {state.isAuthenticated && (
                                <Nav.Link
                                    href="#"
                                    className={`custom-nav-link`}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Nav.Link>
                            )}
                        </Stack>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
