export type Subcategory = {
	value: string;
	label: string;
};

export type Category = {
	name: string;
	subcategories: Subcategory[];
};

export type Condition = {
	value: number;
	label: string;
};

export type Shortcut = {
	key: string;
	altRequired?: boolean;
	ctrlRequired?: boolean;
	shiftRequired?: boolean;
};
