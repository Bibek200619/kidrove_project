const express = require('express')
const {
  getEnquiryCollection,
  isMongoConfigured,
} = require('../db/mongo')

const router = express.Router()

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const workshopSnapshot = {
  title: 'AI & Robotics Summer Workshop',
  ageGroup: '8-14 Years',
  duration: '4 Weeks',
  mode: 'Online',
  fee: 'INR 2,999',
  startDate: '15 July 2026',
}

function isValidPhone(phone) {
  const digits = String(phone).replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
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

  if (!isValidPhone(phone)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid phone number',
    })
  }

  try {
    let insertedId

    if (isMongoConfigured()) {
      const collection = await getEnquiryCollection()
      const result = await collection.insertOne({
        name,
        email,
        phone,
        workshop: workshopSnapshot,
        source: 'workshop-landing-page',
        createdAt: new Date(),
      })
      insertedId = result.insertedId?.toString()
    }

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      ...(insertedId ? { enquiryId: insertedId } : {}),
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
