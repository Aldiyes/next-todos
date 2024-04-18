import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

// * - - - GET TASK NBY ID - - - * //
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	try {
		const taskExists = await db.task.findUnique({
			where: { id: params.id, userId: session.user.id },
		});
		if (!taskExists) {
			return NextResponse.json(
				{ data: null, message: 'Task does not exist' },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{ data: taskExists, message: 'Success' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 },
		);
	}
}

// * - - - PATCH TASK NBY ID - - - * //
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	try {
		const { taskId, ...value } = await req.json();
		const taskExists = await db.task.findUnique({
			where: {
				id: params.id,
				userId: session.user.id,
			},
		});
		if (!taskExists) {
			return NextResponse.json(
				{ data: null, message: 'Task not found' },
				{ status: 404 },
			);
		}

		const updateTask = await db.task.update({
			where: {
				id: params.id,
				userId: session.user.id,
			},
			data: {
				...value,
			},
		});

		return NextResponse.json(
			{ data: updateTask, message: 'Success' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 },
		);
	}
}

// * - - - DELETE TASK NBY ID - - - * //
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unauthorized' },
			{ status: 401 },
		);
	}

	const taskExists = await db.task.findUnique({
		where: {
			id: params.id,
			userId: session.user.id,
		},
	});
	if (!taskExists) {
		return NextResponse.json(
			{ data: null, message: 'Task does not exist' },
			{ status: 404 },
		);
	}

	await db.task.delete({
		where: {
			id: params.id,
			userId: session.user.id,
		},
	});

	return NextResponse.json({ data: null, message: 'Success' }, { status: 200 });
}
