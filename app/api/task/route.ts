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

	const alltask = await db.task.findMany({
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
}) as any;

// * - - - PATH A TASK - - - * //
export const PATCH = auth(async (req) => {
	if (!req.auth?.user.id) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	const { taskId, completed } = await req.json();

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
				completed: completed,
			},
		});
		return NextResponse.json(
			{ data: updateTask, message: 'success' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Internal Server Error' },
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
	const { title, planned } = await req.json();
	console.log('[API PLANNED] - ', planned);

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

	const existingTitle = await db.task.findFirst({
		where: {
			title: title,
		},
	});

	if (existingTitle) {
		return NextResponse.json(
			{ data: null, message: 'Title already exists' },
			{ status: 409 },
		);
	}

	try {
		if (planned) {
			const newTaskWithPlanne = await db.task.create({
				data: {
					title,
					userId: req.auth.user.id,
					planned: {
						create: {
							dueDate: new Date(planned),
						},
					},
				},
			});
			return NextResponse.json(
				{ data: newTaskWithPlanne, message: 'Success' },
				{ status: 200 },
			);
		} else {
			const newTaskWithoutPlanne = await db.task.create({
				data: { title, userId: req.auth.user.id },
			});
			return NextResponse.json(
				{ data: newTaskWithoutPlanne, message: 'Success' },
				{ status: 200 },
			);
		}
	} catch (error) {
		console.log('[API/TASK POST] - ', error);
		return NextResponse.json('Internal Server Error', { status: 500 });
	}
}) as any;
