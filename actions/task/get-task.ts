'use server';

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
	return res.json();
};

export const getCompletedTask = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/task/completed`,
		{
			cache: 'no-store',
			next: {
				tags: ['completed'],
			},
		},
	);
	if (!res.ok) {
		throw Error();
	}
	return res.json();
};
