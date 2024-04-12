'use client';

import { auth } from '@/auth';

export default async function ImportantPage() {
	const session = auth();
	return (
		<main className="m-6 flex flex-col gap-y-4">
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</main>
	);
}
