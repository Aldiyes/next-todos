import { getAllTask, getCompleteTask } from '@/actions/task/get-task';
import { Logo } from '@/components/logo';
import { SidebarRoutes } from '@/components/navigation/sidebar-routes';

export const Sidebar = async () => {
	const allTaskLength = await getAllTask();
	const completedTaskLength = await getCompleteTask();
	return (
		<div className="flex h-full flex-col overflow-y-auto rounded-lg border-r bg-neutral-100 shadow-md dark:border-neutral-300/20 dark:bg-neutral-900">
			<div className="p-6">
				<Logo />
			</div>
			<div>
				<SidebarRoutes
					allTaskLength={allTaskLength.data.length}
					completedTaskLength={completedTaskLength.data.length}
				/>
			</div>
		</div>
	);
};
