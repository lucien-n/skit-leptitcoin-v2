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
      bookmarks: {
        Row: {
          created_at: string
          listing_uid: string
          user_uid: string
        }
        Insert: {
          created_at?: string
          listing_uid: string
          user_uid: string
        }
        Update: {
          created_at?: string
          listing_uid?: string
          user_uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_listing_uid_fkey"
            columns: ["listing_uid"]
            referencedRelation: "listings"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "bookmarks_user_uid_fkey"
            columns: ["user_uid"]
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          }
        ]
      }
      listings: {
        Row: {
          author_uid: string
          category: string
          condition: number
          created_at: string
          description: string
          image: boolean
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
          image?: boolean
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
          image?: boolean
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
          name: string
          uid: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          name: string
          uid: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          name?: string
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
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
