import { MongoClient } from 'mongodb';

// Connection cache across serverless warm invocations
let client = null;
let clientPromise = null;

export function getMongoClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Missing environment variable: "MONGODB_URI". Set it in your Vercel project settings or .env file.');
  }

  // Reuse the existing connection promise if already established
  if (clientPromise) {
    return clientPromise;
  }

  // In development, use a global variable to preserve the connection
  // across hot reloads (avoids exhausting DB connections during dev)
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, {
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 10000,
        maxPoolSize: 5,
      });
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // Production (Vercel): always create a fresh client per cold start
    client = new MongoClient(uri, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    });
    clientPromise = client.connect();
  }

  return clientPromise;
}

// Legacy compatibility shim — allows `import clientPromise from '@/lib/db'` to still work
const clientPromiseShim = {
  then: (...args) => getMongoClientPromise().then(...args),
  catch: (...args) => getMongoClientPromise().catch(...args),
};

export default clientPromiseShim;

let isIndexed = false;
async function ensureIndexes(db) {
  if (isIndexed) return;
  try {
    await db.collection("streamer").createIndex({ username: 1 }, { unique: true });
    await db.collection("transaction").createIndex({ streamer: 1, time: -1 });
    await db.collection("transaction").createIndex({ time: 1 });
    // pending_donation: fast lookup by streamer username
    await db.collection("pending_donation").createIndex({ username: 1, time: 1 });
    // TTL index: MongoDB auto-deletes pending donations after 7200 seconds (2 hours)
    await db.collection("pending_donation").createIndex(
      { time: 1 },
      { expireAfterSeconds: 7200, name: "pending_donation_ttl" }
    );
    isIndexed = true;
  } catch (err) {
    // Non-fatal: indexes will be created on next boot
    console.warn("MongoDB index creation warning:", err.message);
  }
}

export async function getDb() {
  const conn = await getMongoClientPromise();
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

export async function getPendingDonationCollection() {
  const db = await getDb();
  return db.collection("pending_donation");
}
