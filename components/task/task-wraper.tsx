import { Task } from '@prisma/client';

import { TaskWraperItem } from '@/components/task/task-wraper-item';
import { Accordion } from '@/components/ui/accordion';

type TaskWraperProps = {
	onGoingTask?: Task[];
	completedTask?: Task[];
};

export const TaskWraper = async ({
	onGoingTask,
	completedTask,
}: TaskWraperProps) => {
	return (
		<main className="flex max-h-full flex-col gap-y-4">
			<Accordion
				type="multiple"
				className="w-full"
				defaultValue={['on-going', 'completed']}
			>
				<TaskWraperItem task={onGoingTask} label="On Going" value="on-going" />
				<TaskWraperItem
					task={completedTask}
					label="Completed"
					value="completed"
				/>
			</Accordion>
		</main>
	);
};
