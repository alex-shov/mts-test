import Vue from 'vue';
import Vuex from 'vuex';

// we first import the module
import moduleCommon from './moduleCommon';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    moduleCommon,
  },
});
