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
	const onGoingTask = await db.task.findMany({
		where: {
			completed: false,
		},
		include: {
			planned: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	if (!onGoingTask) {
		return NextResponse.json(
			{ data: null, message: 'Task not found' },
			{ status: 404 },
		);
	}
	return NextResponse.json(
		{ data: onGoingTask, message: 'success' },
		{ status: 200 },
	);
}) as any;
