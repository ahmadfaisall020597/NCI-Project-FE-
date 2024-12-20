import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { Outlet, useLocation, useOutlet } from "react-router-dom";
import NavbarComponent from "../partials/Navbar/navbar";
import { objectRouter } from "../utils/router/objectRouter";
import './styles.css'

const Layout = () => {
    const location = useLocation();
    // const [currentPath, setCurrentPath] = useState(location.pathname);
    const getOutlet = useOutlet();
    const [currentObjectRoute, setCurrentObjectRoute] = useState(null);

    useEffect(() => {
        if (getOutlet) {
            setCurrentObjectRoute(getOutlet.props.children.props.match.route);
        }
        return () => {
            setCurrentObjectRoute(null);
        };
    }, [getOutlet]);

    return (
        <Stack className="w-100">
            <div>
                {currentObjectRoute?.header && <NavbarComponent />}
            </div>
            <div className="flex-grow-1 overflow-y-auto scrollbar-width-none container-page">
                <Outlet />
            </div>
        </Stack>
    )
}

export default Layout;
