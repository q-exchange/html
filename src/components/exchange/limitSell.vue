<template>
    <Form ref="formValidate">
        <FormItem label="卖出价">
            <Input @on-keyup="pricekeyEvent" v-model="price"></Input>
            <label>{{currentCoin.base}}</label>
            <!-- <p class="math_price">≈ {{currentCoin.usdRate/currentCoin.close*price*CNYRate||0|toFixed(2)}} CNY</p> -->
        </FormItem>
        <FormItem label="卖出量">
            <Input @on-keyup="amountkeyEvent" v-model="amount"></Input>
            <label>{{currentCoin.coin}}</label>
        </FormItem>
        <div class="slider-wrap slider-wrap-sell">
            <template v-if="!isLogin || !member.realName">
                <noLoginSlider></noLoginSlider>
            </template>
            <template v-else>
                <Slider class="silder-sell" v-model="percent" show-tip="always" :tip-format="tipFormat" :disabled="disabled"></Slider>
                <div :class="percent>item?'active slider-stop':'slider-stop'" v-for="item in sliderStep" :style="'left: '+item+'%;'" @click="silderGo(item)">
                    <div class="slider-block"></div>
                </div>
            </template>
        </div>
        <div class="total sell_total">
             <em>{{$t("exchange.amount")}}</em>
            <span>{{turnover|toFloor(coinScale)}}&nbsp;{{currentCoin.base}}</span>
        </div>
        <template v-if="!isLogin">
            <loginRegister></loginRegister>
        </template>
        <template v-if="isLogin&&!member.realName">
            <noRealName></noRealName>
        </template>
        <Button class="bg-red" @click="limitSell" v-show="isLogin&&member.realName" :loading="loading">
            <span>
                {{ !loading ? ($t("exchange.sellout") + currentCoin.coin) : $t("exchange.sellout")}}
            </span>
        </Button>
    </Form>
</template>
<script>
import { mapGetters } from "vuex";
import noLoginSlider from "./noLoginSlider";
import loginRegister from "./loginRegister"
import noRealName from "./noRealName"
export default {
    name: "limitSell",
    components: { noLoginSlider, loginRegister,noRealName },
    props: {
        currentCoin: Object,
        coinScale: Number,
        CNYRate: Number,
        wallet: Object,
        middleData: Number,
        type:String,
    },
    data() {
        return {
            
            loading: false,
            price: 0.0,
            amount: 0.0,
            percent: 0.0,
            disbaled: false,
            sliderStep: [0, 25, 50, 75, 100],
            turnover: 0.0
        }
    },
    methods: {
        silderGo(item) {
            this.percent = item;
        },
        tipFormat(val) {
            return val + "%";
        },
        //输入价格的事件处理
        pricekeyEvent(event) {
            let val = event.target.value;
            if (val != "") {
                let r = /^[0-9]+\.?[0-9]{0,9}$/;　//大于或者等于0的正整数
                let flag = r.test(val);
                if (flag) {
                    let re1 = new RegExp("([0-9]+.[0-9]{" + this.baseCoinScale + "})[0-9]*", "");
                    this.price = this.price.toString().replace(re1, "$1");
                } else {
                    this.price = 0.0;
                }
            }
        },
        //输入数量的事件处理
        amountkeyEvent(event) {
            let val = event.target.value;
            if (val != "") {
                let r = /^[0-9]+\.?[0-9]{0,9}$/;　//大于或者等于0的正整数
                let flag = r.test(val);
                if (flag) {
                    let re1 = new RegExp("([0-9]+.[0-9]{" + this.coinScale + "})[0-9]*", "");
                    this.amount = this.amount.toString().replace(re1, "$1");
                } else {
                    this.amount = "";
                }
            }
        },
        limitSell() {
            if (this.amount == "") {
                this.$Notice.error({
                    title: this.$t("exchange.tip"),
                    desc: this.$t("exchange.sellamounttip")
                });
                return;
            }
            if (this.price == "") {
                this.$Notice.error({
                    title: this.$t("exchange.tip"),
                    desc: this.$t("exchange.sellpricetip")
                });
                return;
            }
            if (this.amount > parseFloat(this.wallet.coin)) {
                this.$Notice.error({
                    title: this.$t("exchange.tip"),
                    desc: "最多能卖" + this.wallet.coin + "个"
                    // desc: this.$t("exchange.sellamounttipwarning") + this.wallet.coin
                });
                return;
            }
            let params = {
                symbol: this.currentCoin.symbol,
                price: this.price,
                amount: this.amount,
                direction: "SELL",
                type: "LIMIT_PRICE"
            };
            let that = this;
            this.loading = true;
             let api = this.type=="exchange"?this.api.exchange.orderAdd:"/margin-trade/order/add";
            this.$http.post(this.host + api, params).then(response => {
                let resp = response.body;
                if (resp.code == 0) {
                    this.$Notice.success({
                        title: this.$t("exchange.tip"),
                        desc: this.$t("exchange.success")
                    });
                    this.loading = false;
                    this.amount = 0;
                    this.$emit("resresh");
                } else {
                    this.$Notice.error({
                        title: that.$t("exchange.tip"),
                        desc: resp.message
                    });
                    this.loadingButton4 = false;
                }
            });
        }
    },
    watch: {
        disbaled() {//监听滑块是否可以滑动
            let account = this.wallet.base,
                min = this.toFloor(1 / Math.pow(10, this.baseCoinScale));
            return account < min;
        },
        middleData(newVal) {
            //中间变量通过父组件的getSymbolInfo方法获取到当前基准币的价格
            this.price = this.currentCoin.closeStr;
        },
        price(val) {
            this.turnover = this.toFloor(val.mul(this.amount), this.coinScale);
        },
        amount(val) {
            //监听amount变化的时候【交易额】的值
            this.turnover = this.toFloor(val.mul(this.price), this.coinScale);
        },
        percent(val) {
            let price = this.price,
                account = this.wallet.coin,
                amount = 0;
            if (price > 0) {
                amount = this.toFloor(account.mul(val).mul(0.01), this.coinScale);
            }
            this.amount = amount;
        }
    },
    computed: {
        ...mapGetters(["isLogin","member"]),
        disbaled() {
            let account = this.wallet.coin,
                min = this.toFloor(1 / Math.pow(10, this.coinScale));
            return account < min;
        }
    }
}
</script>
<style lang="less" scoped>
.ivu-btn{
    margin-top: 16px;
}
</style>