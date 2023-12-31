import type { Tables } from '$lib/database.types';
import { SupabaseClient, Session } from '@supabase/supabase-js';
import type { PostgrestError } from '@supabase/supabase-js';

declare global {
	type TProfile = {
		uid: string;
		name: string;
		avatar_url: string;
		role: number;
		created_at: number;
	};

	type TListing = {
		uid: string;
		author: {
			uid: string;
			name: string;
		};
		price: number;
		title: string;
		description: string;
		category: string;
		condition: number;
		image: boolean;
		created_at: number;
	};

	type TBookmark = {
		user_uid: string;
		listing_uid: string;
		created_at: number;
	};

	type TSupaProfile = Tables<'profiles'>;
	type TSupaListing = Tables<'listings'>;

	type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
	type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
	type DbResultErr = PostgrestError;

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
