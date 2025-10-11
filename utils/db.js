// 通用 uniCloud 数据库 & 云存储 操作封装

/**
 * 调用云函数 saveHistory
 * @param {String} action 操作类型(add/get/update/delete/get_openid)
 * @param {String} collection 数据集合名
 * @param {Object} data 数据内容
 * @param {Object} where 查询条件
 */
async function callDB(action, collection, data = {}, where = {}) {
  try {
    const res = await uniCloud.callFunction({
      name: 'saveHistory',
      data: { action, collection, data, where }
    });
    return res.result;
  } catch (err) {
    console.error(`❌ 调用云函数出错：${action}`, err);
    throw err;
  }
}

// === 数据库操作函数 ===

// 添加数据
export async function addData(collection, data) {
  return await callDB('add', collection, data);
}

// 获取当前用户数据
export async function getData(collection, where = {}) {
  return await callDB('get', collection, {}, where);
}

// 更新数据
export async function updateData(collection, where, data) {
  return await callDB('update', collection, data, where);
}

// 删除数据
export async function deleteData(collection, where) {
  return await callDB('delete', collection, {}, where);
}

// 获取当前用户 openid
export async function getOpenId(collection) {
  return await callDB('get_openid', collection);
}

/**
 * 上传图片到 uniCloud 云存储
 * @param {String} filePath 本地图片路径
 * @returns {String} fileID 云端文件ID
 */
export async function uploadImageToCloud(filePath) {
  try {
    if (!filePath) throw new Error('❌ 缺少图片路径参数 filePath');

    // 上传到云存储
    const res = await uniCloud.uploadFile({
      filePath,
      cloudPath
    });

    console.log('✅ 图片上传成功:', res.fileID);
    return res.fileID;
  } catch (err) {
    console.error('❌ 图片上传失败:', err);
    uni.showToast({
      title: '上传失败',
      icon: 'none'
    });
    throw err;
  }
}

// === 统一导出 ===
export default {
  addData,
  getData,
  updateData,
  deleteData,
  getOpenId,
  uploadImageToCloud
};
