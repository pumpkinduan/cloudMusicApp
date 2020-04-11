import Vue from "vue";
import VueRouter from "vue-router";
// 利用Vue的异步组件，实现组件的按需加载 => 路由懒加载
const Recommend = resolve => {
  import("../views/Recommend.vue").then(module => {
    resolve(module);
  });
};

const SongListDetail = resolve => {
  import("../views/SongListDetail.vue").then(module => {
    resolve(module);
  });
};

const Rank = resolve => {
  import("../views/Rank.vue").then(module => {
    resolve(module);
  });
};

const Singer = resolve => {
  import("../views/Singer.vue").then(module => {
    resolve(module);
  });
};
const Detail = resolve => {
  import("../views/Detail.vue").then(module => {
    resolve(module);
  });
};
const Search = resolve => {
  import("../views/Search.vue").then(module => {
    resolve(module);
  });
};

const Account = resolve => {
  import("../views/Account.vue").then(module => {
    resolve(module);
  });
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: Recommend
  },
  {
    path: "/songListDetail/:id",
    name: "SongListDetail",
    component: SongListDetail
  },
  {
    path: "/account",
    name: "Account",
    component: Account
  },
  {
    path: "/singer",
    name: "Singer",
    component: Singer,
    children: [
      {
        path: "detail/:id",
        name: "Detail",
        component: Detail
      }
    ]
  },

  {
    path: "/rank",
    name: "Rank",
    component: Rank,
    children: [
      {
        path: "detail/:id",
        name: "Detail",
        component: Detail
      }
    ]
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
