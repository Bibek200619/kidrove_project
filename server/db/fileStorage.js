const fs = require('fs').promises
const path = require('path')
const { randomUUID } = require('crypto')

const STORAGE_FILE = path.resolve(
  process.env.ENQUIRIES_FILE || path.join(__dirname, '../../enquiries.json'),
)

async function saveEnquiryToFile(enquiry) {
  try {
    let enquiries = []
    try {
      const data = await fs.readFile(STORAGE_FILE, 'utf8')
      const parsedData = JSON.parse(data)
      enquiries = Array.isArray(parsedData) ? parsedData : []
    } catch (err) {
      // File doesn't exist or is empty, start fresh
    }

    const newEnquiry = {
      id: randomUUID(),
      ...enquiry,
    }

    await fs.mkdir(path.dirname(STORAGE_FILE), { recursive: true })
    enquiries.push(newEnquiry)
    await fs.writeFile(STORAGE_FILE, JSON.stringify(enquiries, null, 2))
    return newEnquiry.id
  } catch (error) {
    console.error('Failed to save enquiry to file:', error)
    throw error
  }
}

module.exports = { saveEnquiryToFile, STORAGE_FILE }
