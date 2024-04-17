import { Suspense } from 'react';

import { getMyDayCompleted, getMyDayOnGoing } from '@/actions/task/get-task';

import { TaskWraper } from '@/components/task/task-wraper';

export default async function MyDayPage() {
	const fetchMyDayOnGoing = await getMyDayOnGoing();
	const myDayOnGoing = await fetchMyDayOnGoing.data;
	const fetchMyDayCompleted = await getMyDayCompleted();
	const myDayCompleted = await fetchMyDayCompleted.data;

	return (
		<main className="m-6 flex flex-col gap-y-4">
			<Suspense>
				<TaskWraper onGoingTask={myDayOnGoing} completedTask={myDayCompleted} />
			</Suspense>
		</main>
	);
}
