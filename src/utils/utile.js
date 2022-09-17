const route = require("koa-route"); // 路由
const fs = require("fs");
const path = require("path");
const { rejects } = require("assert");

// 写入文档
const wirteFile = (path, data) => {
  fs.writeFile(
    path.resolve(path.join(__dirname, `../public/data/${path}`)),
    data,
    "utf-8"
  );
};

// 读取
const readFileSync = (path) => {
  return fs.readFileSync(
    path.join(__dirname, `../public/data/mine-component.json`),
    "utf-8"
  );
};

// 判断某文件是否存在，做对应处理
const isExistsFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.exists(filePath, (exists) => {
      if (exists) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

module.exports = {
  wirteFile,
  readFileSync,
  isExistsFile,
};
