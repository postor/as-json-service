const { Router } = require('express')
const decamelize = require('decamelize')
const isFunction = require('lodash.isfunction')
const { urlencoded, json } = require('body-parser')
const getAllKeys = require('./get-keys')

class RouterHelper {
  constructor(c, config = {}) {

    this.c = c
    this.config = config

    this.router = new Router()
    this.router.use(urlencoded({ extended: true }), json())
    const mapRoutes = this.getMapRoutes()

    Object.keys(mapRoutes).map((key) => {
      const { method, path, handle } = mapRoutes[key]
      this.router[method](path, handle)
    })
  }

  getMapRoutes() {
    const {
      mapRoutesKey = 'mapRoutes',
      onlyOwnProperty = false,
    } = this.config

    let mapRoutes = this.c[mapRoutesKey] || {}

    const keys = getAllKeys(this.c, onlyOwnProperty)

    keys.forEach((key) => {
      if (key == mapRoutesKey) {
        return
      }
      if (!mapRoutes[key]) {
        mapRoutes[key] = this.getDefaultRoute(key)
      }
    })
    return mapRoutes
  }

  getDefaultRoute(key) {
    const method = 'get'
    const handle = (req, res) => {
      if (!isFunction(this.c[key])) {
        //case value
        res.json(this.c[key])
        return
      }
      const params = this.getParams(req)
      const result = this.c[key](params)
      if (result.then && isFunction(result.then)) {
        //case async function
        result.then((data) => {
          res.json(data)
        })
        return
      }

      //case sync function
      res.json(result)
    }

    return {
      method,
      path: `/${decamelize(key, '-')}`,
      handle,
    }
  }

  getParams(req) {
    return {
      ...req.query,
      ...req.body || {},
    }
  }

  getRouter() {
    return this.router
  }
}

module.exports = RouterHelper