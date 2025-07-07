import { supabase } from "./supabase";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "DELETE" && req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const body = await req.json();
  const { id } = body;
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing event id" }), {
      status: 400,
    });
  }

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(
    JSON.stringify({ message: "Event deleted successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
