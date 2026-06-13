/**
 * Utility functions for Indian phone number validation and formatting.
 */

/**
 * Normalises a raw phone string to a 12-digit Indian number (91XXXXXXXXXX).
 * Returns an empty string when the input is not a valid Indian number.
 *
 * @param {string} phone
 * @returns {string}
 */
function formatIndianPhoneNumber(phone) {
  const digits = String(phone).replace(/[\s+-]/g, '')

  if (!/^\d+$/.test(digits)) {
    return ''
  }

  if (digits.length === 10) {
    return `91${digits}`
  }

  if (digits.length === 12 && digits.startsWith('91')) {
    return digits
  }

  return ''
}

/**
 * Returns true when the phone number is a valid Indian number.
 *
 * @param {string} phone
 * @returns {boolean}
 */
function isValidIndianPhoneNumber(phone) {
  return Boolean(formatIndianPhoneNumber(phone))
}

module.exports = { formatIndianPhoneNumber, isValidIndianPhoneNumber }
