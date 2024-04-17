import {
    getCompleteTask,
    getImportantTask,
    getOnGoingTask,
} from '@/actions/task/get-task';

import { TaskWraper } from '@/components/task/task-wraper';
import { Suspense } from 'react';

export default async function ImportantPage() {
	const fetchImportantTask = await getImportantTask();
	const importantTask = await fetchImportantTask.data;
	const fetchCompleteTask = await getCompleteTask();
	const completeTask = await fetchCompleteTask.data;

	return (
		<main className="m-6 flex flex-col gap-y-4">
			<Suspense>
				<TaskWraper onGoingTask={importantTask} />
			</Suspense>
		</main>
	);
}
