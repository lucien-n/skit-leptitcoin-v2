import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	type TProfile = {
		uid: string,
		name: string,
		avatar_url: string,
		created_at: number
	}

	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
			uid: string;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}
