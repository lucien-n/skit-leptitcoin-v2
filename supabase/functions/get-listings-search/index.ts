import { serve } from 'std/server';
import * as postgres from 'postgres';
import { corsHeaders } from '../_shared/cors.ts';

const databaseUrl = Deno.env.get('SUPABASE_DB_URL')!;

const limit = 15;

const pool = new postgres.Pool(databaseUrl, 3, true);

const buildQuery = ({
	search,
	offset,
	condition,
	category,
	priceMin,
	priceMax,
	order,
	orderBy
}: {
	search?: string;
	offset?: number;
	condition?: number;
	category?: string;
	priceMin?: number;
	priceMax?: number;
	order: 'ASC' | 'DESC';
	orderBy: string;
}): string => {
	const conditions: string[] = [];

	if (search) conditions.push(`title ILIKE '%${search}%'`);
	if (condition != null && condition != undefined && condition >= 0 && condition <= 4)
		conditions.push(`condition = ${condition}`);
	if (category) conditions.push(`category = '${category}'`);
	if (priceMin && priceMin >= 0) conditions.push(`price >= ${priceMin}`);
	if (priceMax && priceMax <= 99999 && ((priceMin && priceMax > priceMin) || true))
		conditions.push(`price <= ${priceMax}`);

	const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
	const orderClause = orderBy ? `ORDER BY ${orderBy} ${order ? order : ''}` : '';
	const rangeClause = `LIMIT ${limit} ${offset ? `OFFSET ${offset}` : ''}`;

	const query = `SELECT uid FROM listings ${whereClause} ${orderClause} ${rangeClause}`;

	console.log(
		{
			search,
			offset,
			condition,
			category,
			priceMin,
			priceMax,
			order,
			orderBy
		},
		query
	);

	return query;
};

serve(async (req) => {
	// eslint-disable-next-line prefer-const
	let { search, offset, condition, category, priceMin, priceMax, order, orderBy } =
		await req.json();

	offset = Math.abs(parseInt(offset)) || 0;

	try {
		const connection = await pool.connect();

		try {
			const query = buildQuery({
				search,
				offset,
				condition,
				category,
				priceMin,
				priceMax,
				order,
				orderBy
			});

			const result = await connection.queryObject(query);
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
