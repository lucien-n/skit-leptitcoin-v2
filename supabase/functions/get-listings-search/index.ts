import { serve } from 'std/server';
import * as postgres from 'postgres';
import { corsHeaders } from '../_shared/cors.ts';

const databaseUrl = Deno.env.get('SUPABASE_DB_URL')!;

const limit = 15;

const pool = new postgres.Pool(databaseUrl, 3, true);

serve(async (req) => {
	// eslint-disable-next-line prefer-const
	let { offset, query } = await req.json();
	offset = Math.abs(parseInt(offset)) || 0;

	try {
		const connection = await pool.connect();

		try {
			const q = `SELECT uid FROM listings ${
				query ? `WHERE title LIKE '%${query || ''}%'` : ''
			} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset};`;

			const result = await connection.queryObject(q);
			const listings_uids = result.rows;

			const body = JSON.stringify(listings_uids);

			return new Response(body, {
				status: 200,
				headers: {
					...corsHeaders,
					'Content-Type': 'application/json; charset=utf-8'
				}
			});
		} finally {
			connection.release();
		}
	} catch (err) {
		console.error(err);
		return new Response(String(err?.message ?? err), { status: 500, headers: corsHeaders });
	}
});
