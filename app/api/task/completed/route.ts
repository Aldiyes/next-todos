import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// * - - - GET ALL COMPLETED TASK - - - * //
export const GET = auth(async (req) => {
	if (!req.auth) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	const completedTask = await db.task.findMany({
		where: {
			completed: true,
		},
		include: {
			planned: true,
		},
		orderBy: {
			updatedAt: 'desc',
		},
	});

	if (!completedTask) {
		return NextResponse.json(
			{ data: null, message: 'Task not found' },
			{ status: 404 },
		);
	}
	return NextResponse.json(
		{ data: completedTask, message: 'success' },
		{ status: 200 },
	);
}) as any;
