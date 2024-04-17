import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// * - - - GET ALL IMPORTANT TASK - - - * //
export const GET = auth(async (req) => {
	if (!req.auth) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	try {
		const importantTask = await db.task.findMany({
			where: {
				important: true,
				completed: false,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});

		if (!importantTask) {
			return NextResponse.json(
				{ data: null, message: 'Task not found' },
				{ status: 404 },
			);
		}
		return NextResponse.json(
			{ data: importantTask, message: 'success' },
			{ status: 200 },
		);
	} catch (error) {
		console.log('[API_TASK_COMPLETED - GET] - ', error);
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 },
		);
	}
}) as any;
