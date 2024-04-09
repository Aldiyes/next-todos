import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
	try {
		const allTask = await db.task.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});

		if (!allTask) {
			return new NextResponse(JSON.stringify('No task found'), {
				status: 404,
			});
		}
		return new NextResponse(JSON.stringify(allTask), { status: 200 });
	} catch (error) {
		console.log('[GET - API-TASK] - ', error);
		return new NextResponse(JSON.stringify('Internal server error'), {
			status: 500,
		});
	}
}

export async function POST(req: Request) {
	const { title, userId, planned } = await req.json();
	const dueDate = new Date(planned);

	if (planned) {
		await db.task.create({
			data: {
				title,
				userId,
				planned: {
					create: {
						dueDate: dueDate,
					},
				},
			},
		});
	} else {
		await db.task.create({
			data: { title, userId },
		});
	}
}

export async function PATCH(req: Request) {
	try {
		const { userId, taskId, completed } = await req.json();
		const userExist = await db.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!userExist)
			return new NextResponse(JSON.stringify('User not found'), {
				status: 404,
			});

		const updateTask = await db.task.update({
			where: {
				id: taskId,
				userId: userId,
			},
			data: {
				completed: completed,
			},
		});
		return new NextResponse(JSON.stringify(updateTask), { status: 200 });
	} catch (err) {
		console.log('[PATCH_TASK_ID]', err);
		return new NextResponse(JSON.stringify('Internal Server Error'), {
			status: 500,
		});
	}
}
