
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import moment from 'moment';

const store = new Vuex.Store({
  state: {
    loading: false,
    loading_text: "",
    token: {},
    languages: [],
    tags: [],
    offliners: [],
    offliners_defs: {},
    schedule: null,
  },
  mutations: {
    setLoading (state, payload) { // toggle GUI loader
      state.loading = payload.status;
      state.loading_text = payload.text ? payload.text : "";
    },
    saveAuthenticationToken(state, payload) { // record full token data
      state.token = payload;
    },
    clearAuthentication(state) { // remove token data completely
      state.token = {};
    },
    saveLanguages(state, payload) {
      state.languages = payload;
    },
    saveTags(state, payload) {
      state.tags = payload;
    },
    saveOffliners(state, payload) {
      state.offliners = payload;
    },
    saveOfflinersDefs(state, payload) {
      state.offliners_defs = payload;
    },
    saveOfflinerDef(state, payload) {
      state.offliners_defs[payload.name] = payload.def;
    },
    saveSchedule(state, payload) {
      state.schedule = payload;
    },
  },
  actions: {
    setLoading(context, payload) {
      context.commit('setLoading', payload);
    },
    saveAuthenticationToken(context, payload) {
      context.commit('saveAuthenticationToken', payload);
    },
    clearAuthentication(context) {
      context.commit('clearAuthentication');
    },
    setLanguages(context, payload) {
      context.commit('saveLanguages', payload);
    },
    setTags(context, payload) {
      context.commit('saveTags', payload);
    },
    setOffliners(context, payload) {
      context.commit('saveOffliners', payload);
    },
    setOfflinersDefs(context, payload) {
      context.commit('saveOfflinersDefs', payload);
    },
    setOfflinerDef(context, payload) {
      context.commit('saveOfflinerDef', payload);
    },
    setSchedule(context, payload) {
      context.commit('saveSchedule', payload);
    },
    clearSchedule(context) {
      context.commit('saveSchedule', null);
    },
  },
  getters: {
    loadingStatus(state) { return {should_display: state.loading, text: state.loading_text};},
    username(state) { return state.token.username || null },
    access_token(state) { return state.token.access_token || null },
    token_expiry(state) { return moment(state.token.expires_on) || null },
    token_expired(state) { return moment().isAfter(state.token.expires_on) },
    isLoggedIn(state) {
      // TODO: improv.
      try { return Boolean(state.token.username.length); } catch { return false; }
    },
    languages(state) { return state.languages; },
    tags(state) { return state.tags; },
    offliners(state) { return state.offliners; },
    offliners_defs(state) { return state.offliners_defs; },
    offliner_def: (state) => (offliner) => { return state.offliners_defs[offliner]; },
    schedule(state) { return state.schedule; },
  }
})

export default store;