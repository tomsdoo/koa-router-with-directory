# koa-router-with-directory

`attachDirToRouter()` attaches your directory into koa-router.  
The installations of [koa](https://www.npmjs.com/package/koa) and [koa-router](https://www.npmjs.com/package/koa-router) on your own are pre-requisites of this package.  
See [koa-router-with-directory.netlify.app](https://koa-router-with-directory.netlify.app/) also.

![npm](https://img.shields.io/npm/v/koa-router-with-directory?style=for-the-badge&logo=npm)
![NPM](https://img.shields.io/npm/l/koa-router-with-directory?style=for-the-badge&logo=npm)
![koa](https://img.shields.io/badge/koa.js-222?style=for-the-badge&logo=koa)


![ci](https://img.shields.io/github/actions/workflow/status/tomsdoo/koa-router-with-directory/ci.yml?style=social&logo=github)
![checks](https://img.shields.io/github/check-runs/tomsdoo/koa-router-with-directory/main?style=social&logo=github)
![top language](https://img.shields.io/github/languages/top/tomsdoo/koa-router-with-directory?style=social&logo=typescript)
![Maintenance](https://img.shields.io/maintenance/yes/2025?style=social&logo=github)
![depends on node greater or equal 20](https://img.shields.io/badge/node.js-%3E%3D%2020-lightyellow?style=social&logo=nodedotjs)


## Installation
``` shell
npm install koa-router-with-directory
```

# Usage

call attachDirToRouter before start koa server
``` typescript
import Koa from "koa";
import Router from "koa-router";
import { attachDirToRouter } from "koa-router-with-directory";
import * as path from "path";

const router = new Router();

const app = new Koa();
const port = 8080;

attachDirToRouter(router, path.join(__dirname, "routes/"))
  .then((rrouter) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(port, () => {
      console.log(`listening ${port}`);
    });
  });
```

the project directory should be like below.
``` shell
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
``` typescript
import { Context } ffrom "koa";
export function get(ctx: Context){}
export function post(ctx: Context){}
export function put(ctx: Context){}
export function Delete(ctx: Context){}
```
