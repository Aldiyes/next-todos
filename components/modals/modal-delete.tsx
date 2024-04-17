'use client';

import { deleteTaskById } from '@/actions/task/delete-task';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Task } from '@prisma/client';
import { DialogClose } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

interface Props {
	task: Task;
	children: React.ReactNode;
}

export const ModalDelete = ({ task, children }: Props) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const onDelete = (id: string) => {
		startTransition(async () => {
			deleteTaskById(id).then(() => {
				toast.success('delete successfully');
				router.refresh();
			});
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<div>
						<p className="">Are you sure want to delete</p>{' '}
						<span className="font-semibold text-yellow-300">{task.title}</span>
					</div>
					<DialogDescription>
						When you delete this task, it cant be undo
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button size="sm" disabled={isPending}>
							Cancle
						</Button>
					</DialogClose>
					<Button
						size="sm"
						variant="destructive"
						onClick={() => onDelete(task.id)}
						disabled={isPending}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
