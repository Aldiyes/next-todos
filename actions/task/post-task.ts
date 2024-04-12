'use server';

import { CompleteTask, NewTask } from '@/typings';
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

export const completedTask = async (data: CompleteTask) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	headerList.append('Accept', 'application/json');
	headerList.append('Content-Type', 'application/json');

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/task`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: headerList,
	});
	revalidateTag('completed');
};

export const importantTask = async (data: CompleteTask) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	headerList.append('Accept', 'application/json');
	headerList.append('Content-Type', 'application/json');

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/task/important`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: headerList,
	});
	revalidateTag('important');
};
