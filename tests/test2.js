const { join } = require('path')
const { getAgent } = require('../lib/index')

const c1 = getAgent(join(__dirname, 'test1.js'))

class C2 {

  hello(params) {
    return c1.hello(params).then((fromC1) => {
      return {
        fromC1,
        hello: 'from C2',
      }
    }).catch((e) => {
      return {
        errorFromC1: e,
        hello: 'from C2',
      }
    })
  }
}

module.exports = new C2()