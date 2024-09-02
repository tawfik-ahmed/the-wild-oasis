import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  if (!hasImagePath && !newCabin.image) {
    throw new Error("Cabin image is required");
  }

  const imageName = newCabin.image
    ? `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
    : null;

  const imagePath = hasImagePath
    ? newCabin.image
    : imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : null;

  let query = supabase.from("cabins");

  // Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // Edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // Upload photo
  if (hasImagePath) return data;

  if (!imageName) {
    if (id) await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error("Cabin image is required");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    if (data) await supabase.from("cabins").delete().eq("id", data[0].id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded, and the cabin was not created"
    );
  }

  return data;
}
