<template>
    <div class="box">
        <span @click="toRealName">请先实名认证</span>
    </div>
</template>
<script>
export default {
    name: "noRealName",
    methods: {
        toRealName: function () {
            this.$router.push("/uc/realname");
        },
    }
}
</script>
<style lang="less" scoped>
.exchange .box {
    margin-top: 16px;
    width: 100%;
    font-size: 14px;
    height: 34px;
    border: 1px solid;
    text-align: center;
    border-color: #3f4254;
    color: #a7b7c7;
    font-weight: 500;
    border-radius: 4px;
    span {
        line-height: 34px;
        color: #357ce1;
        cursor: pointer;
        &:hover {
            color: #6199e8;
        }
    }
}
.exchange.day .box {
    border-color: #cad7e0;
    color: #596a7a;
}
</style>