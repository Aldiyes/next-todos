'use client';

import {
	CalendarDays,
	ClipboardCheck,
	ClipboardList,
	Star,
	Sun,
} from 'lucide-react';

import { SidebarItem } from '@/components/navigation/sidebar-item';

type Props = {
	allTaskLength?: number;
	completedTaskLength?: number;
	myDayTaskLength?: number;
	importantTaskLength?: number;
	plannedTaskLength?: number;
};

export const SidebarRoutes = ({
	allTaskLength,
	completedTaskLength,
	myDayTaskLength,
	importantTaskLength,
	plannedTaskLength
}: Props) => {
	const routes = [
		{
			icon: Sun,
			label: 'My Day',
			href: '/my-day',
			taskLength: myDayTaskLength,
		},
		{
			icon: Star,
			label: 'Important',
			href: '/important',
			taskLength: importantTaskLength,
		},
		{
			icon: CalendarDays,
			label: 'Planned',
			href: '/planned',
			taskLength: plannedTaskLength,
		},
		{
			icon: ClipboardList,
			label: 'All',
			href: '/all',
			taskLength: allTaskLength,
		},
		{
			icon: ClipboardCheck,
			label: 'Completed',
			href: '/completed',
			taskLength: completedTaskLength,
		},
	];

	return (
		<div className="flex w-full flex-col">
			{routes.map((route) => (
				<SidebarItem
					key={route.href}
					icon={route.icon}
					label={route.label}
					href={route.href}
					taskLength={route?.taskLength}
				/>
			))}
		</div>
	);
};
