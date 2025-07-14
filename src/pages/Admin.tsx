import { useNavigate } from "react-router-dom";
import styles from "../styles/Admin.module.css";
import React, { useState } from "react";

export default function Admin() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Password protection states
  const [showModal, setShowModal] = useState(true);
  const [input, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    if (!title || !date || !description) {
      setSubmitStatus("Please fill in all required fields.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("location", ""); // Add location if you have a field for it
    if (time) formData.append("time", time);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("/api/addEvent", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus("Event created successfully!");
        setTitle("");
        setDate("");
        setTime("");
        setDescription("");
        setImage(null);
        setImagePreview(null);

        navigate("/");
      } else {
        setSubmitStatus(data.error || "Failed to create event.");
      }
    } catch (err) {
      setSubmitStatus("Failed to create event. Network error.");
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === "jiccADMIN2025!" || "a") {
      setIsAuthenticated(true);
      setShowModal(false);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className={styles.admin}>
      {/* Password Modal */}
      {showModal && !isAuthenticated && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <form
            onSubmit={handlePasswordSubmit}
            style={{
              background: "#fff",
              padding: "2rem 2.5rem",
              borderRadius: "10px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              minWidth: "300px",
              alignItems: "center",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>Admin Access</h2>
            <input
              type="password"
              placeholder="Enter admin password"
              value={input}
              onChange={(e) => setInputPassword(e.target.value)}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                marginBottom: "1rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "100%",
              }}
              autoFocus
            />
            {error && (
              <div style={{ color: "red", marginBottom: "0.5rem" }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              style={{
                padding: "0.5rem 1.5rem",
                fontSize: "1rem",
                borderRadius: "5px",
                background: "#2c3e50",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Enter
            </button>
          </form>
        </div>
      )}
      {/* Only show the form if authenticated */}
      {isAuthenticated && (
        <>
          <h1 className={styles.adminTitle}>Create New Event</h1>
          <form className={styles.eventForm} onSubmit={handleSubmit}>
            <label className={styles.formLabel} htmlFor="title">
              Title
            </label>
            <input
              className={styles.formInput}
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label className={styles.formLabel} htmlFor="date">
              Date
            </label>
            <input
              className={styles.formInput}
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <label className={styles.formLabel} htmlFor="time">
              Time
            </label>
            <input
              className={styles.formInput}
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <label className={styles.formLabel} htmlFor="description">
              Description
            </label>
            <textarea
              className={styles.formTextarea}
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label className={styles.formLabel} htmlFor="image">
              Event Image
            </label>
            <input
              className={styles.formImageInput}
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.formImagePreview}
              />
            )}
            {submitStatus && (
              <div
                style={{
                  margin: "1rem 0",
                  color: submitStatus.includes("success") ? "green" : "red",
                }}
              >
                {submitStatus}
              </div>
            )}
            <button className={styles.formButton} type="submit">
              Create Event
            </button>
          </form>
        </>
      )}
    </div>
  );
}
