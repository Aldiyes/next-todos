export type NewTask = {
	id?: string;
	userId?: string;
	title: string;
	completed?: boolean;
	planned?: Date;
	important?: boolean;
};

export type CompleteTask = {
	taskId?: string;
	userId?: string;
	completed?: boolean;
};
