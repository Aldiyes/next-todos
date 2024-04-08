import { Navbar } from '@/components/navigation/navbar';
import { Sidebar } from '@/components/navigation/sidebar';
import { NewTask } from '@/components/task/new-task';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-full">
			<div className="h-[80px] md:pl-72 fixed inset-y-0 w-full z-50">
				<Navbar />
			</div>
			<div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
				<Sidebar />
			</div>
			<section className="md:pl-72 pt-[80px] fixed inset-y-0 w-full">
				<div className="p-4 bg-white dark:bg-neutral-950">
					<NewTask />
				</div>
			</section>
			<div className="md:pl-72 pt-[220px] h-full">{children}</div>
		</div>
	);
}
