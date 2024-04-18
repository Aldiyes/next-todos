'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

export const deleteTaskById = async (id: string) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	headerList.append('Content-Type', 'application/json');

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	await fetch(`${process.env.APP_DOMAIN}/api/task/${id}`, {
		method: 'DELETE',
		headers: headerList,
	});

	revalidateTag('task');
};
