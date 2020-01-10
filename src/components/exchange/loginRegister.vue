<template>
    <div class="box">
        <span @click="toLogin">登录</span>&nbsp;或&nbsp;<span @click="toRegister">注册</span>
    </div>
</template>
<script>
import mapGetters from "vuex";
export default {
    name: "loginRegister",
    data(){
        return{
            realName:""
        }
    },
    created(){
        
    },
    methods:{
        toLogin:function(){
            this.$router.push("/login");
        },
        toRegister:function(){
            this.$router.push("/register");
        }
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
        &:nth-child(1), &:nth-child(2){
            color: #357ce1;
            cursor: pointer;
            &:hover{
                color:#6199e8;
            }
        }

    }
}
.exchange.day .box{
    border-color: #cad7e0;
    color: #596a7a;
}
</style>