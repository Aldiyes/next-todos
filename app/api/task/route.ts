import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

// * - - - GET ALL TASK - - - * //
export async function GET(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	try {
		const allTask = await db.task.findMany({
			where: {
				userId: session.user.id,
				completed: false,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		if (!allTask) {
			return NextResponse.json(
				{ data: null, message: 'Task not found' },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{ data: allTask, message: 'Success' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 },
		);
	}
}

// * - - - POST NEW TASK - - - * //
export async function POST(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}
	try {
		const values = await req.json();
		const userExist = await db.user.findFirst({
			where: {
				id: session.user.id,
			},
		});
		if (!userExist)
			return NextResponse.json(
				{ data: null, message: 'User not found' },
				{
					status: 404,
				},
			);

		const createTask = await db.task.create({
			data: {
				userId: session.user.id,
				...values,
			},
		});
		return NextResponse.json(
			{ data: createTask, message: 'Success' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ data: null, message: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
