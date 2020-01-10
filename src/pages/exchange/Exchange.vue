<template>
    <div class="container exchange" :class="skin">
        <div class="main screen">
            <div class="right">
                <!-- 切换币种组件 -->
                <allCoin :basecion="basecion" :coins="coins" @changeBaseCion="changeBaseCion" :priceChange="priceChange" :currentCoinIsFavor="currentCoinIsFavor" :currentCoin="currentCoin"></allCoin>
                <!-- 成交盘口 -->
            </div>
            <div class="center">
                <exchangeHeader :currentCoin="currentCoin" :currentCoinIsFavor="currentCoinIsFavor" :skin="skin" :CNYRate="CNYRate" :baseCoinScale="baseCoinScale" @collect="currentCoinFavorChange" @changeSkin="changeSkin"></exchangeHeader>
                <div class="imgtable" :loading="loadingButton7">
                    <div id="kline_container" :class="{hidden:currentImgTable==='s'}"></div>
                </div>
                <div class="trade_wrap">
                    <div class="trade_panel trade_panel_logout">
                        <!-- 提示去登录或者注册的modal -->
                        <!-- <loginModal></loginModal> -->
                        <!-- 提示去实名认证的modal -->
                        <!-- <template v-if="isLogin&&!member.realName"> -->
                        <!-- <realNameModal></realNameModal> -->
                        <!-- </template> -->
                        <!-- 切换买卖价格挂单 -->
                        <div class="trade_menu">
                            <ul>
                                <template v-for="(item, index) in btnList">
                                    <li @click="tab(index)" :class="{active:item.check}">{{item.text}}</li>
                                </template>
                            </ul>
                        </div>
                        <!-- 划转弹窗 -->
                        <template v-show="isLogin">
                            <transfermodal :modal="modal" @closetransferModal="closeModal"></transfermodal>
                        </template>
                        <div class="trade_bd">
                            <div class="panel panel_buy">
                                <orderTitle :canUseNum="wallet.base" :baseCoinScale="baseCoinScale" :canUseCoin="currentCoin.base" @transFerFun="transFerFun" :flag="true"></orderTitle>
                                <div class="noLogin" v-if="!isLogin">
                                </div>
                                <div class="bd bd_limited" v-show="btnList[0].check==true">
                                    <!-- 限价买入 -->
                                    <limitPrice :middleData="middleData" :coinScale="coinScale" :currentCoin="currentCoin" :baseCoinScale="baseCoinScale" :CNYRate="CNYRate" :wallet="wallet" @resresh="resfresh" type="exchange"></limitPrice>
                                </div>
                                <div class="bd bd_market" v-show="btnList[1].check==true">
                                    <!-- 市价买入 -->
                                    <marketBuy :currentCoin="currentCoin" :wallet="wallet" :baseCoinScale="baseCoinScale" @resfresh="resfresh" type="exchange"></marketBuy>
                                </div>
                                <div class="bd bd_limited" v-show="btnList[2].check==true">
                                    <!-- 止盈止损的买入 -->
                                    <stopBuy :currentCoin="currentCoin" :baseCoinScale="baseCoinScale" :coinScale="coinScale" :wallet="wallet" @refresh="resfresh"  type="exchange"></stopBuy>
                                </div>
                            </div>
                            <div class="panel panel_sell">
                                <orderTitle :canUseNum="wallet.coin" :baseCoinScale="coinScale" :canUseCoin="currentCoin.coin" @transFerFun="transFerFun" :flag="true"></orderTitle>
                                <div class="noLogin" v-if="!isLogin">
                                </div>
                                <div class="bd bd_limited" v-show="btnList[0].check==true">
                                    <!-- 限价卖出 -->
                                    <limitSell :currentCoin="currentCoin" :coinScale="coinScale" :CNYRate="CNYRate" :wallet="wallet" :middleData="middleData" @resresh="resfresh" type="exchange"></limitSell>
                                </div>
                                <div class="bd bd_market" v-show="btnList[1].check==true">
                                    <!-- 市价卖出 -->
                                    <marketSell :currentCoin="currentCoin" :coinScale="coinScale" :wallet="wallet" @resfresh="resfresh" type="exchange"></marketSell>
                                </div>
                                <div class="bd bd_limited" v-show="btnList[2].check==true">
                                    <!-- 止盈止损的卖出 -->
                                    <stopSell :currentCoin="currentCoin" :coinScale="coinScale" :wallet="wallet" :baseCoinScale="baseCoinScale" @resfresh="resfresh" type="exchange"></stopSell>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="left">
                <ul class="header" id="changeTabHeight">
                    <li :class="tabIndex==0?'active':''" @click="tabChange(0)">盘口</li>
                    <li @click="tabChange(1)" :class="tabIndex==1?'active':''">实时成交</li>
                </ul>
                <template v-if="tabIndex==0">
                    <keep-alive>
                        <exchangePlate :currentCoin="currentCoin" :askRows="askRows" :bidRows="bidRows" :baseCoinScale="baseCoinScale" :coinScale="coinScale" :bidTotle="bidTotle" :askTotle="askTotle" :CNYRate="CNYRate" @getPlate="getPlate"></exchangePlate>
                    </keep-alive>
                </template>
                <template v-else>
                    <keep-alive>
                        <tradePort :baseCoinScale="baseCoinScale" :coinScale="coinScale" :baseCoin="currentCoin.base" :coin="currentCoin.coin" :data="trade.rows"></tradePort>
                    </keep-alive>
                </template>
            </div>
        </div>
        <div class="order">
            <div class="order-handler">
                <div class="header">
                    <span>{{$t('exchange.curdelegation')}}</span>
                    <router-link class="linkmore" to="/uc/entrust/current">{{$t('coin.view')}}>></router-link>
                </div>
                <Table :columns="currentColumns" :data="currentOrder.rows" :loading="currentLoading"></Table>
            </div>
            <div class="order-handler">
                <div class="header">
                    <span>{{$t('exchange.hisdelegation')}}</span>
                    <router-link class="linkmore" to="/uc/entrust/history">{{$t('coin.view')}}>></router-link>
                </div>
                <Table :columns="historyColumns" :data="historyOrder.rows" :loading="historyLoading"></Table>
            </div>
        </div>
    </div>
</template>
<script>
import expandRow from "@components/exchange/expand.vue";
import transfermodal from "@components/transfer/Index";
import exchangeHeader from "@components/exchange/header"
import exchangePlate from "@components/exchange/plate"
import allCoin from "@components/exchange/allCoin"
import tradePort from "@components/exchange/tradePort"
import loginModal from "@components/exchange/loginModal"
import realNameModal from "@components/exchange/realNameModal"
import orderTitle from "@components/exchange/orderTitle"
import limitPrice from "@components/exchange/limitBuy"
import limitSell from "@components/exchange/limitSell"
import marketBuy from "@components/exchange/marketBuy"
import marketSell from "@components/exchange/marketSell"
import stopBuy from "@components/exchange/stopBuy"
import stopSell from "@components/exchange/stopSell"
import noRealName from "@components/exchange/noRealName"
import Datafeeds from "@js/charting_library/datafeed/bitrade.js";
import { klineMinx } from "../../minxs/klineMinx"
import { exchangeMinx } from "../../minxs/exchangeMinx"
let Stomp = require("stompjs");
let SockJS = require("sockjs-client");
let moment = require("moment");

import { mapGetters } from "vuex";
export default {
    components: { expandRow, transfermodal, exchangeHeader, exchangePlate, allCoin, tradePort, loginModal, realNameModal, orderTitle, limitPrice, limitSell, marketBuy, marketSell, stopBuy, stopSell, noRealName },
    mixins: [klineMinx, exchangeMinx],
    data() {
        let self = this;
        return {
            middleData: 1,
            currentLoading: true,
            historyLoading: true,
            loadingButton7: false, // 接口请求loading
            modal: false,
            btnList: [
                {
                    text: "限价交易",
                    check: true
                },
                {
                    text: "市价交易",
                    check: false
                },
                {
                    text: "止盈止损",
                    check: false
                }
            ],
            tabIndex: 0,
            memberRate: 0, //用户身份，用于是否允许开启BHB抵扣手续费
            // userRealVerified: false, //是否实名认证
            collecRequesting: false,
            currentCoinIsFavor: false,
            isUseBHB: false, //是否试用BHB抵扣手续费
            skin: "", //皮肤样式day&night
            currentImgTable: "k",
            stopLoss: false,
            selectedOrder: "current", //当前显示的委托记录
            selectedPlate: "all", //当前显示的买卖盘
            defaultPath: "btc_usdt",
            basecion: "usdt",
            //当前市场上的交易币种，按交易对分
            coins: {
                _map: [],
                USDT: [],
                BTC: [],
                ETH: [],
                favor: []
            },
            wallet: {
                base: 0.0,
                coin: 0.0
            },
            trade: {
                rows: [],
            },
            plate: {
                maxPostion: 16,
            },
            currentOrder: {
                rows: []
            },
            historyOrder: {
                pageSize: 3,
                total: 3,
                page: 1,
                rows: []
            }
        };
    },
    computed: {
        ...mapGetters(["isLogin", "member", "lang"]),
    },
    created() {
        this.getdefaultSymbol().then(res => {
            this.defaultPath = res;
            this.init();
        })
    },
    methods: {
        tabChange(item) {
            this.tabIndex = item;
        },
        resfresh() {//挂单之后刷新信息
            this.getWallet();
            this.getCurrentOrder();
            this.getHistoryOrder();
        },
        init() {
            var params = this.$route.params[0];
            if (params == undefined) {
                this.$router.push("/exchange/" + this.defaultPath);
                params = this.defaultPath;
            }
            const basecion = params.split("_")[1];
            if (basecion) {
                this.basecion = basecion.toLowerCase();
            }
            let coin = params.toUpperCase().split("_")[0];
            let base = params.toUpperCase().split("_")[1];
            this.currentCoin.symbol = coin + "/" + base;
            this.currentCoin.coin = coin;
            this.currentCoin.base = base;//获取基准币
            this.$store.commit("navigate", "nav-exchange");
            this.getCNYRate();//获取usdt兑换美元的汇率;
            this.getSymbolScale();//获取需要截取的币的精度即位数
            this.getSymbol(); //包含 K线图、getFavor、startWebsock等
            this.getPlate(); //买卖盘
            this.getTrade();
            if (this.isLogin && this.member.realName) {
                this.resfresh();
            }
        },
        changeBaseCion(data) {
            this.basecion = data.data;
        },
        changeImgTable(str) {
            this.currentImgTable = str;
        },
        setback() {
            let obk = document.getElementsByClassName("container")[0];
            let height = 0;
            let doc = document;
            window.innerHeight && (height = window.innerHeight);
            !window.innerHeight &&
                doc.body.clientHeight &&
                (height = doc.body.clientHeight);
            !window.innerHeight &&
                !doc.body.clientHeight &&
                doc.documentElement.clientHeight &&
                (height = doc.documentElement.clientHeight);
            obk.style.minHeight = height - 100 + "px";
        },
        updateLangData() {
            this.btnList[0].text = this.$t("exchange.limited_price");
            this.btnList[1].text = this.$t("exchange.market_price");
            this.btnList[2].text = this.$t("coin.stop");
        },

        getCoin(symbol) {
            return this.coins._map[symbol];
        },

        getFavor() {
            //查询自选(收藏)
            this.$http
                .post(this.host + this.api.exchange.favorFind, {})
                .then(response => {
                    this.coins.favor = [];
                    this.currentCoinIsFavor = false;
                    let resp = response.body;
                    for (let i = 0; i < resp.length; i++) {
                        let coin = this.getCoin(resp[i].symbol);
                        if (coin != null) {
                            coin.isFavor = true;
                            this.coins.favor.push(coin);
                        }
                        if (this.currentCoin.symbol == resp[i].symbol) {
                            this.currentCoinIsFavor = true;
                        }
                    }
                });
        },
        getSymbol() {
            this.$http.post(this.host + this.api.market.thumb, {}).then(response => {
                let resp = response.body;
                for (let key in this.coins) {
                    this.coins[key] = [];
                }
                resp.length > 0 && resp.map(ele => {
                    let coin = ele.symbol.split("/")[0],
                        base = ele.symbol.split("/")[1];
                    let params =  {
                        price: ele.closeStr,
                        rose: ele.chg > 0 ? "+" + (ele.chg * 100).toFixed(2) + "%" : (ele.chg * 100).toFixed(2) + "%",
                        coin,
                        base,
                        href: `${coin}_${base}`.toLowerCase(),
                        isFavor:false,
                        closeStr:ele.closeStr,
                        cnyPrice:ele.cnyPrice,
                        symbol:ele.symbol
                    }
                    this.coins[base].push(params);
                    this.coins._map[ele.symbol] = params;
                });
                resp.length > 0 && resp.filter((ele) => ele.symbol == this.currentCoin.symbol).map(ele=>{
                    let coin = ele.symbol.split("/")[0],
                        base = ele.symbol.split("/")[1];
                    let params =  {
                        price: ele.closeStr,
                        rose: ele.chg > 0 ? "+" + (ele.chg * 100).toFixed(2) + "%" : (ele.chg * 100).toFixed(2) + "%",
                        coin,
                        base,
                        href: `${coin}_${base}`.toLowerCase(),
                        isFavor:false,
                        closeStr:ele.closeStr,
                        cnyPrice:ele.cnyPrice,
                        symbol:ele.symbol
                    }
                    this.currentCoin = Object.assign(ele,params);
                    this.middleData++;
                });
                if (this.isLogin) {
                    this.getFavor();
                }
                require(["../../assets/js/exchange.js"], function (e) {
                    e.clickScTab();
                });
                this.startWebsock();
            });
        },
        getMarks() {
        },
        //订阅盘口消息
        getPlateMsg(stompClient) {
            stompClient.subscribe("/topic/market/trade-plate/" + this.currentCoin.symbol, (msg) => {
                let resp = JSON.parse(msg.body);
                if (resp.direction == "SELL") {
                    let asks = resp.items;
                    this.askRows = [];
                    let totle = 0;
                    for (let i = this.plate.maxPostion - 1; i >= 0; i--) {
                        let ask = {};
                        if (i < asks.length) {
                            ask = asks[i];
                        } else {
                            ask["price"] = 0;
                            ask["amount"] = 0;
                        }
                        ask.direction = "SELL";
                        ask.position = i + 1;
                        this.askRows.push(ask);
                    }
                    for (let i = this.askRows.length - 1; i >= 0; i--) {
                        if (i == this.askRows.length - 1 || this.askRows[i].price == 0) {
                            this.askRows[i].totalAmount = this.askRows[i].amount;
                        } else {
                            this.askRows[i].totalAmount = this.askRows[i + 1].totalAmount + this.askRows[i].amount;
                        }
                        totle += this.askRows[i].amount;
                    }
                    this.askTotle = totle;
                } else {
                    let bids = resp.items;
                    this.bidRows = [];
                    let totle = 0;
                    for (let i = 0; i < this.plate.maxPostion; i++) {
                        let bid = {};
                        if (i < bids.length) {
                            bid = bids[i];
                        } else {
                            bid["price"] = 0;
                            bid["amount"] = 0;
                        }
                        bid.direction = "BUY";
                        bid.position = i + 1;
                        this.bidRows.push(bid);
                    }
                    for (let i = 0; i < this.bidRows.length; i++) {
                        if (i == 0 || this.bidRows[i].amount == 0) {
                            this.bidRows[i].totalAmount = this.bidRows[i].amount;
                        } else {
                            this.bidRows[i].totalAmount = this.bidRows[i - 1].totalAmount + this.bidRows[i].amount;
                        }
                        totle += this.bidRows[i].amount;
                    }
                    this.bidTotle = totle;
                }
            }
            );
        },
        startWebsock() {
            if (this.stompClient) {
                this.stompClient.ws.close();
            }
            let stompClient = null;
            let that = this;
            let socket = new SockJS(that.host + that.api.market.ws);
            stompClient = Stomp.over(socket);
            this.stompClient = stompClient;
            stompClient.debug = false;
            stompClient.connect({},  (frame)=> {
                that.datafeed = new Datafeeds.WebsockFeed(
                    that.host + "/market",
                    that.currentCoin,
                    stompClient,
                    that.baseCoinScale
                );
                that.getKline();
                //订阅价格变化消息
                stompClient.subscribe("/topic/market/thumb", (msg)=> {
                    let resp = JSON.parse(msg.body);
                    let coin = that.getCoin(resp.symbol);
                    if (coin != null) {
                        coin.price = resp.closeStr;
                        coin.rose = resp.chg > 0 ? "+" + (resp.chg * 100).toFixed(2) + "%" : (resp.chg * 100).toFixed(2) + "%";
                        coin.close = resp.closeStr;
                        coin.closeStr = resp.closeStr;
                        coin.cnyPrice = resp.cnyPrice;
                        coin.high = resp.high;
                        coin.low = resp.low;
                        coin.turnover = parseInt(resp.volume);
                        coin.volume = resp.volume;
                        coin.usdRate = resp.usdRate;
                        coin.change = resp.change;
                    }
                    if(resp.symbol == this.currentCoin.symbol){
                        this.currentCoin = coin;
                    }
                    
                });
                //订阅实时成交信息
                stompClient.subscribe("/topic/market/trade/" + that.currentCoin.symbol, function (msg) {
                    let resp = JSON.parse(msg.body);
                    if (resp.length > 0) {
                        for (let i = 0; i < resp.length; i++) {
                            that.trade.rows.unshift(resp[i]);
                        }
                    }
                    if (that.trade.rows.length > 30) {
                        that.trade.rows = that.trade.rows.slice(0, 30);
                    }
                }
                );
                if (that.isLogin) {
                    //订阅委托取消信息
                    stompClient.subscribe("/topic/market/order-canceled/" + that.currentCoin.symbol + "/" + that.member.id, (msg) => {
                        let resp = JSON.parse(msg.body);
                        that.resfresh();
                    }
                    );
                    //订阅委托交易完成
                    stompClient.subscribe("/topic/market/order-completed/" + that.currentCoin.symbol + "/" + that.member.id, (msg) => {
                        let resp = JSON.parse(msg.body);
                        that.resfresh();
                    }
                    );
                    //订阅委托部分交易
                    stompClient.subscribe("/topic/market/order-trade/" + that.currentCoin.symbol + "/" + that.member.id, function (msg) {
                        let resp = JSON.parse(msg.body);
                        that.resfresh();
                    }
                    );
                }

                //订阅盘口消息
                that.getPlateMsg(stompClient);
            });
        },
        currentCoinFavorChange() {
            if (!this.isLogin) {
                this.$Message.warning(this.$t("common.logintip"));
                return;
            }
            if (this.collecRequesting) {
                return;
            }
            const symbol = this.currentCoin.symbol;
            this.collecRequesting = true;
            if (this.currentCoinIsFavor) {
                //已收藏,去取消收藏
                this.$http
                    .post(this.host + this.api.exchange.favorDelete, {
                        symbol
                    })
                    .then(response => {
                        let resp = response.body;
                        if (resp.code == 0) {
                            this.$Message.info(this.$t("exchange.cancel_favorite"));
                            this.getSymbol(); //刷新状态
                            this.currentCoinIsFavor = false;
                        }
                        this.collecRequesting = false;
                    });
            } else {
                //去添加收藏
                this.$http
                    .post(this.host + this.api.exchange.favorAdd, { symbol })
                    .then(response => {
                        let resp = response.body;
                        if (resp.code == 0) {
                            this.$Message.info(this.$t("exchange.do_favorite"));
                            this.getSymbol(); //刷新状态
                            this.currentCoinIsFavor = true;
                        }
                        this.collecRequesting = false;
                    });
            }
        },

        buyPlate(currentRow) {
            this.form.buy.limitPrice = currentRow.price;
            this.form.sell.limitPrice = currentRow.price;
        },
        sellPlate(currentRow) {
            this.form.buy.limitPrice = currentRow.price;
            this.form.sell.limitPrice = currentRow.price;
        },
        /**
         * 获取钱包信息
         */
        getWallet() {
            this.$http.post(this.host + this.api.uc.wallet + this.currentCoin.base, {}).then(response => {
                let resp = response.body;
                this.wallet.base = resp.data.balance || "";
            });
            this.$http.post(this.host + this.api.uc.wallet + this.currentCoin.coin, {}).then(response => {
                let resp = response.body;
                this.wallet.coin = (resp.data && resp.data.balance) || '';
            });
        },
        getCurrentOrder() {
            //查询当前委托
            let params = {};
            params["pageNo"] = 1;
            params["pageSize"] = 4;
            params["symbol"] = this.currentCoin.symbol;
            this.currentOrder.rows = [];
            let that = this;
            this.currentLoading = true;
            this.$http.post(this.host + this.api.exchange.current, params).then(response => {
                let resp = response.body;
                if (resp.content && resp.content.length > 0) {
                    this.currentOrder.rows = resp.content.slice(0, 4);
                    this.currentOrder.rows.forEach((row, index) => {
                        row.skin = that.skin;
                        row.price = row.type == "MARKET_PRICE" ? that.$t("exchange.marketprice") : row.price;
                    });
                }
                this.currentLoading = false;
            });
        },
        getHistoryOrder(pageNo) {
            //查询历史委托
            // if (pageNo == undefined) {
            //     pageNo = this.historyOrder.page;
            // } else {
            //     pageNo = pageNo - 1;
            // }
            this.historyOrder.rows = []; //清空数据
            let params = {};
            params["pageNo"] = 1;
            params["pageSize"] = 4;
            params["symbol"] = this.currentCoin.symbol;
            let that = this;
            this.historyLoading = true;
            this.$http.post(this.host + this.api.exchange.history, params).then(response => {
                let resp = response.body;
                let rows = [];
                if (resp.content != undefined) {
                    if (resp.content.length > 0) {
                        this.historyOrder.total = resp.totalElements;
                        this.historyOrder.page = resp.number;
                        for (let i = 0; i < 4; i++) {
                            let row = resp.content[i];
                            if (row) {
                                row.skin = that.skin;
                                row.price =
                                    row.type == "MARKET_PRICE"
                                        ? that.$t("exchange.marketprice")
                                        : row.price;
                                // this.historyOrder.rows.push(row);
                                rows.push(row);
                            }
                        }
                        this.historyOrder.rows = rows;
                    }
                    this.historyLoading = false;
                }
            });
        },
        cancel(index) {
            let order = this.currentOrder.rows[index];
            this.$Modal.confirm({
                content: this.$t("exchange.undotip"),
                onOk: () => {
                    this.$http.post(this.host + this.api.exchange.orderCancel + "/" + order.orderId, {}).then(response => {
                        let resp = response.body;
                        if (resp.code == 0) {
                            this.resfresh();
                        } else {
                            this.$Notice.error({
                                title: this.$t("exchange.tip"),
                                desc: resp.message
                            });
                        }
                    });
                }
            });
        },
        transFerFun() {
            this.modal = true;
        },
        closeModal() {
            this.getWallet();
            this.modal = false;
        }
    }
};
</script>
<style scoped lang="less">
@import url("../../assets/css/exchange.less");
.exchange {
    background: #34363f;
    .main {
        display: flex;
        height: 780px;
        .center {
            .imgtable #kline_container {
                background: #1f2126;
                /deep/iframe {
                    height: 455px !important;
                }
            }
            .imgtable {
                height: 455px;
                position: relative;
                overflow: hidden;
                margin-bottom: 6px;
                .handler {
                    position: absolute;
                    top: 10px;
                    right: 40px;
                    z-index: 1000;
                    > span {
                        background-color: #fff;
                        color: #333;
                        padding: 2px;
                        margin: 0 5px;
                        cursor: pointer;
                        border-radius: 2px;
                        opacity: 0.5;
                        &.active {
                            opacity: 1;
                        }
                    }
                }
            }
        }
        .right .coin-menu {
            /deep/.ivu-table-wrapper {
                height: 100%;
                .ivu-table .ivu-table-tip {
                    width: 100%;
                    height: 450px;
                    top: 27px;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    tr {
                        position: absolute;
                        height: 450px;
                        left: 0;
                        right: 0;
                        top: 27px;
                        bottom: 0;
                        background-color: #1f2126;
                        td {
                            background-color: transparent;
                            border: none;
                            position: absolute;
                            top: 58%;
                            font-weight: 600;
                            color: #697080;
                            font-size: 14px;
                        }
                        &:after {
                            display: block;
                            content: "";
                            position: absolute;
                            background: url("../../assets/myImgs/noData.svg")
                                no-repeat center center;
                            background-size: 56px 52px;
                            z-index: 2;
                            width: 100%;
                            height: 68px;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                        }
                    }
                }
            }
        }
        .left {
            max-height: 780px;
        }
    }
    @media screen and (max-width: 1400px) {
        .main {
            height: 680px;
            .center {
                .imgtable #kline_container {
                    /deep/iframe {
                        height: 355 !important;
                    }
                }
                .imgtable {
                    height: 355px;
                }
            }
            .left {
                max-height: 680px;
            }
        }
    }
}
.exchange.day {
    background-color: #e5ebf5;
    .main {
        .left {
            background-color: #fff;
            .header {
                background-color: #f2f6fa;
                border-bottom: 1px solid #e6ecf2;
                li {
                    color: #1c242c;
                }
                li.active {
                    background-color: #fff;
                }
            }
        }
        .right .coin-menu {
            /deep/.ivu-table-wrapper {
                .ivu-table .ivu-table-tip {
                    tr {
                        background-color: #fff;
                        td {
                            color: #697080;
                        }
                        &:after {
                            background: url("../../assets/myImgs/noDataLight.svg")
                                no-repeat center center;
                        }
                    }
                }
            }
        }
        .center {
            .imgtable #kline_container {
                background: #fff;
            }
        }
    }
    .trade_panel {
        box-shadow: 0 0 2px #ccc;
        .mask {
            background-color: rgba(0, 0, 0, 0.4);
            color: #fff;
        }
    }
}
</style>