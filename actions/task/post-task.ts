'use server';

import { EditTask, NewTask } from '@/typings';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

export const addTask = async (data: NewTask) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	headerList.append('Accept', 'application/json');
	headerList.append('Content-Type', 'application/json');

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/task`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: headerList,
	});

	revalidateTag('task');
};

export const editCompleteAndImportant = async (
	taskId: string,
	completed?: boolean,
	important?: boolean,
) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	headerList.append('Accept', 'application/json');
	headerList.append('Content-Type', 'application/json');

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	const data = {
		taskId: taskId,
		important: important,
		completed: completed,
	};

	await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/task`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: headerList,
	});
	revalidateTag('important');
};

export const editTask = async (data: EditTask) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	headerList.append('Accept', 'application/json');
	headerList.append('Content-Type', 'application/json');

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	console.log('[SERVER ACTION] - ', data);

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/task/${data.taskId}`,
		{
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: headerList,
		},
	);
	revalidateTag('edit-task');
	return res.json();
};
