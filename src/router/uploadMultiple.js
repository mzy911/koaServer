const router = require("koa-router")(); // 注意：不是koa-route
const koaForm = require("formidable-upload-koa");
const path = require("path");
const send = require("koa-send");
const fs = require("fs");
const koaBody = require("koa-body");

const { Hash } = require("crypto");
const { get } = require("http");
const { isExistsFile } = require("../utils/utile");

// 1、检测是否上传完毕（秒传）
router.post(
  "/upload/check/file",
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

// 2、获取上传过的chunk
router.post(
  "/upload/check/chunk",
  koaForm({
    uploadDir: path.join(__dirname, "../public/uploadMultiple/"), // 文件存放的位置
    keepExtensions: true, // 包含扩展名
  }),
  async (ctx, next) => {
    const { hash, name, type, size } = ctx.req.fields;
    const imgName = ctx.req.files.file.path.split("/").slice(-1)[0];
    fs.renameSync(
      path.join(__dirname, `../public/uploadMultiple/${imgName}`),
      path.join(__dirname, `../public/uploadMultiple/${hash}.gif`)
    );
    //修改图片之前的名字
    ctx.body = {
      mag: "lala",
    };
  }
);

// 3、合并chunk
router.post("/upload/merge/chunk", koaBody(), async (ctx, next) => {
  let getData = ctx.request.body;
  const newFilePath = path.join(
    __dirname,
    `../public/uploadMultiple/${getData.name}${getData.suffix}`
  );

  const isExist = await isExistsFile(newFilePath);
  if (!isExist) {
    const fileWriteStream = fs.createWriteStream(newFilePath, {
      flags: "a",
    });
    for (let i = 1; i <= 8; i++) {
      await mergeFiles(
        path.join(
          __dirname,
          `../public/uploadMultiple/4991c75ca2bd820604d72319b93d6c74${i}${getData.suffix}`
        ),
        i
      );
    }
    function mergeFiles(fileName, index) {
      return new Promise((resolve, reject) => {
        var rs = fs.createReadStream(fileName);
        rs.on("data", function (data) {
          fileWriteStream.write(data);
        });
        rs.on("end", function () {
          fs.unlink(fileName, () => {});
          resolve("xx");
          if (index == 8) {
            fileWriteStream.end();
          }
        });
      });
    }
  }

  ctx.body = {
    msg: "合并",
  };
});

module.exports = router;
