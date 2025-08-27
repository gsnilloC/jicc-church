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

  try {
    // First, get the count of all events for logging
    const { count, error: countError } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("Error counting events:", countError);
    }

    // Delete ALL events (not just past ones)
    const { error } = await supabase
      .from("events")
      .delete()
      .gte("id", "00000000-0000-0000-0000-000000000000");

    if (error) {
      console.error("Error deleting all events:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "All events deleted successfully",
        eventsRemoved: count || "unknown",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
