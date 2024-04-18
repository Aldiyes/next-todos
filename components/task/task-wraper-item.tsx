import { Task } from '@prisma/client';

import { TaskLists } from '@/components/task/task-lists';
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

type TaskWraperProps = {
	task?: Task[];
	label: string;
	value: string;
};

export const TaskWraperItem = async ({
	task,
	label,
	value,
}: TaskWraperProps) => {
	return (
		<>
			{task && task.length !== 0 && (
				<AccordionItem value={value}>
					<AccordionTrigger className="[&[data-state=open]>p]:text-neutral-950 dark:[&[data-state=open]>p]:text-white">
						<p className="text-center text-muted-foreground">
							{label}{' '}
							<span className="text-neutral-950 dark:text-yellow-300">
								{task.length}
							</span>
						</p>
					</AccordionTrigger>
					<AccordionContent>
						<TaskLists data={task} />
					</AccordionContent>
				</AccordionItem>
			)}
		</>
	);
};
