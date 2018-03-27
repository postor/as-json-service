# as-json-service

create http json service in one command

## usage

install

```
npm i as-json-service
```

test.js

```
module.exports = {
  sayHi: async (params)=>{
    return {
      message: `hello ${params.name}`
    }
  }
}
```

run command

```
as-json-service --file=test.js
```

test command

```
curl http://localhost:3000/say-hi
```


## micro service

I want build a project witch will easily convert into micro services, so an agent that able to handle it from both network and local module is more convenient, the low level behaver is configed in a file so you can develop with local module and test/publish with network


test2.js where you will need to use a module/service

```
// old way
// const c1 = require('./test.js')

// new way
const { getAgent } = require('as-json-service')
const c1 = getAgent(join(__dirname, 'test.js'))

module.exports = {
  sayHi: async (params)=>{
    try {
      const fromC1 = await c1.sayHi(params)
      return {
        message: `${fromC1.message}, welcome!`,
      }  
    }catch(error){
      return {
        error,
      }
    }    
  }
}

```

generate config

```
as-json-service-config --file=test.js --baseUrl=http://localhost:3000
```

serve test.js

```
as-json-service --file=test.js
```

serve test2.js

```
as-json-service --file=test2.js --port=3001
```

test command

```
curl http://localhost:3001/say-hi
```




