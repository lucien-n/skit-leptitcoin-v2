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
	price: z
		.number()
		.min(0, 'Price must be between 0 & 99 999')
		.max(99999, 'Price must be between 0 & 99 999'),
	category: z.string().min(1, 'Please select a category').max(50, 'Please select a category'),
	condition: z.number().min(0, 'Please select a condition').max(4, 'Please select a condition')
});

export type NewSchema = typeof newSchema;
