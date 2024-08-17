import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonService from "../../utils/api/listApi";
import { Stack, Col, Row, Container } from 'react-bootstrap';
import NavbarComponent from "../../partials/Navbar/navbar";
import './styles.css';

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await CommonService.signOut();
            if (response.status === 200) {
                console.log('Logout successful.');
                localStorage.clear();
                console.log('LocalStorage cleared.');
                navigate('/login');
            } else {
                console.error('Logout failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error during logout: ', error);
        }
    }

    return (
        <Stack>
            <h1>Halaman Dashboard</h1>
        </Stack>
    )
}

export default DashboardPage;
