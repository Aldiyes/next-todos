'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';
import { FaMoon } from 'react-icons/fa';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			'peer relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-700 data-[state=unchecked]:bg-neutral-800',
			className,
		)}
		{...props}
		ref={ref}
	>
		<RiMoonClearFill className="absolute right-1 h-4 w-4 text-yellow-500" />
		<SwitchPrimitives.Thumb
			className={cn(
				'pointer-events-none z-50 block h-5 w-5 rounded-full bg-neutral-100 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-neutral-800',
			)}
		/>
		<RiSunFill className="absolute h-4 w-4 text-yellow-500" />
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
