export const TaskCard = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className="w-full rounded-md bg-neutral-100 p-4 px-4 hover:bg-neutral-200 dark:border-neutral-300/20
		dark:bg-neutral-900 dark:hover:bg-neutral-800"
		>
			{children}
		</div>
	);
};
