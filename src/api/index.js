import server from "./server";
export const getBanner = () => server.get("/banner?type=2");
export const getRemdSongList = () => server.get("/personalized?limit=6");
export const getSongListDetail = id => server.get("/playlist/detail", { id });
export const getNewestSong = () => server.get("/personalized/newsong");
export const getSongDetails = ids => server.get("/song/detail", { ids });
export const getSongLyrics = id => server.get("/lyric", { id });
export const getSongUrl = ids => server.get("/song/url", { id: ids });
export const checkSongUrl = id => server.get('/check/music', {id});
export const getArtists = id => server.get("/artists", { id });
export const getHotSingers = () => {
  return new Promise((resolve, reject) => {
    server.get("/top/artists?offset=0&limit=10").then(
      res => {
        resolve(res.artists);
      },
      err => {
        reject(err);
      }
    );
  });
};
export const getCatSingers = letter => {
  return new Promise((resolve, reject) => {
    server.get("/artist/list?cat=5001&limit=6", { initial: letter }).then(
      res => {
        resolve(res.artists);
      },
      err => {
        reject(err);
      }
    );
  });
};

// 将热门歌手与按照字母分类的歌手的请求全部并发发出，获取到的数据归纳到一起返回出去
export const getAllCatSingers = () => {
  let letters = ["热门"];
  let promises = [getHotSingers()];
  for (let i = 65; i < 91; i++) {
    let letter = String.fromCharCode(i);
    letters.push(letter);
    promises.push(getCatSingers(letter));
  }
  return new Promise((resolve, reject) => {
    server.all(promises).then(
      res => {
        let data = { letters };
        data.results = res;
        resolve(data);
      },
      err => {
        reject(err);
      }
    );
  });
};

// 获取排行榜数据
// 自行分类为 官方榜 推荐榜 全球榜 和更多榜
export const getAllRanks = () => {
  let officalList = {
    title: "官方榜",
    list: [
      {
        idx: 0,
        name: "云音乐新歌榜"
      },
      {
        idx: 1,
        name: "云音乐热歌榜"
      },
      {
        idx: 2,
        name: "网易原创歌曲榜"
      },
      {
        idx: 3,
        name: "云音乐飙升榜"
      }
    ]
  };
  let remdList = {
    title: "推荐榜",
    list: [
      {
        idx: 22,
        name: "云音乐ACG音乐榜"
      },
      {
        idx: 23,
        name: "云音乐说唱榜"
      },
      {
        idx: 24,
        name: "云音乐古典音乐榜"
      },
      {
        idx: 25,
        name: "云音乐电音榜"
      },
      {
        idx: 26,
        name: "抖音排行榜"
      },
      {
        idx: 27,
        name: "新声榜"
      }
    ]
  };
  let globalList = {
    title: "全球榜",
    list: [
      {
        idx: 29,
        name: "英国Q杂志中文版周榜"
      },

      {
        idx: 5,
        name: "UK排行榜周榜"
      },
      {
        idx: 6,
        name: "美国Billboard周榜"
      },
      {
        idx: 8,
        name: "iTunes榜"
      },
      {
        idx: 10,
        name: "日本Oricon周榜"
      },
      {
        idx: 21,
        name: "Beatport全球电子舞曲榜"
      }
    ]
  };
  let otherList = {
    title: "更多榜单",
    list: [
      {
        idx: 7,
        name: "KTV唛榜"
      },
      {
        idx: 9,
        name: "Hit FM Top榜"
      },
      {
        idx: 31,
        name: "云音乐欧美热歌榜"
      },
      {
        idx: 32,
        name: "云音乐欧美新歌榜"
      },
      {
        idx: 30,
        name: "电竞音乐榜"
      },
      {
        idx: 28,
        name: "云音乐韩语榜"
      }
    ]
  };
  let cat = {
    officalList,
    remdList,
    globalList,
    otherList
  }
  return new Promise((resolve, reject) => {
    server.get("/toplist/detail").then(res => {
      let data = res.list;
      data.forEach((item, index) => {
        for (let key in cat) {
          let flag = cat[key].list.find((v, i) => {
            if (item.name === v.name) {
              v.rank = item;
              return true;
            }
          })
          if (flag) break;
        }
      })
      resolve(cat)
    }, err => {
      reject(err)
    })
  });
};

export const getRankDetail = (idx) => server.get('/top/list', {idx})
// 搜索建议
export const getSearchSuggest = (keywords) => server.get('/search/suggest?type=mobile', {keywords})
//搜索列表详情
export const getSearchList = (keywords) => server.get('/search', {keywords})
export const getHotSearch = () => server.get('/search/hot')
