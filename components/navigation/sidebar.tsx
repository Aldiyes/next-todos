import { Logo } from '@/components/logo';
import { SidebarRoutes } from '@/components/navigation/sidebar-routes';

export const Sidebar = () => {
	return (
		<div className="flex h-full flex-col overflow-y-auto rounded-lg border-r bg-neutral-100 shadow-md dark:border-neutral-300/20 dark:bg-neutral-900">
			<div className="p-6">
				<Logo />
			</div>
			<div>
				<SidebarRoutes />
			</div>
		</div>
	);
};
