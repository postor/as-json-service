const Base = require('./Base')

class C1 extends Base {
  constructor() {
    super()
    this.value = { value: 'from constructor' }
    this.mapRoutes = {
      myRoute: {
        path: '/my-route',
        handle: (req, res) => {
          res.json({
            ...req.body,
            custom: true
          })
        },
        method: 'post',
      }
    }
  }

  async hello() {
    return {
      message: 'hello world!',
    }
  }
}

module.exports = new C1()