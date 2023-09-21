import { browser } from '$app/environment';
import { CATEGORIES, PREFIX } from './constants';
import { titleStore } from './stores';
import type { Subcategory } from './types';

export const formatDate = (date_value: Date | number | string): string => {
	const date = new Date(date_value);

	const now = new Date();
	const yesterday = new Date();
	yesterday.setDate(now.getDate() - 1);

	const diff = now.getTime() - date.getTime();
	const minutesAgo = Math.floor(diff / (1000 * 60));
	const hoursAgo = Math.floor(minutesAgo / 60);
	const daysAgo = Math.floor(hoursAgo / 24);

	if (date.toLocaleDateString() == now.toLocaleDateString())
		return `Today at ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
	else if (date.toLocaleDateString() == yesterday.toLocaleDateString())
		return `Yesterday at ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
	else if (daysAgo < 7) return `${daysAgo + 1} days ago`;
	else if (daysAgo >= 7 && daysAgo < 14) return 'A week ago';

	return date.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long'
	});
};

export const setTitle = (title: string, prefix: boolean = false) => {
	if (!browser) return;
	if (prefix) titleStore.set(PREFIX + ' - ' + title);
	titleStore.set(title);
};

export const formatCategory = (subCategoryValue: string) => {
	let label: string = '';

	CATEGORIES.forEach(({ subcategories }) =>
		subcategories.forEach((subCategory: Subcategory) => {
			if (subCategory.value == subCategoryValue.split('/').pop()) label = subCategory.label;
		})
	);

	return label;
};
