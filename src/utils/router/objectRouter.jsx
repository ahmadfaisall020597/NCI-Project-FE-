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
import DaftarOnlinePage from "../../components/daftarOnline/daftarOnline";
import KemendikbudPage from "../../components/Kemdikbud/kemdikbudPage";
import PengumumanPage from "../../components/Pengumuman/pengumumanPage";
import ProgramPelatihanPage from "../../components/programPelatihan/programPelatihan";
import DetailPelatihanPage from "../../components/programPelatihan/detailPelatihan/detailPelatihan";
import PelatihanPage from "../../components/Pelatihan/pelatihanPage";
import SlideShowPage from "../../components/SlideShow/slideShow";

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
    },
    daftarOnline: {
        title: "Daftar Online",
        path: "/daftar-online",
        element: <DaftarOnlinePage />,
        needAuth: false,
        header: true,
        footer: false,
        index: true
    },
    kemdikbud: {
        title: "Kemdikbud",
        path: "/kemdikbud",
        element: <KemendikbudPage />,
        needAuth: false,
        header: true,
        footer: false,
        index: true
    },
    pengumuman: {
        title: "Pengumuman",
        path: "/manage-pengumuman",
        element: <PengumumanPage />,
        needAuth: true,
        header: true,
        footer: false,
        index: true
    },
    programPelatihan: {
        title: "Program Pelatihan",
        path: '/program-pelatihan',
        element: <ProgramPelatihanPage />,
        needAuth: false,
        header: true,
        footer: false,
        index: true
    },
    detailPelatihan: {
        title: "Detail Pelatihan",
        path: "/detail-pelatihan/:id",
        element: <DetailPelatihanPage />,
        needAuth: false,
        header: true,
        footer: false,
        index: true
    },
    pelatihan: {
        title: "Pelatihan",
        path: "/manage-pelatihan",
        element: <PelatihanPage />,
        needAuth: true,
        header: true,
        footer: false,
        index: true
    },
    slideShow: {
        title: "Slide Show",
        path: "/manage-slideshow",
        element: <SlideShowPage />,
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
            if (objectKey.needAuth) {
                if (!getAuthorization()) {
                    return redirect(obj.dashboard.path);
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
        return dataObject;
    } catch (error) {
    }
}

const ErrorPage = () => <div>Halaman tidak ditemukan.</div>;

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