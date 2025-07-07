export const config = {
  runtime: "edge", // or "nodejs"
};

export default async function handler(req: Request) {
  return new Response(
    JSON.stringify({ message: "Hello from Vercel TS (Edge)" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
