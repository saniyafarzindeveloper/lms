//this code can only be excecuted in the server coz we're tapping in the DB

"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  //destructre
  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (!data || error)
    throw new Error(error?.message || "Failed to create a companion");

  return data[0];
};

//fetching all the companions
export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  //select all the companions from the DB
  let query = supabase.from("companions").select();
  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  //pagination
  query = query.range((page - 1) * limit, page * limit - 1);

  //once we have the query -->. fetch it from the DB
  const { data: companions, error } = await query;
  if (error) throw new Error(error.message);
  return companions;
};

//fetching a single companion
export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) {
    return console.log("ERROR FROM SUPABASE GET COMPANION ACTION", error);
  } else {
    return data[0];
  }
};

//storing ended sessions in the history
export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) throw new Error(error.message);
  return data;
};

//fetching the stored session history
export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .order("created_at", { ascending: false }) //newest --> oldest
    .limit(limit);
  if (error) throw new Error(error.message);
  return data.map(({ companions }) => companions);
};

//fetching data for a particular user session
export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq('user_id', userId)
    .order("created_at", { ascending: false }) //newest --> oldest
    .limit(limit);
  if (error) throw new Error(error.message);
  return data.map(({ companions }) => companions);
};
