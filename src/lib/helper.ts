export function formatDate(milliseconds: number): string {
	const date = new Date(milliseconds);

	const month = date.toLocaleString('default', { month: 'short' });
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	const formatted_date = `${month} ${day} ${hours.toString().padStart(2, '0')}h${minutes
		.toString()
		.padStart(2, '0')}`;

	return formatted_date;
}
