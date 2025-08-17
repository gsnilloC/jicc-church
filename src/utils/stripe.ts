import { loadStripe } from "@stripe/stripe-js";

// Load Stripe with your publishable key
export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!
);

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Helper function to validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate amount
export const validateAmount = (amount: string): boolean => {
  const numAmount = parseFloat(amount);
  return !isNaN(numAmount) && numAmount > 0 && numAmount <= 10000; // Max $10,000
};

// Fund types available for donations
export const FUND_TYPES = [
  "General Fund",
  "Building Fund",
  "Community Support",
  "Youth Ministry",
  "Missions",
  "Worship Ministry",
];

// Frequency options for recurring donations
export const FREQUENCY_OPTIONS = ["One Time", "Monthly", "Yearly"];

// Predefined donation amounts
export const DONATION_AMOUNTS = [25, 50, 100, 250, 500, 1000];
