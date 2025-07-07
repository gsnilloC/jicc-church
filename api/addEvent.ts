import { supabase } from "./supabase";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const body = await req.json();
  const { title, description, date, location, image_url } = body;

  const { data, error } = await supabase
    .from("events")
    .insert([{ title, description, date, location, image_url }])
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ event: data[0] }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
