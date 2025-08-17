export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const {
    subject = "Hello from JICC Church",
    html = "<strong>This is a test email from JICC Church via Resend.</strong>",
  } = await req.json();
  const from =
    process.env.RESEND_FROM_EMAIL || "JICC Church <onboarding@resend.dev>";
  const to = "cgichohi2018@gmail.com";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_KEY}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    return new Response(JSON.stringify({ error: data.error || data }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify({ message: "Email sent", data }), {
    status: 200,
  });
}
