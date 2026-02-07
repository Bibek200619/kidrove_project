const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URI?.trim()
const dbName = process.env.MONGODB_DB || 'kidrove_workshop'
const collectionName = process.env.MONGODB_COLLECTION || 'enquiries'

let client
let connectionPromise

function isMongoConfigured() {
  return Boolean(uri)
}

function getMongoStorageInfo() {
  return {
    configured: isMongoConfigured(),
    database: dbName,
    collection: collectionName,
  }
}

async function getEnquiryCollection() {
  if (!isMongoConfigured()) {
    return null
  }

  if (!connectionPromise) {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    connectionPromise = client.connect()
  }

  const connectedClient = await connectionPromise
  return connectedClient.db(dbName).collection(collectionName)
}

async function closeMongoConnection() {
  if (!client) {
    return
  }

  await client.close()
  client = undefined
  connectionPromise = undefined
}

module.exports = {
  closeMongoConnection,
  getEnquiryCollection,
  getMongoStorageInfo,
  isMongoConfigured,
}
