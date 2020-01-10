/*
 * @Descripttion: 
 * @version: 
 * @Author: 张志强
 * @Date: 2019-08-16 16:15:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-07 14:11:41
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        member: null,
        activeNav: '',
        lang: '',
    },
    mutations: {
        navigate(state, nav) {
            state.activeNav = nav;
        },
        setMember(state, member) {
            state.member = member;
            localStorage.setItem('MEMBER', JSON.stringify(member));
        },
        recoveryMember(state) {
            state.member = JSON.parse(localStorage.getItem('MEMBER'));
        },
        setlang(state, lang) {
            state.lang = lang;
            localStorage.setItem('LANGUAGE', JSON.stringify(lang));
        },
        initLang(state) {
            if (localStorage.getItem('LANGUAGE') == null) { //如果没有缓存的话，默认是中文显示;
                state.lang = "简体中文";
            } else {
                state.lang = JSON.parse(localStorage.getItem('LANGUAGE'));
            }
        }
    },
    getters: {
        member(state) {
            return state.member;
        },
        isLogin(state) {
            return state.member != null;
        },
        lang(state) {
            if (state.lang == null) {
                return localStorage.getItem("LANGUAGE");
            }
            return state.lang;
        }
    }
});