#! /usr/bin/env node
//$ as-json-service --file=xx.js --ip=0.0.0.0 --port=80

const args = require('args')
const { serve } = require('./index')
const path2absolute = require('./path2absolute')

args
  .option('file', 'file of class to server')
  .option('ip', 'The IP on which the app will be bound to', '0.0.0.0')
  .option('port', 'The port on which the app will be running', 3000);

const flags = args.parse(process.argv)
const filePath = path2absolute(flags.file)
const c = require(filePath)

serve(c, flags).then(() => {
  console.log(`service running on http://${flags.ip}:${flags.port}`)
}).catch((e) => {
  console.log(e)
})
