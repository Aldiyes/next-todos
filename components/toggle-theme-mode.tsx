'use client';

import { useTheme } from 'next-themes';
import { BsFillMoonStarsFill, BsSun } from 'react-icons/bs';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const nextTheme = theme === 'light' ? 'dark' : 'light';

	return (
		<Button
			variant="ghost"
			onClick={() => setTheme(nextTheme)}
			className="transition-all"
		>
			{theme === 'light' ? (
				<BsFillMoonStarsFill className="h-6 w-6" />
			) : (
				<BsSun className="h-6 w-6" />
			)}
		</Button>
	);
}
