import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Task } from '@prisma/client';

type TaskCardProps = {
	children: React.ReactNode;
	task: Task;
};

export const TaskCard = ({ children }: TaskCardProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit task</DialogTitle>
					<DialogDescription>
						Make changes to your task here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
