import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, frequency, fundType, email, name, paymentMethodId } =
      req.body;

    // Validate required fields
    if (!amount || amount <= 0 || !paymentMethodId) {
      return res
        .status(400)
        .json({ error: "Invalid amount or payment method" });
    }

    // Convert amount to cents
    const amountInCents = Math.round(parseFloat(amount) * 100);

    // Determine interval based on frequency
    let interval: "month" | "year";
    switch (frequency) {
      case "Monthly":
        interval = "month";
        break;
      case "Yearly":
        interval = "year";
        break;
      default:
        return res
          .status(400)
          .json({ error: 'Invalid frequency. Use "Monthly" or "Yearly"' });
    }

    // Create or retrieve customer
    let customer;
    if (email) {
      const existingCustomers = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
        // Attach payment method to existing customer
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customer.id,
        });
      } else {
        customer = await stripe.customers.create({
          email: email,
          name: name,
          payment_method: paymentMethodId,
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Email is required for recurring donations" });
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Church Donation - ${fundType}`,
              description: `${frequency} donation to ${fundType}`,
            },
            unit_amount: amountInCents,
            recurring: {
              interval: interval,
            },
          },
        },
      ],
      metadata: {
        fundType: fundType || "General Fund",
        frequency: frequency,
        donorEmail: email,
        donorName: name || "",
        purpose: "Church Recurring Donation",
      },
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: (subscription.latest_invoice as any)?.payment_intent
        ?.client_secret,
      customerId: customer.id,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: "Failed to create subscription" });
  }
}
