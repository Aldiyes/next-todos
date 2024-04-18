import { Suspense } from 'react';

import { getImportantTask } from '@/actions/task/get-task';
import { TaskWraper } from '@/components/task/task-wraper';

export default async function ImportantPage() {
	const fetchImportantTask = await getImportantTask();
	const importantTask = await fetchImportantTask.data;

	return (
		<main className="m-6 flex flex-col gap-y-4">
			<Suspense>
				{importantTask.length !== 0 ? (
					<TaskWraper onGoingTask={importantTask} />
				) : (
					'You dont have any task yet'
				)}
			</Suspense>
		</main>
	);
}
