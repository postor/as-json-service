//$ as-json-service --file=xx.js --ip=0.0.0.0 --port=80

const { existsSync, writeJSON } = require('fs-extra')
const args = require('args')
const RouterHelper = require('./RouterHelper')
const path2absolute = require('./path2absolute')

const configPath = path2absolute('.as-json-service.json')
let config = existsSync(configPath) ? require(configPath) : {}

args
  .option('file', 'file of class to server')
  .option('baseUrl', 'base url for the service', 'http://localhost:3000');

const flags = args.parse(process.argv)
const filePath = path2absolute(flags.file)
const c = require(filePath)

const helper = new RouterHelper(c)
const tRoutes = helper.getMapRoutes()
const routes = Object.keys(tRoutes).map((k) => {
  const { path, method } = tRoutes[k]
  return { path, method }
})

config[filePath] = {
  baseUrl: flags.baseUrl,
  routes,
  remote: true,
  timeout: 5000,
}


writeJSON(configPath, config).then(() => {
  console.log(`config is saved to ${configPath}`)
}).catch((err) => {
  console.log(err)
})