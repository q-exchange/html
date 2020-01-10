<template>
    <div class="coin-menu">
        <div class="sc_filter">
            <div>
                <span @click="changeBaseCion('favor')" :class="{active:basecion==='favor'}">{{$t('coin.option')}}</span>
                <span @click="changeBaseCion('usdt')" :class="{active:basecion==='usdt'}">USDT</span>
                <span @click="changeBaseCion('btc')" :class="{active:basecion==='btc'}">BTC</span>
                <span @click="changeBaseCion('eth')" :class="{active:basecion==='eth'}">ETH</span>
            </div>
            <div class="search">
                <Input prefix="ios-search" placeholder="搜索" @on-change="selectCoin" v-model="selectValue" />
                <div class="changeBase" @click="changeRisk"><i class="iconfont icon-change_line"></i>CNY</div>
            </div>
        </div>
        <Table @on-current-change="gohref" highlight-row :columns="columns" :data="datas" width="300" v-if="basecion!=='favor'"></Table>
        <!-- <Table @on-current-change="gohref" highlight-row id="USDT" v-show="basecion==='usdt'" :columns="columns" :data="USDT" width="300"></Table>
        <Table @on-current-change="gohref" highlight-row id="BTC" v-show="basecion==='btc'" :columns="columns" :data="BTC" width="300"></Table>
        <Table @on-current-change="gohref" highlight-row id="ETH" v-show="basecion==='eth'" :columns="columns" :data="ETH" width="300"></Table> -->
        <Table @on-current-change="gohref" highlight-row v-if="basecion==='favor'" no-data-text="暂无记录" id="collect" :columns="favorColumns" :data="favor" width="300"></Table>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "allCoin",
    props: {
        basecion: String,
        coins: Object,
        currentCoinIsFavor: Boolean,
        currentCoin: Object
    },
    data() {
        return {
            selectValue: "",
            datas: [],
            favor: [],
            exchangeCnyRate: false,
        }
    },
    created(){
        console.log(1111);
    },
    methods: {
        changeBaseCion(param) {
            if (param != "favor") {
                this.datas = this.coins[param.toUpperCase()];
            } else {
                this.favor = this.coins[param];
            }

            this.$emit("changeBaseCion", { data: param });
        },
        gohref(currentRow, oldCurrentRow) {
            const path = "/exchange/" + currentRow.href;
            this.$router.push({
                path
            });
        },
        changeRisk() {
            this.exchangeCnyRate = !this.exchangeCnyRate;
        },
        selectCoin(event) {
            let value = this.selectValue;
            let base = this.basecion;
            if (base == "usdt") {
                let temp = [...this.coins.USDT];
                this.getSelectLIst(temp, value);
            } else if (base == "btc") {
                let temp = [...this.coins.BTC];
                this.getSelectLIst(temp, value);
            } else if (base == "eth") {
                let temp = [...this.coins.ETH];
                this.getSelectLIst(temp, value);
            } else if (base == "favor") {
                let temp = [...this.coins.favor];
                this.getSelectFavorList(temp, value);
            }
        },
        getSelectLIst(temp, value) {
            if (value == "") {
                this.datas = temp;
                return;
            }
            let list = temp.filter(ele => {
                if (ele.coin.indexOf(value) > -1) {
                    return ele;
                }
            });
            this.datas = [...list];
        },
        getSelectFavorList(temp, value) {
            if (value == "") {
                this.favor = temp;
                return;
            }
            let list = temp.filter(ele => {
                if (ele.symbol.indexOf(value) > -1) {
                    return ele;
                }
            });
            this.favor = [...list];
        },
        getCoin(symbol) {
            return this.coins._map[symbol];
        },
        cancelCollect(index, row) {
            if (!this.isLogin) {
                this.$Message.info(this.$t("common.logintip"));
                return;
            }
            let params = {};
            params["symbol"] = row.symbol;
            this.$http
                .post(this.host + this.api.exchange.favorDelete, params)
                .then(response => {
                    let resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.info(this.$t("exchange.cancel_favorite"));
                        this.getCoin(row.symbol).isFavor = false;
                        for (let i = 0; i < this.coins.favor.length; i++) {
                            let favorCoin = this.coins.favor[i];
                            if (favorCoin.symbol == row.symbol) {
                                this.coins.favor.splice(i, 1);
                                break;
                            }
                        }
                        if (this.currentCoin.symbol == row.symbol) {
                            this.currentCoinIsFavor = false;
                        }
                    }
                });
        },
        collect(index, row) {
            if (!this.isLogin) {
                this.$Message.info(this.$t("common.logintip"));
                return;
            }
            let params = {};
            params["symbol"] = row.symbol;
            this.$http
                .post(this.host + this.api.exchange.favorAdd, params)
                .then(response => {
                    let resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.info(this.$t("exchange.do_favorite"));
                        this.getCoin(row.symbol).isFavor = true;
                        row.isFavor = true;
                        this.coins.favor.push(row);
                        if (this.currentCoin.symbol == row.symbol) {
                            this.currentCoinIsFavor = true;
                        }
                    }
                });
        },
    },
    computed: {
        columns() {
            let arr = [{
                title:"币种",
                key: "coin",
                sortable: false,
                className: "coin-menu-symbol",
                render: (h, params) => {
                    return h("div", [
                        h("Icon", {
                            props: {
                                type: params.row.isFavor ? "md-star" : "ios-star-outline"
                            },
                            style: {
                                fontSize: "14px",
                                verticalAlign: "middle",
                                width: "17px",
                                height: "17px",
                                color: "#357ce1",
                                transition:"all 0s"
                            },
                            nativeOn: {
                                click: () => {
                                    event.stopPropagation(); //阻止事件冒泡
                                    if (this.isLogin) {
                                        if (event.currentTarget.className == "ivu-icon ivu-icon-md-star") {
                                            this.cancelCollect(params.index, params.row);
                                            event.currentTarget.className = "ivu-icon ivu-icon-ios-star-outline";
                                        } else {
                                            this.collect(params.index, params.row);
                                            event.currentTarget.className = "ivu-icon ivu-icon-md-star";
                                        }
                                    } else {
                                        this.$Message.warning("请先登录");
                                    }
                                }
                            }
                        }),
                        h("span", params.row.coin)
                    ]);
                },
            },
            {
                title: this.$t("exchange.lastprice"),
                sortable: true,
                render: (h, param) => {
                    return h("span", {}, !this.exchangeCnyRate ? param.row.closeStr : param.row.cnyPrice || 0)
                },
                sortMethod: function (a, b, type) {
                    let a1 = parseFloat(a);
                    let b1 = parseFloat(b);
                    if (type == "asc") {
                        return a1 - b1;
                    } else {
                        return b1 - a1;
                    }
                },
            },
            {
                title: "涨幅",
                key: "rose",
                sortable: true,
                sortMethod: function (a, b, type) {
                    let a1 = a.replace(/[^\d|.|-]/g, "") - 0;
                    let b1 = b.replace(/[^\d|.|-]/g, "") - 0;
                    if (type == "asc") {
                        return a1 - b1;
                    } else {
                        return b1 - a1;
                    }
                }, render: (h, params) => {
                    const row = params.row;
                    const className = parseFloat(row.rose) < 0 ? "sell" : "buy";
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
            }
            ]
            return arr;
        },
        favorColumns() {
            return [
                {
                    title: this.$t("exchange.symbol"),
                    key: "coin",
                    sortable: false,
                    className: "coin-menu-symbol",
                    render: (h, params) => {
                        return h("div", [
                            h("Icon", {
                                props: { type: params.row.isFavor ? "md-star" : "ios-star-outline" },
                                style: {
                                    fontSize: "14px",
                                    verticalAlign: "middle",
                                    width: "17px",
                                    height: "17px",
                                    color: "#357ce1"
                                },
                                nativeOn: {
                                    click: () => {
                                        event.stopPropagation(); //阻止事件冒泡
                                        if (this.isLogin) {
                                            if (event.currentTarget.className == "ivu-icon ivu-icon-md-star") {
                                                this.cancelCollect(params.index, params.row);
                                                event.currentTarget.className = "ivu-icon ivu-icon-ios-star-outline";
                                            } else {
                                                this.collect(params.index, params.row);
                                                event.currentTarget.className = "ivu-icon ivu-icon-md-star";
                                            }
                                        } else {
                                            this.$Message.warning("请先登录");
                                        }
                                    }
                                }
                            }),
                            h("span", params.row.symbol)
                        ]);
                    }
                },
                {
                    title: this.$t("exchange.lastprice"),
                    render: (h, param) => {
                        return h("span", {}, !this.exchangeCnyRate ? param.row.closeStr : (param.row.cnyPrice || 0));
                    },
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
                },
                {
                    title: this.$t("exchange.daychange"),
                    key: "rose",
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
                        const className = parseFloat(row.rose) < 0 ? "sell" : "buy";
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
                }
            ];
        },
        ...mapGetters(["isLogin"])
    },
    watch: {
        basecion(newVal) {
            console.log(newVal);
        },
        coins: {
            handler(newVal) {
                let baseCoin = "favor";
                if (this.basecion != "favor") {
                    baseCoin = this.basecion.toUpperCase();
                }
                let list = newVal[baseCoin];
                if (this.selectValue) {
                    this.datas = list.length > 0 && list.filter((ele) => {
                        if (ele.symbol.split("/")[0].indexOf(this.selectValue) > -1) {
                            return ele;
                        }
                    })
                } else {
                    this.datas = list;
                }

            },
            immediate: true,
            deep: true // 表示开启深度监听
        }
    }
}
</script>