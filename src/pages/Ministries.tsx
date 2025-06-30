import React from "react";
import styles from "../styles/Ministries.module.css";
import ministriesImg from "../assets/images/ministries.jpg";
import boyImg from "../assets/images/boy.jpg";
import communityImg from "../assets/images/community.jpg";
import crossImg from "../assets/images/cross.jpg";
import eventsImg from "../assets/images/events.jpg";
import sermonImg from "../assets/images/sermon.jpg";
import bibleImg from "../assets/images/bible.jpg";
import { useNavigate } from "react-router-dom";

const ministries = [
  {
    img: eventsImg,
    title: "Kids Ministry",
    desc: "Safe, fun, and Bible-based learning for children ages 2–12.",
  },
  {
    img: communityImg,
    title: "Youth Group",
    desc: "Periodic gatherings for middle and high school students.",
  },
  {
    img: crossImg,
    title: "Women Ministry",
    desc: "Monthly gathering every 3rd Saturday of the month.",
  },
  {
    img: boyImg,
    title: "Men Ministry",
    desc: "Monthly gathering every 2nd Saturday of the month.",
  },
  {
    img: bibleImg,
    title: "Intercessory Ministry",
    desc: "Meets every Wednesday for prayer.",
  },
  {
    img: sermonImg,
    title: "Praise and Worship Ministry",
    desc: "Meets periodically.",
  },
];

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

const Ministries: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  if (isMobile) {
    // MOBILE VERSION
    return (
      <div className={styles.ministries}>
        {/* Hero section for mobile, styled like About mobile hero, but with ministries info */}
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
            MINISTRIES
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
            Find a ministry that fits you and step into your purpose. God has a
            place for your gifts.
          </div>
          <img
            src={ministriesImg}
            alt={ministries[0].title}
            style={{
              width: "94%",
              paddingRight: "15px",
              objectFit: "cover",
              marginTop: "260px",
            }}
          />
        </div>
        {/* Mobile-specific ministries list */}
        <div
          style={{
            margin: "1.2rem 0",
            background: "#fff",
            borderRadius: 8,
            padding: "2.2rem",
            paddingBottom: "0rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#ef542e",
              marginBottom: 8,
            }}
          >
            Our Ministries
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            {ministries.map((ministry, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "#f7fafc",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  padding: "0.7rem 0.7rem",
                  gap: 10,
                  minWidth: 0,
                }}
              >
                <img
                  src={ministry.img}
                  alt={ministry.title}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 8,
                    objectFit: "cover",
                    marginRight: 8,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "#111827",
                    }}
                  >
                    {ministry.title}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#374151" }}>
                    {ministry.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            marginTop: "30px",
            marginLeft: "-10px",
            marginBottom: "-25px",
            padding: "2.5rem",
            background: "#f7fafc",
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: 8,
              color: "#ef542e",
            }}
          >
            Get Involved
          </h3>
          <div
            style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: 8 }}
          >
            Interested in joining a ministry? We'd love to have you!
          </div>
          <button
            style={{
              background: "#e4040c",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "0.7rem 1.2rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              width: "fit-content",
              maxWidth: 320,
            }}
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.ministries}>
      <div className={styles.heroSection}>
        <div>
          <img
            src={ministriesImg}
            alt="Ministries"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroTitleBlock}>
          <div className={styles.heroTitle}>
            <h2>MINISTRIES</h2>
          </div>
          <div className={styles.heroAboutUs}>
            <div className={styles.heroQuote}>
              Find a ministry that fits you and step into your purpose. God has
              a place for your gifts.
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cardsGrid}>
        {ministries.map((ministry, idx) => (
          <div className={styles.card} key={idx}>
            <img
              src={ministry.img}
              alt={ministry.title}
              className={styles.cardImg}
            />
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>{ministry.title}</div>
              <div className={styles.cardDesc}>{ministry.desc}</div>
              <a href="#" className={styles.cardLink}>
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <p className={styles.ctaTitle}>Get Involved</p>
          <p className={styles.ctaDesc}>
            Interested in joining a ministry? We'd love to have you!
            <br />
            <br />
          </p>
          <button
            className={styles.heroButton}
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ministries;
