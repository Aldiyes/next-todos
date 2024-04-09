import { AlertTriangleIcon } from 'lucide-react';

import { CardWraper } from '@/components/auth/_components/card-wraper';

export const ErrorCard = () => {
	return (
		<CardWraper
			headerLabel="Oops! Something went wrong!"
			backButtonHref="/auth/login"
			backButtonLabel="Back to login"
		>
			<div className="flex w-full items-center justify-center">
				<AlertTriangleIcon className="text-destructive" />
			</div>
		</CardWraper>
	);
};
