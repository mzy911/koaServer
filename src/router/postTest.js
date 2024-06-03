const router = require("koa-router")(); // 注意：不是koa-route
const koaBody = require("koa-body");

let personInfo = {};

router.post("/set/persion/info", koaBody(), async (ctx, next) => {
  let getData = ctx.request.body;
  console.log('getData', getData);
  personInfo = getData;
  ctx.body = getData;
});

router.get("/get/persion/info", async (ctx, next) => {
  ctx.body = personInfo;
});

exports.setPersionInfo = router;
