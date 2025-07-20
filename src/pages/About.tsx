import React from "react";
import styles from "../styles/About.module.css";
import aboutImg from "../assets/images/about.jpg";

const coreBeliefs = [
  {
    title: "Biblical Authority",
    text: "We believe in the divine inspiration and authority of the Bible as God's Word.",
  },
  {
    title: "Salvation Through Christ",
    text: "We believe in salvation through faith in Jesus Christ alone.",
  },
  {
    title: "Community",
    text: "We believe in the importance of Christian fellowship and community.",
  },
  {
    title: "Worship",
    text: "We believe in authentic worship that glorifies God and edifies believers.",
  },
  {
    title: "Service",
    text: "We believe in serving God by serving others in our community and beyond.",
  },
  {
    title: "Discipleship",
    text: "We believe in growing in faith through study, prayer, and fellowship.",
  },
];

const staff = [
  {
    name: "Peter Ngugi",
    title: "Lead Pastor",
    titleClass: styles.staffTitleLead,
    description: "Leading our congregation with wisdom since 2010.",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Mary Mburu",
    title: "Associate Pastor",
    titleClass: styles.staffTitleAssociate,
    description: "Dedicated to nurturing the faith of our young members.",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    name: "Grace Mburu",
    title: "Worship Leader",
    titleClass: styles.staffTitleWorship,
    description: "Leading our worship ministry with passion and creativity.",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
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

const About: React.FC = () => {
  const isMobile = useIsMobile();
  if (isMobile) {
    // MOBILE VERSION
    return (
      <div className={styles.aboutPage}>
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
            ABOUT US
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
            "And I will give you shepherds after my own heart, who will feed you
            with knowledge and understanding"
            <br />
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                display: "block",
                marginTop: 4,
              }}
            >
              - Jeremiah 3:15
            </span>
          </div>
          <img
            src={aboutImg}
            alt="About JICC"
            style={{
              width: "92%",
              maxHeight: 550,
              objectFit: "cover",
              borderRadius: "0 0 8px 0",
              marginTop: "230px",
            }}
          />
        </div>
        <div
          style={{
            margin: "1.2rem 0",
            background: "#fff",
            borderRadius: 8,
            padding: "2.9rem",
            paddingBottom: "0rem",
          }}
        >
          <p style={{ fontSize: "0.9rem", margin: 0 }}>
            Founded in 2012, our church has been serving the community for over
            13 years now.
          </p>
          <p style={{ fontSize: "0.9rem", margin: 0 }}>
            <b>Joy International Church Center (JICC)</b> is a vibrant
            African-founded, multicultural, and interdenominational church
            rooted in the love of God and open to people from all walks of life.
          </p>
          <p style={{ fontSize: "0.9rem", margin: 0 }}>
            Our mission is to "Discover and maximize our potential through the
            word of God." We are committed to spiritual growth, community
            service, and authentic worship.
          </p>
          <p style={{ fontSize: "0.9rem", margin: 0 }}>
            Join us as we grow together in faith, love, and purpose.
          </p>
        </div>
        <div
          style={{
            margin: "0.2rem 0",
            padding: "2.5rem",
            paddingBottom: "0rem",
            paddingTop: "0rem",
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
            Our Staff
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {staff.map((person, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#f7fafc",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  padding: "0.7rem 0.7rem",
                  gap: 10,
                }}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  style={{
                    width: 48,
                    height: 48,
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
                    {person.name}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color:
                        person.titleClass === styles.staffTitleLead
                          ? "#e65c00"
                          : person.titleClass === styles.staffTitleAssociate
                            ? "#e4040c"
                            : "#e6a800",
                    }}
                  >
                    {person.title}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#374151" }}>
                    {person.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ margin: "0.2rem 0", padding: "2.5rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: 8,
              color: "#ef542e",
            }}
          >
            Our Core Beliefs
          </h3>
          <div
            style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: 8 }}
          >
            The fundamental principles that guide our faith and community.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {coreBeliefs.map((belief, idx) => (
              <div
                key={idx}
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  border: "1px solid #e0e0e0",
                  padding: "0.7rem 0.7rem",
                  marginBottom: 6,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "#111827",
                    marginBottom: 2,
                  }}
                >
                  {belief.title}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#374151" }}>
                  {belief.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.aboutPage}>
      <div className={styles.heroSection}>
        <div>
          <img src={aboutImg} alt="About JICC" className={styles.heroImage} />
        </div>
        <div className={styles.heroTitleBlock}>
          <div className={styles.heroTitle}>
            <h2>ABOUT US</h2>
          </div>
          <div className={styles.heroAboutUs}>
            <div className={styles.heroQuote}>
              "And I will give you shepherds after my own heart, who will feed
              you with knowledge and understanding"
              <br />
              <span className={styles.heroScripture}>- Jeremiah 3:15</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.churchHistoryContainer}>
        <div className={styles.churchHistorySection}>
          <div className={styles.churchHistoryText}>
            <p>
              Founded in 2012, our church has been serving the community for
              over 13 years now.
            </p>
            <p>
              <b>Joy International Church Center (JICC)</b> is a vibrant
              African-founded, multicultural, and interdenominational church
              rooted in the love of God and open to people from all walks of
              life.
            </p>
            <p>
              Our mission is to "Discover and maximize our potential through the
              word of God." We are committed to spiritual growth, community
              service, and authentic worship.
            </p>
            <p>Join us as we grow together in faith, love, and purpose.</p>
          </div>
        </div>
        <div className={styles.staffSection}>
          {staff.map((person, idx) => (
            <div className={styles.staffCard} key={idx}>
              <img
                src={person.image}
                alt={person.name}
                className={styles.staffImage}
              />
              <div className={styles.staffInfo}>
                <div className={styles.staffName}>{person.name}</div>
                <div className={person.titleClass}>{person.title}</div>
                <div className={styles.staffDescription}>
                  {person.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.coreBeliefsSection}>
        <h2 className={styles.coreBeliefsTitle}>Our Core Beliefs</h2>
        <div className={styles.coreBeliefsSubtitle}>
          The fundamental principles that guide our faith and community.
        </div>
        <div className={styles.coreBeliefsGrid}>
          {coreBeliefs.map((belief, idx) => (
            <div className={styles.coreBeliefCard} key={idx}>
              <div className={styles.coreBeliefTitle}>{belief.title}</div>
              <div className={styles.coreBeliefText}>{belief.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
