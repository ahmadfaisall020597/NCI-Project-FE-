import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonService from "../../utils/api/listApi";
import { toast } from "react-toastify";
import { objectRouter } from "../../utils/router/objectRouter";
import { setAuthorization } from "../../helpers/storage";
import { FaUser, FaLock } from "react-icons/fa";
import Swal from 'sweetalert2'; 
import './styles.css';
import { Images } from "../../helpers/images";

const LoginPage = () => {
    const [state, setState] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const submitLogin = (e) => {
        e.preventDefault();
        const { email, password } = state;
        const payload = { email, password };

        CommonService.signIn(payload)
            .then((response) => {
                console.log("response : ", response);
                if (response && response.token) {
                    toast.success(response.message);
                    const isSuccess = setAuthorization({ token: response.token });
                    if (isSuccess) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Login Successful',
                            text: 'Welcome! You have successfully logged in.',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            navigate(objectRouter.dashboard.path);
                        });
                    } else {
                        toast.error("Failed to store authorization data.");
                    }
                }
            })
            .catch((error) => {
                console.error("Login failed:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Incorrect email or password. Please try again.',
                    confirmButtonText: 'OK'
                });
            });
    }

    return (
        <div
            className="body"
            style={{
                backgroundImage: `url(${Images.backgroundLogin})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div className="wrapper">
                <form action="">
                    <h1>Login NCI</h1>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Email"
                            required
                            value={state.email}
                            onChange={(e) => setState({ ...state, email: e.target.value })}
                        />
                        <FaUser className="icon" />
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={state.password}
                            onChange={(e) => setState({ ...state, password: e.target.value })}
                        />
                        <FaLock className="icon" />
                    </div>

                    <button type="submit" onClick={submitLogin}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
