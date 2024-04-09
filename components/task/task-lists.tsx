import { TaskList } from '@/components/task/task-list';
import { Task } from '@prisma/client';

type AllTaskProps = {
	data?: Task[];
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
					// important={}
				/>
			))}
		</div>
	);
};
