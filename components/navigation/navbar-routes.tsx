'use client';

import { usePathname } from 'next/navigation';

import { UserButton } from '@/components/auth/user-button';
import { ModeToggle } from '@/components/toggle-theme-mode';

export const NavbarRoutes = () => {
	const pathname = usePathname();
	var path = '';
	const pathSegments = pathname.split(/[/-]/);

	const filteredSegments = pathSegments.filter((segment) => segment.length > 0);

	if (filteredSegments.length === 0) {
		path = '';
	}

	const capitalizedSegments = filteredSegments.map(
		(segment) =>
			segment.charAt(0).toUpperCase() + segment.substring(1).toLowerCase()
	);
	const joinDelimiter = pathname.includes('-') ? ' ' : '';
	path = capitalizedSegments.join(joinDelimiter);

	return (
		<div className="w-full flex justify-between">
			<div className="hidden md:block font-semibold text-xl">{path}</div>
			<div className="flex space-x-4">
				<ModeToggle />
				<UserButton />
			</div>
		</div>
	);
};
