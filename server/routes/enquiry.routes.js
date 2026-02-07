const express = require('express')
const router = express.Router()
const { getEnquiryCollection, isMongoConfigured } = require('../db/mongo')
const { saveEnquiryToFile } = require('../db/fileStorage')
const { isValidIndianPhoneNumber } = require('../utils/phone')
const { workshopSnapshot } = require('../config/workshop')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function canUseFileStorageFallback() {
  return (
    process.env.ENABLE_FILE_STORAGE === 'true' ||
    (!process.env.VERCEL && process.env.NODE_ENV !== 'production')
  )
}

router.post('/enquiry', async (req, res) => {
  const name = String(req.body?.name ?? '').trim()
  const email = String(req.body?.email ?? '').trim().toLowerCase()
  const phone = String(req.body?.phone ?? '').trim()

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and phone number are required',
    })
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address',
    })
  }

  if (!isValidIndianPhoneNumber(phone)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid Indian phone number',
    })
  }

  const enquiryData = {
    name,
    email,
    phone,
    workshop: workshopSnapshot,
    source: 'workshop-landing-page',
    createdAt: new Date(),
  }

  try {
    let insertedId

    if (isMongoConfigured()) {
      try {
        const collection = await getEnquiryCollection()
        const result = await collection.insertOne(enquiryData)
        insertedId = result.insertedId?.toString()
      } catch (mongoError) {
        console.warn('MongoDB failed, falling back to file storage:', mongoError.message)
      }
    }

    if (!insertedId && canUseFileStorageFallback()) {
      insertedId = await saveEnquiryToFile(enquiryData)
    }

    if (!insertedId) {
      throw new Error('All storage methods failed')
    }

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully.',
      enquiryId: insertedId,
    })
  } catch (error) {
    console.error('Failed to save enquiry:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to save enquiry right now. Please try again later.',
    })
  }
})

module.exports = router
