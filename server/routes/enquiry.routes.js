const express = require('express')
const { getEnquiryCollection, isMongoConfigured } = require('../db/mongo')
const { isValidIndianPhoneNumber } = require('../utils/phone')
const { workshopSnapshot } = require('../config/workshop')

const router = express.Router()

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
      message: 'Enquiry submitted successfully.',
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
