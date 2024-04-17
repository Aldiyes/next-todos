import { Accordion } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Task } from '@prisma/client';
import { TaskWraperItem } from './task-wraper-item';

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
