import { getCompleteTask } from '@/actions/task/get-task';

import { TaskLists } from '@/components/task/task-lists';
import { TaskWraper } from '@/components/task/task-wraper';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

export default async function AllTaskPage() {
	const fetchCompleteTask = await getCompleteTask();
	const completeTask = await fetchCompleteTask.data;
	return (
		<main className="m-6 flex flex-col gap-y-4">
			<Accordion
				type="single"
				collapsible
				className="w-full"
				defaultValue="task-completed"
			>
				{completeTask.length !== 0 && (
					<AccordionItem value="task-completed">
						<AccordionTrigger
							className="[&[data-state=open]>p]:text-white"
							aria-expanded="true"
							data-state="open"
						>
							<p className="text-center text-muted-foreground">
								Task Completed{' '}
								<span className="text-yellow-300">{completeTask.length}</span>
							</p>
						</AccordionTrigger>
						<AccordionContent data-state="open" hidden={false}>
							<TaskLists data={completeTask} />
						</AccordionContent>
					</AccordionItem>
				)}
			</Accordion>
		</main>
	);
}
