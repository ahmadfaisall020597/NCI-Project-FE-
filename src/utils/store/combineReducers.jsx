import { combineReducers } from "@reduxjs/toolkit";
import dashboardSlice from "../../components/Dashboard/dashboardSlice";
import latarBelakangSlice from "../../components/Tentang Kami/Latar Belakang/latarBelakangSlice";
import strukturOrganisasiSlice from "../../components/Tentang Kami/Struktur Organisasi/strukturOrganisasiSlice";
import visiMisiSlice from "../../components/Tentang Kami/Visi Misi/visiMisiSlice";

const rootReducer = combineReducers({
    dashboard: dashboardSlice,
    latarBelakang: latarBelakangSlice,
    strukturOrganisasi: strukturOrganisasiSlice,
    visiMisi: visiMisiSlice
});

export default rootReducer;