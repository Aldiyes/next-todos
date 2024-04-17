import { Navbar } from '@/components/navigation/navbar';
import { Sidebar } from '@/components/navigation/sidebar';
import { NewTask } from '@/components/task/new-task-form';
import { cn } from '@/lib/utils';
import { headers } from 'next/headers';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const headerList = headers();
	const headerUrl = headerList.get('referer');
	return (
		<main className="h-full bg-neutral-100 dark:bg-neutral-950">
			<div className="fixed inset-y-0 z-50 h-fit w-full bg-white dark:bg-neutral-950 md:pl-72">
				<Navbar />
				<div className="p-4">
					<NewTask />
				</div>
			</div>
			<div className="fixed inset-y-0 z-50 hidden h-full w-72 flex-col md:flex">
				<Sidebar />
			</div>
			<main
				className={cn(
					'h-full overflow-auto md:pl-72',
					headerUrl?.includes('/completed') ? '' : 'pt-[210px]',
				)}
			>
				{children}
			</main>
		</main>
	);
}
