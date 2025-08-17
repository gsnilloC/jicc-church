import React, { useState } from "react";
import styles from "../styles/Giving.module.css";

interface StripePaymentFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState({
    amount: "",
    name: "",
  });

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const presetAmounts = [10, 25, 50, 100, 250];

  // Load Stripe dynamically
  const loadStripe = async (publishableKey: string) => {
    try {
      const { loadStripe } = await import("@stripe/stripe-js");
      return loadStripe(publishableKey);
    } catch (error) {
      console.error("Failed to load Stripe:", error);
      return null;
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setFormData((prev) => ({ ...prev, amount: amount.toString() }));
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  const handleCustomAmountChange = (value: string) => {
    setSelectedAmount(null);
    setFormData((prev) => ({ ...prev, amount: value }));
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || parseFloat(formData.amount) < 1) {
      newErrors.amount = "Please enter a valid amount (minimum $1)";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        amount: formData.amount,
        name: formData.name,
        fundType: "General Fund",
        frequency: "One Time",
      };

      console.log("=== FRONTEND: Sending request ===");
      console.log("Request data:", requestData);
      console.log("API endpoint:", "/api/create-checkout-session");

      // Create checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      console.log("=== FRONTEND: Response received ===");
      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response not OK:", errorData);
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
      const { sessionId } = responseData;

      console.log("=== FRONTEND: Redirecting to Stripe ===");
      console.log("Session ID:", sessionId);

      // Check if publishable key exists
      if (!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe publishable key is not configured");
      }

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
      );

      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error("Stripe redirect error:", error);
        onError(error.message || "Failed to redirect to checkout");
      }
    } catch (err: any) {
      console.error("=== FRONTEND: Error occurred ===");
      console.error("Error:", err);
      onError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.donationForm}>
      {/* Name Input */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Full Name *</label>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      {/* Amount Selection */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Donation Amount *</label>
        <div className={styles.amountOptions}>
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              className={`${styles.amountButton} ${
                selectedAmount === amount ? styles.amountActive : ""
              }`}
              onClick={() => handleAmountSelect(amount)}
            >
              ${amount}
            </button>
          ))}
        </div>

        <div className={styles.customAmountContainer}>
          <input
            className={styles.customAmount}
            type="number"
            min="1"
            step="0.01"
            placeholder="Or enter custom amount"
            value={formData.amount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
          />
        </div>
        {errors.amount && (
          <span className={styles.errorText}>{errors.amount}</span>
        )}
      </div>

      {/* Submit Button */}
      <button className={styles.donateButton} type="submit" disabled={loading}>
        {loading
          ? "Preparing Checkout..."
          : `Proceed to Payment - $${formData.amount || "0"}`}
      </button>
    </form>
  );
};

export default StripePaymentForm;
