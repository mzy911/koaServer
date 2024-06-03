const router = require("koa-router")(); // 注意：不是koa-route
const koaBody = require("koa-body");
const koaForm = require("formidable-upload-koa");
const path = require("path");

let personInfo = {};

router.post("/set/persion/info", koaBody(), async (ctx, next) => {
  let body = ctx.request.body;
  let search = ctx.request.search;
  let query = ctx.request.query;

  console.log("body", body);
  console.log("search", search);
  console.log("query", query);
  personInfo = body;
  ctx.body = body;
});

router.get("/get/persion/info", async (ctx, next) => {
  ctx.body = personInfo;
});

router.post(
  "/upload/persion",
  koaForm({
    uploadDir: path.join(__dirname, "../public/image"), // 文件存放的位置
    keepExtensions: true, // 包含扩展名
    maxFileSize: 1024 * 1024 * 100, // 大小为 1m
  }),
  async (ctx, next) => {
    const file = ctx.req.files["file"];
    const { size, name, path } = file;
    // console.log('sizesizesizesize',file[0]);
    ctx.body = {
      size,
      name,
      url: `http://127.0.0.1:3033/image/${path.split("/").slice(-1)[0]}`,
    };
  }
);

exports.setPersionInfo = router;
