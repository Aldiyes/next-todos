import { FaCalendarAlt } from 'react-icons/fa';

import { timeZoneFormatString } from '@/lib/time-zone';
import { cn } from '@/lib/utils';

import { CompleteTaskButton } from '@/components/task/complete-task-button';
import { ImportantTaskButton } from '@/components/task/important-task-button';
import { TaskCard } from '@/components/task/task-card';

type TaskProps = {
	taskId: string;
	userId: string;
	title: string;
	completed: boolean;
	important: boolean;
	dueDate?: Date;
};

export const TaskList = ({
	title,
	completed,
	taskId,
	important,
	dueDate,
}: TaskProps) => {
	return (
		<TaskCard>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<div className="flex items-center">
						<CompleteTaskButton completed={completed} taskId={taskId} />
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
											Due {timeZoneFormatString(dueDate)}
										</p>
									) : (
										<p className="flex items-center gap-x-2 text-rose-400">
											<FaCalendarAlt />
											Late, {timeZoneFormatString(dueDate)}
										</p>
									)}{' '}
								</div>
							)}
						</div>
					</div>
				</div>
				<div>
					<ImportantTaskButton important={important} taskId={taskId} />
				</div>
			</div>
		</TaskCard>
	);
};
