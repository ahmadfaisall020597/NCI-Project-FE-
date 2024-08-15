import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonService from "../../utils/api/listApi";

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
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default DashboardPage;
