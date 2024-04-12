import { TaskList } from '@/components/task/task-list';
import { Planned, Task } from '@prisma/client';

type AllTaskProps = {
	data?: {
		id: string;
		title: string;
		completed: boolean;
		userId: string;
		planned?: Planned;
	}[];
};

export const TaskLists = ({ data }: AllTaskProps) => {
	return (
		<div className="flex flex-col gap-4">
			{data?.map((task) => (
				<TaskList
					key={task.id}
					title={task.title}
					completed={task.completed}
					taskId={task.id}
					userId={task.userId}
					dueDate={task.planned?.dueDate}
				/>
			))}
		</div>
	);
};
