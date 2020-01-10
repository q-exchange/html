<template>
    <div class="content-wrap" id="List">
        <otcHeader></otcHeader>
        <div class="container">
            <div class="userinfo">
                <!-- 头像 -->
                <div class="avatar-box">
                    <div class="user-face user-avatar-public">
                        <img v-if="user.avatar != null && user.avatar != ''" :src="user.avatar" width="40px" height="40px" style="border-radius: 50%" />
                        <span v-else class="user-avatar-in">{{usernameS}}</span>
                    </div>
                    <span class="userName">{{user.username}}</span>
                    <img src="../../assets/images/business_v.png" alt="" class="level" v-if="user.level==2">
                </div>
                <div class="info">
                    <ul>
                        <li>
                            <p>{{user.transactions}}</p>
                            <p class="msg">{{$t('otc.checkuser.exchangetimes')}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="personInfo">
                <span style="color:#999">{{$t('otc.checkuser.registtime')}}: {{user.createTime}}</span>
                <div class="type">
                    <!-- <p>
                        <span :class="{active:user.emailVerified==1}">邮箱认证</span>
                        <img src="../../assets/images/pass.png" alt="" v-if="user.emailVerified==1">
                        <img src="../../assets/images/nopass.png" alt="" v-else>
                    </p> -->
                    <p>
                        <span :class="{active:user.phoneVerified==1}">手机认证</span>
                        <img src="../../assets/images/pass.png" alt="" v-if="user.phoneVerified==1">
                        <img src="../../assets/images/nopass.png" alt="" v-else>
                    </p>
                    <p>
                        <span :class="{active:user.realVerified==1}">身份证认证</span>
                        <img src="../../assets/images/pass.png" alt="" v-if="user.realVerified==1">
                        <img src="../../assets/images/nopass.png" alt="" v-else>
                    </p>
                </div>
            </div>
            <div class="nodata" v-if="sell.length==0 && buy.length==0">
                <img src="../../assets/images/nolist.png" alt="">
                <p>暂无广告</p>
            </div>
            <section v-else>
                <div class="sell" v-if="sell.length!=0">
                    <p>在线出售</p>
                    <buyTable :name="username"></buyTable>
                </div>
                <div class="buy" v-if="buy.length!=0">
                    <p>在线购买</p>
                    <sellTable :name="username"></sellTable>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import userTable from '../../components/otc/checkuserTableDate';
import otcHeader from "../otc/otcHeader"
import buyTable from "../../components/otc/buyTable"
import sellTable from "../../components/otc/sellTable"
export default {
    components: {
        userTable,
        otcHeader,
        buyTable,
        sellTable,
    },
    data() {
        return {
            loading: true,
            hasRealName: false,
            username:"",
            usernameS: "",
            tableSize:"large",
            user: {
                username: "",
                email: true,
                mobileNo: false,
                idCard: true
            },
            userType: "sell",
            sell:[],
            buy:[]
        };
    },
    created() {
        this.username=this.$route.query.id;
        this.getAdv();
    },
    computed: {
        isLogin: function () {
            return this.$store.getters.isLogin;
        },
        member: function () {
            return this.$store.getters.member;
        }
    },
    methods: {
        changePage() { },
        //获取个人账户信息
        getAdv() {
            this.$http
                .post(this.host + "/otc/advertise/member", {
                    name: this.$route.query.id
                })
                .then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        console.log(resp.data);
                        this.user = resp.data;
                        this.sell=resp.data.sell;
                        this.buy=resp.data.buy;
                        this.usernameS = (this.user.username + "")
                            .replace(/^\s+|\s+$/g, "")
                            .slice(0, 1);
                    } else {
                        this.$Message.error(resp.message);
                    }
                });
        },
        strpro(str) {
            let newStr = str;
            str = str.slice(1);
            var re = /[\D\d]*/g;
            var str2 = str.replace(re, function (str) {
                var result = "";
                for (var i = 0; i < str.length; i++) {
                    result += "*";
                }
                return result;
            });
            return newStr.slice(0, 1) + str2;
        }
    }
};
</script>

<style scoped lang="less">
@import "../../my_theme/custom.less";
@import url("../../less/otc/checkUser/light.less");
@mainTheme: #3399ff;
.content-wrap {
    background:#fff;
    min-height: 600px;
    padding-top: 48px;
    padding-bottom:120px;
    .container {
        padding-top: 30px;
        margin: 0 auto;
        width: 1200px;
        .userinfo{
            display:flex;
            justify-content:space-between;
            padding:20px 0;
            li{
                text-align:center;
            }
            .info{
                .msg{
                    font-size:12px;
                    color:#999;
                }
            }
            .avatar-box{
                display:flex;
                align-items:center;
                .userName{
                    margin-left:20px;
                }
                .level{
                    margin:0 15px;
                }
            }
            border-bottom:1px solid #eee;
        }
        .personInfo{
            margin:20px 0;
            display:flex;
            justify-content:space-between;
            color:#999;
            .type{
                display:flex;
                align-items:center;
                font-size:12px;
                p{
                    margin-left:10px;
                    img{
                        vertical-align:middle;
                    }
                }
                .active{
                    color:#333;
                }
            }
        }
        section{
            padding-bottom:50px;
            .sell,.buy{
                margin:60px 0;
                p{
                    color:#333;
                    font-weight:500;
                    padding-bottom:32px;
                    font-size:16px;
                }
            }
            .escapeTables.ivu-table-wrapper{
                border:0;
                border-bottom:1px solid #eee;
            }
            /deep/ th .ivu-table-cell{
                color:#999;
                font-weight:500;
            }
        }
        .nodata{
            text-align:center;
            margin:120px 0;
            p{
                font-size:12px;
                color:#9d9d9d;
                margin-top:14px;
            }
        }
    }
}
</style>



