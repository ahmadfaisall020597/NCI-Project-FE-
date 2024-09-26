import { combineReducers } from "@reduxjs/toolkit";
import dashboardSlice from "../../components/Dashboard/dashboardSlice";
import latarBelakangSlice from "../../components/Tentang Kami/Latar Belakang/latarBelakangSlice";
import strukturOrganisasiSlice from "../../components/Tentang Kami/Struktur Organisasi/strukturOrganisasiSlice";
import visiMisiSlice from "../../components/Tentang Kami/Visi Misi/visiMisiSlice";
import beritaSlice from "../../components/Berita/beritaSlice";
import videoSlice from "../../components/Video/videoSlice";
import pengumumanSlice from "../../components/Pengumuman/pengumumanSlice";

const rootReducer = combineReducers({
    dashboard: dashboardSlice,
    latarBelakang: latarBelakangSlice,
    strukturOrganisasi: strukturOrganisasiSlice,
    visiMisi: visiMisiSlice,
    berita: beritaSlice,
    video: videoSlice,
    pengumuman: pengumumanSlice,
});

export default rootReducer;