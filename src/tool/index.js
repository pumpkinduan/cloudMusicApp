export const setLocalStorage = (key, value) => {
  return window.localStorage.setItem(key, JSON.stringify(value));
};
export const getLocalStorage = key =>
  JSON.parse(window.localStorage.getItem(key));

//格式化播放时间
//duration 秒为单位
export const formateTime = duration => {
  //1000
  let minute = Math.floor(duration / 60) + "";
  let second = Math.floor(duration % 60) + "";
  return minute.padStart(2, 0) + ":" + second.padStart(2, 0);
};
// 获取随机索引，索引值在[min,max]范围之间
export const createRandomInclusive = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

// 获取相对于文档的位置，绝对的
export const getElementPosition = ele => {
  let result_X = 0,
    result_Y = 0;
  while (ele.offsetParent) {
    //一直循环到根元素
    let parent = ele.offsetParent;
    let w = (parent.offsetWidth - parent.clientWidth) / 2; //有定位父级的左边框宽度
    let h = (parent.offsetHeight - parent.clientHeight) / 2; //有定位父级的下边框宽度
    result_X += ele.offsetLeft + w; //每循环一次获取一个到有定位我的父级坐标，每次累加
    result_Y += ele.offsetTop + h;
    ele = parent;
  }
  return {
    x: result_X,
    y: result_Y
  };
};
