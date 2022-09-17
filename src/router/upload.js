const router = require("koa-router")(); // 注意：不是koa-route
const koaForm = require("formidable-upload-koa");
const path = require("path");
const send = require("koa-send");

// 1、图片上传
router.post(
  "/package/item/uploadImg",
  koaForm({
    uploadDir: path.join(__dirname, "../public/image/"), // 文件存放的位置
    keepExtensions: true, // 包含扩展名
    maxFileSize: 1024 * 1024, // 大小为 1m
  }),
  async (ctx, next) => {
    const file = ctx.req.files["file"]; // 在ctx.req.files里获取到上传的文件，['file']是前端input上传文件组件的name属性值
    const { size, path, name, type } = file; // file 里面的参数
    ctx.body = {
      name,
      type,
      size,
      url: `http://127.0.0.1:3000/image/${path.split("/").slice(-1)[0]}`,
    };
  }
);

// 2、上传文件
router.post(
  "/package/item/uploadFile",
  koaForm({
    uploadDir: path.join(__dirname, "../public/file/"), // 文件存放的位置
    keepExtensions: true, // 包含扩展名
    maxFileSize: 1024 * 1024, // 大小为 1m
  }),
  async (ctx, next) => {
    const file = ctx.req.files["file"]; // 在ctx.req.files里获取到上传的文件，['file']是前端input上传文件组件的name属性值
    const { size, path, name, type } = file; // file 里面的参数
    ctx.body = {
      name,
      type,
      size,
      url: `http://127.0.0.1:3000/file/${path.split("/").slice(-1)[0]}`,
    };
  }
);

// 下载
router.get("/download", async (ctx, next) => {
  const fileName = ctx.query.filename; // 文件名
  const realname = ctx.query.realname; // 文件名
  const dir = path.join(__dirname, "../public/file"); // 静态资源目录
  ctx.attachment(realname);
  try {
    await send(ctx, fileName, { root: dir });
  } catch (e) {
    ctx.throw(404, "文件不存在");
  }
});

module.exports = router;
