'use server';

import { Task } from '@prisma/client';

export const getAllTask = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/task`, {
		cache: 'no-store',
		next: {
			tags: ['task'],
		},
	});
	if (!res.ok) {
		throw Error();
	}
	// console.log(
	// 	'[SERVER_ACTION GET-ALL-TASK] - ',
	// 	res.json().then((data) => console.log(data))
	// );
	return res.json();
};
