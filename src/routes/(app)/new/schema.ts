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
	category: z.string().min(1).max(50),
	condition: z.string().min(1).max(1)
});

export type NewSchema = typeof newSchema;
