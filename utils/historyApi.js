// 假设你有后端接口，也可以用本地存储做演示

const HISTORY_KEY = 'seed_history';

export async function saveHistory(item) {
  let list = uni.getStorageSync(HISTORY_KEY) || [];
  list.unshift(item); // 新记录放前面
  uni.setStorageSync(HISTORY_KEY, list);
  // 如果有后端接口，可以在这里调用API保存
  // await uni.request({ url: '你的后端接口', method: 'POST', data: item });
}

export async function getHistoryList() {
  let list = uni.getStorageSync(HISTORY_KEY) || [];
  // 如果有后端接口，可以在这里调用API获取
  // const res = await uni.request({ url: '你的后端接口', method: 'GET' });
  // return res.data;
  return list;
}