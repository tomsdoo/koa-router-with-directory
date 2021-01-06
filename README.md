# koa-router-with-directory

## Installation
``` sh
npm install koa-router-with-directory
```

# Usage

call attachDirToRouter before start koa server
``` js
const koa = require("koa");
const Router = require("koa-router");
const { attachDirToRouter } = require("koa-router-with-directory");
const path = require("path");

const app = new koa();
const router = new Router();

attachDirToRouter(router, path.join(__dirname, "routes/"))
.then((rrouter) => {

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(port, () => {
    console.log("listeinig");
  });

});
```

the project directory should be like below.
``` sh
project
|- routes
| |- some
| | |_ path
| |   |_ index.js
| |
| |_ another
|   |_ path
|     |_ index.js
|
|_ server.js
```

routed files should be named "index.js" and have one or more methods named get|post|put|delete.
``` js
exports.get = function(){}
exports.post = function(){}
exports.put = function(){}
exports.delete = function(){}
```
