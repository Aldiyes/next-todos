import { NavbarRoutes } from '@/components/navigation/navbar-routes';

export const Navbar = () => {
	return (
		<div className="flex h-full items-center border-b bg-neutral-100 p-4 shadow-sm dark:border-neutral-300/20 dark:bg-neutral-900">
			<NavbarRoutes />
		</div>
	);
};
