import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// * - - - GET ALL ON-GOING TASK - - - * //
export const GET = auth(async (req) => {
	if (!req.auth) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}
	try {
		const onGoingTask = await db.task.findMany({
			where: {
				completed: false,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		return NextResponse.json(
			{ data: onGoingTask, message: 'success' },
			{ status: 200 },
		);
	} catch (error) {
		console.log('[API_TASK_ONGOING - GET] - ', error);
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 },
		);
	}
}) as any;
