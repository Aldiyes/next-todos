import { CompleteTaskButton } from '@/components/task/complete-task-button';
import { TaskCard } from '@/components/task/task-card';

type TaskProps = {
	taskId: string;
	userId: string;
	title: string;
	completed: boolean;
};

export const TaskList = ({ title, completed, taskId, userId }: TaskProps) => {
	return (
		<TaskCard>
			<div className="flex items-center space-x-4">
				<div className="flex items-center">
					<CompleteTaskButton
						completed={completed}
						taskId={taskId}
						userId={userId}
					/>
				</div>
				<div className="h-full w-full">{title}</div>
			</div>
		</TaskCard>
	);
};
