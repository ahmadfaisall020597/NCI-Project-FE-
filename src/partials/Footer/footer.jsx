import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';

const Footer = () => {
    const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=-6.2571797,106.8257732";

    return (
        <footer className="footer bg-dark text-white pt-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5>Our Location</h5>
                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                            <MapContainer center={[-6.2571797, 106.8257732]} zoom={13} style={{ height: '300px', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="&copy; OpenStreetMap contributors"
                                />
                                <Marker position={[-6.2571797, 106.8257732]}>
                                    <Popup>
                                        Our Office Location
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </a>
                    </div>

                    <div className="col-md-6">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>
                                <i className="fas fa-phone-alt"></i> Phone: <a href="tel:+123456789">+123456789</a>
                            </li>
                            <li>
                                <i className="fas fa-envelope"></i> Email: <a href="mailto:youngpineapple97@gmail.com">youngpineapple97@gmail.com</a>
                            </li>
                            <li>
                                <i className="fas fa-globe"></i> Website: <a href="https://github.com/ahmadfaisall020597">https://github.com/ahmadfaisall020597</a>
                            </li>
                            <li>
                                <i className="fas fa-map-marker-alt"></i> Address: Kemang, Jakarta, Indonesia
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col text-center">
                        <p>© {new Date().getFullYear()} Nusa Citra Indonesia. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
