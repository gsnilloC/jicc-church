import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import crossImg from "../assets/images/cross.jpg";

const serviceTimes = [
  { title: "Sunday Morning", text: "10:30 AM - Sunday Services" },
  { title: "Wednesday Evening", text: "6:00 PM - Prayer Night" },
  {
    title: "Fire Friday",
    text: "7:00 PM - Worship Night on the last Friday of the month",
  },
];

const testimonials = [
  {
    text: '"From the moment I walked in, I felt a sense of belonging. The messages are inspiring, and the community truly feels like family. My faith has grown so much since joining, and I am grateful for the support and love I receive every week."',
    author: "Adam",
  },
  {
    text: '"This church has changed my life. The people are welcoming and the sermons are always uplifting."',
    author: "Sarah",
  },
  {
    text: '"A wonderful place to connect with God and others. I always leave feeling encouraged!"',
    author: "James",
  },
];

// Add placeholder events data
const events = [
  {
    title: "Testing",
    date: "2025-05-22",
    time: "10:00",
    description: "TEST TEST",
  },
  {
    title: "Test Event",
    date: "2025-05-23",
    time: "10:00 AM",
    description: "This is a test event.",
  },
];

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

const MobileHome: React.FC<{ navigate: ReturnType<typeof useNavigate> }> = ({
  navigate,
}) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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
        width: "100vw",
        background: "#fff",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Hero Section with overlay */}
      <div
        style={{
          width: "100vw",
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
            width: "100vw",
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
            width: "100vw",
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
      <div style={{ padding: "2rem 0.5rem 0.5rem 0.5rem", width: "100vw" }}>
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
      <div style={{ padding: "2rem 0.5rem 2rem 0.5rem", width: "100vw" }}>
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
      <div style={{ padding: "1rem 0.5rem 2rem 0.5rem", width: "100vw" }}>
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
            gap: 10,
            alignItems: "center",
            width: "100%",
          }}
        >
          {events.map((event, idx) => (
            <div
              key={idx}
              style={{
                background: "#f7fafd",
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                padding: "1rem ",
                marginBottom: 8,
                textAlign: "left",
                width: "70%",
              }}
            >
              <div
                style={{ fontWeight: 700, fontSize: ".8rem", marginBottom: 2 }}
              >
                {event.title}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#6b7280",
                  marginBottom: 4,
                }}
              >
                <span>Date: {event.date}</span> <br />
                <span>Time: {event.time}</span>
              </div>
              <div style={{ fontSize: "0.8rem", color: "#374151" }}>
                {event.description}
              </div>
            </div>
          ))}
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
          {events.map((event, idx) => (
            <div className={styles.eventCard} key={idx}>
              <div className={styles.eventTitle}>{event.title}</div>
              <div className={styles.eventMeta}>
                <span>Date: {event.date}</span>
                <span>Time: {event.time}</span>
              </div>
              <div className={styles.eventDescription}>{event.description}</div>
            </div>
          ))}
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
