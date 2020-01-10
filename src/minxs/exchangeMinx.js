import expandRow from "@components/exchange/expand.vue";
const exchangeMinx = {
    data() {
        return {
            askRows: [],
            bidRows: [],
            bidTotle: null,
            askTotle: null,
            CNYRate: null,
            currentCoin: {
                base: "",
                coin: "",
                symbol: ""
            },
            coinScale: 4,
            baseCoinScale: 2,
            symbolFee: 0.001,
        }
    },
    created() {
        localStorage.getItem("THEME") && (this.skin = localStorage.getItem("THEME"));
    },
    methods: {
        priceShow() {},
        // 默认交易对
        getdefaultSymbol() {
            return this.$http.get(this.host + "/market/default/symbol").then(res => {
                const data = res.body;
                if (data.code == 0) {
                    return new Promise((resolve, reject) => {
                        resolve(data.data.web);
                    }).catch(reject => reject("BTC_USDT"));
                }
            })
        },
        /**
         * 获取人民币对美元的汇率
         */
        getCNYRate() {
            this.$http.post(this.host + "/market/exchange-rate/usd-cny").then(response => {
                let resp = response.body;
                this.CNYRate = resp.data;
            });
        },
        tab(index) {
            this.btnList.map((ele, i) => {
                this.btnList[i].check = i === index;
            });
        },
        getSymbolScale() {
            const params = {
                symbol: this.currentCoin.symbol
            };
            this.$http.post(this.host + this.api.market.symbolInfo, params).then(response => {
                let resp = response.body;
                if (resp != null) {
                    this.currentCoin.coinScale = resp.coinScale;
                    this.currentCoin.baseCoinScale = resp.baseCoinScale;
                    this.baseCoinScale = resp.baseCoinScale;
                    this.coinScale = resp.coinScale;
                    this.symbolFee = resp.fee;
                }
            });
        },
        getPlate(data) {
            if (data) {
                this.plate.maxPostion = data.maxPostion;
            }
            let params = {
                symbol: this.currentCoin.symbol
            };
            this.$http.post(this.host + this.api.market.platemini, params).then(response => {
                this.askRows = [];
                this.bidRows = [];
                let resp = response.body;
                if (resp.ask && resp.ask.items.length > 0) {
                    for (let i = 0; i < resp.ask.items.length; i++) {
                        if (i == 0) {
                            resp.ask.items[i].totalAmount = resp.ask.items[i].amount;
                        } else {
                            resp.ask.items[i].totalAmount = resp.ask.items[i - 1].totalAmount + resp.ask.items[i].amount;
                        }
                    }
                    if (resp.ask.items.length >= this.plate.maxPostion) { //如果推送的卖盘超过设置的最多个数
                        for (let i = this.plate.maxPostion; i > 0; i--) {
                            let ask = resp.ask.items[i - 1];
                            ask.direction = "SELL";
                            ask.position = i;
                            this.askRows.push(ask);
                        }
                        const rows = this.askRows,
                            len = rows.length,
                            totle = rows[0].totalAmount;
                        this.askTotle = totle;
                    } else {
                        for (let i = this.plate.maxPostion; i > resp.ask.items.length; i--) {
                            let ask = {
                                price: 0,
                                amount: 0
                            };
                            ask.direction = "SELL";
                            ask.position = i;
                            ask.totalAmount = ask.amount;
                            this.askRows.push(ask);
                        }
                        for (let i = resp.ask.items.length; i > 0; i--) {
                            let ask = resp.ask.items[i - 1];
                            ask.direction = "SELL";
                            ask.position = i;
                            this.askRows.push(ask);
                        }
                        const rows = this.askRows,
                            len = rows.length,
                            totle = rows[this.plate.maxPostion - resp.ask.items.length].totalAmount;
                        this.askTotle = totle;
                    }
                }
                if (resp.bid && resp.bid.items.length > 0) {
                    for (let i = 0; i < resp.bid.items.length; i++) {
                        if (i == 0) {
                            resp.bid.items[i].totalAmount = resp.bid.items[i].amount;
                        } else {
                            resp.bid.items[i].totalAmount = resp.bid.items[i - 1].totalAmount + resp.bid.items[i].amount;
                        }
                    }
                    for (let i = 0; i < resp.bid.items.length; i++) {
                        let bid = resp.bid.items[i];
                        bid.direction = "BUY";
                        bid.position = i + 1;
                        this.bidRows.push(bid);
                        if (i == this.plate.maxPostion - 1) break;
                    }
                    if (resp.bid.items.length < this.plate.maxPostion) {
                        for (let i = resp.bid.items.length; i < this.plate.maxPostion; i++) {
                            let bid = {
                                price: 0,
                                amount: 0
                            };
                            bid.direction = "BUY";
                            bid.position = i + 1;
                            bid.totalAmount = 0;
                            this.bidRows.push(bid);
                        }
                        const rows = this.bidRows,
                            len = rows.length,
                            totle = rows[resp.bid.items.length - 1].totalAmount;
                        this.bidTotle = totle;
                    } else {
                        const rows = this.bidRows,
                            len = rows.length,
                            totle = rows[len - 1].totalAmount;
                        this.bidTotle = totle;
                    }
                }
            });
        },
        getTrade() {
            let params = {};
            params["symbol"] = this.currentCoin.symbol;
            params["size"] = 20;
            this.$http.post(this.host + this.api.market.trade, params).then(response => {
                this.trade.rows = [];
                let resp = response.body;
                for (let i = 0; i < resp.length; i++) {
                    this.trade.rows.push(resp[i]);
                }
            });
        },
        timeFormat: function(tick) {
            return moment(tick).format("HH:mm:ss");
        },
        dateFormat: function(tick) {
            return moment(tick).format("YYYY-MM-DD HH:mm:ss");
        },
        toFloor(number, scale = 8) {
            if (new Number(number) == 0) { //如果是"0.0000000000000000"
                return 0;
            }
            let str = number + ""; //转字符串
            if (str.indexOf('e') > -1 || str.indexOf('E') > -1) { //科学计数法
                let num = new Number(number).toFixed(scale + 1),
                    str = num + "";
                return str.substring(0, str.length - 1);
            } else if (str.indexOf(".") > -1) { //小数
                if (scale == 0) {
                    return str.substring(0, str.indexOf("."));
                }
                return str.substring(0, str.indexOf(".") + scale + 1); //截取指定位数
            } else { //整数
                return str;
            }
        },
        changeSkin() {
            const currentSkin = this.skin;
            if (currentSkin === "day") {
                this.skin = "night";
            } else {
                this.skin = "day";
                console.log(this);
            }
            localStorage.setItem("THEME", this.skin);
            this.getKline();
            if (this.isLogin) {
                this.getCurrentOrder();
                this.getHistoryOrder();
            }
        },
    },
    watch: {
        lang: function() {
            this.updateLangData();
        },
        currentCoin: function() {
            // this.updateTitle();
        },
        "currentCoin.price" (newVal) {
            this.middleData++;
            // this.updateTitle();
        },
        $route(to, from) {
            this.init();
        },
    },
    computed: {
        currentColumns() {
            const map = new Map([
                ['LIMIT_PRICE', '限价'],
                ['MARKET_PRICE', '市价'],
                ['CHECK_FULL_STOP', '止盈止损']
            ]);
            let arr = [{
                    type: "expand",
                    width: 40,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                skin: params.row.skin,
                                rows: params.row.detail
                            }
                        });
                    }
                },
                {
                    title: this.$t("exchange.time"),
                    key: "time",
                    render: (h, params) => {
                        return h("span", {}, this.dateFormat(params.row.time));
                    }
                },
                {
                    title: this.$t("coin.deal"),
                    key: "symbol"
                },
                {
                    title: this.$t("coin.trigger"),
                    key: "triggerPrice"
                },
                {
                    title: this.$t("coin.type"),
                    render: (h, params) => {
                        return h(
                            "span", {}, map.get(params.row.type)
                        );
                    }
                },
                {
                    title: this.$t("exchange.direction"),
                    key: "direction",
                    render: (h, params) => {
                        const row = params.row;
                        const className = row.direction.toLowerCase();
                        return h(
                            "span", {
                                attrs: {
                                    class: className
                                }
                            },
                            row.direction == "BUY" ?
                            this.$t("exchange.buyin") :
                            this.$t("exchange.sellout")
                        );
                    }
                },
                {
                    title: this.$t("exchange.price"),
                    key: "price",
                    render: (h, params) => {
                        return h("span", this.toFloor(params.row.price));
                    }
                },
                {
                    title: this.$t("exchange.num"),
                    key: "amount",
                    render: (h, params) => {
                        return h("span", this.toFloor(params.row.amount));
                    }
                },
                {
                    title: this.$t("exchange.traded"),
                    key: "tradedAmount",
                    render: (h, params) => {
                        return h("span", this.toFloor(params.row.tradedAmount));
                    }
                },
                {
                    title: this.$t("coin.amount"),
                    key: "turnover",
                    render: (h, params) => {
                        return h("span", this.toFloor(params.row.turnover));
                    }
                },
                {
                    title: this.$t("exchange.action"),
                    key: "operate",
                    width: 110,
                    render: (h, params) => {
                        return h(
                            "Button", {
                                props: {
                                    size: "small",
                                    type: "warning"
                                },
                                style: {},
                                on: {
                                    click: () => {
                                        this.cancel(params.index);
                                    }
                                }
                            },
                            this.$t("exchange.undo")
                        );
                    }
                }
            ];
            return arr;
        },
        historyColumns() {
            const map = new Map([
                ['LIMIT_PRICE', '限价'],
                ['MARKET_PRICE', '市价'],
                ['CHECK_FULL_STOP', '止盈止损']
            ]);
            let arr = [{
                    type: "expand",
                    width: 40,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                skin: params.row.skin,
                                rows: params.row.detail
                            }
                        });
                    }
                },
                {
                    title: this.$t("exchange.time"),
                    key: "time",
                    render: (h, params) => {
                        return h("span", {}, this.dateFormat(params.row.time));
                    }
                },
                {
                    title: this.$t("coin.deal"),
                    key: "symbol"
                },
                {
                    title: this.$t("coin.type"),
                    render(h, params) {
                        return h(
                            "span", {}, map.get(params.row.type)
                        );
                    }
                },
                {
                    title: this.$t("exchange.direction"),
                    key: "direction",
                    render: (h, params) => {
                        const row = params.row;
                        const className = row.direction.toLowerCase();
                        return h(
                            "span", {
                                attrs: {
                                    class: className
                                }
                            },
                            row.direction == "BUY" ?
                            this.$t("exchange.buyin") :
                            this.$t("exchange.sellout")
                        );
                    }
                },
                {
                    title: this.$t("exchange.price"),
                    key: "price",
                    render: (h, params) => {
                        return h("span", this.toFloor(params.row.price));
                    }
                },
                {
                    title: this.$t("exchange.num"),
                    key: "amount",
                    render: (h, params) => {
                        return h("span", this.toFloor(params.row.amount));
                    }
                },
                {
                    title: this.$t("exchange.done"),
                    key: "tradedAmount",
                    render: (h, params) => {
                        return h("span", this.toFloor(params.row.tradedAmount));
                    }
                },
                {
                    title: this.$t("coin.amount"),
                    key: "turnover",
                    render: (h, params) => {
                        return h("span", this.toFloor(params.row.turnover));
                    }
                },
                {
                    title: this.$t("exchange.status"),
                    key: "status",
                    render: (h, params) => {
                        const status = params.row.status;
                        if (status == "COMPLETED") {
                            return h(
                                "span", {
                                    style: {
                                        color: "#3399ff"
                                    }
                                },
                                this.$t("exchange.finished")
                            );
                        } else if (status == "CANCELED") {
                            return h(
                                "span", {
                                    style: {
                                        color: "#3399ff"
                                    }
                                },
                                this.$t("exchange.canceled")
                            );
                        } else {
                            return h("span", {}, "--");
                        }
                    }
                }
            ];
            return arr;
        }
    }
}

export {
    exchangeMinx
};