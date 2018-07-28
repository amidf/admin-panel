function convertTime (time) {
  return `${time.split('T')[0]} / ${time.split('T')[1].substring(0, 8)}`
}

module.exports = convertTime
