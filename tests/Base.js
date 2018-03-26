class Base {
  constructor() {
    this.valueFromBase = { value: 'valueFromBase' }
  }

  async asyncFunction({ value }) {
    return {
      async: true,
      from: 'Base',
      value,
    }
  }
}

module.exports = Base