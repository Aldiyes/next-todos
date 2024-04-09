'use client';

import { BackButton } from '@/components/auth/_components/back-button';
import { Header } from '@/components/auth/_components/header';
import { Social } from '@/components/auth/_components/social';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';

type CardWraperProps = {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
};

export const CardWraper = ({
	children,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
}: CardWraperProps) => {
	return (
		<Card className="w-[400px] shadow-lg bg-neutral-100 dark:bg-neutral-900 dark:border dark:border-neutral-300/20">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	);
};
