import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const category = searchParams.get('category');

		if (!category) {
			return NextResponse.json(
				{ error: 'Category parameter is required' },
				{ status: 400 }
			);
		}

		const { db } = await connectToDatabase();
		const tasks = await db
			.collection('tasks')
			.find({ category })
			.toArray();

		// Группируем задачи по темам
		const groupedTasks = tasks.reduce((acc: any, task) => {
			if (!acc[task.theme]) {
				acc[task.theme] = [];
			}
			acc[task.theme].push(task);
			return acc;
		}, {});

		const result = Object.keys(groupedTasks).map(theme => ({
			theme,
			tasks: groupedTasks[theme],
		}));

		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch tasks' },
			{ status: 500 }
		);
	}
}