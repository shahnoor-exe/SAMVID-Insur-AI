import type { Claim, Policy, Trigger, Worker } from "./types";

type DbTables = {
  workers: Worker;
  policies: Policy;
  triggers: Trigger;
  claims: Claim;
};

type SupabaseDatabase = {
  public: {
    Tables: {
      [K in keyof DbTables]: {
        Row: DbTables[K];
        Insert: Omit<DbTables[K], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<DbTables[K]>;
      };
    };
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function createSupabaseClient<DB>(url: string, anonKey: string) {
  void url;
  void anonKey;
  type DbShape = DB;
  void (null as unknown as DbShape);

  return {
    from: <TableName extends string>(table: TableName) => {
      void table;

      return {
      select: async () => ({ data: [], error: null }),
      insert: async (payload: unknown) => {
        void payload;
        return { data: null, error: null };
      },
      update: async (payload: unknown) => {
        void payload;
        return { data: null, error: null };
      },
    };
    },
  };
}

export const supabase = createSupabaseClient<SupabaseDatabase>(supabaseUrl, supabaseAnonKey);

export type { SupabaseDatabase };
