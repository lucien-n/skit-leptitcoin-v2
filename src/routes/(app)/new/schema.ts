import { z } from 'zod';

export const newSchema = z.object({
	title: z
		.string()
		.min(3, 'The title must be at least 3 characters long')
		.max(80, 'The title cannot be longer than 80 characters'),
	description: z
		.string()
		.min(3, 'The description must be at least 3 characters long')
		.max(500, 'The description cannot be longer than 500 characters'),
	category: z.string(),
	condition: z.preprocess((val) => Number(val), z.number().min(0).max(4))
});

export type NewSchema = typeof newSchema;
