import { supabase } from "./supabase";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "PATCH" && req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const body = await req.json();
  const { id, ...fields } = body;
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing event id" }), {
      status: 400,
    });
  }
  if (Object.keys(fields).length === 0) {
    return new Response(JSON.stringify({ error: "No fields to update" }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from("events")
    .update(fields)
    .eq("id", id)
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ event: data[0] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
