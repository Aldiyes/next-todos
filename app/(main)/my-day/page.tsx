import {
	getCompleteTask,
	getMyDayTask,
	getOnGoingTask,
} from '@/actions/task/get-task';

import { TaskCard } from '@/components/task/task-card';
import { TaskLists } from '@/components/task/task-lists';

export default async function AllTaskPage() {
	const fetchMyDayTask = await getMyDayTask();
	const myDayTask = await fetchMyDayTask.data;
	const fetchCompleteTask = await getCompleteTask();
	const completeTask = await fetchCompleteTask.data;

	return (
		<main className="m-6 flex flex-col gap-y-4">
			<section className="flex flex-col gap-2">
				<h1 className="font-bold">On Going</h1>
				{myDayTask.length !== 0 ? (
					<TaskLists data={myDayTask} />
				) : (
					<TaskCard>
						<h1>You don&apos;t have any tasks yet</h1>
					</TaskCard>
				)}
			</section>
			<section className="flex flex-col gap-2">
				{/* <h1 className="font-bold">Completed</h1>
				{completeTask.length !== 0 ? (
					<TaskLists data={completeTask} />
				) : (
					<TaskCard>
						<h1>You don&apos;t have any complete tasks yet</h1>
					</TaskCard>
				)} */}
			</section>
		</main>
	);
}
