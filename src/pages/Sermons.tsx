import React from "react";
import styles from "../styles/Sermons.module.css";
import sermonsImg from "../assets/images/boy.jpg";

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

const Sermons: React.FC = () => {
  const isMobile = useIsMobile();
  if (isMobile) {
    // MOBILE VERSION
    return (
      <div className={styles.ministries}>
        {/* Hero section for mobile */}
        <div
          style={{
            width: "100%",
            textAlign: "center",
            background: "#ef542e",
            padding: "1.2rem 2.5rem",
            borderRadius: "0 0 8px 0",
            height: "810px",
            marginTop: "-25px",
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
            SERMONS
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
            Watch and listen to our latest sermons and teachings.
          </div>
          <img
            src={sermonsImg}
            alt="Sermons"
            style={{
              width: "92%",
              maxHeight: 550,
              objectFit: "cover",
              borderRadius: "0 0 8px 0",
              marginTop: "230px",
              alignSelf: "center",
              marginRight: "10px",
            }}
          />
        </div>
        {/* Mobile sermons card */}
        <div
          style={{
            margin: "1.2rem 0 3rem 0",
            background: "#fff",
            borderRadius: 8,
            padding: "2.9rem 1rem 1rem 1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              borderRadius: 8,
              padding: "1.2rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "#111827",
                marginBottom: 8,
              }}
            >
              Watch and listen to our latest sermons and teachings.
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
                marginTop: 8,
              }}
              onClick={() =>
                window.open(
                  "https://www.youtube.com/@tharamburuproductionsusa6211/featured",
                  "_blank"
                )
              }
            >
              Watch on YouTube
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.ministries}>
      <div className={styles.heroSection}>
        <div>
          <img src={sermonsImg} alt="Sermons" className={styles.heroImage} />
        </div>
        <div className={styles.heroTitleBlock}>
          <div className={styles.heroTitle}>
            <h2>SERMONS</h2>
          </div>
          <div className={styles.heroAboutUs}>
            <div className={styles.heroQuote}>
              Watch and listen to our latest sermons and teachings.
              <br />
            </div>
            <button
              className={styles.youtubeButton}
              onClick={() =>
                window.open(
                  "https://www.youtube.com/@tharamburuproductionsusa6211/featured",
                  "_blank"
                )
              }
            >
              Watch on YouTube
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sermons;
