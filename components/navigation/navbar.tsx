import { NavbarRoutes } from '@/components/navigation/navbar-routes';

export const Navbar = () => {
	return (
		<div className="p-4 border-b h-full flex items-center bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-300/20 shadow-sm">
			<NavbarRoutes />
		</div>
	);
};
