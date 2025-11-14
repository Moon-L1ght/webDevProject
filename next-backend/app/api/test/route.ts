import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
	try {
		const { db } = await connectToDatabase();

		// Проверяем подключение
		const stats = await db.stats();

		return NextResponse.json({
			message: 'MongoDB connected successfully',
			stats
		});
	} catch (error) {
		return NextResponse.json(
			{ error: 'MongoDB connection failed' },
			{ status: 500 }
		);
	}
}