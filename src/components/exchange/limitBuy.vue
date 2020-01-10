<template>
    <!-- 限价买入的组件 -->
    <Form ref="formValidate" label-position="left">
        <FormItem label="买入价">
            <Input @on-keyup="pricekeyEvent" @focus="priceShow" v-model="price" :placeholder="$t('exchange.buyprice')"></Input>
            <label>{{currentCoin.base}}</label>
            <!-- <p class="math_price">≈ {{currentCoin.usdRate/currentCoin.close*price*CNYRate||0|toFixed(2)}} CNY</p> -->
        </FormItem>
        <FormItem label="买入量">
            <Input @on-keyup="amountkeyEvent" v-model="amount" :placeholder="$t('exchange.buynum')"></Input>
            <label><span>{{$t("exchange.bestbuy")}}:</span>{{(wallet.base / price).toFixed(4)}}</label>
        </FormItem>
        <div class="slider-wrap slider-wrap-buy">
            <template v-if="!isLogin || !member.realName">
                <noLoginSlider></noLoginSlider>
            </template>
            <template v-else>
                <Slider class="silder-buy" v-model="percent" show-tip="always" :tip-format="tipFormat" :disabled="disbaled"></Slider>
                <div :class="percent>item?'active slider-stop':'slider-stop'" v-for="item in sliderStep" :style="'left: '+item+'%;'" @click="silderGo(item)">
                    <div class="slider-block"></div>
                </div>
            </template>
        </div>
        <div class="total buy_total">
            <em>{{$t("exchange.amount")}}</em>
            <span>{{turnover|toFloor(baseCoinScale)}}&nbsp;{{currentCoin.base}}</span> 
        </div>
        <template v-if="!isLogin">
            <loginRegister></loginRegister>
        </template>
        <template v-if="isLogin&&!member.realName">
            <noRealName></noRealName>
        </template>
        <Button class="bg-green" @click="buy" v-show="isLogin&&member.realName" :loading="loading" >
            <span>
                {{ !loading ? ($t("exchange.buyin") + currentCoin.coin) : $t("exchange.buyin")}}
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
    name: "limitPrice",
    components: { noLoginSlider,loginRegister, noRealName },
    props: {
        type:String,
        currentCoin: Object,
        baseCoinScale: Number,
        coinScale: Number,
        CNYRate: Number,
        wallet: Number,
        middleData: Number
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
        buy() {
            //开始挂限价买单
            if (this.amount == "") {
                this.$Notice.error({
                    title: this.$t("exchange.tip"),
                    desc: this.$t("exchange.buyamounttip")
                });
                return;
            }
            let maxAmount = this.wallet.base / this.price;
            if (this.amount > maxAmount) {
                this.$Notice.error({
                    title: this.$t("exchange.tip"),
                    desc: this.$t("exchange.buyamounttipwarning") + this.toFloor(maxAmount)
                });
                return;
            }
            let that = this;
            let params = {
                symbol: this.currentCoin.symbol,
                price: this.price,
                amount: this.amount,
                direction: "BUY",
                type: "LIMIT_PRICE"
            };
            this.loading = true;
            let api = this.type=="exchange"?this.api.exchange.orderAdd:"/margin-trade/order/add";
            this.$http.post(this.host + api, params).then(response => {
                let resp = response.body;
                if (resp.code == 0) {
                    this.$Notice.success({ title: that.$t("exchange.tip"), desc: that.$t("exchange.success") });
                    this.loading = false;
                    this.amount = 0;
                    this.$emit("resresh");
                } else {
                    this.$Notice.error({
                        title: that.$t("exchange.tip"),
                        desc: resp.message
                    });
                    this.loading = false;
                }
            });
        }
    },
    watch: {
        middleData(newVal) {
            //中间变量通过父组件的getSymbolInfo方法获取到当前基准币的价格
            this.price = this.currentCoin.closeStr;
        },
        price(val) {
            //监听price变化的时候amount【数量】，以及【交易额】的值
            let price = this.price,
                account = this.wallet.base,
                amount = 0;
            if (val > 0) {
                amount = this.toFloor(account.div(price).mul(this.percent).mul(0.01), this.coinScale);
            }
            this.amount = amount;
            this.turnover = this.toFloor(val.mul(amount), this.baseCoinScale);
        },
        amount(val) {
            //监听amount变化的时候【交易额】的值
            this.turnover = this.toFloor(val.mul(this.price), this.baseCoinScale);
        },
        percent(val) {
            //监听slider组件拉动的时候，按照输入的价格amount的变化频率
            let price = this.price,
                account = this.wallet.base,
                amount = 0;
            if (price > 0) {
                amount = this.toFloor(account.div(price).mul(val).mul(0.01), this.coinScale);
            }
            this.amount = amount;
        }
    },
    computed: {
        ...mapGetters(["isLogin","member"]),
        disbaled() {//监听滑块是否可以滑动
            let account = this.wallet.base,
                min = this.toFloor(1 / Math.pow(10, this.baseCoinScale));
            return account < min;
        },
    }
}
</script>
<style lang="less" scoped>
.ivu-btn{
    margin-top: 16px;
}
</style>