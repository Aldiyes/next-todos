import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { getDateUntil12am } from '@/lib/time-zone';

// * - - - GET MY_DAY TASK - - - * //
export const GET = auth(async (req) => {
	if (!req.auth) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	try {
		const today = new Date();
		const tasks = await db.task.findMany({
			where: { completed: true },
			orderBy: { createdAt: 'desc' },
		});

		if (!tasks.length) {
			return NextResponse.json(
				{ data: null, message: 'Task not found' },
				{ status: 404 },
			);
		}

		const filteredTasks = tasks.filter(
			(task) => task.createdAt.getDate() === today.getDate(),
		);

		if (!filteredTasks) {
			return NextResponse.json(
				{ data: null, message: 'Task not found' },
				{ status: 404 },
			);
		}
		return NextResponse.json(
			{ data: filteredTasks, message: 'success' },
			{ status: 200 },
		);
	} catch (error) {
		console.log('[API_TASK_MYDAY - GET] - ', error);
		return NextResponse.json(
			{ data: null, message: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}) as any;
