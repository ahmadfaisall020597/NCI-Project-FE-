import './styles.css';

const Footer = () => {
    return (
      <footer className="footer bg-dark text-white pt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>Our Location</h5>
              <div style={{ width: "100%" }}>
                <iframe
                  width="520"
                  height="400"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?width=520&height=400&hl=en&q=Jl.%20Asem%20Jaya%20No.5%204,%20RT.004/RW.005,%20Kel.Mustika%20Jaya,%20Kec.%20Mustika%20Jaya,%20Kota%20Bekasi,%20Jawa%20Barat%2017158+(NCI)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                  title="Google Map Location"
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
                  <span>Alamat : Jl. Asem Jaya No.5 4, RT.004/RW.005</span>
                  <br />
                  <span>
                    Kel. Mustika Jaya, Kec. Mustika Jaya, 
                  </span>
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
