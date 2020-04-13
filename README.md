## 网易云音乐webapp版本
由于自己很是喜欢用网易云音乐听歌，很喜欢这种简约优雅风格的app，所以自己写了一个简易版本的webapp cloudMusic，前前后后大概花费了两周时间完工，虽还有些不足之处，不过还是迫不及待发布上来了

### 技术栈及所用插件
- vue+vueRouter+vuex(核心)
- iscroll(后换成better-scroll，让移动端滑动体验如丝版顺畅)
- vue-lazyload(图片懒加载)
- axios(数据请求)
- sass(功能强大的css预处理语言，高效开发，不断复用)
- ES6：与时俱进的采用ES6语法开发
- CSS3：注意应用了动画
- swpiper(轮播插件)
### 关于后台接口
接口都是借用别人现有写好的[传送门](https://github.com/Binaryify/NeteaseCloudMusicApi)，这让我能专注于前端开发，好好体验一番前后端分离  
  
不过需要注意的是：在使用该接口时最好将该包下载到自己电脑上，本地开启后台服务，避免在线上使用，不然请求次数达到一定时你的线上服务器ip可能会被网易云给关进小黑屋了，就访问不了了  
### 功能介绍
> v1.0 | 2020.4.13
 - 支持主题换肤功能，共有三种主题色，点击头部区域即可切换
 - 网易云(轮播区域，推荐歌单，最新音乐，歌手界面，排行榜单)
 - 搜索(热门搜索，关键字搜索)
 - 播放界面(歌词部分和碟片的相互切换)
 - 歌手、专辑、歌单、排行榜单等的详情展示界面
 - 音乐播放功能(切歌、收藏、播放模式、进度条点击跳转播放并同步对应播放歌词)
 - 播放模式支持单曲循环、随机播放和列表循环
 - 个人中心包含歌曲的`播放历史`和`我的喜欢`，并缓存到localstorage中
 - 歌曲的搜索记录也将被缓存到localstorage中
### webapp效果展示
![较为粗糙的gif动图](https://raw.githubusercontent.com/pumpkinduan/FigureBed/master/img/20200413163459.gif)  
  
说到这里，安利一款免费的将视频做成gif动图的小工具，还可以支持录屏等多种功能[screenToGif](https://www.screentogif.com/)
### 安装运行(事先搭建好node环境)
- 依赖包的安装：npm install(推荐使用cnpm install)
- 启动服务：npm run serve(或yarn serve)
- 发布：npm run build(或yarn run build)
- 代码检查：npm run lint(或yarn run lint)
### 项目结构
```js
├── public           		// 项目不同环境的配置
|   ├── index.html          // 项目入口文件
├── dist               		// 项目build目录,用于部署到服务器的项目代码
├── package.json      		// 项目配置文件
├── src                		// 生产目录
│   ├── api       			// api请求
│   ├── assets              // 图片、字体图标、CSS样式资源
│   ├── components     		// 各种组件
│   ├── plugins             // 封装的插件
│   ├── tool                // 抽离的工具方法
│   ├── views          		// 各个视图
│   ├── vuex           	    // vuex状态管理器
│   ├── App.vue         	// 主页面
│   ├── router.js     		// 路由配置器
│   └── main.js       	    // Webpack 预编译入口
```
### 尚为解决的问题
在该项目中有个比较棘手的麻烦，就是当进入的页面需要加载大量图片的情况下，滚动页面时会有点儿卡卡的   
进入歌手界面时就会体验到，这样的效果实在欠佳，后面将会好好的优化这个地方
### 最后
1. 感谢网易云官方app，给我带来的灵感与开发的动力
2. 感谢[Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi)对接口文档的不断维护与更新，而且文档也十分的详细
欢迎大家提出issue，喜欢的话就来个star吧  
该项目仅供学习输出使用，切勿用于商业用途，如有侵犯第三方版权问题请及时联系我