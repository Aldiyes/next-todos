export type NewTask = {
	title: string;
	dueDate?: Date;
	important: boolean;
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
