import "./styles.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Our Location</h5>
            <div style={{ width: "100%" }}>
              <iframe
                width="100%" 
                height="400"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=LPK%20Nusa%20Citra%20Indonesia+(LPK%20Nusa%20Citra%20Indonesia)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                title="Google Map Location"
                style={{ width: "100%", height: "auto" }}
              ></iframe>
            </div>
          </div>

          <div className="col-md-6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-phone-alt"></i> Phone :{" "}
                <a href="tel:+123456789">0858 - 9248 - 0853 </a>
              </li>
              <li>
                <i className="fas fa-envelope"></i> Email :{" "}
                <a href="mailto:nusacitraindonesia@yahoo.co.id">
                  nusacitraindonesia@yahoo.co.id
                </a>
              </li>
              <li>
                <i className="fas fa-globe"></i> Website :{" "}
                <a href="https://nusacitraindonesia.com/">
                  nusacitraindonesia.com
                </a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Alamat : Jln. Dukuh, Jl. Zamrud Selatan 3 No.7 Blok F</span>
                <br />
                <span>RT.002/RW.021 Padurenan, Kec. Mustika Jaya,</span>
                <br />
                <span>Kota Bekasi, Jawa Barat 17158</span>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Alamat Workshop : Jl. Raya Asem Jaya No.5 4, RT.004/RW.005</span>
                <br />
                <span>Mustika Jaya, Kec. Mustika Jaya</span>
                <br />
                <span>Kota Bekasi, Jawa Barat 17158</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col text-center">
            <p>
              © {new Date().getFullYear()} Nusa Citra Indonesia. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
