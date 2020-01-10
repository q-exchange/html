<template>
    <header :style="{background:$route.path!='/'?'#131625':''}">
        <div class="page-content">
            <div class="time_download">
                <div class="navWrapper">
                    <div class="netLogo">
                        <router-link to="/">
                            <!-- <img src="../../assets/images/logo.png" alt=""> -->
                        </router-link>
                    </div>
                    <div class="nav">
                        <router-link to="/exchange">{{$t("header.exchange")}}</router-link>
                        <router-link to="/otc/trade/usdt">{{$t("header.otc")}}</router-link>
                        <!-- <router-link to="/leverindex">{{$t("header.lever")}}</router-link> -->
                        <!-- <router-link to="/Ieo">{{$t('header.asset')}}</router-link> -->
                        <router-link to="/helpList">{{$t('header.help')}}</router-link>
                        <!-- <router-link to="/notice">{{$t("header.service")}}</router-link> -->
                    </div>
                </div>
                <div class="nav-header">
                    <!-- 登录 -->
                    <div class="isLoginWrapper">
                        <div class="login_register isLogin" v-if="isLogin">
                            <!-- <Dropdown @on-click="goBi"> -->
                            <Dropdown>
                                <a href="javascript:void(0)">
                                    <span class="header-img">资产</span>
                                </a>
                                <DropdownMenu slot="list" style="width:150px">
                                    <router-link to="/uc/coin" style="color:#515a6e;">
                                        <DropdownItem>币币账户(提币&充币)</DropdownItem>
                                    </router-link>
                                    <router-link to="/uc/currency" style="color:#515a6e;">
                                        <DropdownItem>法币账户</DropdownItem>
                                    </router-link>
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown>
                                <a href="javascript:void(0)">
                                    <span class="header-img order">订单</span>
                                </a>
                                <DropdownMenu slot="list">
                                    <router-link to="/uc/coinorder" style="color:#515a6e;">
                                        <DropdownItem>币币订单</DropdownItem>
                                    </router-link> 
                                    <router-link to="/uc/order" style="color:#515a6e;">
                                        <DropdownItem>法币订单</DropdownItem>
                                    </router-link>
                                </DropdownMenu>
                            </Dropdown>
                            <div class="personal">
                                <i class="iconfont icon-Personal"></i>
                                <div class="indexPersonalBg">
                                    <img src="../../assets/myImgs/personalCenter.png" alt="">
                                    <ul>
                                        <li><router-link to="/uc/safe">账户安全</router-link></li>
                                        <li><router-link to="/uc/realname">身份认证</router-link></li>
                                        <li><router-link to="/uc/account">法币设置</router-link></li>
                                        <li><router-link to="/uc/myextension">邀请好友</router-link></li>
                                        <li><router-link to="/uc/apiManage">API管理</router-link></li>
                                        <li><router-link to="/uc/record">资产流水</router-link></li>
                                        <li><router-link to="/uc/giveRecord">糖果赠送记录</router-link></li>
                                        <!-- <li><router-link to="/uc/ieoadmin">IEO管理</router-link></li> -->
                                        <li><router-link to="/uc/feeLevel">手续费等级</router-link></li>
                                        <li><router-link to="/uc/bjc">积分管理</router-link></li>
                                        <li @click="logout"><a href="javascript:;">退出</a></li>
                                    </ul>
                                    <span class="mobile">{{member.mobile|elicipse}}</span>
                                    <span class="uid">UID:{{member.id}}</span>
                                    <span class="personMore">
                                        <router-link to="/">了解会员<Icon type="ios-arrow-forward" /></router-link>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- 未登录 -->
                        <div class="login_register" v-else>
                            <router-link to="/login" id="login">{{$t("common.login")}}</router-link>
                            <router-link to="/register" id="register">{{$t("common.register")}}</router-link>
                        </div>
                    </div>
                    <!-- 公告 -->
                    <div class="noticeWrap">
                        <i class="iconfont icon-Notice"></i>
                        <div class="box">
                            <div class="header">
                                <div><i class="iconfont icon-notice colorIcon"></i></div>
                                <span>公告中心</span>
                            </div>
                            <ul>
                                <li v-for="(item,index) in noticeList" :key="index">
                                    <router-link :to="{path: '/notice/index', query: { 'id': item.id }}">{{item.title}}</router-link>
                                </li>
                            </ul>
                            <div class="noticeMore">
                                <router-link to="/notice">查看更多</router-link>
                            </div>
                        </div>
                    </div>
                    <!-- app二维码 -->
                    <div class="rightwrapper" style="display:none;">
                        <poptip placement="bottom" width="270" class="appdownload">
                            <a href="javascript:;">{{$t("header.appdownlaod")}}</a>
                            <div class="api" slot="content">
                                <div class="ios">
                                    <div id="qrcode-ios"></div>
                                    <div class="tips" style="margin-top: 7px">
                                        <img src="../../assets/images/ios.png" alt="">
                                        <span>IOS</span>
                                    </div>
                                </div>
                                <div class="andrio">
                                    <div id="qrcode-and"></div>
                                    <div class="tips" style="margin-top: 7px">
                                        <img src="../../assets/images/andraio.png" alt="">
                                        <span>Android</span>
                                    </div>
                                </div>
                            </div>
                        </poptip>
                    </div>
                    <!--中英文切换-->
                    <div class="changelanguage">
                        <Dropdown @on-click="changelanguage">
                            <a href="javascript:void(0)" class="tipLang">{{lang}}<Icon type="ios-arrow-down" class="arrrow"/></a>
                            <!-- <DropdownMenu slot="list" id="change_language_theme">
                                <DropdownItem v-if="languageValue=='简体中文'" name="en">English</DropdownItem>
                                <DropdownItem v-else name="zh">简体中文</DropdownItem>
                            </DropdownMenu> -->
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import QRCode from 'qrcode2';
import { mapGetters } from "vuex";
import { ANDROIDURL, IOSURL } from "../../staticMap/static"
export default {
    name: "Header",
    data() {
        return {
            noticeList: [],

        }
    },
    watch:{
        "$route"(to,from){
            console.log(to);
        }
    },
    computed: {
        languageValue: function () {
            var curlang = this.$store.getters.lang;
            if (curlang == "English") this.$i18n.locale = "en";
            return curlang;
        },
        ...mapGetters([
            "isLogin",
            "member",
            "lang",
        ]),
    },
    created() {
        this.getNotice();
    },
    methods: {
        getNotice() {
            const params = {
                pageNo: 1,
                pageSize: 4
            }
            this.$http.post(this.host + this.api.uc.announcement, params).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.noticeList = resp.data.content;
                } else {
                    this.$Notice.error({
                        title: this.$t("common.tip"),
                        desc: resp.message
                    });
                }
            });
        },
        changelanguage: function (name) {
            if (name == "en") {
                this.$store.commit("setlang", "English");
            }
            if (name == "zh") {
                this.$store.commit("setlang", "简体中文");
            }
            this.$i18n.locale = name;
        },
        logout() {//退出登录
            this.$http.post(this.host + "/uc/loginout", {}).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.$store.commit("setMember", null);
                    setTimeout(() => {
                        location.href = "/";
                    }, 1500);
                } else {
                    this.$Message.error(resp.message);
                }
            });
        },
    },
    filters: {
        strPo(str) {
            if (str.length > 4) {
                str = str.slice(0, 4) + "···";
            } else {
                str = str;
            }
            return str;
        },
        elicipse(str){
            return str.slice(0,3)+"****"+str.slice(7);
        }
    },
    mounted() {
        new QRCode(document.getElementById("qrcode-and"), {
            text: ANDROIDURL,
            width: 100,
            height: 100,
            borderRadius: "5px",
            colorDark: "#000000",
            colorLight: "#ffffff",
        });
        new QRCode(document.getElementById("qrcode-ios"), {
            text: IOSURL,
            width: 100,
            height: 100,
            borderRadius: "5px",
            colorDark: "#000000",
            colorLight: "#ffffff",
        });
    }
}
</script>

<style lang="less" scoped>
@import url("../../less/header/index.less");
</style>




