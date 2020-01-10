<template>
    <div v-if="isLogin" class="hd hd_login">
        <span>{{$t("exchange.canuse")}}</span>
        <b>{{canUseNum | toFloor(baseCoinScale)}}</b>
        <span>{{canUseCoin}}</span>
        <router-link to="/uc/coin" v-show="flag" >{{$t("exchange.recharge")}}</router-link>
        <a v-show="flag" @click="transFerFun" style="padding-right:5px;">{{$t('coin.transfer')}}</a>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "orderTitle",
    props: {
        canUseNum: Number,
        canUseCoin: String,
        baseCoinScale:Number,
        flag:Boolean,
    },
    computed: {
        ...mapGetters(["isLogin","lang"]),
        fontSize(){
            if(this.lang!="简体中文"){
                return 12;
            }else{
                return 14;
            }
        }
    },
    methods: {
        transFerFun() {
            this.$emit("transFerFun");
        }
    }
}
</script>
<style lang="less" scoped>
</style>