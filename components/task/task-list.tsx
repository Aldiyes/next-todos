import { CompleteTaskButton } from '@/components/task/complete-task-button';
import { TaskCard } from '@/components/task/task-card';
import { cn } from '@/lib/utils';
import { FaCalendarAlt } from 'react-icons/fa';

type TaskProps = {
	taskId: string;
	userId: string;
	title: string;
	completed: boolean;
	dueDate?: Date;
};

export const TaskList = ({
	title,
	completed,
	taskId,
	userId,
	dueDate,
}: TaskProps) => {
	return (
		<TaskCard>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<div className="flex items-center">
						<CompleteTaskButton
							completed={completed}
							taskId={taskId}
							userId={userId}
						/>
					</div>
					<div
						className={cn(
							'h-full w-full',
							completed &&
								'text-decoration-line: italic text-muted-foreground line-through',
						)}
					>
						<div className="flex flex-col items-start space-y-1">
							<p className="text-sm font-medium">{title}</p>
							{dueDate && (
								<div className="flex items-center justify-center gap-x-2 text-sm">
									{new Date(dueDate) > new Date() ? (
										<p className="flex items-center gap-x-2 text-yellow-300">
											<FaCalendarAlt />
											Due{' '}
											{new Intl.DateTimeFormat('er', {
												dateStyle: 'full',
												timeZone: 'Asia/Jakarta',
											}).format(new Date(dueDate))}
										</p>
									) : (
										<p className="flex items-center gap-x-2 text-rose-400">
											<FaCalendarAlt />
											Late,{' '}
											{new Intl.DateTimeFormat('er', {
												dateStyle: 'full',
												timeZone: 'Asia/Jakarta',
											}).format(new Date(dueDate))}
										</p>
									)}{' '}
								</div>
							)}
						</div>
					</div>
				</div>
				<div>{/* // TODO: DUE DATE */}</div>
			</div>
		</TaskCard>
	);
};
