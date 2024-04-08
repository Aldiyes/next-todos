import { Logo } from '@/components/logo';
import { SidebarRoutes } from '@/components/navigation/sidebar-routes';

export const Sidebar = () => {
	return (
		<div className="h-full border-r rounded-lg flex flex-col overflow-y-auto bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-300/20 shadow-md">
			<div className="p-6">
				<Logo />
			</div>
			<div>
				<SidebarRoutes />
			</div>
		</div>
	);
};
