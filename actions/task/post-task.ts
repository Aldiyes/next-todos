'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

import { EditTask, NewTask } from '@/typings';

export const addTask = async (data: NewTask) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	headerList.append('Content-Type', 'application/json');

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	const res = await fetch(`${process.env.APP_DOMAIN}/api/task`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: headerList,
	});

	revalidateTag('task');

	return res.json();
};

export const editCompleteAndImportant = async (
	taskId: string,
	completed?: boolean,
	important?: boolean,
) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	headerList.append('Content-Type', 'application/json');

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	const data = {
		taskId: taskId,
		important: important,
		completed: completed,
	};

	const res = await fetch(`${process.env.APP_DOMAIN}/api/task/${taskId}`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: headerList,
	});

	revalidateTag('important');

	return res.json();
};

export const editTask = async (data: EditTask) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	headerList.append('Content-Type', 'application/json');

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	const res = await fetch(`${process.env.APP_DOMAIN}/api/task/${data.taskId}`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: headerList,
	});

	revalidateTag('edit-task');

	return res.json();
};
