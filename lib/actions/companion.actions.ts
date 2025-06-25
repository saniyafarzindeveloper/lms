import {auth} from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";


export const createCompanion = async (formData: CreateCompanion) => {
    const {userId: author} = await auth();
    const supabase = createSupabaseClient();
}