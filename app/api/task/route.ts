import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// * - - - GET ALL TASK - - - * //
export const GET = auth(async (req) => {
	if (!req.auth?.user.id) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	try {
		const alltask = await db.task.findMany({
			where: {
				completed: false,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		if (!alltask) {
			return NextResponse.json(
				{ data: null, message: 'Task not found' },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{ data: alltask, message: 'success' },
			{ status: 200 },
		);
	} catch (error) {
		console.log('[API_TASK - GET] - ', error);
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 },
		);
	}
}) as any;

// * - - - PATCH A TASK - - - * //
export const PATCH = auth(async (req) => {
	if (!req.auth?.user.id) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	const { taskId, ...value } = await req.json();

	try {
		const userExist = await db.task.findFirst({
			where: {
				userId: req.auth.user.id,
			},
		});
		if (!userExist)
			return NextResponse.json(
				{ data: null, message: 'User not found' },
				{
					status: 404,
				},
			);

		const updateTask = await db.task.update({
			where: {
				id: taskId,
				userId: req.auth.user.id,
			},
			data: {
				...value,
			},
		});
		return NextResponse.json(
			{ data: updateTask, message: 'success' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ data: null, message: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}) as any;

// * - - - POST NEW TASK - - - * //
export const POST = auth(async (req) => {
	if (!req.auth?.user.id) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}
	const { planned, ...values } = await req.json();

	const existingUser = await db.user.findFirst({
		where: {
			id: req.auth.user.id,
		},
	});

	if (!existingUser) {
		return NextResponse.json(
			{ data: null, message: 'User not found' },
			{ status: 404 },
		);
	}

	try {
		if (planned) {
			const newTaskWithPlanne = await db.task.create({
				data: {
					userId: req.auth.user.id,
					dueDate: planned,
					...values,
				},
			});
			return NextResponse.json(
				{ data: newTaskWithPlanne, message: 'Success' },
				{ status: 200 },
			);
		} else {
			const newTaskWithoutPlanne = await db.task.create({
				data: { userId: req.auth.user.id, ...values },
			});
			
			return NextResponse.json(
				{ data: newTaskWithoutPlanne, message: 'Success' },
				{ status: 200 },
			);
		}
	} catch (error) {
		console.log('[API_TASK - POST] - ', error);
		return NextResponse.json(
			{ data: null, message: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}) as any;
