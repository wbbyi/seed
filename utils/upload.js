/**
 * 选择图片并上传
 * @param {String} src 图片路径
 * @returns {Promise} 包含图片临时路径的Promise
 */
export function chooseAndUpload() {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        resolve(tempFilePaths[0]);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

export function cropImage(src) {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: (res) => {
        uni.cropImage({
          src: res.tempFilePaths[0],
          cropScale: '1:1', // 正方形裁剪
          success: (res) => {
            resolve(res.tempFilePath);
          },
          fail: (err) => {
            reject(err);
          }
        });
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}