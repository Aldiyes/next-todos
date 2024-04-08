import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
	try {
		const allTask = await db.task.findMany();

		if (!allTask) {
			return NextResponse.json('No task found', {
				status: 404,
			});
		}
		return NextResponse.json(allTask, { status: 200 });
	} catch (error) {
		console.log('[GET - API-TASK] - ', error);
		return NextResponse.json('Internal server error', { status: 500 });
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
