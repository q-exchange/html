<template>
    <div class="mask" v-show="!isLogin">
        <span>请先
            <router-link to="/login">
                <span style="color:#3399ff;">{{$t("common.login")}}</span>
            </router-link> /
            <router-link to="/register">
                <span style="color:#f67951;">{{$t("common.register")}}</span>
            </router-link>
        </span>
    </div>
</template>
<script>
import {mapGetters} from "vuex";
export default {
    name:"loginModal",
    computed:{
        ...mapGetters(["isLogin"])
    }
}
</script>
<style lang="less" scoped>
</style>