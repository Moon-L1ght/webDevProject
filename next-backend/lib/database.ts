import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
	throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
	// В режиме разработки используем глобальную переменную, чтобы сохранить подключение
	let globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise?: Promise<MongoClient>;
	};

	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(uri, options);
		globalWithMongo._mongoClientPromise = client.connect();
	}
	clientPromise = globalWithMongo._mongoClientPromise;
} else {
	// В production режиме создаем новое подключение
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export async function connectToDatabase() {
	const client = await clientPromise;
	const db = client.db();
	return { client, db };
}