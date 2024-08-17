import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import NavbarComponent from "../partials/Navbar/navbar";
import { objectRouter } from "../utils/router/objectRouter";

const Layout = () => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    const currentObjectRoute = Object.values(objectRouter).find(route => route.path === currentPath);

    return (
        <Stack className="w-100">
            {currentObjectRoute?.header && <NavbarComponent />}
            <div className="flex-grow-1 overflow-y-auto scrollbar-width-none container-page">
                <Outlet />
            </div>
        </Stack>
    )
}

export default Layout;
