import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Получить все задачи
export async function GET(request: NextRequest) {
	try {
		const { db } = await connectToDatabase();
		const tasks = await db.collection('tasks').find().toArray();

		return NextResponse.json(tasks);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch tasks' },
			{ status: 500 }
		);
	}y
}

// POST - Создать новую задачу
export async function POST(request: NextRequest) {
	try {
		const taskData = await request.json();
		const { db } = await connectToDatabase();

		const result = await db.collection('tasks').insertOne({
			...taskData,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return NextResponse.json(
			{ ...taskData, _id: result.insertedId },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to create task' },
			{ status: 500 }
		);
	}
}