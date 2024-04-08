'use server';

import { Task } from '@/typings';
import { revalidateTag } from 'next/cache';

export const addTask = async (data: Task) => {
	await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/task`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	revalidateTag('task');
};
