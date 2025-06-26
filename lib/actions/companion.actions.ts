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
    query = query.ilike('subject', `%${subject}%`)
    .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
  }else if(subject){
    query = query.ilike('subject', `%${subject}%`)
  } else if(topic){
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
  }

  //pagination
  query = query.range((page - 1) * limit, page * limit - 1);

  //once we have the query -->. fetch it from the DB
  const {data: companions, error} = await query;
  if(error) throw new Error(error.message); 
  return companions;
};
