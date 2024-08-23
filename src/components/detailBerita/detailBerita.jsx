import { useLocation, useParams } from "react-router-dom";
import { Image, Stack } from "react-bootstrap";

const DetailBerita = () => {
    const location = useLocation();
    const { id } = useParams();
    console.log('id : ', id)
    const { itemDetail } = location.state;
    const beritaItem = itemDetail.dataBerita.find(item => item.id == id);
    console.log('item berita : ', beritaItem);
    return (
        <Stack>
            <div style={{ margin: '34px' }} />
            <Stack className="py-2">
                {beritaItem && beritaItem.image_url && (
                    <Image
                        src={beritaItem.image_url}
                        alt={beritaItem.title}
                        fluid
                        style={{ maxWidth: '600px', margin: '0 auto' }}
                    />
                )}
            </Stack>
        </Stack>
    )
}

export default DetailBerita;