export const TaskCard = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full p-4  rounded-md bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-300/20 shadow-md">
			{children}
		</div>
	);
};
