import { Task } from '@prisma/client';

import { TaskList } from '@/components/task/task-list';

type AllTaskProps = {
	data?: Task[];
};

export const TaskLists = ({ data }: AllTaskProps) => {
	return (
		<div className="flex flex-col gap-4">
			{data?.map((task) => <TaskList key={task.id} task={task} />)}
		</div>
	);
};
