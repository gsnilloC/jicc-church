import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import eventStyles from "../styles/Events.module.css";
import crossImg from "../assets/images/cross.jpg";

const serviceTimes = [
  { title: "Sunday Morning", text: "10:30 AM - Sunday Services" },
  { title: "Wednesday Evening", text: "6:00 PM - Prayer Night" },
  {
    title: "Preteen/Teen/Youth Meeting",
    text: "2 to 4 PM - Every Last Sunday of the month",
  },
  {
    title: "Women's Meeting",
    text: "10 to 12 PM - Every Third Saturday of the month",
  },
  {
    title: "Men's Meeting",
    text: "10 to 12 PM - Every Second Saturday of the month",
  },
];

const testimonials = [
  {
    text: '"From the moment I walked in, I felt a sense of belonging. The messages are inspiring, and the community truly feels like family. My faith has grown so much since joining, and I am grateful for the support and love I receive every week."',
    author: "Adam",
  },
  {
    text: '"This church has changed my life. The people are welcoming and the sermons are always uplifting."',
    author: "Charlie",
  },
  {
    text: '"A wonderful place to connect with God and others. I always leave feeling encouraged!"',
    author: "James",
  },
];

interface EventData {
  id?: number;
  title: string;
  date: string;
  time?: string;
  description: string;
  image_url?: string;
  [key: string]: any;
}

function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
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
  // Try to parse as HH:mm or HH:mm:ss
  const [h, m = "00"] = timeStr.split(":");
  let hour = parseInt(h, 10);
  const minute = parseInt(m, 10);
  if (isNaN(hour)) return timeStr;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

const MobileHome: React.FC<{ navigate: ReturnType<typeof useNavigate> }> = ({
  navigate,
}) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      ),
    onSwipedRight: () =>
      setCurrentTestimonial((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      ),
    trackMouse: true,
  });
  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Hero Section with overlay */}
      <div
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <img
          src={crossImg}
          alt="Cross Hero"
          style={{
            width: "100%",
            minHeight: 320,
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.7)",
            opacity: 0.5,
          }}
        />
        {/* Overlay for transparency */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.32)",
            zIndex: 1,
          }}
        />
        {/* Hero text and button */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 0,
            width: "100%",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              borderRadius: 8,
              padding: "1rem",
              paddingLeft: "3.5rem",
              paddingRight: "3rem",
              marginBottom: "0.7rem",
              textAlign: "left",
              color: "orange",
              fontWeight: 700,
              fontSize: "1.1rem",
              lineHeight: 1.3,
            }}
          >
            Discover and Maximize your potential through the word of God.
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
            onClick={() => navigate("/about")}
          >
            Learn More About Us
          </button>
        </div>
      </div>
      {/* Service Times */}
      <div style={{ padding: "2rem 0.5rem 0.5rem 0.5rem", width: "100%" }}>
        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: 800,
            textAlign: "center",
            textTransform: "uppercase",
            margin: 0,
            marginBottom: 8,
          }}
        >
          Service Times
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: "center",
            width: "100%",
          }}
        >
          {serviceTimes.map((service, idx) => (
            <div
              key={idx}
              style={{
                background: "#f7fafc",
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                padding: "0.7rem 0.5rem",
                width: 260,
                height: 60,
                marginBottom: 8,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.98rem",
                  marginBottom: 2,
                }}
              >
                {service.title}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#374151" }}>
                {service.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div style={{ padding: "2rem 0.5rem 2rem 0.5rem", width: "100%" }}>
        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: 800,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Testimonials
        </h2>
        <div
          {...swipeHandlers}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              maxWidth: "86vw",
              minWidth: 120,
              marginBottom: 12,
              padding: "0 0.2rem",
              borderRadius: 8,
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "#17505a",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, padding: 0, fontSize: "0.75rem" }}>
              {testimonials[currentTestimonial].text}
            </p>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#222",
                marginTop: 4,
                fontStyle: "italic",
              }}
            >
              - {testimonials[currentTestimonial].author}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
              marginTop: 8,
            }}
          >
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background:
                    idx === currentTestimonial ? "#17505a" : "#cfd8dc",
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                  transform:
                    idx === currentTestimonial ? "scale(1.2)" : "scale(1)",
                  transition: "background 0.2s, transform 0.2s",
                  padding: 0,
                }}
                onClick={() => setCurrentTestimonial(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Events */}
      <div style={{ padding: "1rem 0.5rem 2rem 0.5rem", width: "100%" }}>
        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: 800,
            textAlign: "center",
            textTransform: "uppercase",
            margin: 0,
            marginBottom: 8,
          }}
        >
          Upcoming Events
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: 420,
            margin: "0 auto",
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
            events
              .slice()
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .slice(0, 3)
              .map((event, idx) => (
                <div
                  key={event.id || idx}
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    padding: "0",
                    marginBottom: "1.2rem",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: "380px",
                    overflow: "hidden",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  {/* Image Section */}
                  <div style={{ position: "relative" }}>
                    <img
                      src={
                        event.image_url ||
                        require("../assets/images/events.jpg")
                      }
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
          <button
            style={{
              marginTop: 18,
              background: "#ff7a00",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.7rem 1.2rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              width: "fit-content",
              alignSelf: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            }}
            onClick={() => navigate("/events")}
          >
            See More Events
          </button>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      ),
    onSwipedRight: () =>
      setCurrentTestimonial((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      ),
    trackMouse: true,
  });

  if (isMobile) {
    return <MobileHome navigate={navigate} />;
  }

  // Desktop version (original)
  return (
    <div className={styles.home}>
      <div
        className={styles.heroSection}
        style={{ backgroundImage: `url(${crossImg})` }}
      />
      <div className={styles.heroOverlay}>
        <h1 className={styles.heroTitle}>
          Discover and Maximize your potential
          <br />
          through the word of God.
        </h1>
        <button
          className={styles.heroButton}
          onClick={() => navigate("/about")}
        >
          Learn More About Us
        </button>
      </div>
      <div className={styles.serviceTimes}>
        <h2 className={styles.serviceTimeTitle}>Service Times</h2>
        <div className={styles.serviceTimeContainer}>
          {serviceTimes.map((service, idx) => (
            <div className={styles.serviceTimeItem} key={idx}>
              <h3 className={styles.service}>{service.title}</h3>
              <p className={styles.serviceTimeText}>{service.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.testimonialsSection}>
        <div className={styles.serviceTimeTitle}>Testimonials</div>
        <div className={styles.testimonialCarousel} {...swipeHandlers}>
          <div className={styles.testimonialContent}>
            <p className={styles.testimonialText}>
              {testimonials[currentTestimonial].text}
            </p>
            <div className={styles.testimonialAuthor}>
              - {testimonials[currentTestimonial].author}
            </div>
            <div className={styles.testimonialDots}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={
                    idx === currentTestimonial
                      ? `${styles.testimonialDot} ${styles.active}`
                      : styles.testimonialDot
                  }
                  onClick={() => setCurrentTestimonial(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.eventsSection}>
        <h2 className={styles.serviceTimeTitle}>Upcoming Events</h2>
        <div className={styles.eventsList}>
          {loading ? (
            <div>Loading events...</div>
          ) : error ? (
            <div style={{ color: "red" }}>{error}</div>
          ) : events.length === 0 ? (
            <div>No upcoming events.</div>
          ) : (
            events
              .slice()
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .slice(0, 3)
              .map((event, idx) => (
                <div className={eventStyles.eventCard} key={event.id || idx}>
                  <div className={eventStyles.eventImageBlock}>
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className={eventStyles.eventImage}
                    />
                  </div>
                  <div className={eventStyles.eventDetails}>
                    <h3 className={eventStyles.eventTitle}>{event.title}</h3>
                    <p className={eventStyles.eventDescription}>
                      {event.description}
                    </p>
                    <small className={eventStyles.eventMeta}>
                      Date: {formatDate(event.date)}
                      {event.time ? ` | Time: ${formatTime(event.time)}` : ""}
                    </small>
                  </div>
                </div>
              ))
          )}
        </div>
        <button
          className={styles.eventsButton}
          onClick={() => navigate("/events")}
        >
          See More Events
        </button>
      </div>
    </div>
  );
};

export default Home;
