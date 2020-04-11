import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
Vue.use(Vuex);

export default new Vuex.Store({
  // 保存全局共享的数据
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});
