'use server';

import { headers } from 'next/headers';

export const getAllTask = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}
	const res = await fetch(`${process.env.APP_DOMAIN}/api/task`, {
		cache: 'no-store',
		next: {
			tags: ['task', 'edit-task'],
		},
		headers: headerList,
	});
	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	return res.json();
};

export const getCompleteTask = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	const res = await fetch(`${process.env.APP_DOMAIN}/api/task/completed`, {
		cache: 'no-store',
		next: {
			tags: ['task', 'completed', 'important', 'edit-task'],
		},
		headers: headerList,
	});
	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	return res.json();
};

export const getOnGoingTask = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	const res = await fetch(`${process.env.APP_DOMAIN}/api/task/on-going`, {
		cache: 'no-store',
		next: {
			tags: ['task', 'completed', 'important', 'edit-task'],
		},
		headers: headerList,
	});
	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	return res.json();
};

export const getMyDayOnGoing = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	const res = await fetch(`${process.env.APP_DOMAIN}/api/task/my-day`, {
		cache: 'no-store',
		next: {
			tags: ['task', 'completed', 'edit-task'],
		},
		headers: headerList,
	});

	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	return res.json();
};

export const getMyDayCompleted = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	const res = await fetch(
		`${process.env.APP_DOMAIN}/api/task/my-day/completed`,
		{
			cache: 'no-store',
			next: {
				tags: ['task', 'completed', 'edit-task'],
			},
			headers: headerList,
		},
	);
	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	return res.json();
};

export const getImportantTask = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	const res = await fetch(`${process.env.APP_DOMAIN}/api/task/important`, {
		cache: 'no-store',
		next: {
			tags: ['task', 'important', 'edit-task'],
		},
		headers: headerList,
	});
	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	return res.json();
};

export const getPlannedTask = async () => {
	const cookie = await headers().get('Cookie');
	const headerList = new Headers();

	if (cookie) {
		headerList.append('Cookie', cookie);
	}

	const res = await fetch(`${process.env.APP_DOMAIN}/api/task/planned`, {
		cache: 'no-store',
		next: {
			tags: ['task', 'planned', 'edit-task'],
		},
		headers: headerList,
	});
	if (!res.ok) {
		throw Error(`Error with status code: ${res.status}`);
	}

	return res.json();
};
