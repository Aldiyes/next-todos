import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

// * - - - GET ALL PLANNED TASK - - - * //
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
		const plannedTaskExists = await db.task.findMany({
			where: {
				userId: session.user.id,
				completed: false,
				dueDate: { not: null },
			},
			orderBy: {
				dueDate: 'desc',
			},
		});
		if (!plannedTaskExists) {
			return NextResponse.json(
				{ data: null, message: 'Task not found' },
				{ status: 404 },
			);
		}

		const taskForToday = plannedTaskExists.filter((task) => {
			if (task.dueDate && task.dueDate.getDate() === today.getDate()) {
				return true;
			}
			return false;
		});

		const taskLate = plannedTaskExists.filter((task) => {
			if (task.dueDate && today.getDate() > task.dueDate.getDate()) {
				return true;
			}
			return false;
		});

		const taskNextDay = plannedTaskExists.filter((task) => {
			if (task.dueDate && task.dueDate.getDate() > today.getDate()) {
				return true;
			}
			return false;
		});

		const plannedTask = [...taskForToday, ...taskNextDay, ...taskLate];

		return NextResponse.json(
			{ data: plannedTask, message: 'Success' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 },
		);
	}
}
