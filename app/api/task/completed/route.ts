import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
	try {
		const completedTask = await db.task.findMany({
			where: {
				completed: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		if (!completedTask) {
			return new NextResponse(JSON.stringify('No task found'), {
				status: 404,
			});
		}
		return new NextResponse(JSON.stringify(completedTask), { status: 200 });
	} catch (error) {
		console.log('[GET - API-COMPLETED-TASK] - ', error);
		return new NextResponse(JSON.stringify('Internal server error'), {
			status: 500,
		});
	}
}
