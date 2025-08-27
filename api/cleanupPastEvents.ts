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
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    // First, get the count of past events for logging
    const { count, error: countError } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .lt("date", currentDate);

    if (countError) {
      console.error("Error counting past events:", countError);
    }

    // Delete past events
    const { error } = await supabase
      .from("events")
      .delete()
      .lt("date", currentDate);

    if (error) {
      console.error("Error cleaning up past events:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Past events cleaned up successfully",
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
