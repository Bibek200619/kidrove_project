const fs = require('fs').promises
const path = require('path')

const STORAGE_FILE = path.join(__dirname, '../../enquiries.json')

async function saveEnquiryToFile(enquiry) {
  try {
    let enquiries = []
    try {
      const data = await fs.readFile(STORAGE_FILE, 'utf8')
      enquiries = JSON.parse(data)
    } catch (err) {
      // File doesn't exist or is empty, start fresh
    }

    const newEnquiry = {
      id: Date.now().toString(),
      ...enquiry,
    }

    enquiries.push(newEnquiry)
    await fs.writeFile(STORAGE_FILE, JSON.stringify(enquiries, null, 2))
    return newEnquiry.id
  } catch (error) {
    console.error('Failed to save enquiry to file:', error)
    return null
  }
}

module.exports = { saveEnquiryToFile }
