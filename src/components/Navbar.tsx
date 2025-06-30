import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/images/jicc_logo.png";

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

const MobileNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        zIndex: 100,
        background: "transparent",
        boxShadow: "none",
        marginTop: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          position: "relative",
        }}
      >
        {/* Hamburger on right */}
        <button
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            zIndex: 102,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            width: 40,
          }}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            style={{
              width: 24,
              height: 3,
              background: "#fff",
              borderRadius: 2,
              margin: "3px 0",
              transition: "0.2s",
            }}
          />
          <span
            style={{
              width: 24,
              height: 3,
              background: "#fff",
              borderRadius: 2,
              margin: "3px 0",
              transition: "0.2s",
            }}
          />
          <span
            style={{
              width: 24,
              height: 3,
              background: "#fff",
              borderRadius: 2,
              margin: "3px 0",
              transition: "0.2s",
            }}
          />
        </button>
        {/* Centered logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            pointerEvents: open ? "none" : "auto",
          }}
        >
          <img
            src={logo}
            alt="JICC Logo"
            style={{
              height: 150,
              width: 150,
              objectFit: "contain",
            }}
          />
        </Link>
      </div>
      {/* Dropdown menu */}
      {open && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.01)",
              zIndex: 100,
              display: open ? "block" : "none",
            }}
          />
          {/* Sliding menu (always mounted) */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "70vw",
              maxWidth: 320,
              height: "100vh",
              background: "#fff",
              boxShadow: "-2px 0 8px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 101,
              transform: open ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
              paddingTop: 10,
              pointerEvents: open ? "auto" : "none",
              opacity: open ? 1 : 0,
            }}
          >
            <Link
              to="/about"
              style={mobileLinkStyle}
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              to="/ministries"
              style={mobileLinkStyle}
              onClick={() => setOpen(false)}
            >
              Ministries
            </Link>
            <Link
              to="/events"
              style={mobileLinkStyle}
              onClick={() => setOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/sermons"
              style={mobileLinkStyle}
              onClick={() => setOpen(false)}
            >
              Sermons
            </Link>
            <Link
              to="/contact"
              style={mobileLinkStyle}
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/giving"
              style={{ ...mobileLinkStyle, color: "#e4040c", fontWeight: 700 }}
              onClick={() => setOpen(false)}
            >
              Give
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

const mobileLinkStyle: React.CSSProperties = {
  width: "100%",
  padding: "1rem 0",
  textAlign: "center",
  textDecoration: "none",
  color: "#222",
  fontSize: "1.1rem",
  borderBottom: "1px solid #eee",
  background: "#fff",
};

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  if (isMobile) return <MobileNavbar />;
  // Desktop version (original)
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="JICC Logo" className={styles.logoImage} />
          <div className={styles.logoText}>
            <span className={styles.logoTextTop}>JOY INTERNATIONAL</span>
            <span className={styles.logoTextBottom}>CHURCH CENTER</span>
          </div>
        </Link>
        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={open ? styles.barOpen : styles.bar}></span>
          <span className={open ? styles.barOpen : styles.bar}></span>
          <span className={open ? styles.barOpen : styles.bar}></span>
        </button>
        <ul className={`${styles.navLinks} ${open ? styles.show : ""}`}>
          <li>
            <Link to="/about" onClick={() => setOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/ministries" onClick={() => setOpen(false)}>
              Ministries
            </Link>
          </li>
          <li>
            <Link to="/events" onClick={() => setOpen(false)}>
              Events
            </Link>
          </li>
          <li>
            <Link to="/sermons" onClick={() => setOpen(false)}>
              Sermons
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/giving"
              className={styles.giveButton}
              onClick={() => setOpen(false)}
            >
              Give
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
