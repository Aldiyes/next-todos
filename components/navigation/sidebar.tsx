import {
	getAllTask,
	getCompleteTask,
	getImportantTask,
	getMyDayOnGoing,
	getPlannedTask,
} from '@/actions/task/get-task';
import { Logo } from '@/components/logo';
import { SidebarRoutes } from '@/components/navigation/sidebar-routes';

export const Sidebar = async () => {
	const allTaskLength = await getAllTask();
	const completedTaskLength = await getCompleteTask();
	const myDayTaskLength = await getMyDayOnGoing();
	const importantTaskLength = await getImportantTask();
	const plannedTaskLength = await getPlannedTask();

	return (
		<div className="flex h-full flex-col overflow-y-auto rounded-lg border-r bg-neutral-400/20 shadow-md dark:border-neutral-300/20 dark:bg-neutral-900">
			<div className="p-6">
				<Logo />
			</div>
			<div>
				<SidebarRoutes
					allTaskLength={
						allTaskLength.data.length ? allTaskLength.data.length : 0
					}
					completedTaskLength={
						completedTaskLength.data.length
							? completedTaskLength.data.length
							: 0
					}
					myDayTaskLength={
						myDayTaskLength.data.length ? myDayTaskLength.data.length : 0
					}
					importantTaskLength={
						importantTaskLength.data.length
							? importantTaskLength.data.length
							: 0
					}
					plannedTaskLength={
						plannedTaskLength.data.length ? plannedTaskLength.data.length : 0
					}
				/>
			</div>
		</div>
	);
};
