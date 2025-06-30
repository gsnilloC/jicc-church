import React from "react";
import styles from "../styles/Contact.module.css";
import contactImg from "../assets/images/sermon.jpg";

// Add a simple hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth <= 600 : false
  );
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 600);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

const Contact: React.FC = () => {
  const isMobile = useIsMobile();
  if (isMobile) {
    // MOBILE VERSION
    return (
      <div className={styles.contact}>
        {/* Hero section for mobile */}
        <div
          style={{
            width: "100%",
            textAlign: "center",
            background: "#ef542e",
            padding: "1.2rem 2.5rem",
            borderRadius: "0 0 8px 0",
            height: "810px",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "1.2rem",
              fontWeight: 800,
              letterSpacing: 1,
              marginTop: "300px",
              textAlign: "left",
              paddingLeft: "20px",
            }}
          >
            CONTACT US
          </h2>
          <div
            style={{
              color: "#fff",
              fontSize: "0.9rem",
              fontWeight: 600,
              textAlign: "left",
              paddingLeft: "20px",
              paddingRight: "40px",
            }}
          >
            Get in touch with us. We would love to hear from you.
          </div>
          <img
            src={contactImg}
            alt="Contact"
            style={{
              width: "92%",
              maxHeight: 550,
              objectFit: "cover",
              borderRadius: "0 0 8px 0",
              marginTop: "230px",
            }}
          />
        </div>
        {/* Mobile contact form and info */}
        <div
          style={{
            margin: "1.2rem 0",
            background: "#fff",
            borderRadius: 8,
            padding: "2.3rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#ef542e",
              marginBottom: 12,
            }}
          >
            Send Us a Message
          </h3>
          <form className={styles.contactForm} style={{ marginBottom: 24 }}>
            <label>
              Name
              <input type="text" name="name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" required />
            </label>
            <label>
              Message
              <textarea name="message" rows={6} required />
            </label>
            <button
              type="submit"
              style={{
                background: "#e4040c",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "0.7rem 1.2rem",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              Send Message
            </button>
          </form>
          <div
            style={{
              background: "#f7fafc",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              padding: "1.2rem",
              marginBottom: 16,
            }}
          >
            <h2
              style={{
                fontSize: ".9rem",
                fontWeight: 700,
                color: "#ef542e",
                marginBottom: 8,
              }}
            >
              Contact Information
            </h2>
            <a
              href="https://www.google.com/maps?q=17902+Murphy+Pkwy,+Lathrop,+CA+95330"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#111827", textDecoration: "none" }}
            >
              <p style={{ marginBottom: "1px", fontSize: "0.85rem" }}>
                <span role="img" aria-label="location">
                  📍
                </span>
                17902 Murphy Pkwy, Lathrop, CA 95330
              </p>
            </a>
            <p style={{ marginBottom: "1px", fontSize: "0.85rem" }}>
              <span role="img" aria-label="phone">
                📞
              </span>
              (209)-922-4919
            </p>
            <p style={{ fontSize: "0.85rem" }}>
              <span role="img" aria-label="email">
                ✉️
              </span>
              jicc.church@yahoo.com
            </p>
          </div>
          <div style={{ borderRadius: 8, overflow: "hidden", height: 180 }}>
            <iframe
              title="JICC Location"
              src="https://www.google.com/maps?q=17902+Murphy+Pkwy,+Lathrop,+CA+95330&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.contact}>
      <div className={styles.heroSection}>
        <div>
          <img src={contactImg} alt="Contact" className={styles.heroImage} />
        </div>
        <div className={styles.heroTitleBlock}>
          <div className={styles.heroTitle}>
            <h2>CONTACT US</h2>
          </div>
          <div className={styles.heroAboutUs}>
            <div className={styles.heroQuote}>
              Get in touch with us. We would love to hear from you.
              <br />
            </div>
          </div>
        </div>
      </div>
      {/* New Contact Section */}
      <div className={styles.contactContainer}>
        <div className={styles.contactGrid}>
          {/* Message Form */}
          <div className={styles.formSection}>
            <h2>Send Us a Message</h2>
            <form className={styles.contactForm}>
              <label>
                Name
                <input type="text" name="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Message
                <textarea name="message" rows={6} required />
              </label>
              <button type="submit">Send Messages</button>
            </form>
          </div>
          {/* Map and Contact Info */}
          <div className={styles.infoSection}>
            <div className={styles.mapWrapper}>
              <iframe
                title="JICC Location"
                src="https://www.google.com/maps?q=17902+Murphy+Pkwy,+Lathrop,+CA+95330&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "10px" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className={styles.contactInfoBox}>
              <h2>Contact Information</h2>
              <a
                href="https://www.google.com/maps?q=17902+Murphy+Pkwy,+Lathrop,+CA+95330"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>
                  <span role="img" aria-label="location">
                    📍
                  </span>
                  17902 Murphy Pkwy, Lathrop, CA 95330
                </p>
              </a>
              <p>
                <span role="img" aria-label="phone">
                  📞
                </span>
                (209)-922-4919
              </p>
              <p>
                <span role="img" aria-label="email">
                  ✉️
                </span>
                jicc.church@yahoo.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
