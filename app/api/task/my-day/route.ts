import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

// * - - - GET MY_DAY TASK - - - * //
export async function GET(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	try {
		const today = new Date();
		const myDayTasksExists = await db.task.findMany({
			where: {
				userId: session.user.id,
				completed: false,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		if (!myDayTasksExists) {
			return NextResponse.json(
				{ data: null, message: 'Task not found' },
				{ status: 404 },
			);
		}

		const filteredMyDayTasksExists = myDayTasksExists.filter(
			(task) => task.createdAt.getDate() === today.getDate(),
		);
		if (!filteredMyDayTasksExists) {
			return NextResponse.json(
				{ data: null, message: 'Task not found' },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{ data: filteredMyDayTasksExists, message: 'Success' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 },
		);
	}
}
