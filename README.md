# as-json-service

create http json api service in one command | 一键启动基于http的json接口服务

## usage | 使用方法

install globally | 全局安装

```
npm i as-json-service -g
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

run command | 运行命令

```
as-json-service --file=test.js
```

test command | 测试命令结果

```
curl http://localhost:3000/say-hi?name=world
```

result | 结果

```
{"message":"hello world"}
```

## micro service | 微服务

usually a project starts from a small one, if you start with micro services, you may wast a lot of time on the framework, if not it may end up grow too large to maintain. so I want build a project witch will easily convert into micro services, so an agent that able to handle it from both network and local module is more convenient, the low level behaver is configed in a file so you can one code and different structures in different enviroment, for example develop with local module and test/publish with network

通常一个项目开始的时候很小，如果你开始就使用微服务，那么你会浪费很多时间在框架搭建上，如果不用微服务，又很可能项目变得太大而无法维护。所以我希望可以构建一个能够轻松转换到微服务模式的项目，那么如果有一个代理能够从本地模块和网络两个途径调用的模块会是非常便利的，底层的行为可以通过一个额外的配置文件来配置，这样你就可以使用一套代码在不同环境上拥有不同的架构了，比如开发的时候使用本地模块，而测试和产线使用网络（微服务架构）

install locally | 本地安装

```
npm i as-json-service --save
```

test2.js where you will need to use logic from test.js | test2.js 会使用到 test.js 的逻辑

```
const { join } = require('path')

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

generate config | 生成配置

```
as-json-service-config --file=test.js --baseUrl=http://localhost:3000
```

serve test.js | 启动test.js的服务

```
as-json-service --file=test.js
```

serve test2.js | 启动test2.js

```
as-json-service --file=test2.js --port=3001
```

test command | 测试test2服务

```
curl http://localhost:3001/say-hi?name=postor
```

result | 结果

```
{"message":"hello world, welcome!"}
```


