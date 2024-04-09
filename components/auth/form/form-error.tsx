import { AlertTriangleIcon } from 'lucide-react';

type FormErrorProps = {
	message?: string;
};

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;
	return (
		<div className="bg-destructive/15 text-destructive dark:bg-destructive/30 dark:text-red-500 p-3 rounded-md flex items-center gap-x-2 text-sm ">
			<AlertTriangleIcon className="h-5 w-5" />
			<p>{message}</p>
		</div>
	);
};
