import { Suspense } from 'react';

import { getCompleteTask } from '@/actions/task/get-task';
import { TaskWraper } from '@/components/task/task-wraper';

export default async function CompletedPage() {
	const fetchCompleteTask = await getCompleteTask();
	const completeTask = await fetchCompleteTask.data;

	return (
		<main className="mx-6 flex flex-col gap-y-4">
			<Suspense>
				{completeTask.length !== 0 ? (
					<TaskWraper completedTask={completeTask} />
				) : (
					'You dont have any task yet'
				)}
			</Suspense>
		</main>
	);
}
