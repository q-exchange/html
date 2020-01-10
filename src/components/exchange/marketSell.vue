<template>
    <Form ref="formValidate">
        <FormItem label="卖出价">
            <Input disabled :placeholder="$t('exchange.selltip')" class="eeee"></Input>
            <label>{{currentCoin.base}}</label>
        </FormItem>
        <FormItem label="卖出量">
            <Input @on-keyup="amountkeyEvent" v-model="amount" :placeholder="$t('exchange.sellnum')"></Input>
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
        <template v-if="!isLogin">
            <loginRegister></loginRegister>
        </template>
        <template v-if="isLogin&&!member.realName">
            <noRealName></noRealName>
        </template>
        <Button class="bg-red" @click="sell" v-show="isLogin&&member.realName" :loading="loading">
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
    name: "marketSell",
    components: { noLoginSlider, loginRegister,noRealName },
    props: {
        currentCoin: Object,
        coinScale: Number,
        wallet: Object,
        type:String,
    },
    data() {
        return {
            
            amount: 0.0,
            percent: 0,
            disabled: false,
            sliderStep: [0, 25, 50, 75, 100],
            loading: false
        }
    },
    methods: {
        tipFormat(val) {
            return val + "%";
        },
        silderGo(item) {
            this.percent = item;
        },
        sell() {
            if (this.amount == "") {
                this.$Notice.error({
                    title: this.$t("exchange.tip"),
                    desc: this.$t("exchange.sellamounttip")
                });
                return;
            }
            if (this.amount > parseFloat(this.wallet.coin)) {
                this.$Notice.error({
                    title: this.$t("exchange.tip"),
                    // desc: this.$t("exchange.sellamounttipwarning") + this.wallet.coin
                    desc: "最多能卖" + this.wallet.coin + "个"
                });
                return;
            }

            let params = {
                symbol: this.currentCoin.symbol,
                price: 0,
                amount: this.amount,
                direction: "SELL",
                type: "MARKET_PRICE"
            };
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
                    this.$emit("refresh");
                } else {
                    this.$Notice.error({
                        title: this.$t("exchange.tip"),
                        desc: resp.message
                    });
                    this.loading = false;
                }
            });
        },
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
        }
    },
    watch: {
        percent(val) {
            let account = this.wallet.coin;
            this.amount = this.toFloor(account.mul(val).mul(0.01), this.coinScale);
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
.wrapper{
 margin-top: 34px;
}
.box{
    margin-top: 34px;
}
.ivu-btn{
    margin-top: 16px;
}
</style>