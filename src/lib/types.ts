export type Subcategory = {
	value: string;
	label: string;
};

export type Category = {
	name: string;
	subcategories: Subcategory[];
};

export const CATEGORIES: Category[] = [
	{
		name: 'Automotives',
		subcategories: [
			{ value: 'scooters', label: 'Scooters' },
			{ value: 'motorcycles', label: 'Motorcyles' },
			{ value: '4x4-car', label: '4x4 Car' },
			{ value: '2-wheel-drive-car', label: '2 Wheel Drive Car' }
		]
	},
	{
		name: 'Multimedia',
		subcategories: [
			{ value: 'game-console', label: 'Game Consoles' },
			{ value: 'parts', label: 'Parts' },
			{ value: 'computers', label: 'Computers' },
			{ value: 'peripherals', label: 'Peripherals' },
			{ value: 'household-appliances', label: 'Household Appliances' }
		]
	}
];

export type Condition = {
	value: number;
	label: string;
};

export const CONDITIONS: Condition[] = [
	{
		value: 0,
		label: 'For Parts'
	},
	{
		value: 1,
		label: 'Satisfactory state'
	},
	{
		value: 2,
		label: 'Good state'
	},
	{
		value: 3,
		label: 'Very good state'
	},
	{
		value: 4,
		label: 'Brand new'
	}
];

export type Shortcut = {
	key: string;
	altRequired?: boolean;
	ctrlRequired?: boolean;
	shiftRequired?: boolean;
};
