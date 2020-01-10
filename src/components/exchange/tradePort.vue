<template>
    <div class="trade-wrap">
        <Table :columns="columns" :data="data" :width="330"></Table>
    </div>
</template>

<script>
let moment = require("moment");
export default {
    name: "tradePort",
    props: {
        baseCoinScale: Number,
        coinScale: Number,
        baseCoin: String,
        coin: String,
        data: Array
    },
    methods: {
        timeFormat: function (tick) {
            return moment(tick).format("HH:mm:ss");
        },
    },
    computed: {
        columns() {
            let arr = [
                {
                    title: this.$t("exchange.price"),
                    key: "price",
                    render: (h, params) => {
                        const row = params.row;
                        const className = row.direction == "BUY" ? "buy" : "sell";
                        return h("span", { attrs: { class: className } }, params.row.price.toFixed(this.baseCoinScale));
                    },
                    renderHeader: (h, params) => {
                        const title = this.$t("exchange.price") + "(" + this.baseCoin + ")";
                        return h("span", {}, title);
                    }
                },
                {
                    title: this.$t("exchange.num"),
                    key: "amount",
                    render: (h, params) => {
                        return h("span", {}, params.row.amount.toFixed(this.coinScale));
                    },
                    renderHeader: (h, params) => {
                        const title = this.$t("exchange.num") + "(" + this.coin + ")";
                        return h("span", {}, title);
                    }
                },
                {
                    title: this.$t("exchange.time"),
                    key: "time",
                    render: (h, params) => {
                        return h("span", {}, this.timeFormat(params.row.time));
                    }
                }
            ]
            return arr;
        }
    }
}
</script>

<style lang="less" scoped>
.exchange .left .trade-wrap {
    height: 100%;
    /deep/.ivu-table-wrapper {
        height: 100%;
        .ivu-table {
            height: 100%;
            /deep/.ivu-table-body {
                height: calc(100% - 44px - 27px);
                overflow-y: scroll;
                max-height: calc(100% - 44px - 27px);
            }
        }
    }
}
</style>