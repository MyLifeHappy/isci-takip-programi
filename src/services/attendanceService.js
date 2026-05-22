import { supabase } from "../lib/supabaseClient";

export async function getAttendance() {
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addAttendance(row) {
  const { data, error } = await supabase
    .from("attendance")
    .insert([row]);

  if (error) throw error;
  return data;
}

export async function deleteAttendance(id) {
  const { error } = await supabase
    .from("attendance")
    .delete()
    .eq("id", id);

  if (error) throw error;
}