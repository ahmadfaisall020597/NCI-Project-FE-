import { useParams } from "react-router-dom";
import { detailPelatihan } from "../../../data/pelatihan";
import { Stack, Image } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const DetailPelatihanPage = () => {
    const { id } = useParams();
    const itemDetail = detailPelatihan.find(detail => detail.id === parseInt(id));
    console.log('id : ', id);
    console.log('item detail : ', itemDetail);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    return (
        <Stack className="py-2 px-4">
            <div 
                style={{
                    width: isMobile ? '80vw' : '60vw',
                    margin: '0 auto', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center'
                }}
            >
                <Image
                    src={itemDetail.image}
                    alt={itemDetail.nama_program}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
            </div>
        </Stack>
    )
}

export default DetailPelatihanPage;