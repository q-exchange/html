<!--
 * @Descripttion: 
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 11:29:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 11:31:39
 -->
<template>
    <div>
        <div id="fullpage">
            <div class="section" id="banner">
                <!-- 轮播 -->
                <div :class="INDEXBANNERSTYLE==2?'bannerWrapper':'bannerWrapperBig'">
                    <template v-if="picList.length>0">
                        <Carousel :autoplay="false" :arrow="showArrow" :autoplay-speed="speed" v-model="valueCal" trigger="hover">
                            <CarouselItem v-for="(itemArr,index) in picList" :key="index">
                                <template v-if="INDEXBANNERSTYLE == 2">
                                    <div class="bannerBox">
                                        <div v-for="(item, index) in itemArr" :key="index">
                                            <!-- <img :src="item.url" style="width:100%;height:120px;border-radius:5px;"> -->
                                            <!-- <img src="https://zhengtuo.oss-cn-qingdao.aliyuncs.com/2019/10/16/c41091cf-1a36-4383-8c8e-59df4f27f3a0.jpg"> -->
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div :style="'background-image: url('+itemArr.url+')'" class="bannerImg"></div>
                                    <!-- <img :src="itemArr.url" alt="" class="test"> -->
                                </template>
                            </CarouselItem>
                        </Carousel>
                    </template>
                    <template v-else>
                        <div class="imgList">
                        </div>
                    </template>
                </div>
            </div>
            <!-- 热门交易对 -->
            <div class="section" id="hot" v-if="hostSymbolList.length != 0">
                <section class="section-market">
                    <div class="market-box" v-for="(item,index) in hostSymbolList" :key="index" @click="toExchange(item.symbol)">
                        <div>
                            <div class="flex">
                                <div>
                                    <span class="pairs">{{symbolZhMap.get(item.symbol.split("/")[0])}}</span>
                                    <span class="pairs">{{item.symbol}}</span>
                                </div>
                                <span :class="{green: item.isGreen}" v-if="item.isGreen">{{item.chg | formateRate}}</span>
                                <span :class="{red: !item.isGreen}" v-if="!item.isGreen">{{item.chg | formateRate}}</span>
                            </div>
                            <div>
                                <span class="price">{{item.close}}</span>
                            </div>
                            <div>
                                <span class="white">≈{{item.cny}}CNY</span>
                            </div>
                            <div style="margin-top:10px;">
                                <span class="volumn">24H量&nbsp;{{item.volume}}</span>
                            </div>
                        </div>
                        <!-- <SvgLine :values="item.trend" :width="width" :height="height" :rose="item.chg.toString()"></SvgLine> -->
                    </div>
                </section>
            </div>
            <!-- 公告 -->
            <div id="pagetips">
                <div class="topnav">
                    <div class="carl">
                        <div class="carsoul">
                            <div v-for="(item,index) in FAQList" class="cal_content1">
                                <!-- 公告每行显示两个 -->
                                <template v-if="ADVERSENUM==2">
                                    <div v-for="(con,j) in item" class="cal_content" @mouseover="stop()" @mouseout="startMove()">
                                        <router-link :to="{path: '/notice/index', query: { 'id': con.id }}">{{strde(con.title)}}</router-link>
                                    </div>
                                </template>
                                <!-- 公告每行显示一个 -->
                                <template v-else-if="ADVERSENUM==1">
                                    <div class="cal_content" @mouseover="stop()" @mouseout="startMove()">
                                        <router-link :to="{path: '/notice/index', query: { 'id': item.id }}">{{strde(item.title)}}</router-link>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="cal_content">
                                        <router-link :to="{path: '/notice/index', query: { 'id': item.id }}">{{item.title}}</router-link>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="more" v-show="ADVERSEMORE">
                            <router-link to="/notice">更多>></router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="feature_wrap">
                <h2>XX全球站，近24小时成交量<b>{{allVolume | threeComma}}</b>美元</h2>
                <p>为全球超过130个国家的数千万用户提供安全、可信赖的数字资产交易及资产管理服务</p>
                <ul class="feature_list can_animate" style="">
                    <li class="feature_safe">
                        <div><img src="../../assets/myImgs/newAbs1.svg" alt="交易量全球前3"></div>
                        <p class="title">交易量全球前3</p>
                        <p>强大的流动性 交易种类齐全</p>
                    </li>
                    <li class="feature_eco">
                        <div><img src="../../assets/myImgs/netAbs2.svg" alt="6年老牌交易所"></div>
                        <p class="title">6年老牌交易所</p>
                        <p>6年数字资产金融服务经验<br>专业分布式架构和防DDOS攻击系统</p>
                    </li>
                    <li class="feature_user">
                        <div><img src="../../assets/myImgs/netAbs3.svg" alt="千万级用户规模"></div>
                        <p class="title">千万级用户规模</p>
                        <p>建立先行赔付机制 设立投资者保护基金</p>
                    </li>
                </ul>
            </div>
            <!--币种列表-->
            <div class="section" id="page2" style="display:none;">
                <div class="page2nav">
                    <ul class="brclearfix">
                        <li v-show="!(index==3&&!isLogin)" v-for="(item,index) in indexBtn" @click="addClass(index)" :class="{'active':index==choseBtn,'ivu-btn-default':index!=choseBtn}" :key="index">{{item.text}}</li>
                    </ul>
                </div>
                <div class="ptjy">
                    <Table v-if="choseBtn==3" :columns="favorColumns" :data="dataIndex" class="tables" :disabled-hover="true" :loading="loading"></Table>
                    <Table v-else :columns="columns" :data="dataIndex" class="tables" :disabled-hover="true" :loading="loading"></Table>
                </div>
            </div>
            <!-- 下载部分 -->
            <div class="section" id="page5">
                <div class="section-main">
                    <ul class="download">
                        <li class="qrcode">{{$t("downLoadAbs.big")}}</li>
                        <li class="description">{{$t("downLoadAbs.small")}}</li>
                    </ul>
                    <div class="phone_image">
                        <ul class="os">
                            <li>
                                <div class="con">
                                    <div class="iconWrapper">
                                        <Icon type="md-download" size="25" color="#357ce1" class="icondownload" />
                                        <Icon type="logo-windows" size="25" color="#357ce1" class="icon" />
                                    </div>
                                    <div>Windows 下载</div>
                                </div>
                                <div id="windows" class="tips">持续开发中～敬请期待！</div>
                            </li>
                            <li>
                                <div class="con">
                                    <div class="iconWrapper">
                                        <Icon type="md-download" size="25" color="#357ce1" class="icondownload" />
                                        <Icon type="logo-apple" size="25" color="#357ce1" class="icon" />
                                    </div>
                                    <div>Mac OS下载</div>
                                </div>
                                <div id="macOs" class="tips">持续开发中～敬请期待！</div>
                            </li>
                            <li>
                                <div class="con">
                                    <div class="iconWrapper">
                                        <Icon type="md-download" size="25" color="#357ce1" class="icondownload" />
                                        <Icon type="logo-apple" size="25" color="#357ce1" class="icon" />
                                    </div>
                                    <div>iPhone 下载</div>
                                </div>
                                <div id="iphone" class="tips"></div>
                            </li>
                            <li>
                                <div class="con">
                                    <div class="iconWrapper">
                                        <Icon type="md-download" size="25" color="#357ce1" class="icondownload" />
                                        <Icon type="logo-android" size="25" color="#357ce1" class="icon" />
                                    </div>
                                    <div>Android 下载</div>
                                </div>
                                <div id="android" class="tips"></div>
                            </li>
                            <li class="downloadAppWrapper">
                                <div style="padding:5px;">
                                    <div id="downloadApp">

                                    </div>
                                </div>

                            </li>
                            <p style="font-size: 12px;text-align: center;font-weight: 600;">IOS & Android 扫码下载</p>
                        </ul>
                        <img src="../../assets/images/phone_img.png" alt="">
                    </div>
                </div>

            </div>
            <!-- 网站功能模块 -->
            <div class="section" id="page4" style="display:none;">
                <ul>
                    <li>
                        <div><img src="../../assets/images/feature_safe.png" alt=""></div>
                        <p class="title">{{$t("sectionPage.ptaqTitle")}}</p>
                        <p>{{$t("sectionPage.leverExchange")}}<br>{{$t("sectionPage.ptaqContent")}}</p>
                    </li>
                    <li>
                        <div><img src="../../assets/images/feature_fast.png" alt=""></div>
                        <p class="title">{{$t("sectionPage.ptslTitle")}}</p>
                        <p>{{$t("sectionPage.ptslContent")}}<br>{{$t("sectionPage.newsTitle")}}</p>
                    </li>
                    <li>
                        <div><img src="../../assets/images/feature_experience.png" alt=""></div>
                        <p class="title">{{$t("sectionPage.part3Title")}}</p>
                        <p>{{$t("sectionPage.part3Content")}}<br>{{$t("sectionPage.part3Content2")}}</p>
                    </li>
                    <li>
                        <div><img src="../../assets/images/serve24.png" alt=""></div>
                        <p class="title">{{$t("sectionPage.part4Title")}}</p>
                        <p>{{$t("sectionPage.part4Content")}}<br>{{$t("sectionPage.part4Content2")}}</p>
                    </li>
                </ul>
            </div>
            <!-- 注册 -->
            <div class="registerWrap" v-if="!isLogin">
                <p>注册XX全球站账号 开启数字货币之旅</p>
                <div>
                    <Input v-model="phoneNumber" placeholder="输入你的手机号" />
                    <Button type="primary" @click="toRegister">注册</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
var moment = require("moment");
import SvgLine from "@components/exchange/SvgLine.vue";
import { mapGetters } from "vuex";
import { ADVERSENUM, INDEXBANNERSTYLE, trendTemp, ADVERSEMORE } from "../../staticMap/static"
import { symbolZhMap } from "../../staticMap/index"
import QRCode from 'qrcode2';
import { ANDROIDURL, IOSURL, phoneRegExp,isSupportWindow,isSupportMac,isSupportIphone,isSupportAndro } from "../../staticMap/static"
const Right = x => ({
    map: f => Right(f(x)),
    fold: (f, g) => g(x)
});
const Left = x => ({
    map: f => Left(x),
    fold: (f, g) => f(x)
})
export default {
    components: { SvgLine },
    inject: ["reload"],
    data() {
        let self = this;
        return {
            phoneNumber: "",
            ADVERSENUM,//这个配置是为了配合显示首页置顶公告每一行要显示的个数;
            INDEXBANNERSTYLE,//这个配置是给轮播图配置的,1代表大图显示，2代表小图放置在大图之上;
            symbolZhMap,
            width: 220,
            height: 50,
            loading: false,
            timer: null,
            pageNo: 1,
            pageSize: 50,
            totalNum: 0,
            CNYRate: null,
            dataIndex: [],
            FAQList: [],
            //当前市场上的交易币种，按交易对分
            coins: {
                _map: [],
                USDT: [],
                BTC: [],
                ETH: [],
                favor: []
            },
            allVolume: 0,
            choseBtn: 0,
            valueCal: 0,
            showArrow: "never",
            speed: 5000,
            symbol: "",
            usdtData: [],
            usdtList: [],
            btcList: [],
            ethList: [],
            picList: [],
            hostSymbolList: []
        };
    },
    created: function () {
        // this.stop();
        this.init();
    },
    filters: {
        formateRate(str) {
            return str > 0 ? "+" + (str * 100).toFixed(2) + "%" : (str * 100).toFixed(2) + "%";
        }
    },
    computed: {
        ...mapGetters(["isLogin", "lang"]),
        indexBtn() {
            const arr = [
                { text: this.$t("service.USDT") },
                { text: this.$t("service.BTC") },
                { text: this.$t("service.ETH") },
                { text: this.$t("service.CUSTOM") }
            ];
            return arr;
        },
        columns() {
            let arr = [
                {
                    title: this.$t("service.favor"),
                    align: "center",
                    key: "collection",
                    width: 60,
                    render: (h, params) => {
                        let flag = this.isLogin;
                        return h("Icon", {
                            props: {
                                color: "#3399ff",
                                size: "18",
                                type: params.row.isFavor ? "ios-star" : "ios-star-outline"
                            },
                            nativeOn: {
                                click: (event) => {
                                    if (this.isLogin) {
                                        event.stopPropagation(); //阻止事件冒泡
                                        if (event.currentTarget.className == "ivu-icon ivu-icon-ios-star") {
                                            // 解除收藏
                                            this.cancelCollect(params.index, params.row);
                                            event.currentTarget.className == "ivu-icon ivu-icon-ios-star-outline";
                                        } else {
                                            // 收藏
                                            this.collect(params.index, params.row);
                                            event.currentTarget.className = "ivu-icon ivu-icon-ios-star";
                                        }
                                    } else {
                                        this.$Message.warning("请先登录");
                                    }
                                }
                            }
                        });
                    }
                },
                {
                    title: this.$t("service.COIN"),
                    align: "center",
                    key: "coin",
                    width: 70,
                    render: (h, params) => {
                        const className = params.row.href + "icon" + " indexicon";
                        return h("div", [
                            h(
                                "span",
                                {
                                    attrs: {
                                        //class: className
                                    }
                                },
                                params.row.memberName
                            ),
                            h("span", {
                                style: {
                                    fontSize: "16px",
                                    fontWeight: 800
                                }
                            }, params.row.coin)
                        ]);
                    }
                },
                {
                    title: this.$t("service.NewPrice"),
                    align: "center",
                    key: "price",
                    minWidth: 120,
                    sortable: true,
                    sortMethod: function (a, b, type) {
                        let a1 = parseFloat(a);
                        let b1 = parseFloat(b);
                        if (type == "asc") {
                            return a1 - b1;
                        } else {
                            return b1 - a1;
                        }
                    },
                    render: (h, params) => {
                        rmb = params.row.cnyPrice || 0;
                        let CNYRate = self.CNYRate || 6.5,
                            rmb = params.row.cnyPrice || 0;
                        const isgreen = parseFloat(params.row.rose) < 0 ? "none" : "inline-block";
                        const nogreen = parseFloat(params.row.rose) < 0 ? "inline-block" : "none";
                        return h("div", [
                            h("span", {}, params.row.price + " /￥" + rmb),
                            h(
                                "Icon",
                                {
                                    props: {
                                        type: "arrow-up-c"
                                    },
                                    style: {
                                        display: isgreen,
                                        fontSize: "16px",
                                        marginLeft: "5px",
                                        verticalAlign: "middle"
                                    },
                                    class: {
                                        green: true
                                    }
                                },
                                "↑"
                            ),
                            h(
                                "Icon",
                                {
                                    props: {
                                        type: "arrow-down-c"
                                    },
                                    style: {
                                        display: nogreen,
                                        fontSize: "16px",
                                        marginLeft: "5px",
                                        verticalAlign: "middle"
                                    },
                                    class: {
                                        red: true
                                    }
                                },
                                "↓"
                            )
                        ]);
                    }
                },
                {
                    title: this.$t("service.Change"),
                    align: "center",
                    key: "rose",
                    minWidth: 70,
                    sortable: true,
                    sortMethod: function (a, b, type) {
                        let a1 = a.replace(/[^\d|.|-]/g, "") - 0;
                        let b1 = b.replace(/[^\d|.|-]/g, "") - 0;
                        if (type == "asc") {
                            return a1 - b1;
                        } else {
                            return b1 - a1;
                        }
                    },
                    render: (h, params) => {
                        const row = params.row;
                        const className = parseFloat(row.rose) < 0 ? "red" : "green";
                        return h(
                            "span",
                            {
                                attrs: {
                                    class: className
                                }
                            },
                            row.rose
                        );
                    }
                },
                {
                    title: this.$t("service.high"),
                    align: "center",
                    key: "high",
                    render: (h, params) => {
                        return h("div", {}, params.row.high);
                    }
                },
                {
                    title: this.$t("service.low"),
                    align: "center",
                    key: "high",
                    render: (h, params) => {
                        return h("div", {}, params.row.low);
                    }
                },
                {
                    title: this.$t("service.ExchangeNum"),
                    align: "center",
                    key: "volume",
                    // minWidth: 110,
                    sortable: true,
                    sortMethod: function (a, b, type) {
                        let a1 = parseFloat(a);
                        let b1 = parseFloat(b);
                        if (type == "asc") {
                            return a1 - b1;
                        } else {
                            return b1 - a1;
                        }
                    }
                },
                {
                    title: this.$t("service.PriceTrend"),
                    align: "center",
                    render: (h, params) => {
                        let valus = null;
                        let len = params.row.trend.length;
                        valus = len > 0 ? params.row.trend : [...trendTemp];
                        return h(SvgLine, {
                            props: {
                                values: valus,
                                rose: params.row.rose,
                                width: 100,
                                height: 40,
                                background: parseFloat(params.row.rose) < 0 ? "red" : "green"
                            }
                        });
                    }
                },
                {
                    title: this.$t("service.Exchange"),
                    align: "center",
                    key: "buyBtn",
                    width: 60,
                    // minWidth: 60,
                    render: function (h, params) {
                        return h("div", [
                            h("img", {
                                attrs: {
                                    src: require("../../assets/images/to_del.png")
                                },
                                style: {
                                    width: "18px",
                                    cursor: "pointer",
                                    marginLeft: "10px"
                                },
                                on: {
                                    click: () => {
                                        this.$router.push("/exchange/" + params.row.href);
                                    }
                                }
                            })
                        ]);
                    }
                }
            ];
            return arr;
        },
        favorColumns() {
            let arr = [
                {
                    title: this.$t("service.favor"),
                    align: "center",
                    key: "collection",
                    width: 60,
                    render: (h, params) => {
                        let flag = this.isLogin;
                        return h("Icon", {
                            props: {
                                color: "#3399ff",
                                size: "18",
                                type: params.row.isFavor
                                    ? "ios-star"
                                    : "ios-star-outline"
                            },
                            nativeOn: {
                                click: () => {
                                    if (this.isLogin) {
                                        event.stopPropagation(); //阻止事件冒泡
                                        if (event.currentTarget.className == "ivu-icon ivu-icon-ios-star") {
                                            // 解除收藏
                                            this.cancelCollect(params.index, params.row);
                                            event.currentTarget.className == "ivu-icon ivu-icon-ios-star-outline";
                                        } else {
                                            // 收藏
                                            this.collect(params.index, params.row);
                                            event.currentTarget.className = "ivu-icon ivu-icon-ios-star";
                                        }
                                    } else {
                                        this.$Message.warning("请先登录");
                                    }
                                }
                            }
                        });
                    }
                },
                {
                    title: this.$t("service.symbol"),
                    align: "center",
                    width: 70,
                    key: "symbol"
                },
                {
                    title: this.$t("service.NewPrice"),
                    align: "center",
                    key: "price",
                    minWidth: 120,
                    sortable: true,
                    sortMethod: function (a, b, type) {
                        let a1 = parseFloat(a);
                        let b1 = parseFloat(b);
                        if (type == "asc") {
                            return a1 - b1;
                        } else {
                            return b1 - a1;
                        }
                    },
                    render: (h, params) => {
                        // var rmb = self.round(self.mul(params.row.price, 6.5), 2);
                        // if (self.CNYRate != null)
                        //   rmb = self.round(self.mul(params.row.price, self.CNYRate), 2);
                        let CNYRate = this.CNYRate || 6.5,
                            // rmb = self.round(self.mul(params.row.usdRate, CNYRate), 2);
                            rmb = params.row.cnyPrice || 0;
                        const isgreen = parseFloat(params.row.rose) < 0 ? "none" : "inline-block";
                        const nogreen = parseFloat(params.row.rose) < 0 ? "inline-block" : "none";
                        return h("div", [
                            h("span", {}, params.row.price + " /￥" + rmb),
                            h(
                                "Icon",
                                {
                                    props: {
                                        type: "arrow-up-c"
                                    },
                                    style: {
                                        display: isgreen,
                                        fontSize: "16px",
                                        marginLeft: "5px",
                                        verticalAlign: "middle"
                                    },
                                    class: {
                                        green: true
                                    }
                                },
                                "↑"
                            ),
                            h(
                                "Icon",
                                {
                                    props: {
                                        type: "arrow-down-c"
                                    },
                                    style: {
                                        display: nogreen,
                                        fontSize: "16px",
                                        marginLeft: "5px",
                                        verticalAlign: "middle"
                                    },
                                    class: {
                                        red: true
                                    }
                                },
                                "↓"
                            )
                        ]);
                    }
                },
                {
                    title: this.$t("service.Change"),
                    align: "center",
                    key: "rose",
                    minWidth: 70,
                    sortable: true,
                    sortMethod: function (a, b, type) {
                        let a1 = a.replace(/[^\d|.|-]/g, "") - 0;
                        let b1 = b.replace(/[^\d|.|-]/g, "") - 0;
                        if (type == "asc") {
                            return a1 - b1;
                        } else {
                            return b1 - a1;
                        }
                    },
                    render: (h, params) => {
                        const row = params.row;
                        const className = parseFloat(row.rose) < 0 ? "red" : "green";
                        return h(
                            "span",
                            {
                                attrs: {
                                    class: className
                                }
                            },
                            row.rose
                        );
                    }
                },
                {
                    title: this.$t("service.high"),
                    align: "center",
                    key: "high",
                    render: (h, params) => {
                        return h("div", {}, params.row.high);
                    }
                },
                {
                    title: this.$t("service.low"),
                    align: "center",
                    key: "high",
                    render: (h, params) => {
                        return h("div", {}, params.row.low);
                    }
                },
                {
                    title: this.$t("service.ExchangeNum"),
                    align: "center",
                    key: "volume",
                    // width: 110,
                    sortable: true,
                    sortMethod: function (a, b, type) {
                        let a1 = parseFloat(a);
                        let b1 = parseFloat(b);
                        if (type == "asc") {
                            return a1 - b1;
                        } else {
                            return b1 - a1;
                        }
                    }
                },
                // {
                //   title: self.$t("service.OpenPrice"),
                //   align: "center",
                //   key: "open",
                //   width: 150,
                //   sortable: true,
                //   sortMethod: function(a, b, type) {
                //     let a1 = parseFloat(a);
                //     let b1 = parseFloat(b);
                //     if (type == "asc") {
                //       return a1 - b1;
                //     } else {
                //       return b1 - a1;
                //     }
                //   }
                // },

                {
                    title: this.$t("service.PriceTrend"),
                    align: "center",
                    render: (h, params) => {
                        let valus = null;
                        let len = params.row.trend.length;
                        valus = len > 0 ? params.row.trend : [...trendTemp];
                        return h(SvgLine, {
                            props: {
                                values: valus,
                                rose: params.row.rose,
                                width: 100,
                                height: 40
                            }
                        });
                    }
                },
                {
                    title: this.$t("service.Exchange"),
                    // align: "center",
                    key: "buyBtn",
                    width: 60,
                    render: (h, params) => {
                        return h("div", [
                            h("img", {
                                attrs: {
                                    src: require("../../assets/images/to_del.png")
                                },
                                style: {
                                    width: "18px",
                                    cursor: "pointer",
                                    marginLeft: "10px"
                                },
                                on: {
                                    click: () => {
                                        this.$router.push("/exchange/" + params.row.href);
                                    }
                                }
                            })
                        ]);
                    }
                }
            ];
            return arr;
        }
    },
    watch: {
        lang: function (newVal) {
        }
    },
    mounted: function () {
        new QRCode(document.getElementById("downloadApp"), {
            text: ANDROIDURL,
            width: 140,
            height: 140,
            colorDark: "#000000",
            colorLight: "#ffffff",
        });
        new QRCode(document.getElementById("iphone"), {
            text: IOSURL,
            width: 90,
            height: 90,
            colorDark: "#000000",
            colorLight: "#ffffff",
        });
        new QRCode(document.getElementById("android"), {
            text: ANDROIDURL,
            width: 90,
            height: 90,
            colorDark: "#000000",
            colorLight: "#ffffff",
        });
        const self = this;
        window.addEventListener("scroll", self.handleScroll, false);
        this.getCNYRate();
        this.getSymbol();
        this.getHotSymbol();
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll, false);
    },
    methods: {
        handleScroll(e) {
            // console.log(document.documentElement.scrollTop);
            setTimeout(() => {
                let height = document.documentElement.clientHeight + document.documentElement.scrollTop;
                let element = document.getElementsByClassName("feature_list")[0];
                let elementScroll = element.offsetTop;
                if (height > elementScroll) {
                    element.style.transform = "translateY(0px)";
                }
                // let element1 = document.getElementsByClassName("phone_image")[0].getElementsByTagName("img")[1];
                // let element1Sroll = element1.offsetTop;
                // if (height > element1Sroll) {
                //     element1.style.transform = "translateY(0px)";
                //     window.removeEventListener("scroll", this.handleScroll, false)
                // }
            }, 300)
            // console.log(document.getElementsByClassName("feature_list")[0].offsetTop)
        },
        toRegister() {
            if (phoneRegExp.test(this.phoneNumber)) {
                this.$router.push({
                    path: "/register",
                    query: {
                        phone: this.phoneNumber
                    }
                })
            } else {
                this.$router.push({
                    path: "/register",
                    query: {
                        phone: ""
                    }
                })
            }
        },
        toExchange(data) {
            let baseCoin = data.split("/")[1];
            let coin = data.split("/")[0];
            this.$router.push(`/exchange/${coin}_${baseCoin}`);
        },
        /**
         * 切割大数组成小数组
         */
        splitArray(array, num = 4) {
            let index = 0;
            let newArray = [];
            while (index < array.length) {
                newArray.push(array.slice(index, index += num));
            }
            return newArray;
        },
        /*
         * 获取热门推荐的交易对
        */
        getHotSymbol() {
            this.$http.get(this.host + '/market/overview').then(res => {
                const resp = res.body;
                const list = resp.recommend.map(ele => ({
                    symbol: ele.symbol,
                    chg: ele.chg,
                    isGreen: ele.chg > 0 ? true : false,
                    close: ele.close,
                    cny: ele.cnyPrice || 0,
                    trend: ele.trend.length > 0 ? ele.trend : [...trendTemp],
                    volume: ele.volume
                }))
                this.hostSymbolList = list;
            })
        },
        strde(str) {
            str = str.trim();
            return str.length > 30 ? str.slice(0, 30) + "..." : str;
        },
        noticedeail(id) {
            var path = { path: "/notice/index", query: { id: id } };
            this.$router.push(path);
        },
        titleLang(str) {
            const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
            if (reg.test(str)) {
                return "简体中文";
            } else {
                return "English";
            }
        },
        init() {
            this.loadPicData();//获取轮播图
            this.addClass(0);
            this.loadDataPage(this.pageNo);//获取公告
            this.getVolume();
        },
        getVolume() {
            return this.$http.get(this.host + "/market/all/volume").then(res => {
                console.log(res);
                if (res.body.code == 0) {
                    this.allVolume = Number(res.body.data).toFixed(4);
                }
            })
        },
        stop: function () {
            clearInterval(this.timer);
        },
        getStyle(obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, false)[attr];
            }
        },
        move() {
            clearInterval(this.timer);
            var self = this;
            this.cal = document.getElementsByClassName("carsoul")[0];
            this.list = this.cal.getElementsByClassName("cal_content1");
            let l = this.list[0].cloneNode(true);
            this.cal.appendChild(l);
            this.startMove();
        },
        startMove() {
            clearInterval(this.timer);
            var self = this;
            let len = this.list.length;
            let maxT = 40 * len;
            this.timer = setInterval(() => {
                let t = parseInt(this.getStyle(this.cal, "top"));
                t -= 40;
                if (t <= -maxT) {
                    t = 0;
                    $(".carsoul").animate({ top: "0px" }, 0);
                }
                let p = t + "px";
                $(".carsoul").animate({ top: p });
            }, 3000);
        },
        /***
         * 获取公告
         */
        loadDataPage(pageIndex) {
            var param = {};
            param["pageNo"] = pageIndex;
            param["pageSize"] = this.pageSize;
            this.$http.post(this.host + this.api.uc.announcement, param).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    if (resp.data.content.length == 0) return;
                    let FAQList = resp.data.content;
                    if (ADVERSENUM == 2) {//去读取配置文件查看一行显示2个
                        let len = FAQList.length;
                        let n = 2; //假设每行显示2个
                        let lineNum = len % 2 === 0 ? len / 2 : Math.floor(len / 2 + 1);
                        let res = [];
                        for (let i = 0; i < lineNum; i++) {
                            let temp = FAQList.slice(i * n, i * n + n);
                            res.push(temp);
                        }
                        this.FAQList = res;
                    } else if (ADVERSENUM == 1) {//不经过处理一行只显示一个
                        this.FAQList = FAQList;
                    } else {
                        this.FAQList = FAQList;
                    }
                    this.totalNum = resp.data.totalElements;
                    this.$nextTick(() => {
                        // this.move();
                    });
                } else {
                    this.$Notice.error({
                        title: this.$t("common.tip"),
                        desc: resp.message
                    });
                }
            });
        },
        /***
         * 获取到usdt对人民币的实时汇率
         */
        getCNYRate() {
            this.$http.post(this.host + "/market/exchange-rate/usd-cny").then(response => {
                var resp = response.body;
                this.CNYRate = resp.data;
            });
        },
        donwload(type) {
            const title = this.$t("common.tip");
            const content = "<p>" + this.$t("common.expect") + "</p>";
            this.$Modal.info({
                title: title,
                content: content,
                closable: true
            });
        },
        loadPicData() {
            let param = {};
            param["sysAdvertiseLocation"] = 1;
            this.$http.post(this.host + "/uc/ancillary/system/advertise", param)
                .then(response => {
                    var result = response.body;
                    if (result.code == 0 && result.data.length > 0) {
                        const picList = result.data;
                        setTimeout(() => {
                            if (INDEXBANNERSTYLE == 2) {
                                this.picList = this.splitArray(picList);
                            } else if (INDEXBANNERSTYLE == 1) {
                                this.picList = picList;
                            }
                        }, 1000)
                    }
                });
        },
        getCoin(symbol) {
            return this.coins._map[symbol];
        },
        startWebsock() {
            var stompClient = null;
            var that = this;
            var socket = new SockJS(that.host + that.api.market.ws);
            stompClient = Stomp.over(socket);
            stompClient.debug = false;
            stompClient.connect({}, (frame) => {
                //订阅价格变化消息
                stompClient.subscribe("/topic/market/thumb", (msg) => {
                    var resp = JSON.parse(msg.body);
                    var coin = that.getCoin(resp.symbol);
                    if (coin != null) {
                        // coin.price = resp.close.toFixed(2);
                        coin.price = resp.close;
                        coin.rose =
                            resp.chg > 0
                                ? "+" + (resp.chg * 100).toFixed(2) + "%"
                                : (resp.chg * 100).toFixed(2) + "%";
                        // coin.close = resp.close.toFixed(2);
                        // coin.high = resp.high.toFixed(2);
                        // coin.low = resp.low.toFixed(2);
                        coin.cnyPrice = resp.cnyPrice;
                        coin.close = resp.close;
                        coin.high = resp.high;
                        coin.low = resp.low;
                        coin.turnover = parseInt(resp.volume);
                    }
                    const list = this.hostSymbolList.filter(ele => ele.symbol == resp.symbol);
                    if (list.length > 0) {
                        this.hostSymbolList.forEach((ele, index) => {
                            if (ele.symbol == resp.symbol) {
                                this.hostSymbolList.splice(index, 1, {
                                    symbol: resp.symbol,
                                    chg: resp.chg,
                                    isGreen: resp.chg > 0 ? true : false,
                                    close: resp.close,
                                    // cny:  "≈"+((resp.baseUsdRate*ele.close*this.CNYRate).toFixed(2)),
                                    cny: resp.cnyPrice || 0,
                                    volume: resp.volume,
                                    trend: resp.trend || [...trendTemp]
                                });
                            }
                        });
                    }
                });
            });
        },
        round(v, e) {
            var t = 1;
            for (; e > 0; t *= 10, e--);
            for (; e < 0; t /= 10, e++);
            return Math.round(v * t) / t;
        },
        mul(a, b) {
            if (b != null) {
                var c = 0,
                    d = a.toString(),
                    e = b.toString();
            } else {
                var c = 0,
                    d = a,
                    e = b
            }
            try {
                c += d.split(".")[1].length;
            } catch (f) { }
            try {
                c += e.split(".")[1].length;
            } catch (f) { }
            return (
                Number(d.replace(".", "")) *
                Number(e.replace(".", "")) /
                Math.pow(10, c)
            );
        },
        addClass(index) {
            this.choseBtn = index;
            if (index == 0) {
                this.dataIndex = this.coins.USDT;
            } else if (index == 1) {
                this.dataIndex = this.coins.BTC;
            } else if (index == 2) {
                this.dataIndex = this.coins.ETH;
            } else if (index == 3) {
                this.dataIndex = this.coins.favor;

                // if (this.isLogin) {
                //   this.dataIndex = this.coins.favor;
                // } else {
                //   this.$router.push("/login");
                // }
            }
        },
        getSymbol() {
            this.loading = true;
            this.$http.post(this.host + this.api.market.thumbTrend, {}).then(response => {
                var resp = response.body;
                for (var i = 0; i < resp.length; i++) {
                    var coin = resp[i];
                    coin.price = resp[i].close;
                    coin.rose = resp[i].chg > 0 ? "+" + (resp[i].chg * 100).toFixed(2) + "%" : (resp[i].chg * 100).toFixed(2) + "%";
                    coin.coin = resp[i].symbol.split("/")[0];
                    coin.base = resp[i].symbol.split("/")[1];
                    coin.cnyPrice = resp[i].cnyPrice || 0,
                        coin.href = (coin.coin + "_" + coin.base).toLowerCase();
                    coin.isFavor = false;
                    this.coins._map[coin.symbol] = coin;
                    this.coins[coin.base].push(coin);

                };
                if (this.isLogin) {
                    this.getFavor();
                }
                this.startWebsock();
                this.loading = false;
            });
        },
        // getFavor() {
        //   //查询自选
        //   this.$http
        //     .post(this.host + this.api.exchange.favorFind, {})
        //     .then(response => {
        //       var resp = response.body;
        //       for (var i = 0; i < resp.length; i++) {
        //         var coin = this.getCoin(resp[i].symbol);
        //         this.coins.favor.push(coin);
        //       }
        //     });
        // },
        getFavor() {
            //查询自选(收藏)
            this.$http.post(this.host + this.api.exchange.favorFind, {}).then(response => {
                var resp = response.body;
                this.coins.favor = [];
                for (var i = 0; i < resp.length; i++) {
                    var coin = this.getCoin(resp[i].symbol);
                    if (coin != null) {
                        coin.isFavor = true;
                        this.coins.favor.push(coin);
                    }
                }
            });
        },
        collect(index, row) {
            if (!this.isLogin) {
                this.$Message.info(this.$t("common.logintip"));
                return;
            }
            var params = {};
            params["symbol"] = row.symbol;
            this.$http
                .post(this.host + this.api.exchange.favorAdd, params)
                .then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.info(this.$t("exchange.do_favorite"));
                        this.getCoin(row.symbol).isFavor = true;
                        row.isFavor = true;
                        this.coins.favor.push(row);
                    }
                });
        },
        cancelCollect(index, row) {
            if (!this.isLogin) {
                this.$Message.info(this.$t("common.logintip"));
                return;
            }
            var params = {};
            params["symbol"] = row.symbol;
            this.$http.post(this.host + this.api.exchange.favorDelete, params).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.info(this.$t("exchange.cancel_favorite"));
                    this.getCoin(row.symbol).isFavor = false;
                    for (var i = 0; i < this.coins.favor.length; i++) {
                        var favorCoin = this.coins.favor[i];
                        if (favorCoin.symbol == row.symbol) {
                            this.coins.favor.splice(i, 1);
                            break;
                        }
                    }
                }
            });
        },
    }
};
</script>
<style scoped lang="less" >
@import url("../../less/index/light.less");
//各种交易对的样式
.flex-mixin {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
//首页背景色
#fullpage {
    min-width: 100%;
    // background: @theme;
}
#banner {
    overflow: hidden;
    height: 540px;
    position: relative;
    .bannerWrapper {
        position: absolute;
        bottom: 0;
        left: 18.5%;
        right: 18.5%;
        top: 170px;
        .bannerBox {
            .flex-mixin;
            justify-content: flex-start;
            > div {
                width: 23%;
                margin-right: 3.333%;
            }
        }
    }
    .bannerWrapperBig {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        .ivu-carousel {
            height: 100%;
            /deep/.ivu-carousel-list {
                height: 100%;
                > div {
                    height: 100%;
                }
            }
            .ivu-carousel-list .ivu-carousel-item {
                height: 100% !important;
                .bannerImg {
                    height: 100%;
                    background-repeat: no-repeat;
                    background-position: 50%;
                    background-size: cover;
                }
                // img {
                //     width: 100%;
                //     height: 540px;
                // }
            }
        }
        .imgList {
            height: 100%;
            background-image: url("../../assets/myImgs/bannerNoData.jpg");
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: cover;
        }
    }
}
@media screen and(max-width: 1560px) {
    #banner {
        width: 100%;
        height: 400px;
        .bannerWrapperBig {
            .ivu-carousel {
                .ivu-carousel-list .ivu-carousel-item {
                    .bannerImg {
                        background-size: auto 130%;
                        height: 100%;
                    }
                }
            }
        }
        .imgList {
            height: 100%;
            background-image: url("../../assets/myImgs/bannerNoData.jpg");
            background-repeat: no-repeat;
            background-size: auto 130%;
        }
    }
}
#hot {
    background-color: @hotSymbolBG;
    .section-market {
        .flex-mixin;
        justify-content: center;
        border-top: 1px solid hsla(0, 0%, 100%, 0.15);
        .market-box {
            width: 20%;
            height: 120px;
            background: #1c2435;
            padding: 15px 0 15px 10px;
            overflow: hidden;
            cursor: pointer;
            &:last-child {
                margin-right: 0;
            }
            &:hover {
                background-color: #0e1935;
            }
            > div {
                border-right: 1px solid hsla(0, 0%, 100%, 0.15);
                padding-right: 10px;
                line-height: 1.4;
                color: #b0b8db;
                font-weight: 600;
                .pairs {
                    font-size: 14px;
                }
                span.green {
                    color: @lowPrice;
                    font-size: 16px;
                }
                span.price {
                    font-size: 20px;
                }
                span.red {
                    color: @hightPrice;
                    font-size: 16px;
                }
                span.volumn {
                    font-size: 12px;
                    color: #61698a;
                }
                .white {
                    font-size: 12px;
                    color: #b0b8db;
                }
            }
            .flex {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
    /*> div {*/
    /*    width: 20%;*/
    /*}*/
}
#pagetips {
    @advHeight: 52px;
    background: #f6f9fc;
    overflow: hidden;
    height: @advHeight;
    .topnav {
        width: 100%;
        line-height: @advHeight;
        height: @advHeight;
        margin: 0 auto;
        .carl {
            width: 100%;
            height: @advHeight;
            position: relative;
            .flex-mixin;
            align-items: flex-start;
            .carsoul {
                width: 100%;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                overflow: hidden;
                margin: 0 30px;
                .cal_content1 {
                    // display: flex;
                    // justify-content: flex-start;
                    // align-items: center;
                    .cal_content {
                        line-height: @advHeight;
                        font-size: 14px;
                        padding: 0 2em 0 1.5em;
                        width: 100%;
                        position: relative;
                        font-weight: 400;
                        a {
                            color: #1c242c;
                            font-size: 12px;
                            line-height: @advHeight;
                            display: block;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            word-break: break-all;
                            font-weight: 400;
                            &:hover {
                                color: #357ce1;
                            }
                        }
                        &:after {
                            display: block;
                            position: absolute;
                            content: "/";
                            font-size: 14px;
                            right: 0;
                            top: 0;
                            color: #1c242c;
                        }
                    }
                    &:nth-last-child(1) {
                        .cal_content {
                            &:after {
                                content: "";
                            }
                        }
                    }
                }
            }
            .more {
                position: absolute;
                z-index: 12;
                right: 0;
                a {
                    color: #a8b0c0;
                    font-size: 14px;
                }
            }
        }
    }
}
#page2 {
    width: 1200px;
    height: auto;
    min-height: 320px;
    margin: 40px auto;
    .page2nav {
        line-height: 40px;
        font-size: 20px;
        .brclearfix {
            font-weight: 600;
            border-left: 1px solid @tableBodyBorderBg;
            border-bottom: 0;
            background: @baseSymbolbg;
            li {
                float: left;
                cursor: pointer;
                color: @baseSymbolTxtColor;
                background: @baseSymbolLiBg;
                border-top: 1px solid @baseSymbolLiborderColor;
                list-style: none;
                font-size: 16px;
                padding: 0 30px;
                &:hover {
                    color: @main_Theme;
                }
            }
            li:nth-last-child(1) {
                border-right: 1px solid @baseSymbolLiborderColor;
            }
            li:nth-last-child(2) {
                border-right: 1px solid @baseSymbolLiborderColor;
            }
            li.active {
                position: relative;
                color: @main_Theme;
                background: @baseSymbolLiActiveBg;
                &:after {
                    display: block;
                    position: absolute;
                    content: " ";
                    z-index: 2;
                    left: 0;
                    right: 0;
                    width: 100%;
                    height: 2px;
                    background-color: @main_Theme;
                }
            }
        }
    }
    .ptjy {
        height: 100%;
        .ivu-table-wrapper {
            border: 1px solid @tableBorderColor;
            border-top: none;
            /deep/.ivu-table {
                &:before {
                    height: 0;
                }
                &:after {
                    width: 0;
                }
                .ivu-table-header {
                    background-color: @tableHeadeBG;
                    border-top: 1px solid @tableBodyBorderBg;
                    th {
                        background-color: transparent;
                        color: @tableHeaderfontColor;
                        border: none;
                    }
                }
                .ivu-table-overflowX {
                    overflow-x: hidden;
                }
                .ivu-table-body {
                    background-color: @tableBodyBG;
                    td {
                        background-color: transparent;
                        border-bottom: none;
                        border-top: 1px solid @tableBodyBorderBg;
                        color: @tableBodyFontColor;
                    }
                }
                .ivu-table-body,
                .ivu-table-header {
                    .ivu-table-cell {
                        padding: 5px 0;
                    }
                }
            }
        }
    }
}
#page4 {
    // background: #fff;
    height: auto;
    width: 1200px;
    margin: 0 auto;
    ul {
        width: 100%;
        margin: 0 auto;
        padding: 100px 0;
        .flex-mixin;
        li {
            width: 200px;
            padding: 0 15px;
            div {
                width: 90px;
                height: 90px;
                border-radius: 50%;
                vertical-align: middle;
                text-align: center;
                margin: 0 auto;
                img {
                    height: 55px;
                    margin-top: 28px;
                }
            }
            p {
                font-size: 15px;
                margin: 20px 0;
                text-align: center;
                color: @abstractContColor;
            }
            p.title {
                color: @abstractTitleColor;
                font-size: 18px;
                font-weight: 600;
            }
        }
    }
}
#page5 {
    width: 100%;
    color: #9eb5ca;
    text-align: center;
    line-height: 2em;
    background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2MCIgaGVpZ2h0PSI4NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSI2OS40NDIlIiB4Mj0iNTAlIiB5Mj0iLTE0LjczNSUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjMkM0MThEIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzA2MUY2NCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjUwJSIgeTE9IjY5LjQ0MiUiIHgyPSI1MCUiIHkyPSItMTQuNzM1JSIgaWQ9ImIiPjxzdG9wIHN0b3AtY29sb3I9IiMyQzQxOEQiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMDYxRjY0IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNTAlIiB5MT0iNjkuNDQyJSIgeDI9IjUwJSIgeTI9Ii0xNC43MzUlIiBpZD0iYyI+PHN0b3Agc3RvcC1jb2xvcj0iIzJDNDE4RCIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiMwNjFGNjQiIG9mZnNldD0iMTAwJSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTAgMGgyNTYwdjg2MEgweiIvPjxnIGZpbGwtcnVsZT0ibm9uemVybyI+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTAgMGgzNDQwdjg2MEgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQzMikiLz48cGF0aCBkPSJNMTI1MyA2NDZjMzg4LjMxOS0yNzAgNzcwLjgxOS00MDUgMTE0Ny41LTQwNSAzNzYuNjgxIDAgNjc1LjQ2IDEzNC44OTggODk2LjMzNSA0MDQuNjkzTDEyNTMgNjQ2eiIgZmlsbD0idXJsKCNiKSIgb3BhY2l0eT0iLjUwNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQzMikiLz48cGF0aCBkPSJNNSA4NTguMzA4QzI1OS45NDggNTIyLjQxNSA1NzcuNDM2IDM1My45OCA5NTcuNDY0IDM1My4wMDJjMzY0LjE4OC0uOTM2IDg0OC4zOCAyNjkuMDE3IDE1MDAuNTUzIDE3My43NTJDMjc4NC42NzIgNDgyLjI1IDMwNzEuNjY3IDU5My4zMzQgMzMxOSA4NjBMNSA4NTguMzA4eiIgZmlsbD0idXJsKCNjKSIgb3BhY2l0eT0iLjYxNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQzMikiLz48L2c+PC9nPjwvc3ZnPg==")
        no-repeat 0 0;
    .section-main {
        box-sizing: border-box;
        height: 860px;
        padding-top: 126px;
        width: 1200px;
        margin: 0 auto;
        background-size: cover;
        .download {
            flex: 1;
            list-style-type: none;
            color: #fff;
            text-align: center;
            line-height: 40px;
            .qrcode {
                font-size: 30px;
                margin-bottom: 22px;
                color: #fff;
            }
            .description {
                font-size: 16px;
                margin-bottom: 60px;
                color: #aeb9d8;
                font-weight: 600;
            }
        }
        .phone_image {
            .flex-mixin;
            .os {
                max-width: 260px;
                display: flex;
                text-align: left;
                justify-content: center;
                flex-direction: column;
                float: left;
                margin-left: 52px;
                margin-top: -10px;
                li:not(.downloadAppWrapper) {
                    min-width: 172px;
                    font-size: 18px;
                    margin-bottom: 14px;
                    div.con {
                        min-width: 172px;
                        height: 64px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: #f2f6fa;
                        padding: 16px 10px;
                        line-height: 32px;
                        position: relative;
                        font-size: 14px;
                        box-sizing: border-box;
                        border: 1px solid transparent;
                        border-radius: 2px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-weight: 600;
                        &:hover {
                            border: 1px solid #357ce1;
                            background: #2d448b;
                            .iconWrapper {
                                .icondownload {
                                    top: 5px;
                                }
                                .icon {
                                    top: 35px;
                                }
                            }
                        }
                        .iconWrapper {
                            width: 35px;
                            height: 35px;
                            background-color: #fff;
                            border-radius: 50%;
                            position: relative;
                            overflow: hidden;
                            i {
                                position: absolute;
                                transition: all 0.4s;
                            }
                            .icondownload {
                                top: 35px;
                                left: 5px;
                            }
                            .icon {
                                left: 5px;
                                top: 5px;
                            }
                        }
                    }
                }
                li.downloadAppWrapper {
                    position: relative;
                    z-index: 1;
                    width: 172px;
                    height: 172px;
                    background: #fff;
                    border: 10px solid #2d448b;
                    outline: 1px solid #357ce1;
                }
                li {
                    position: relative;
                    .tips {
                        width: 100px;
                        height: auto;
                        background-color: #fff;
                        position: absolute;
                        left: calc(100% + 10px);
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 3;
                        font-size: 14px;
                        color: #666;
                        border-radius: 5px;
                        padding: 5px;
                        display: none;
                    }
                    &:hover{
                         .tips{
                             display: block;
                         }
                    }
                }
            }
            img {
                width: 836px;
                height: 512px;
                // transform: translateY(100px);
                transition: all 1s;
            }
        }
    }
}
.feature_wrap {
    width: 100%;
    min-height: 555px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
    padding: 120px 0 85px;
    text-align: center;
    color: #495666;
    line-height: 2em;
    font-size: 16px;
    h2 {
        font-size: 30px;
        margin-bottom: 20px;
        b {
            background-image: linear-gradient(180deg, #185dd3, #061d79);
            padding: 0 5px;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: #185dd3;
        }
    }
    > p {
        color: #495666;
        font-weight: 500;
    }
    .feature_list {
        padding-top: 73px;
        width: 70%;
        margin: 0px auto;
        transform: translateY(100px);
        transition: all 1s;
        li {
            float: left;
            width: 33%;
            background: transparent none no-repeat top;
            padding-top: 0;
            div {
                font-size: 0;
                margin-bottom: 16px;
                height: 53px;
                img {
                    border: 0;
                }
            }
            p {
                font-size: 14px;
                color: #54748f;
                line-height: 28px;
                font-weight: 500;
            }
            p.title {
                color: #1c242c;
                font-size: 18px;
                margin-bottom: 10px;
            }
        }
    }
}
.registerWrap {
    height: 300px;
    width: 100%;
    display: flex;
    border-top: 1px solid #cad7e0;
    background: #fff;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
        color: #232a4a;
        font-size: 30px;
        line-height: 1;
        font-weight: 500;
    }
    > div {
        margin-top: 40px;
        display: flex;
        /deep/.ivu-input-wrapper .ivu-input {
            width: 480px;
            height: 48px;
            font-size: 16px;
            color: #000;
            border: 1px solid #bdced9;
            border-radius: 2px;
            padding-left: 16px;
            box-sizing: border-box;
            caret-color: #357ce1;
        }
        .ivu-btn {
            margin-left: 8px;
            display: inline-block;
            height: 48px;
            padding: 0 44px;
            font-size: 18px;
            min-width: 120px;
            -webkit-appearance: none;
            background-color: #357ce1;
            color: #fff;
            border: none;
            outline: none;
            border-radius: 2px;
            transition: background-color 0.2s;
            &:hover {
                background-color: rgba(53, 124, 225, 0.7);
            }
            &:focus {
                box-shadow: 0 0 0 2px transparent;
            }
        }
    }
}
</style>


<style lang="scss">
.bannerWrapper .ivu-carousel {
    height: 100%;
}
.section .ivu-carousel-dots-inside {
    bottom: 30px;
}

.green {
    // color: #03bf7b !important;
}

.red {
    // color: #de211d !important;
}

.brclearfix:after {
    content: "";
    display: block;
    height: 0;
    overflow: hidden;
    clear: both;
}

.section {
    /* height: 574px; */
    /* text-align: center; */
    /* color: #fff; */
}

.carousel-item {
    background-repeat: no-repeat;
    background-position: center;
    height: 200px;
    background-size: contain;
}

.demo-carousel-btn {
    width: 100%;
    height: 100%;
    padding-top: 345px;
}
.usdt_icon {
    float: left;
    width: 18%;
    height: 290px;
    background: #1d293a;
    padding-top: 125px;
    margin: 5px;
}
.btc,
.eth {
    float: left;
    width: 100%;
    margin-top: 10px;
}

.btc_icon,
.eth_icon {
    float: left;
    width: 18%;
    height: 140px;
    background: #1d293a;
    padding-top: 50px;
    margin: 5px;
}

#nav {
    position: fixed;
    right: 10%;
    top: 50%;
    z-index: 100;
}

#nav ul li {
    display: block;
    /* width: 120px; */
    height: 25px;
    margin: 7px;
    position: relative;
    padding-right: 20px;
    text-align: right;
    color: #fff;
}

#nav ul li span {
    display: none;
}

#nav ul li a {
    top: 2px;
    right: 2px;
    width: 8px;
    height: 8px;
    background: url(../../assets/images/page.png) no-repeat;
    position: absolute;
    z-index: 1;
}

#nav ul li a:hover,
#nav ul li a.active {
    top: 0;
    right: -3px;
    width: 18px;
    height: 18px;
    background: url(../../assets/images/page_active.png) no-repeat;
    position: absolute;
    z-index: 1;
}

#page3 {
    position: relative;
    color: #979797;
    /* background: url(../../assets/images/section3.png) no-repeat center; */
}

#page3 label {
    position: absolute;
    top: 30%;
    left: 20%;
    font-size: 30px;
}

@-webkit-keyframes fadeinB {
    0% {
        top: 50%;
        opacity: 0;
    }
    100% {
        top: 30%;
        opacity: 1;
    }
}

@keyframes fadeinB {
    0% {
        top: 50%;
        opacity: 0;
    }
    100% {
        top: 30%;
        opacity: 1;
    }
}

@-webkit-keyframes fadeinA {
    0% {
        top: 60%;
        opacity: 0;
    }
    100% {
        top: 40%;
        opacity: 1;
    }
}

@keyframes fadeinA {
    0% {
        top: 60%;
        opacity: 0;
    }
    100% {
        top: 40%;
        opacity: 1;
    }
}

#page3 p {
    position: absolute;
    top: 40%;
    left: 20%;
    font-size: 15px;
}

.news_1 {
    color: #202b3c;
    font-size: 12px;
}

.news_2 {
    color: #505c6f;
    font-size: 13px;
}

.news_3 {
    color: #fff;
    font-size: 18px;
}

.news_title {
    color: #fff;
    font-size: 20px;
}

.news_date {
    color: #505c6f;
}

.news_detail {
    color: #98999f;
    margin-top: 10px;
}
</style>


