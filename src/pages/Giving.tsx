import React from "react";
import styles from "../styles/Giving.module.css";
import givingImg from "../assets/images/community.jpg";

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

const Giving: React.FC = () => {
  const isMobile = useIsMobile();
  if (isMobile) {
    // MOBILE VERSION
    return (
      <div className={styles.giving}>
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
            GIVING
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
            Support our ministry and make a difference in our community.
          </div>
          <img
            src={givingImg}
            alt="Giving"
            style={{
              width: "92%",
              maxHeight: 550,
              objectFit: "cover",
              borderRadius: "0 0 8px 0",
              marginTop: "230px",
            }}
          />
        </div>
        {/* Mobile donation form and info */}
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
            Make a Donation
          </h3>
          <form className={styles.donationForm} style={{ marginBottom: 24 }}>
            <div className={styles.amountOptions}>
              <button type="button" className={styles.amountActive}>
                $25
              </button>
              <button type="button">$50</button>
              <button type="button">$100</button>
              <button type="button">$250</button>
            </div>
            <input
              className={styles.customAmount}
              type="text"
              placeholder="Custom Amount"
              style={{ fontSize: "0.9rem", width: "92%" }}
            />
            <label className={styles.donationLabel}>
              Frequency
              <select className={styles.donationSelect}>
                <option>One Time</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </label>
            <label className={styles.donationLabel}>
              Fund
              <select className={styles.donationSelect}>
                <option>General Fund</option>
                <option>Building Fund</option>
                <option>Community Support</option>
              </select>
            </label>
            <label className={styles.donationLabel}>
              Credit Card
              <input
                className={styles.donationInput}
                type="text"
                placeholder=""
                style={{ fontSize: "0.9rem", width: "92%" }}
              />
            </label>
            <button className={styles.donateButton} type="submit">
              Donate Now
            </button>
          </form>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className={styles.donationInfoCard}>
              <h2 className={styles.infoTitle}>How Your Donation Helps</h2>
              <div className={styles.infoItem}>
                <b>
                  <span className={styles.infoIcon}>➕</span>Supporting Our
                  Ministries
                </b>
                <span className={styles.infoText}>
                  Your donations help fund our various ministries, including
                  youth programs, community outreach, and worship services.
                </span>
              </div>
              <div className={styles.infoItem}>
                <b>
                  <span className={styles.infoIcon}>🏠</span> Building
                  Maintenance
                </b>
                <span className={styles.infoText}>
                  Contributions help maintain our church facilities and create a
                  welcoming environment for worship and fellowship.
                </span>
              </div>
              <div className={styles.infoItem}>
                <b>
                  <span className={styles.infoIcon}>👥</span> Community Support
                </b>
                <span className={styles.infoText}>
                  Your generosity enables us to support those in need through
                  food drives, counseling services, and other community
                  programs.
                </span>
              </div>
            </div>
            <div className={styles.donationInfoCard}>
              <h2 className={styles.infoTitle}>Other Ways to Give</h2>
              <div className={`${styles.infoItem} ${styles.infoItemRow}`}>
                <span className={styles.infoIcon}>📱</span> Text "GIVE" to (555)
                123-4567
              </div>
              <div className={`${styles.infoItem} ${styles.infoItemRow}`}>
                <span className={styles.infoIcon}>✉️</span> Mail checks to: 123
                Church Street, City, State 12345
              </div>
              <div className={`${styles.infoItem} ${styles.infoItemRow}`}>
                <span className={styles.infoIcon}>🔄</span> Set up automatic
                bank transfers
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.giving}>
      <div className={styles.heroSection}>
        <div>
          <img src={givingImg} alt="Giving" className={styles.heroImage} />
        </div>
        <div className={styles.heroTitleBlock}>
          <div className={styles.heroTitle}>
            <h2>GIVING</h2>
          </div>
          <div className={styles.heroAboutUs}>
            <div className={styles.heroQuote}>
              Support our ministry and make a difference in our community.
              <br />
            </div>
          </div>
        </div>
      </div>
      {/* New Donation Section */}
      <div className={styles.donationContainer}>
        <div className={styles.donationGrid}>
          {/* Donation Form */}
          <div className={styles.donationFormSection}>
            <h2 className={styles.donationTitle}>Make a Donation</h2>
            <form className={styles.donationForm}>
              <div className={styles.amountOptions}>
                <button type="button" className={styles.amountActive}>
                  $25
                </button>
                <button type="button">$50</button>
                <button type="button">$100</button>
                <button type="button">$250</button>
              </div>
              <input
                className={styles.customAmount}
                type="text"
                placeholder="Custom Amount"
              />
              <label className={styles.donationLabel}>
                Frequency
                <select className={styles.donationSelect}>
                  <option>One Time</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </label>
              <label className={styles.donationLabel}>
                Fund
                <select className={styles.donationSelect}>
                  <option>General Fund</option>
                  <option>Building Fund</option>
                  <option>Community Support</option>
                </select>
              </label>
              <label className={styles.donationLabel}>
                Credit Card
                <input
                  className={styles.donationInput}
                  type="text"
                  placeholder=""
                />
              </label>
              <button className={styles.donateButton} type="submit">
                Donate Now
              </button>
            </form>
          </div>
          {/* Donation Info Cards */}
          <div className={styles.donationInfoSection}>
            <div className={styles.donationInfoCard}>
              <h2 className={styles.infoTitle}>How Your Donation Helps</h2>
              <div className={styles.infoItem}>
                <b>
                  <span className={styles.infoIcon}>➕</span>Supporting Our
                  Ministries
                </b>
                <span className={styles.infoText}>
                  Your donations help fund our various ministries, including
                  youth programs, community outreach, and worship services.
                </span>
              </div>
              <div className={styles.infoItem}>
                <b>
                  {" "}
                  <span className={styles.infoIcon}>🏠</span> Building
                  Maintenance
                </b>
                <span className={styles.infoText}>
                  Contributions help maintain our church facilities and create a
                  welcoming environment for worship and fellowship.
                </span>
              </div>
              <div className={styles.infoItem}>
                <b>
                  {" "}
                  <span className={styles.infoIcon}>👥</span> Community Support
                </b>
                <span className={styles.infoText}>
                  Your generosity enables us to support those in need through
                  food drives, counseling services, and other community
                  programs.
                </span>
              </div>
            </div>
            <div className={styles.donationInfoCard}>
              <h2 className={styles.infoTitle}>Other Ways to Give</h2>
              <div className={`${styles.infoItem} ${styles.infoItemRow}`}>
                <span className={styles.infoIcon}>📱</span> Text "GIVE" to (555)
                123-4567
              </div>
              <div className={`${styles.infoItem} ${styles.infoItemRow}`}>
                <span className={styles.infoIcon}>✉️</span> Mail checks to: 123
                Church Street, City, State 12345
              </div>
              <div className={`${styles.infoItem} ${styles.infoItemRow}`}>
                <span className={styles.infoIcon}>🔄</span> Set up automatic
                bank transfers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Giving;
