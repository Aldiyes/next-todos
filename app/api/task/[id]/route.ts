import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

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
}

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
	const { taskId, userId, ...value } = await req.json();

	const task = await db.task.findUnique({
		where: {
			id: params.id,
			userId: session.user.id,
		},
	});

	if (!task) {
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
		{ data: updateTask, message: 'success' },
		{ status: 200 },
	);
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{
				data: null,
				message: 'Unauthorized',
			},
			{
				status: 401,
			},
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
			{
				data: null,
				message: 'Task does not exist',
			},
			{
				status: 404,
			},
		);
	}

	await db.task.delete({
		where: {
			id: params.id,
			userId: session.user.id,
		},
	});
	return NextResponse.json(
		{
			data: null,
			message: 'Success',
		},
		{
			status: 200,
		},
	);
}
