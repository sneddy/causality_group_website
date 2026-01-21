import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { NewsPost } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type NewsSupabaseClient = SupabaseClient<{
  public: { Tables: { news: { Row: NewsPost } } };
}>;

export const supabaseClient: NewsSupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
        global: {
          headers: {
            "x-application-name": "causality-group-site",
          },
        },
      })
    : null;
