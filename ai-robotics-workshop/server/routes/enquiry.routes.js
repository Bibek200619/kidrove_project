const express = require('express')

const router = express.Router()

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidPhone(phone) {
  const digits = String(phone).replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

router.post('/enquiry', (req, res) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and phone number are required',
    })
  }

  if (!emailPattern.test(String(email).trim())) {
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

  return res.status(200).json({
    success: true,
    message: 'Enquiry submitted successfully',
  })
})

module.exports = router
