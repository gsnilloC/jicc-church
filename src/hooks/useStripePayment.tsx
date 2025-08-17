import { useState, useCallback } from "react";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { stripePromise } from "../utils/stripe";
import { validateAmount, validateEmail } from "../utils/stripe";

interface PaymentFormData {
  amount: string;
  frequency: string;
  fundType: string;
  email: string;
  name: string;
}

interface UseStripePaymentReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  handlePayment: (formData: PaymentFormData) => Promise<void>;
  resetState: () => void;
}

export const useStripePayment = (): UseStripePaymentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePayment = useCallback(async (formData: PaymentFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate form data
      if (!validateAmount(formData.amount)) {
        throw new Error("Please enter a valid amount between $1 and $10,000");
      }

      if (formData.frequency !== "One Time" && !validateEmail(formData.email)) {
        throw new Error("Please enter a valid email for recurring donations");
      }

      // Create payment intent or subscription based on frequency
      const endpoint =
        formData.frequency === "One Time"
          ? "/api/create-payment-intent"
          : "/api/create-subscription";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Payment failed");
      }

      const data = await response.json();

      // For one-time payments, confirm the payment
      if (formData.frequency === "One Time") {
        // This will be handled by the Stripe Elements in the component
        setSuccess(true);
      } else {
        // For subscriptions, the payment confirmation is handled differently
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    loading,
    error,
    success,
    handlePayment,
    resetState,
  };
};

// Stripe Elements wrapper component
export const StripeElementsWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

// Payment form component hook
export const usePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = useCallback(
    async (
      formData: PaymentFormData,
      onSuccess: () => void,
      onError: (error: string) => void
    ) => {
      if (!stripe || !elements) {
        onError("Stripe has not loaded yet");
        return;
      }

      try {
        // Create payment intent
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create payment intent");
        }

        const { clientSecret } = await response.json();

        // Confirm payment
        const { error: confirmError } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement)!,
              billing_details: {
                name: formData.name,
                email: formData.email,
              },
            },
          }
        );

        if (confirmError) {
          onError(confirmError.message || "Payment failed");
        } else {
          onSuccess();
        }
      } catch (err: any) {
        onError(err.message || "An unexpected error occurred");
      }
    },
    [stripe, elements]
  );

  return { handleSubmit };
};
