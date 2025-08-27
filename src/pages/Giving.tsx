import React, { useState, useEffect } from "react";
import styles from "../styles/Giving.module.css";
import givingImg from "../assets/images/community.jpg";
import StripePaymentForm from "../components/StripePaymentForm";

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
  const [paymentStatus, setPaymentStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Check for success/cancel from Stripe Checkout
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const canceled = urlParams.get("canceled");
    const sessionId = urlParams.get("session_id");

    if (success && sessionId) {
      setPaymentStatus({
        type: "success",
        message:
          "Thank you for your donation! Your payment has been processed successfully.",
      });
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (canceled) {
      setPaymentStatus({
        type: "error",
        message: "Your donation was canceled. You can try again anytime.",
      });
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handlePaymentSuccess = () => {
    setPaymentStatus({
      type: "success",
      message:
        "Thank you for your donation! Your payment has been processed successfully.",
    });
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus({
      type: "error",
      message: error,
    });
  };

  const resetPaymentStatus = () => {
    setPaymentStatus({ type: null, message: "" });
  };

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
            margin: "1rem",
            marginTop: "60px",
            marginBottom: "60px",
            background: "#fff",
            borderRadius: "8px",
            padding: "1rem",
            boxSizing: "border-box",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            overflow: "hidden",
            width: "calc(100vw - 2rem)",
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#ef542e",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Make a Donation
          </h3>

          <div style={{ overflow: "hidden", width: "100%" }}>
            <StripePaymentForm
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />

            {/* Mobile-specific CSS overrides */}
            <style>
              {`
                @media (max-width: 600px) {
                  .${styles.donationForm} {
                    min-width: unset !important;
                    width: 100% !important;
                    max-width: 100% !important;
                  }
                  
                  .${styles.amountOptions} {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    gap: 0.5rem !important;
                    justify-content: center !important;
                  }
                  
                  .${styles.amountButton} {
                    min-width: unset !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    font-size: 0.9rem !important;
                    padding: 0.75rem 0.5rem !important;
                    margin-bottom: 0.5rem !important;
                  }
                  
                  .${styles.formInput}, .${styles.customAmount} {
                    width: 100% !important;
                    max-width: 100% !important;
                    box-sizing: border-box !important;
                  }
                  
                  .${styles.donateButton} {
                    width: 100% !important;
                    max-width: 100% !important;
                    box-sizing: border-box !important;
                  }
                }
              `}
            </style>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <div
              style={{
                background: "#f8f9fa",
                borderRadius: "8px",
                padding: "1rem",
                border: "1px solid #e9ecef",
              }}
            >
              <h2
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  marginBottom: "0.8rem",
                  color: "#333",
                }}
              >
                How Your Donation Helps
              </h2>
              <div
                style={{
                  marginBottom: "1rem",
                  fontSize: "0.85rem",
                  lineHeight: "1.4",
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: "0.3rem" }}>
                  <span style={{ marginRight: "0.5rem" }}>➕</span>
                  Supporting Our Ministries
                </div>
                <div style={{ color: "#666", paddingLeft: "1.5rem" }}>
                  Your donations help fund our various ministries, including
                  youth programs, community outreach, and worship services.
                </div>
              </div>
              <div
                style={{
                  marginBottom: "1rem",
                  fontSize: "0.85rem",
                  lineHeight: "1.4",
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: "0.3rem" }}>
                  <span style={{ marginRight: "0.5rem" }}>🏠</span>
                  Building Maintenance
                </div>
                <div style={{ color: "#666", paddingLeft: "1.5rem" }}>
                  Contributions help maintain our church facilities and create a
                  welcoming environment for worship and fellowship.
                </div>
              </div>
              <div
                style={{
                  marginBottom: "1rem",
                  fontSize: "0.85rem",
                  lineHeight: "1.4",
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: "0.3rem" }}>
                  <span style={{ marginRight: "0.5rem" }}>👥</span>
                  Community Support
                </div>
                <div style={{ color: "#666", paddingLeft: "1.5rem" }}>
                  Your generosity enables us to support those in need through
                  food drives, counseling services, and other community
                  programs.
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#f8f9fa",
                borderRadius: "8px",
                padding: "1rem",
                border: "1px solid #e9ecef",
              }}
            >
              <h2
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  marginBottom: "0.8rem",
                  color: "#333",
                }}
              >
                Other Ways to Give
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.3rem",
                  fontSize: "0.85rem",
                }}
              >
                <span style={{ marginRight: "0.5rem" }}>✉️</span>
                Mail checks to:
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                  fontSize: "0.85rem",
                  paddingLeft: "1.5rem",
                  marginTop: "0.2rem",
                }}
              >
                790 French Camp Road, Stockton, CA 95206
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                  fontSize: "0.85rem",
                }}
              >
                <span style={{ marginRight: "0.5rem" }}>🔄</span>
                Set up automatic bank transfers
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

      {/* Payment Status Messages */}
      {paymentStatus.type && (
        <div
          style={{
            margin: "2rem auto",
            maxWidth: "800px",
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor:
              paymentStatus.type === "success" ? "#d4edda" : "#f8d7da",
            color: paymentStatus.type === "success" ? "#155724" : "#721c24",
            border: `1px solid ${paymentStatus.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{paymentStatus.message}</span>
            <button
              onClick={resetPaymentStatus}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                color: "inherit",
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* New Donation Section */}
      <div className={styles.donationContainer}>
        <div className={styles.donationGrid}>
          {/* Donation Form */}
          <div className={styles.donationFormSection}>
            <h2 className={styles.donationTitle}>Make a Donation</h2>

            <StripePaymentForm
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
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
                <span className={styles.infoIcon}>✉️</span> Mail checks to: 790
                French Camp Road, Stockton, CA 95206
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
