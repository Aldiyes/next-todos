import { TaskCard } from '@/components/task/task-card';

type TaskProps = {
	title: string;
};

export const TaskList = ({ title }: TaskProps) => {
	return <TaskCard>{title}</TaskCard>;
};
