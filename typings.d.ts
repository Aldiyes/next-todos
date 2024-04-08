export type Task = {
	id?: string;
	userId?: string;
	title: string;
	completed?: boolean;
	planned?: Date;
	important?: boolean;
};
