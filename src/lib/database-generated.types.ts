export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      listings: {
        Row: {
          author_uid: string
          category: string
          condition: number
          created_at: string
          description: string
          image_url: string | null
          price: number
          title: string
          uid: string
        }
        Insert: {
          author_uid: string
          category?: string
          condition: number
          created_at?: string
          description: string
          image_url?: string | null
          price?: number
          title: string
          uid?: string
        }
        Update: {
          author_uid?: string
          category?: string
          condition?: number
          created_at?: string
          description?: string
          image_url?: string | null
          price?: number
          title?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_author_uid_fkey"
            columns: ["author_uid"]
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          name: string | null
          uid: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          name?: string | null
          uid: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          name?: string | null
          uid?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_uid_fkey"
            columns: ["uid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
