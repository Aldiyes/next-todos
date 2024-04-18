import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

// * - - - GET ALL COMPLETED TASK - - - * //
export async function GET(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	try {
		const completedTask = await db.task.findMany({
			where: {
				userId: session.user.id,
				completed: true,
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
			{ data: completedTask, message: 'Success' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 },
		);
	}
}
