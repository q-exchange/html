<template>
    <!-- <div> -->
    <div class="plate">
        <div class="handlers" id="handles">
            <!-- ALL 全部盘口数据 -->
            <!-- BUY 全部买币盘口数据 -->
            <!-- SELL全部卖币盘口数据 -->
            <span @click="changePlate('ALL')" class="handler handler-all" :class="{active:selectedPlate=='ALL'}"></span>
            <span @click="changePlate('BUY')" class="handler handler-green" :class="{active:selectedPlate=='BUY'}"></span>
            <span @click="changePlate('SELL')" class="handler handler-red" :class="{active:selectedPlate=='SELL'}"></span>
        </div>
        <ul class="header">
            <li>价格({{currentCoin.base}})</li>
            <li>数量({{currentCoin.coin}})</li>
            <li>累计({{currentCoin.coin}})</li>
        </ul>
        <Table v-show="selectedPlate!='BUY'" @on-current-change="changePrice" highlight-row ref="currentRowTable" class="sell_table" :columns="columns" :data="askRows" :width="330"></Table>
        <div class="plate-nowprice">
            <span class="price" :class="{buy:currentCoin.change>0,sell:currentCoin.change<0}">{{currentCoin.closeStr}}</span>
            <span v-if="currentCoin.change>0" class="buy">↑</span>
            <span v-else class="sell">↓</span>
            <span class="price-cny"> ≈ {{currentCoin.cnyPrice}} CNY</span>
        </div>
        <Table v-show="selectedPlate!='SELL'" @on-current-change="changePrice" highlight-row class="buy_table" :class="{hidden:selectedPlate==='ALL'}" :columns="columns" :data="bidRows" width="330"></Table>
    </div>
    <!-- </div> -->
</template>
<script>
export default {
    name: "exchangePlate",
    props: {
        askRows: Array,
        bidRows: Array,
        currentCoin: Object,
        baseCoinScale: Number,
        coinScale: Number,
        bidTotle: Number,
        askTotle: Number,
        CNYRate: Number
    },
    data() {
        return {
            selectedPlate: "ALL",
            maxPostion: 0
        }
    },
    methods: {
        changePlate(param) {
            if (param != "ALL") {
                this.maxPostion = 32;
            } else {
                this.maxPostion = 16;
            }
            this.selectedPlate = param;
            this.$emit("getPlate", {
                maxPostion: this.maxPostion
            });
        },
        changePrice(newVal) {
            this.currentCoin.price = newVal.priceStr;
        },
    },
    watch: {
        "currentCoin.price"(newVal) {
            this.$emit("priceChange", { price: newVal });
        }
    },
    computed: {
        columns() {
            let arr = [{
                title: this.$t("exchange.price"),
                key: "price",
                render: (h, params) => {
                    let str = "";
                    let price = "";
                    const className = params.row.direction.toLowerCase();
                    params.row.price == 0 && (str = h("span", {}, "--"));
                    params.row.price != 0 && (price = params.row.price.toFixed(this.baseCoinScale)) && (str = h("span", { attrs: { class: className } }, price));
                    return str;
                },
                renderHeader: (h, params) => {
                    const title = this.$t("exchange.price") + "(" + this.currentCoin.base + ")";
                    return h("span", {}, title);
                }
            },
            {
                title: this.$t("exchange.num"),
                key: "amount",
                render: (h, params) => {
                    let str = "";
                    params.row.amount == 0 && (str = h("span", {}, "--"));
                    params.row.amount != 0 && (str = h("span", {}, params.row.amount.toFixed(this.coinScale)));
                    return str;
                },
                renderHeader: (h, params) => {
                    const title = this.$t("exchange.num") + "(" + this.currentCoin.coin + ")";
                    return h("span", {}, title);
                }
            },
            {
                title: this.$t("exchange.total"),
                key: "totalAmount",
                render: (h, params) => {
                    if (params.row.price == 0 || params.row.totalAmount == 0) {
                        return h("span", {}, "--");
                    } else {
                        return h(
                            "span",
                            {},
                            params.row.totalAmount.toFixed(this.coinScale)
                        );
                    }
                },
                renderHeader: (h, params) => {
                    const title =
                        this.$t("exchange.total") + "(" + this.currentCoin.coin + ")";
                    return h("span", {}, title);
                }
            },
            {
                className: "percenttd",
                width: 1,
                render: (h, params) => {
                    let width = "0",
                        backgroundColor = params.row.direction === "BUY" ? "#00b275" : "#f15057",
                        totle = params.row.direction === "BUY" ? this.bidTotle : this.askTotle;
                    if (params.row.totalAmount) {
                        width = (params.row.totalAmount / totle).toFixed(4) * 100 + "%";
                    }
                    return h(
                        "div",
                        {
                            style: {
                                width,
                                backgroundColor,
                            },
                            attrs: {
                                class: "percentdiv"
                            }
                        },
                        " "
                    );
                }
            }];
            return arr;
        }
    }
}
</script>
<style lang="less" scoped>
.exchange .main {
    .left {
        width: 330px;
        .handlers {
            font-size: 0;
            height: 35px;
            display: flex;
            padding: 0 16px;
            align-items: center;
            border-bottom: 1px solid #111114;
            .handler {
                display: inline-block;
                margin-right: 10px;
                width: 20px;
                height: 20px;
                background-size: 100% 100%;
                cursor: pointer;
                &.handler-all {
                    background-image: url("../../assets/images/exchange/plate_all.png");
                    &.active {
                        background-image: url("../../assets/images/exchange/plate_all_active.png");
                    }
                }
                &.handler-green {
                    background-image: url("../../assets/images/exchange/plate_green.png");
                    &.active {
                        background-image: url("../../assets/images/exchange/plate_green_active.png");
                    }
                }
                &.handler-red {
                    background-image: url("../../assets/images/exchange/plate_red.png");
                    &.active {
                        background-image: url("../../assets/images/exchange/plate_red_active.png");
                    }
                }
            }
        }
        .plate-nowprice {
            text-align: center;
            line-height: 1;
            display: flex;
            align-items: center;
            height: 32px;
            justify-content: flex-start;
            font-size: 18px;
            font-weight: 500;
            border-top:1px solid #111114;
            border-bottom: 1px solid #111114;
            .price {
                font-size: 16px;
                margin-right: 10px;
                font-weight: 900;
                padding-left: 16px;
            }
            .price.buy {
                color: #05c19e;
            }
            .price.sell {
                color: #e04545;
            }
            .price-cny {
                font-size: 14px;
                margin-left: 10px;
                font-weight: 400;
                color: #697080;
                font-weight: 700;
            }
            .buy {
                color: #05c19e !important;
            }
            .sell {
                color: #e04545 !important;
            }
        }
        .header {
            padding: 0 16px;
            height: 29px;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #7f8fa4;
            font-weight: 500;
            li {
                width: 33.333%;
                text-align: left;
                flex: 1;
            }
        }
        /deep/.ivu-table-wrapper .ivu-table{
            .ivu-table-tip{
                td{
                    background-color: #1f2126;
                }
            }
        }
    }
}
.exchange.day .main {
    .left {
        .handlers {
            border-bottom: 1px solid #e6ecf2;
        }
        .plate-nowprice {
            background-color: #fff;
            border-top: 1px solid #f0f0f0;
            border-bottom: 1px solid #f0f0f0;
        }
         .sell {
                color: #ef5656 !important;
            }
    }
}
</style>