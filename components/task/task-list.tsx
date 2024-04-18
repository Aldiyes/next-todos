'use client';

import { useOptimistic, useTransition } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

import { IoIosStarOutline, IoMdStar } from 'react-icons/io';
import { MdOutlineCheckCircleOutline, MdOutlineCircle } from 'react-icons/md';

import { editCompleteAndImportant } from '@/actions/task/post-task';
import { Task } from '@prisma/client';

import { timeZoneFormatString } from '@/lib/time-zone';
import { cn } from '@/lib/utils';

import { Modal } from '@/components/modals/modal';
import { Button } from '@/components/ui/button';

type TaskProps = {
	task: Task;
};

export const TaskList = ({ task }: TaskProps) => {
	const [isPending, startTransition] = useTransition();
	const [optimisticTask, optimisticUpdate] = useOptimistic(
		task,
		(task, { completed, important }) => {
			return { ...task, completed, important };
		},
	);

	const handleUpdate = async (completed: boolean, important: boolean) => {
		optimisticUpdate({ completed, important });
		await editCompleteAndImportant(optimisticTask.id, completed, important);
	};

	return (
		<div
			className="flex items-center rounded-sm bg-neutral-400/20 shadow-sm
			hover:bg-neutral-300/20 dark:border-neutral-300/20 dark:bg-neutral-900 dark:hover:bg-neutral-800"
		>
			<div className="flex items-center justify-items-start">
				<Button
					className="hover:bg-inherit dark:hover:bg-inherit"
					variant="ghost"
					onClick={() =>
						startTransition(() =>
							handleUpdate(!optimisticTask.completed, optimisticTask.important),
						)
					}
					disabled={isPending}
				>
					{optimisticTask.completed ? (
						<MdOutlineCheckCircleOutline className="h-6 w-6 text-emerald-600" />
					) : (
						<MdOutlineCircle className="h-6 w-6 text-yellow-500" />
					)}
				</Button>
			</div>
			<Modal task={task} title="Task" description="this is description">
				<div
					className={cn(
						'flex flex-1 items-center space-x-4',
						task.completed &&
							'text-decoration-line: italic text-muted-foreground line-through',
					)}
				>
					<h3 className="text-sm font-medium">{task.title}</h3>
					{task.dueDate && (
						<div className="flex items-center justify-center gap-x-2 text-[0.8rem]">
							{new Date(task.dueDate) > new Date() ? (
								<p
									className={cn(
										'flex items-center gap-x-2 text-yellow-300',
										new Date(task.dueDate).getDate() > new Date().getDate()
											? 'text-muted-foreground'
											: 'text-yellow-300',
									)}
								>
									<FaCalendarAlt />
									{new Date(task.dueDate).getDate() === new Date().getDate() &&
										'Today'}
									{new Date(task.dueDate).getDate() - new Date().getDate() ===
										1 && 'Tomorow'}
									{new Date(task.dueDate).getDate() > new Date().getDate() &&
										new Date(task.dueDate).getDate() - new Date().getDate() !==
											1 &&
										`Due ${timeZoneFormatString(task.dueDate)}`}
								</p>
							) : (
								<p className="flex items-center gap-x-2 text-rose-400">
									<FaCalendarAlt />
									Late, {timeZoneFormatString(task.dueDate)}
								</p>
							)}{' '}
						</div>
					)}
				</div>
			</Modal>
			<div className="flex items-center">
				<Button
					variant="ghost"
					className="hover:bg-inherit dark:hover:bg-inherit"
					onClick={() =>
						startTransition(() =>
							handleUpdate(optimisticTask.completed, !optimisticTask.important),
						)
					}
					disabled={isPending}
				>
					{optimisticTask.important ? (
						<IoMdStar className="h-6 w-6 text-yellow-400" />
					) : (
						<IoIosStarOutline className="h-6 w-6 text-rose-400/50" />
					)}
				</Button>
			</div>
		</div>
	);
};
