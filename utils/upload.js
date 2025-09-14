/**
 * 选择图片并上传
 * @param {String} src 图片路径
 * @returns {Promise} 包含图片临时路径的Promise
 */

// 只选择图片
export function chooseImage() {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 1,
      success: res => resolve(res.tempFilePaths[0]),
      fail: reject
    });
  });
}

// 上传到云存储
export function uploadToCloud(filePath) {
  return new Promise((resolve, reject) => {
    const cloudPath =  Date.now() + '-' + Math.floor(Math.random() * 1000) + '.jpg';
    uniCloud.uploadFile({
      filePath,
      cloudPath,
      success: res => resolve(res.fileID), // 返回云文件ID
      fail: reject
    });
  });
}


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