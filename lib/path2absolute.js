const { isAbsolute } = require('path')
const { join } = require('path')

module.exports = (filePath) => {
  if (isAbsolute(filePath)) {
    return filePath
  }
  const cwd = process.cwd()
  return join(cwd, filePath)
}