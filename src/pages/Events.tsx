import React, { useState, useEffect } from "react";
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
  image_url?: string;
}

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

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function formatTime(timeStr: string) {
  if (!timeStr) return "";
  const [h, m = "00"] = timeStr.split(":");
  let hour = parseInt(h, 10);
  const minute = parseInt(m, 10);
  if (isNaN(hour)) return timeStr;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setLoading(true);
    fetch("/api/getEvents")
      .then((res) => res.json())
      .then((data) => {
        if (data.events) {
          setEvents(
            data.events.map((event: any) => ({
              ...event,
              time: event.time || "",
            }))
          );
        } else {
          setError("No events found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load events");
        setLoading(false);
      });
  }, []);

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              padding: "0 1rem",
              boxSizing: "border-box",
            }}
          >
            {loading ? (
              <div>Loading events...</div>
            ) : error ? (
              <div style={{ color: "red" }}>{error}</div>
            ) : events.length === 0 ? (
              <div>No upcoming events.</div>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    padding: "0",
                    marginBottom: "1.2rem",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    overflow: "hidden",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  {/* Image Section */}
                  <div style={{ position: "relative" }}>
                    <img
                      src={event.image_url || event.image || defaultEventImg}
                      alt={event.title}
                      style={{
                        width: "100%",
                        height: "80px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    {/* Category Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "6px",
                        left: "6px",
                        background: "rgba(239, 84, 46, 0.9)",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "0.65rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Event
                    </div>
                  </div>

                  {/* Content Section */}
                  <div style={{ padding: "0.8rem" }}>
                    {/* Title */}
                    <div
                      style={{
                        fontWeight: "700",
                        fontSize: "1rem",
                        color: "#111827",
                        lineHeight: "1.2",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {event.title}
                    </div>

                    {/* Description */}
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#6b7280",
                        lineHeight: "1.3",
                        marginBottom: "0.6rem",
                      }}
                    >
                      {event.description}
                    </div>

                    {/* Date/Time */}
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#ef542e",
                        fontWeight: "500",
                        marginBottom: "0.8rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <span style={{ fontSize: "0.8rem" }}>📅</span>
                      {formatDate(event.date)}
                      {event.time ? ` • ${formatTime(event.time)}` : ""}
                    </div>

                    {/* Action Button */}
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
                        background: "#ef542e",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "0.8rem",
                        padding: "0.6rem 0.8rem",
                        borderRadius: "6px",
                        textDecoration: "none",
                        textAlign: "center",
                        display: "block",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#d4451f";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#ef542e";
                      }}
                    >
                      Add to Google Calendar
                    </a>
                  </div>
                </div>
              ))
            )}
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
        {loading ? (
          <div>Loading events...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : events.length === 0 ? (
          <div>No upcoming events.</div>
        ) : (
          events.map((event) => (
            <div key={event.id} className={styles.eventCardRow}>
              <div className={styles.eventCardImageBlock}>
                <img
                  src={event.image_url || event.image || defaultEventImg}
                  alt="Event"
                  className={styles.eventCardImage}
                />
              </div>
              <div className={styles.eventCardDetails}>
                <p className={styles.title}>{event.title}</p>
                <p className={styles.description}>{event.description}</p>
                <p className={styles.eventDateTime}>
                  Date: {formatDate(event.date)}
                  {event.time ? ` | Time: ${formatTime(event.time)}` : ""}
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
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Events;
