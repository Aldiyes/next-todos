'use client';

import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

interface SidebarItemProps {
	icon: LucideIcon;
	label: string;
	href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
	const pathname = usePathname();
	const router = useRouter();

	const isActive =
		(pathname === '/' && href === '/') ||
		pathname === href ||
		pathname?.startsWith(`${href}/`);

	const onClick = () => {
		router.push(href);
	};

	return (
		<button
			onClick={onClick}
			type="button"
			className={cn(
				'flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all text-neutral-500 hover:text-neutral-600 dark:hover:text-yellow-600 hover:bg-neutral-300/30 dark:hover:bg-neutral-500/10',
				isActive &&
					'text-yellow-500 hover:text-yellow-500 dark:text-yellow-300 dark:hover:text-yellow-300 bg-yellow-300/20 hover:bg-yellow-300/20 dark:bg-yellow-200/10 dark:hover:bg-yellow-200/10'
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
					'ml-auto opacity-0 border-2 border-yellow-700 h-full transition-all',
					isActive && 'opacity-100'
				)}
			/>
		</button>
	);
};
