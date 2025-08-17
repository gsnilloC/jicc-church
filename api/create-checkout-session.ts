import Stripe from "stripe";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    console.log("Method not allowed, returning 405");
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY is not set");
    return new Response(
      JSON.stringify({ error: "Stripe configuration missing" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Parse the request body for Edge Runtime
    const body = await req.json();
    console.log("Request body parsed:", body);

    const { amount, name, fundType, frequency } = body;
    console.log("Extracted from request body:", {
      amount,
      name,
      fundType,
      frequency,
    });

    // Validate the request
    console.log("Validating request...");
    if (!amount || !name || parseFloat(amount) < 1) {
      console.log("Validation failed:", {
        amount,
        name,
        parseFloat: parseFloat(amount),
      });
      return new Response(JSON.stringify({ error: "Invalid amount or name" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log("Validation passed");

    // Convert amount to cents for Stripe
    const amountInCents = Math.round(parseFloat(amount) * 100);
    console.log("Amount converted to cents:", amountInCents);

    console.log("Creating Stripe instance...");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-07-30.basil",
    });
    console.log("Stripe instance created successfully");

    console.log("Creating checkout session...");
    const origin = req.headers.get("origin") || "http://localhost:3000";
    console.log(
      "Success URL will be:",
      `${origin}/giving?success=true&session_id={CHECKOUT_SESSION_ID}`
    );
    console.log("Cancel URL will be:", `${origin}/giving?canceled=true`);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Donation to ${fundType}`,
              description: `Thank you for your ${frequency.toLowerCase()} donation`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/giving?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/giving?canceled=true`,
      metadata: {
        donorName: name,
        fundType,
        frequency,
        amount: amount,
      },
    });

    console.log("Checkout session created successfully:", session.id);
    console.log("=== FUNCTION COMPLETED SUCCESSFULLY ===");

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("=== FUNCTION FAILED ===");
    console.error("Error type:", typeof error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Full error object:", JSON.stringify(error, null, 2));

    return new Response(
      JSON.stringify({
        error: "Failed to create checkout session",
        details: error.message,
        type: error.constructor.name,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
