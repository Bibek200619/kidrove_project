/**
 * Workshop metadata snapshot stored alongside each enquiry document.
 * Keeping a snapshot at write-time ensures historical records stay accurate
 * even if the live workshop details change later.
 */
const workshopSnapshot = {
  title: 'AI & Robotics Summer Workshop',
  ageGroup: '8-14 Years',
  duration: '4 Weeks',
  mode: 'Online',
  fee: 'INR 2,999',
  startDate: '15 July 2026',
}

module.exports = { workshopSnapshot }
