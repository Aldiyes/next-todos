import { getCompleteTask } from '@/actions/task/get-task';

import { TaskWraper } from '@/components/task/task-wraper';
import { Suspense } from 'react';

export default async function CompletedPage() {
	const fetchCompleteTask = await getCompleteTask();
	const completeTask = await fetchCompleteTask.data;
	return (
		<main className="mx-6 flex flex-col gap-y-4">
			<Suspense>
				<TaskWraper completedTask={completeTask} />
			</Suspense>
		</main>
	);
}
