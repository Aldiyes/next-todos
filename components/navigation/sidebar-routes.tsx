'use client';

import {
	CalendarDays,
	ClipboardCheck,
	ClipboardList,
	Star,
	Sun,
} from 'lucide-react';

import { SidebarItem } from '@/components/navigation/sidebar-item';

const guestRoutes = [
	{
		icon: Sun,
		label: 'My Day',
		href: '/my-day',
	},
	{
		icon: Star,
		label: 'Important',
		href: '/important',
	},
	{
		icon: CalendarDays,
		label: 'Planned',
		href: '/planned',
	},
	{
		icon: ClipboardList,
		label: 'All',
		href: '/all',
	},
	{
		icon: ClipboardCheck,
		label: 'Completed',
		href: '/completed',
	},
];

export const SidebarRoutes = () => {
	const routes = guestRoutes;

	return (
		<div className="flex flex-col w-full">
			{routes.map((route) => (
				<SidebarItem
					key={route.href}
					icon={route.icon}
					label={route.label}
					href={route.href}
				/>
			))}
		</div>
	);
};
