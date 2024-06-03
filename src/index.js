const Koa = require("koa");
const path = require("path");
const route = require("koa-route"); // 路由
const static = require("koa-static"); //
const app = new Koa();
const testApi = require("./router/test.js");
const uploadApi = require("./router/upload.js");
const uploadMultiple = require("./router/uploadMultiple.js");
const { mineComponentRouter } = require("./router/mineComponent.js");
const { moduleAuditApi } = require("./router/moduleAudit");
const { moduleManageApi } = require("./router/moduleManage");
const { setPersionInfo } = require("./router/postTest.js");

// 跨域等配置
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length,token,Authorization,Accept,X-Requested-With"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  ctx.set("Access-Control-Allow-Credentials", "true");

  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(static(path.join(__dirname, "./public")));

// // 注册路由
// ************* router：post操作  *************
app.use(moduleAuditApi.routes());
app.use(moduleManageApi.routes());
app.use(mineComponentRouter.routes());
app.use(uploadApi.routes());
app.use(uploadMultiple.routes());
app.use(setPersionInfo.routes());

// *************  测试接口  *************
app.use(route.get("/", testApi.main));
app.use(route.get("/meinv", testApi.meinv));

app.listen(3033);
