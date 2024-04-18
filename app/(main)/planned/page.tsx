import { getCompleteTask, getPlannedTask } from '@/actions/task/get-task';

import { TaskWraper } from '@/components/task/task-wraper';
import { Suspense } from 'react';

export default async function PlannedPage() {
	const fetchPlannedTask: any = await getPlannedTask();
	const plannedTask = await fetchPlannedTask.data;

	return (
		<main className="m-6 flex flex-col gap-y-4">
			<Suspense>
				{plannedTask.length !== 0 ? (
					<TaskWraper onGoingTask={plannedTask} />
				) : (
					'You dont have any planned yet'
				)}
			</Suspense>
		</main>
	);
}
