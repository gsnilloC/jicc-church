import { supabase } from "./supabase";

export const config = {
  runtime: "edge",
};

// Function to clean up past events
async function cleanupPastEvents() {
  const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const { error } = await supabase
    .from("events")
    .delete()
    .lt("date", currentDate); // Delete events where date < current date

  if (error) {
    console.error("Error cleaning up past events:", error);
    return { error: error.message };
  }

  return { message: "Past events cleaned up successfully" };
}

export default async function handler(req: Request) {
  if (req.method !== "DELETE" && req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const body = await req.json();
  const { id, cleanup } = body;

  // If cleanup is requested, clean up all past events
  if (cleanup) {
    const result = await cleanupPastEvents();
    if (result.error) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Otherwise, delete a specific event
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
