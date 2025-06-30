import React, { useState } from "react";
import styles from "../styles/Events.module.css";
import eventsImg from "../assets/images/events.jpg";

const defaultEventImg = eventsImg;

interface EventData {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  image?: string;
}

const initialEvents: EventData[] = [
  {
    id: 1,
    title: "Sunday Service",
    date: "2025-06-29",
    time: "10:00 AM",
    description:
      "Join us for our regular Sunday service with worship and teaching.",
    image: defaultEventImg,
  },
  {
    id: 2,
    title: "Community Potluck",
    date: "2025-07-02",
    time: "06:00 PM",
    description:
      "Bring a dish and share an evening of fellowship with the church family.",
    image: defaultEventImg,
  },
  {
    id: 3,
    title: "Youth Meeting",
    date: "2025-07-05",
    time: "04:00 PM",
    description: "Youth group gathering with games and Bible study.",
    image: defaultEventImg,
  },
];

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

const Events: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>(initialEvents);
  const isMobile = useIsMobile();
  const handleDelete = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  if (isMobile) {
    return (
      <div className={styles.events}>
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
            EVENTS
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
            Check out our upcoming events and join us for a time of worship,
            fellowship, and learning.
          </div>
          <img
            src={eventsImg}
            alt="Events"
            style={{
              width: "92%",
              objectFit: "cover",
              marginTop: "260px",
            }}
          />
        </div>
        {/* Mobile events list */}
        <div
          style={{
            margin: "1.2rem 0",
            background: "#fff",
            borderRadius: 8,
            padding: "2.9rem 1rem 1rem 1rem",
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
            Upcoming Events
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {events.map((event) => (
              <div
                key={event.id}
                style={{
                  background: "#f7fafc",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  padding: "0.7rem 0.7rem",
                  marginBottom: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <img
                  src={event.image || defaultEventImg}
                  alt={event.title}
                  style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: 6,
                  }}
                />
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#111827",
                  }}
                >
                  {event.title}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#374151" }}>
                  {event.description}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#ef542e" }}>
                  Date: {event.date} | Time: {event.time}
                </div>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    event.title
                  )}&dates=${event.date.replace(
                    /-/g,
                    ""
                  )}T100000Z/${event.date.replace(/-/g, "")}T110000Z`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#e4040c",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    marginTop: 4,
                  }}
                >
                  Add to Google Calendar
                </a>
                <button
                  style={{
                    background: "#e4040c",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "0.5rem 1rem",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    marginTop: 4,
                    alignSelf: "flex-start",
                  }}
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.events}>
      <div className={styles.heroSection}>
        <div>
          <img src={eventsImg} alt="Events" className={styles.heroImage} />
        </div>
        <div className={styles.heroTitleBlock}>
          <div className={styles.heroTitle}>
            <h2>EVENTS</h2>
          </div>
          <div className={styles.heroAboutUs}>
            <div className={styles.heroQuote}>
              Check out our upcoming events and join us for a time of worship,
              fellowship, and learning.
              <br />
            </div>
          </div>
        </div>
      </div>

      {/* 🎟️ Event tiles section */}
      <section className={styles.eventsGrid}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventCardRow}>
            <div className={styles.eventCardImageBlock}>
              <img
                src={event.image || defaultEventImg}
                alt="Event"
                className={styles.eventCardImage}
              />
            </div>
            <div className={styles.eventCardDetails}>
              <p className={styles.title}>{event.title}</p>
              <p className={styles.description}>{event.description}</p>
              <p className={styles.eventDateTime}>
                Date: {event.date} | Time: {event.time}
              </p>
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                  event.title
                )}&dates=${event.date.replace(
                  /-/g,
                  ""
                )}T100000Z/${event.date.replace(/-/g, "")}T110000Z`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.addToCalendarLink}
              >
                Add to Google Calendar
              </a>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Events;
