'use server';

import { headers } from 'next/headers';

export const getAllTask = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/task`, {
		cache: 'no-store',
		next: {
			tags: ['task'],
		},
		headers: headerList,
	});

	return res.json();
};

export const getCompleteTask = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/task/completed`,
		{
			cache: 'no-store',
			next: {
				tags: ['completed'],
			},
			headers: headerList,
		},
	);

	return res.json();
};

export const getOnGoingTask = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/task/on-going`,
		{
			cache: 'no-store',
			next: {
				tags: ['completed'],
			},
			headers: headerList,
		},
	);

	return res.json();
};

export const getMyDayTask = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/task/my-day`,
		{
			cache: 'no-store',
			next: {
				tags: ['completed'],
			},
			headers: headerList,
		},
	);

	return res.json();
};

export const getImportantTask = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/task/important`,
		{
			cache: 'no-store',
			next: {
				tags: ['important'],
			},
			headers: headerList,
		},
	);

	return res.json();
};
