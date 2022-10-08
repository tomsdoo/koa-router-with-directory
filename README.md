# koa-router-with-directory

`attachDirToRouter()` attaches your directory into koa-router.  
this package requires [koa](https://www.npmjs.com/package/koa) and [koa-router](https://www.npmjs.com/package/koa-router).  
See [koa-router-with-directory.netlify.app](https://koa-router-with-directory.netlify.app/) also.

![npm](https://img.shields.io/npm/v/koa-router-with-directory)
![NPM](https://img.shields.io/npm/l/koa-router-with-directory)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/koa-router-with-directory)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/koa-router-with-directory)
![Maintenance](https://img.shields.io/maintenance/yes/2022)

[![](https://nodei.co/npm/koa-router-with-directory.svg?mini=true)](https://www.npmjs.com/package/koa-router-with-directory)

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
