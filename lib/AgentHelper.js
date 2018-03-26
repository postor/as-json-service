const { existsSync } = require('fs-extra')
const camelCase = require('camelcase')
const request = require('request')
const path2absolute = require('./path2absolute')

const configPath = path2absolute('.class2service.json')
const config = existsSync(configPath) ? require(configPath) : {}

class AgentHelper {
  constructor(filePath) {
    this.fullPath = path2absolute(filePath)
    this.config = config[this.fullPath] || {}
  }

  getAgent() {
    const { remote = false } = this.config
    if (!remote) {
      return require(this.fullPath)
    }

    const {
      baseUrl,
      routes,
      timeout,
    } = this.config

    let agent = {}

    routes.forEach((route) => {
      const { method, path } = route
      const key = camelCase(path.replace(/\//g, ''))
      if (method == 'get') {
        agent[key] = (qs) => new Promise((resolve, reject) => {
          request({
            uri: `${baseUrl}${path}`,
            qs,
            timeout: route.timeout || timeout,
          }, (err, result, body) => {
            if (err) {
              reject(err)
              return
            }
            console.log(body)
            resolve(JSON.parse(body))
          })
        })
      } else {
        agent[key] = (json) => request({
          uri: `${baseUrl}${path}`,
          method: method.toUpperCase(),
          json,
          timeout: route.timeout || timeout,
        }, (err, result, body) => {
          if (err) {
            reject(err)
            return
          }
          resolve(JSON.parse(body))
        })
      }
    })

    return agent
  }
}

module.exports = AgentHelper