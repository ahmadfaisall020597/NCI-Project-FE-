import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonService from "../../utils/api/listApi";
import { toast, ToastContainer } from "react-toastify";
import { objectRouter } from "../../utils/router/objectRouter";
import { setAuthorization } from "../../helpers/storage";

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
                    // Use setAuthorization to store encrypted token
                    const isSuccess = setAuthorization({ token: response.token });
                    if (isSuccess) {
                        console.log('navigate : ', objectRouter.dashboard.path);
                        navigate(objectRouter.dashboard.path);
                    } else {
                        toast.error("Failed to store authorization data.");
                    }
                }
            })
            .catch((error) => {
                console.error("Login failed:", error);
                toast.error("Login failed. Please try again.");
            });
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={submitLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        required
                        value={state.email}
                        onChange={(e) => setState({ ...state, email: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={state.password}
                        onChange={(e) => setState({ ...state, password: e.target.value })}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default LoginPage;
