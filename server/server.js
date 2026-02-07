require('dotenv').config({ quiet: true })

const express = require('express')
const cors = require('cors')
const enquiryRoutes = require('./routes/enquiry.routes')
const { STORAGE_FILE } = require('./db/fileStorage')
const {
  closeMongoConnection,
  getMongoStorageInfo,
  isMongoConfigured,
} = require('./db/mongo')

const app = express()
const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '127.0.0.1'
const configuredCorsOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim())
  : []

function isAllowedOrigin(origin) {
  if (!origin || configuredCorsOrigins.length === 0) {
    return true
  }

  const isConfiguredOrigin = configuredCorsOrigins.includes(origin)
  const isLocalDevOrigin = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)

  return isConfiguredOrigin || isLocalDevOrigin
}

function canUseLocalFileStorage() {
  return (
    process.env.ENABLE_FILE_STORAGE === 'true' ||
    (!process.env.VERCEL && process.env.NODE_ENV !== 'production')
  )
}

app.use(
  cors({
    origin(origin, callback) {
      callback(null, isAllowedOrigin(origin))
    },
  }),
)
app.use(express.json({ limit: '25kb' }))

// Request Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  if (req.method === 'POST' && process.env.NODE_ENV !== 'production') {
    console.log('Body:', JSON.stringify(req.body, null, 2))
  }
  next()
})

app.use((error, _req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      success: false,
      message: 'Request body must be valid JSON',
    })
  }

  return next(error)
})

app.get('/api/health', (_req, res) => {
  const mongo = getMongoStorageInfo()

  res.json({
    success: true,
    message: 'API is running',
    storage: isMongoConfigured()
      ? 'mongodb'
      : canUseLocalFileStorage()
        ? 'local-file'
        : 'unconfigured',
    mongo,
    storageFile: STORAGE_FILE,
  })
})

app.use('/api', enquiryRoutes)

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

app.use((error, _req, res, _next) => {
  console.error('Unhandled server error:', error)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
})

function startServer() {
  const server = app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`)
    if (isMongoConfigured()) {
      console.log('Saving enquiries to MongoDB')
      return
    }

    if (canUseLocalFileStorage()) {
      console.log(`Saving enquiries locally to ${STORAGE_FILE}`)
      return
    }

    console.warn('No persistent storage configured. Set MONGODB_URI.')
  })

  async function shutdown() {
    await closeMongoConnection()
    server.close(() => {
      process.exit(0)
    })
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)

  return server
}

if (require.main === module) {
  startServer()
}

module.exports = app
