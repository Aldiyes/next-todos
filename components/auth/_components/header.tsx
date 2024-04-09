import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
});

type HeaderProps = {
	label: string;
};

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className="w-full flex flex-col gap-y-4 items-center justify-center">
			<div className={(cn('flex flex-col'), font.className)}>
				<h1 className="text-3xl font-bold text-center">Login To</h1>
				<h1 className="text-3xl font-bold text-center">⚡NextTodo</h1>
			</div>
			<p className="text-muted-foreground text-sm">{label}</p>
		</div>
	);
};
