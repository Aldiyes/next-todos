'use client';

import { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SidebarItemProps {
	icon: LucideIcon;
	label: string;
	href: string;
	taskLength?: number | null;
}

export const SidebarItem = ({
	icon: Icon,
	label,
	href,
	taskLength,
}: SidebarItemProps) => {
	const pathname = usePathname();

	const isActive =
		(pathname === '/' && href === '/') ||
		pathname === href ||
		pathname?.startsWith(`${href}/`);

	return (
		<Link
			href={href}
			type="button"
			className={cn(
				'flex items-center gap-x-2 pl-6 text-sm font-[500] text-neutral-500 transition-all hover:bg-neutral-300/30 hover:text-neutral-600 dark:hover:bg-neutral-500/10 dark:hover:text-yellow-600',
				isActive &&
					'bg-yellow-300/20 text-yellow-500 hover:bg-yellow-300/20 hover:text-yellow-500 dark:bg-yellow-200/10 dark:text-yellow-300 dark:hover:bg-yellow-200/10 dark:hover:text-yellow-300',
			)}
		>
			<div className="flex items-center gap-x-2 py-4">
				<Icon
					size={22}
					className={cn('text-neutral-500', isActive && 'text-yellow-500')}
				/>
				{label}
			</div>
			<div
				className={cn(
					'ml-auto h-full border-r-2 bg-transparent p-4 transition-all',
					isActive && 'border-r-yellow-700',
				)}
			>
				{taskLength !== 0 ? taskLength : ''}
			</div>
		</Link>
	);
};
