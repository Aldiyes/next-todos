'use server';

import { CompleteTask, NewTask } from '@/typings';
import { revalidateTag } from 'next/cache';

export const addTask = async (data: NewTask) => {
	await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/task`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	revalidateTag('task');
};

export const completedTask = async (data: CompleteTask) => {
	await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/task`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	revalidateTag('completed');
};
