'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Task } from '@prisma/client';
import { DialogClose } from '@radix-ui/react-dialog';
import { Trash2 } from 'lucide-react';
import { ModalDelete } from './modal-delete';
import { ModalForm } from './modal-form';

interface Props {
	task: Task;
	title: string;
	description: string;
	children: React.ReactNode;
}

export const Modal = ({ task, title, description, children }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<ModalForm initialData={task} />
				<DialogFooter>
					<DialogClose asChild>
						<ModalDelete task={task}>
							<Button variant="destructive">
								<Trash2 className="h-5 w-5" />
								Delete
							</Button>
						</ModalDelete>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
