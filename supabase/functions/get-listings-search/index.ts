import { serve } from 'std/server';
import * as postgres from 'postgres';
import { corsHeaders } from '../_shared/cors.ts';

const databaseUrl = Deno.env.get('SUPABASE_DB_URI')!;

const pool = new postgres.Pool(databaseUrl, 3, true);

serve(async (_req) => {
	const params = new URLSearchParams(_req.url);
	const limit = 15;

	let offset = 0;
	const offset_param = params.get('offset');
	if (offset_param) offset = Math.abs(parseInt(offset_param));

	try {
		const connection = await pool.connect();

		try {
			const result =
				await connection.queryObject`SELECT uid FROM listings ORDER_BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
			const listings_uids = result.rows;

			console.log(listings_uids);

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
