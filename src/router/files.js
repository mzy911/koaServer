const fse = require("fs-extra");
const path = require("path");
const MIX_SIZE = 1024 * 1024 * 1024;

async function saveFile({ name, type, size, filePath }) {
  if (size > MIX_SIZE) {
    await fse.remove(filePath);
    return Promise.reject("文件体积过大");
  }
  // 重新命名文件
  const fileName = Date.now() + "." + name;
  // 目的地
  const DIST_FOLDER_PATH = path.join(__dirname, "../public", "uploadFiles");
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName);
  // 移动
  await fse.move(filePath, distFilePath);

  // 返回
  return Promise.resolve({
    url: `http://127.0.0.1:3000/${fileName}`,
  });
}

module.exports = {
  saveFile,
};
