export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updatedAt: string | null;
          email: string | null;
          createdAt: string | null;
        };
        Insert: {
          id: string;
          updatedAt?: string | null;
          email?: string | null;
          createdAt?: string | null;
        };
        Update: {
          id?: string;
          updatedAt?: string | null;
          email?: string | null;
          createdAt?: string | null;
        };
      };
    };
    Functions: Record<string, unknown>;
  };
}
