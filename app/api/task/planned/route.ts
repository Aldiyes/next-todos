import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// * - - - GET ALL PLANNED TASK - - - * //
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
			where: {
				completed: false,
				dueDate: { not: null },
			},
			orderBy: {
				dueDate: 'desc',
			},
		});
		if (!tasks) {
			return NextResponse.json(
				{ data: null, message: 'Task not found' },
				{ status: 404 },
			);
		}
		const taskForToday = tasks.filter((task) => {
			if (task.dueDate && task.dueDate.getDate() === today.getDate()) {
				return true;
			}
			return false;
		});

		const taskLate = tasks.filter((task) => {
			if (task.dueDate && today.getDate() > task.dueDate.getDate()) {
				return true;
			}
			return false;
		});

		const taskNextDay = tasks.filter((task) => {
			if (task.dueDate && task.dueDate.getDate() > today.getDate()) {
				return true;
			}
			return false;
		});

		// const plannedTask = {
		// 	today: [...taskForToday],
		// 	nextDay: [...taskNextDay],
		// 	late: [...taskLate],
		// };
		const plannedTask = [...taskForToday, ...taskNextDay, ...taskLate];

		return NextResponse.json(
			{ data: plannedTask, message: 'success' },
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
