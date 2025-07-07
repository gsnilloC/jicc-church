import { supabase } from "./supabase";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ events: data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
