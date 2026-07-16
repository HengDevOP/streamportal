import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stream';

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDb() {
  const conn = await clientPromise;
  return conn.db();
}

export async function getStreamerCollection() {
  const db = await getDb();
  return db.collection("streamer");
}

export async function getTransactionCollection() {
  const db = await getDb();
  return db.collection("transaction");
}
