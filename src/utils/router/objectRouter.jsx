import { createBrowserRouter, redirect } from "react-router-dom";
import DashboardPage from "../../components/Dashboard/dashboardPage";
import { getAuthorization } from "../../helpers/storage";
import LoginPage from "../../components/Login/loginPage";
import LatarBelakangPage from "../../components/Tentang Kami/Latar Belakang/latarBelakangPage";
import Layout from "../../shared/layout";
import StrukturOrganisasiPage from "../../components/Tentang Kami/Struktur Organisasi/strukturOrganisasiPage";
import VisiMisiPage from "../../components/Tentang Kami/Visi Misi/visiMisiPage";
import DetailBerita from "../../components/detailBerita/detailBerita";
import BeritaPage from "../../components/Berita/berita";
import VideoPage from "../../components/Video/videoPage";

export const objectRouter = {
    dashboard: {
        title: "Dashboard",
        path: "/",
        element: <DashboardPage />,
        needAuth: false,
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
    latarBelakang: {
        title: "Latar Belakang",
        path: "/tentang-kami/latar-belakang",
        element: <LatarBelakangPage />,
        needAuth: false,
        header: true,
        footer: false,
        index: true
    },
    visiMisi: {
        title: "Tentang Kami",
        path: "/tentang-kami/visi-misi",
        element: <VisiMisiPage />,
        needAuth: false,
        header: true,
        footer: false,
        index: true
    },
    strukturOrganisasi: {
        title: "Latar Belakang",
        path: "/tentang-kami/struktur-organisasi",
        element: <StrukturOrganisasiPage />,
        needAuth: false,
        header: true,
        footer: false,
        index: true
    },
    detailBerita: {
        title: "Detail Berita",
        path: "/detail-berita/:id",
        element: <DetailBerita />,
        needAuth: false,
        header: true,
        footer: false,
        index: true
    },
    berita: {
        title: "Manage Berita",
        path: "/manage-berita",
        element: <BeritaPage />,
        needAuth: true,
        header: true,
        footer: false,
        index: true
    },
    video: {
        title: "Manage Berita",
        path: "/manage-video",
        element: <VideoPage />,
        needAuth: true,
        header: true,
        footer: false,
        index: true
    }
};


export const convertObjectToArray = () => {
    try {
        const obj = objectRouter;

        const loaderFn = objectKey => {
            // console.log('object key : ', objectKey);
            if (objectKey.needAuth) {
                if (!getAuthorization()) {
                    console.log('tidak ada auth');
                    return redirect(obj.dashboard.path);
                }
            }
            // if (objectKey.path == obj.dashboard.path) {
            //     if (getAuthorization()) {
            //         console.log('masuk dashboard');
            //         return redirect(obj.dashboard.path)
            //     }
            // }
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
        // console.log('data object : ', dataObject);
        return dataObject;
    } catch (error) {
        console.log('error : ', error);
    }
}

const ErrorPage = () => <div>Halaman tidak ditemukan.</div>;

// console.log('children : ', convertObjectToArray());

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