'use server';

import { Task } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

export const deleteTaskById = async (id: string) => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	headerList.append('Accept', 'application/json');
	headerList.append('Content-Type', 'application/json');

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/task/${id}`, {
		method: 'DELETE',
		headers: headerList,
	});

	revalidateTag('task');
};
