export type NewTask = {
	id?: string;
	userId?: string;
	title: string;
	planned?: Date;
	important?: boolean;
};

export type CompleteTask = {
	taskId?: string;
	userId?: string;
	completed?: boolean;
};

export type EditTask = {
	taskId?: string;
	userId?: string;
	title?: string;
	description?: string;
	dueDate: Date | null;
	important?: boolean;
	completed?: boolean;
};
