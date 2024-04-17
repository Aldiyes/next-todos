'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';

import { cn } from '@/lib/utils';

const SwitchBoolean = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			'peer relative inline-flex h-6 w-24 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-rose-600',
			className,
		)}
		{...props}
		ref={ref}
	>
		<span className="absolute left-1 text-sm text-white">true</span>
		<SwitchPrimitives.Thumb
			className={cn(
				'pointer-events-none z-50 block h-5 w-12 rounded-full bg-neutral-600 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-11 data-[state=unchecked]:translate-x-0',
			)}
		/>
		<span className="absolute right-1 text-sm text-white">false</span>
	</SwitchPrimitives.Root>
));
SwitchBoolean.displayName = SwitchPrimitives.Root.displayName;

export { SwitchBoolean };
