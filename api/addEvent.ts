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

  // Parse multipart/form-data
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const imageFile = formData.get("image") as File | null;

  let image_url: string | null = null;
  if (imageFile) {
    // Upload image to Supabase Storage
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from("event-images")
      .upload(fileName, imageFile, {
        contentType: imageFile.type,
        upsert: false,
      });
    if (storageError) {
      return new Response(JSON.stringify({ error: storageError.message }), {
        status: 400,
      });
    }
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("event-images")
      .getPublicUrl(fileName);
    image_url = publicUrlData?.publicUrl || null;
  }

  const { data, error } = await supabase
    .from("events")
    .insert([{ title, description, date, time, image_url }])
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
