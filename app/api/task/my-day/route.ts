import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

// * - - - GET MY_DAY TASK - - - * //
export const GET = auth(async (req) => {
	if (!req.auth) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	const myDay = await db.task.findMany({
		where: {
			completed: false,
			OR: [
				{
					planned: {
						dueDate: {
							lt: new Date(),
						},
					},
				},
				{
					createdAt: {
						gt: new Date(
							new Date().getFullYear(),
							new Date().getMonth(),
							new Date().getDate(),
							0,
							0,
							0,
							0,
						),
					},
				},
			],
		},
		include: {
			planned: true,
		},
	});

	if (!myDay) {
		return NextResponse.json(
			{ data: null, message: 'Task not found' },
			{ status: 404 },
		);
	}
	return NextResponse.json(
		{ data: myDay, message: 'success' },
		{ status: 200 },
	);
}) as any;
