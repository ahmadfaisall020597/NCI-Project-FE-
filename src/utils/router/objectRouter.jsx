import { createBrowserRouter, redirect } from "react-router-dom";
import DashboardPage from "../../components/Dashboard/dashboardPage";
import { getAuthorization } from "../../helpers/storage";
import LoginPage from "../../components/Login/loginPage";
import Layout from "../../shared/layout";

export const objectRouter = {
    dashboard: {
        title: "Dashboard",
        path: "/dashboard",
        element: <DashboardPage />,
        needAuth: true,
        header: true,
        footer: false,
        index: true,
    },
    login: {
        title: "Login",
        path: "/login",
        element: <LoginPage />,
        needAuth: false,
        header: false,
        footer: false,
        index: true,
    },
};


export const convertObjectToArray = () => {
    try {
        const obj = objectRouter;

        const loaderFn = objectKey => {
            console.log('object key : ', objectKey);
            if (objectKey.needAuth) {
                if (!getAuthorization()) {
                    console.log('tidak ada auth');
                    return redirect(obj.login.path);
                }
            }
            if (objectKey.path == obj.login.path) {
                if (getAuthorization()) {
                    console.log('masuk dashboard');
                    return redirect(obj.dashboard.path)
                }
            }
            return null;
        };
        const dataObject = Object.keys(obj).map(key => ({
            ...obj[key],
            children: obj[key].children
                ? Object.keys(obj[key].children).map(key2 => ({
                    ...obj[key].children[key2],
                    loader: () => loaderFn(obj[key])
                }))
                : null,
            loader: () => loaderFn(obj[key])
        }));
        console.log('data object : ', dataObject);
        return dataObject;
    } catch (error) {
        console.log('error : ', error);
    }
}

const ErrorPage = () => <div>Error Page cuy</div>;

console.log('children : ', convertObjectToArray());

export const router = createBrowserRouter([
    {
        Component: Layout,
        errorElement: <ErrorPage />,
        loader() {
            return { authorization: getAuthorization() };
        },
        children: convertObjectToArray()
    }
]);

export const History = {
    navigate: null,
    push: (page, ...rest) => History.navigate(page, ...rest)
};