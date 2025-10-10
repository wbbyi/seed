'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { action, collection, data, where } = event;
  const openid = context.OPENID; // 获取用户唯一id

  const collectionRef = db.collection('demo-image');  //需更改数据表名

  switch (action) {
    case 'add':
      // 添加数据，并附上openid
      return await collectionRef.add({
        ...data,
        openid,
        create_time: Date.now()
      });

    case 'get':
      // 获取该用户的全部数据
      return await collectionRef.where({
        openid
      }).get();

    case 'update':
      // 更新当前用户的指定数据
      return await collectionRef.where({
        openid,
        ...where
      }).update(data);

    case 'delete':
      // 删除指定数据
      return await collectionRef.where({
        openid,
        ...where
      }).remove();

    case 'get_openid':
      // 单独返回openid
      return { openid };

    default:
      return { msg: '未知操作类型' };
  }
};
