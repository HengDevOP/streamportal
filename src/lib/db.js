import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stream';

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
const clientPromise = global._mongoClientPromise;

export default clientPromise;

let isIndexed = false;
async function ensureIndexes(db) {
  if (isIndexed) return;
  try {
    await db.collection("streamer").createIndex({ username: 1 }, { unique: true });
    await db.collection("transaction").createIndex({ streamer: 1, time: -1 });
    await db.collection("transaction").createIndex({ time: 1 });
    isIndexed = true;
    console.log("MongoDB indexes ensured successfully.");
  } catch (err) {
    console.error("Failed to create MongoDB indexes:", err);
  }
}

export async function getDb() {
  const conn = await clientPromise;
  const db = conn.db();
  await ensureIndexes(db);
  return db;
}

export async function getStreamerCollection() {
  const db = await getDb();
  return db.collection("streamer");
}

export async function getTransactionCollection() {
  const db = await getDb();
  return db.collection("transaction");
}
