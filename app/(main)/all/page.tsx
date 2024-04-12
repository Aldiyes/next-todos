import { getCompleteTask, getOnGoingTask } from '@/actions/task/get-task';

import { TaskLists } from '@/components/task/task-lists';
import { TaskWraper } from '@/components/task/task-wraper';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

export default async function AllTaskPage() {
	const fetchOnGoingTask = await getOnGoingTask();
	const onGoingTask = await fetchOnGoingTask.data;
	const fetchCompleteTask = await getCompleteTask();
	const completeTask = await fetchCompleteTask.data;

	return (
		<main className="m-6 flex flex-col gap-y-4">
			<Accordion
				type="multiple"
				className="w-full"
				defaultValue={['on-going', 'completed']}
			>
				{onGoingTask.length !== 0 && (
					<AccordionItem value="on-going" className="">
						<AccordionTrigger className="[&[data-state=open]>p]:text-white">
							<p className="text-center text-muted-foreground">
								On Going{' '}
								<span className="text-yellow-300">{onGoingTask.length}</span>
							</p>
						</AccordionTrigger>
						<AccordionContent>
							<TaskLists data={onGoingTask} />
						</AccordionContent>
					</AccordionItem>
				)}
				{completeTask.length !== 0 && (
					<AccordionItem value="completed" className="">
						<AccordionTrigger className="[&[data-state=open]>p]:text-white">
							<p className="text-center text-muted-foreground">
								Completed{' '}
								<span className="text-yellow-300">{completeTask.length}</span>
							</p>
						</AccordionTrigger>
						<AccordionContent>
							<TaskLists data={completeTask} />
						</AccordionContent>
					</AccordionItem>
				)}
			</Accordion>
		</main>
	);
}
