import { useLocation, useParams } from "react-router-dom";

const DetailPelatihanPage = () => {
    const location = useLocation();
    const { id } = useParams();
    console.log('id : ', id);
    const { itemDetail } = location.state;
    console.log('item detail : ', itemDetail);
    return (
        <>
            Detail Pelatihan
        </>
    )
}

export default DetailPelatihanPage;