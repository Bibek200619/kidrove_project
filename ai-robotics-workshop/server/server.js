require('dotenv').config({ quiet: true })

const express = require('express')
const cors = require('cors')
const enquiryRoutes = require('./routes/enquiry.routes')

const app = express()
const PORT = process.env.PORT || 5001
const HOST = process.env.HOST || '127.0.0.1'
const configuredCorsOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim())
  : []

function isAllowedOrigin(origin) {
  if (!origin || configuredCorsOrigins.length === 0) {
    return true
  }

  const isConfiguredOrigin = configuredCorsOrigins.includes(origin)
  const isLocalDevOrigin =
    process.env.NODE_ENV !== 'production' &&
    /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)

  return isConfiguredOrigin || isLocalDevOrigin
}

app.use(
  cors({
    origin(origin, callback) {
      callback(null, isAllowedOrigin(origin))
    },
  }),
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'API is running' })
})

app.use('/api', enquiryRoutes)

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`)
})
