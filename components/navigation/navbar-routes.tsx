'use client';

import { usePathname } from 'next/navigation';

import { UserButton } from '@/components/auth/_components/user-button';
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
			segment.charAt(0).toUpperCase() + segment.substring(1).toLowerCase(),
	);
	const joinDelimiter = pathname.includes('-') ? ' ' : '';
	path = capitalizedSegments.join(joinDelimiter);

	return (
		<div className="flex w-full justify-between">
			<div className="hidden text-xl font-semibold md:block">{path}</div>
			<div className="flex space-x-4">
				<ModeToggle />
				<UserButton />
			</div>
		</div>
	);
};
