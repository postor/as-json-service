const express = require('express')
const RouterHelper = require('./RouterHelper')
const AgentHelper = require('./AgentHelper')

module.exports.serve = (c, config = {}) => {
  const {
    routerOnly = false,
    appOnly = false,
    ip,
    port,
    app,
    routeBase = '/'
  } = config

  const routerHelper = new RouterHelper(c, config)
  const router = routerHelper.getRouter()
  if (routerOnly) {
    return router
  }

  const tapp = app || express()
  tapp.use(routeBase, router)
  if (appOnly) {
    return tapp
  }

  return new Promise((resolve, reject) => {
    tapp.listen(port, ip, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

module.exports.getAgent = (fullFilePath) => {
  const ah = new AgentHelper(fullFilePath)
  return ah.getAgent()
}