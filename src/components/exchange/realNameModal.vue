<template>
    <div class="mask" v-if="!isRealName">
        <span>请先
            <router-link to="/uc/safe">
                <span style="color:#3399ff;">实名认证</span>
            </router-link>
        </span>
    </div>
</template>
<script>
export default {
    name: "realNameModal",
    computed:{
        isRealName(){
            if(this.$store.getters.member){
                return this.$store.getters.member.realName
            }
            return null;
        }
    },
}
</script>
<style lang="less" scoped>
</style>