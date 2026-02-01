require('dotenv').config({ quiet: true })

const express = require('express')
const cors = require('cors')
const enquiryRoutes = require('./routes/enquiry.routes')
const { closeMongoConnection, isMongoConfigured } = require('./db/mongo')

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
  if (req.method === 'POST') {
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
  res.json({
    success: true,
    message: 'API is running',
    mongoConfigured: isMongoConfigured(),
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

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`)
  console.log(
    isMongoConfigured()
      ? 'MongoDB persistence is enabled'
      : 'MongoDB persistence is disabled. Set MONGODB_URI to enable it.',
  )
})

async function shutdown() {
  await closeMongoConnection()
  server.close(() => {
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
