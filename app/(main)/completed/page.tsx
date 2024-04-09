import { getCompletedTask } from '@/actions/task/get-task';
import { TaskLists } from '@/components/task/task-lists';

export default async function CompletedPage() {
	const taskList = await getCompletedTask();
	console.log('[COMPLETED TASK LIST] - ', taskList);
	return (
		<main className="m-6 flex flex-col gap-y-4">
			<section>
				{taskList?.length !== 0 ? (
					<TaskLists data={taskList} />
				) : (
					<h1>You don&apos;t have any tasks</h1>
				)}
			</section>
		</main>
	);
}
