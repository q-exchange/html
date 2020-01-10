<!--
 * @Descripttion: 
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 18:58:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-07 14:07:25
 -->
<template>
    <div :class="pageView">
        <!--头部-->
        <Header v-show="headerShow"></Header>
        <!--内容-->
        <div :style="{'min-height':minHeight+'px'}" id="minHeight">
            <router-view v-if="isRouterAlive"></router-view>
        </div>
        <!--底部-->
        <Footer v-show="footerShow"></Footer>
        <!-- <template v-if="!escapeRouter.includes($route.path)">
            
        </template>
        <template v-else>
            <simpleFooter></simpleFooter>
        </template> -->
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Header from "./components/home/Header"
import Footer from "./components/home/Footer"
import simpleFooter from "./components/home/simpleFooter"
import { escapeRouter } from "./staticMap/index"
export default {
    name: "app",
    components: { Header, Footer, simpleFooter },
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            minHeight:0,
            escapeRouter,
            locale: '',
            isRouterAlive: true,
            pageView: "page-view",
            utc: null,
            time: null,
            content: " ",
            topInfo: {
                name: "XX网",
                createTime: "2018-01-10 11:37:27"
            },
            styleTop: 30,
            topPadding: '0 5%',
            headerShow:true,
            footerShow:true
        };
    },
    watch: {
        activeNav: function () {
            switch (this.activeNav) {
                case "nav-exchange":
                    break;
                default:
                    window.document.title = "XX网";
                    break;
            }
        },
        '$i18n.locale'(newVal) {
            this.locale = newVal;
        },
        $route(to, from) {
            console.log(to.path);
            if (to.path === "/") {
                this.pageView = "page-view";
            } else {
                if (to.path.indexOf("exchange") > 0) {
                    this.pageView = "page-view";
                } else {
                    this.pageView = "page-view2";
                }
            }
            this.$nextTick(()=>{
                 this.minHeight = document.documentElement.clientHeight;
            });
            window.scrollTo(0,0);
            // 帮助和公告不需要headr、footer
            // if(to.path=="/helplist" ||  to.path=="/helpdetail" || to.path=="/helpList" || to.path=="/notice" || to.path=="/notice/index"){
            //     this.headerShow=false;
            //     this.footerShow=false;
            // }else{
            //     this.footerShow=true;
            //     this.headerShow=true;
            // }
        },
    },
    computed: {
        activeNav: function () {
            return this.$store.state.activeNav;
        },
        lang() {
        },
        ...mapGetters([
            "isLogin",
            "member",
            "exchangeSkin"
        ]),
    },
    created: function () {
        this.initialize();
    },
    methods: {
        //解决中英文切换数据不刷新的问题
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        },
        initialize() {//vuex 初始化
            this.$store.commit("navigate", "nav-index");
            this.$store.commit("recoveryMember");
            this.$store.commit("initLang");
            this.checkLogin();
        },
        checkLogin() {//检查是否登录
            this.$http.post(this.host + "/uc/check/login", {}).then(response => {
                var result = response.body;
                if (result.code == 0 && result.data == false) {
                    this.$store.commit("setMember", null);
                }
            });
        },
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    mounted(){
        this.minHeight = document.documentElement.clientHeight;
        window.onresize = function(){
            this.minHeight = document.documentElement.clientHeight;
        }
    }
};
</script>
<style lang="less">
@import url("./less/common/light.less");
ul,
li {
    list-style-type: none;
}

@font-face {
    font-family: "Robot";
    src: url("./assets/fonts/Roboto-Regular.ttf");
    font-weight: 700;
}
html,
body {
    height: 100%;
    min-width: 1310px;
    margin: 0;
    padding: 0;
    font-size: 14px;
    background: transparent !important;
    font-family: "Robot", PingFang SC, Hiragino Sans GB, Heiti SC,
        Microsoft YaHei, WenQuanYi Micro Hei, Helvetica, Arial, monospace, serif;
}

.ivu-form-inline .ivu-form-item {
    display: block;
    margin-right: 0;
}


.layout {
    position: absolute;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-ceiling-main {
    height: 50px;
    line-height: 50px;
    margin-left: 128px;
}

.layout-ceiling-main .rr {
    float: right;
}

// .layout-ceiling-main .ivu-menu-vertical .ivu-menu-item,
// .ivu-menu-vertical .ivu-menu-submenu-title {
//      padding: 0;
// }

.layout-ceiling-main .ivu-menu-item {
    font-size: 14px;
}

.layout-ceiling-main a {
    color: #fff;
    display: inline-block;
    line-height: 40px;
    height: 40px;
    text-align: center;
    margin-left: 38px;
    /*padding: 0 15px;*/
}

.header_nav {
    float: left;
}

.ivu-dropdown-rel a {
    width: 100%;
}

.ivu-dropdown-menu {
    width: 100px;
}

.layout-ceiling-main .ivu-select-dropdown {
    background: #ffffff;
    margin-left: 25px;
    .ivu-dropdown-item {
        color: #333;
    }
}

.ivu-select-dropdown a {
    width: 100%;
    text-align: left;
    margin: 0;
}

.ivu-dropdown-item:hover {
    background: #ffffff;
}

.ivu-dropdown-item img {
    width: 14px;
    vertical-align: middle;
}

// .ivu-radio-inner:after {
//     background: #18202a;
// }

/*安全中心*/

.user_center {
    height: 900px;
}

.ivu-menu-item {
    text-align: center;
}

// .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
//     padding-left: 0 !important;
//     padding-right: 0;
//     color: #fff;
//     font-size: 14px;
//     border-right: 0 !important;
// }

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background: #1855fd !important;
}

.rr .ivu-menu-vertical.ivu-menu-light:after {
    width: 0;
}

.layout_menu_right {
    margin-left: 3%;
    background: #18202a;
    color: #fff;
    padding-bottom: 130px;
}

.menu_right_title {
    font-size: 16px;
    line-height: 45px;
    margin: 0 10px;
    padding-left: 20px;
    border-bottom: 1px solid #263142;
}

.category .ivu-radio-group.ivu-radio-group-button {
    width: 100%;
}

.category .ivu-radio-group label {
    font-size: 14px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper {
    background: #28313e;
    color: #979797;
    border: 0;
    padding: 0 25px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper-checked {
    color: #fff;
    background: #2f3d52;
    box-shadow: none;
}

.category .ivu-radio-wrapper span {
    padding-left: 0;
}

.purse_address_left {
    float: left;
    width: 86%;
}

.purse_address p {
    font-size: 10px;
    line-height: 25px;
    color: #979797;
}

.purse_address_left_icon {
    line-height: 40px;
    height: 40px;
    width: 100%;
}

.purse_address_left_icon img {
    vertical-align: middle;
    margin-right: 10px;
}

.purse_address span {
    font-size: 14px;
    float: left;
    color: #fff;
    padding: 0 20px;
    background: #28313e;
    width: 21%;
}

.purse_address_left_icon label {
    float: left;
    width: 72%;
    height: 40px;
    border: 2px solid #28313e;
    padding-left: 20px;
}

#qrcode canvas {
    width: 120px;
}

#qrcode img {
    width: 100%;
}

.ivu-select-item:hover {
    background: #aaa;
}

.ivu-select-item-selected,
.ivu-select-item-selected:hover {
    background: #aaa;
}

.chart_container #chart_updated_time {
    float: left;
}

// 粘住底部布局
// .page-content {
//     min-height: 100%;
//     padding-bottom: 200px;
// }

/*法币交易*/

.ivu-col {
    text-align: center;
}

.page-view {
    position: relative;
}
.changelanguage {
    .ivu-dropdown {
        .ivu-select-dropdown {
            z-index: 901;
        }
    }
}

/*排序小箭头样式重置*/
.ivu-table-sort i.on {
    color: #3399ff;
}
.ivu-table-sort i:hover {
    color: #3399ff;
}
//修改iview样式
.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
    color: not specified;
}
.ivu-menu-opened > * > .ivu-menu-submenu-title-icon {
    color: #fff;
}
.ivu-notice,
.ivu-message {
    top: 20% !important;
}
</style>


<style lang="less">
//最新的样式重置=>登录，注册，忘记密码的特殊input重置
@import url("./my_theme/commen.less");
</style>
<style lang="less">
@import url("./my_theme/iviewReset.less");
</style>


