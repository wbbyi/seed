// homeMethods.ts
import { chooseImage, uploadToCloud } from '@/utils/upload.js';
import { addData, updateData } from '@/utils/db.js';

export function useHomeMethods() {
  async function uploadAndSaveImage(setState) {
    try {
      // 上传图片时不显示 loading
      const imagePath = await chooseImage();
      const cloudUrl = await uploadToCloud(imagePath);
      const now = new Date();
      const name = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const res = await addData('seedHistory', {
        image: cloudUrl,
        name: name,
        createTime: now
      });
      setState({
        imagePath,
        cloudUrl,
        recordId: res.id || res._id
      });
    } catch (err) {
      // 上传失败也不显示 loading
      if (err && err.errMsg && err.errMsg.indexOf('cancel') === -1) {
        uni.showToast({ title: '图片上传失败', icon: 'none' });
      }
      console.error(err);
    }
  }


  // 识别图片并保存识别结果到数据库
  async function identifyAndSaveResult(state, setState) {
    if (!state.cloudUrl) return;
    setState({ loading: true });
    try {
      // const res = await plantApi.identifyPlant(state.cloudUrl);
      // const result = JSON.parse(res.data);
      // 这里用假数据模拟
      const result = {
        name: '玉米',
        rate: 0.98,
        description: '玉米是一种重要的粮食作物。'
      };
      await updateData('seedHistory', { _id: state.recordId }, {
        resultName: result.name,
        resultRate: result.rate,
        resultDes: result.description
      });
      uni.showToast({ title: '识别成功', icon: 'success' });
      // 跳转到识别展示页面，并传递识别结果
      setTimeout(() => {
        uni.navigateTo({
           url: '/pages/identify/identify?data=' + encodeURIComponent(JSON.stringify({
             imageSrc: state.imagePath,   // <--- 新增这一行
             resultName: result.name,
             resultRate: result.rate,
             resultDes: result.description
          }))
         });

        uni.navigateTo({
          url: '/pages/identify/identify?data=' + encodeURIComponent(JSON.stringify({
            resultName: result.name,
            resultRate: result.rate,
            resultDes: result.description
          }))
        });
      }, 500);
    } catch (err) {
      uni.showToast({ title: '识别失败', icon: 'none' });
      console.error(err);
    } finally {
      setState({ loading: false });
    }
  }

  return { uploadAndSaveImage, identifyAndSaveResult };
}