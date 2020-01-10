<template>
    <Form ref="formValidate">
        <FormItem label="买入价">
            <Input disabled :placeholder="$t('exchange.buytip')"></Input>
            <label>{{currentCoin.base}}</label>
        </FormItem>
        <FormItem label="交易额">
            <Input @on-keyup="amountkeyEvent" v-model="amount" :placeholder="$t('exchange.amount')"></Input>
            <label>{{currentCoin.base}}</label>
        </FormItem>
        <div class="slider-wrap slider-wrap-buy">
            <template v-if="!isLogin || !member.realName">
                <noLoginSlider></noLoginSlider>
            </template>
            <template v-else>
                <Slider class="silder-buy" v-model="percent" show-tip="always" :tip-format="tipFormat" :disabled="disabled"></Slider>
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
        <Button class="bg-green" @click="buy" v-show="isLogin&&member.realName" :loading="loading">
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
    name: "marketBuy",
    components: { noLoginSlider, loginRegister,noRealName },
    props: {
        currentCoin: Object,
        wallet: Object,
        baseCoinScale: Number,
        type:String,
    },
    data() {
        return {
            
            percent: 0,
            amount: 0.0,
            disabled: false,
            sliderStep: [0, 25, 50, 75, 100],
            loading: false,
        }
    },
    methods: {
        amountkeyEvent(event) {
            let val = event.target.value;
            if (val != "") {
                let r = /^[0-9]+\.?[0-9]{0,9}$/;　//大于或者等于0的正整数
                let flag = r.test(val);
                if (flag) {
                    let re1 = new RegExp("([0-9]+.[0-9]{" + this.baseCoinScale + "})[0-9]*", "");
                    this.amount = this.amount.toString().replace(re1, "$1");
                } else {
                    this.amount = "";
                }
            }
        },
        buy() {
            if (this.amount == "") {
                this.$Notice.error({
                    title: this.$t("exchange.tip"),
                    desc: this.$t("exchange.pricetip")
                });
                return;
            }
            if (this.amount > parseFloat(this.wallet.base)) {
                this.$Notice.error({
                    title: this.$t("exchange.tip"),
                    desc: this.$t("exchange.pricetipwarning") + this.wallet.base
                });
                return;
            }
            let params = {
                symbol: this.currentCoin.symbol,
                price: this.currentCoin.price,
                amount: this.amount,
                direction: "BUY",
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
                    this.$emit("resfresh");
                } else {
                    this.$Notice.error({
                        title: this.$t("exchange.tip"),
                        desc: resp.message
                    });
                    this.loading = false;
                }
            });
        },
        tipFormat(val) {
            return val + "%";
        },
        silderGo(item) {
            this.percent = item;
        }
    },
    watch: {
        percent(val) {
            let account = this.wallet.base;
            this.amount = this.toFloor(account.mul(val).mul(0.01), this.baseCoinScale);
        }
    },
    computed: {
        ...mapGetters(["isLogin","member"]),
        disabled() {
            let account = this.wallet.base,
                min = this.toFloor(1 / Math.pow(10, this.baseCoinScale));
                console.log(account,min);
            return account < min;
        }
    }
}
</script>
<style lang="less" scoped>
.wrapper {
    margin-top: 34px;
}
.box {
    margin-top: 34px;
}
.ivu-btn{
    margin-top: 16px;
}
</style>