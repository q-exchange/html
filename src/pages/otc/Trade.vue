<template>
    <div class="nav-right tradeCenter">
        <section class="list-content">
            <div class="tab">
                <ul>
                    <li @click="whichType(0)" :class="{buyactive:type==0}">购买</li>
                    <div style="color:rgba(211, 207, 207, 0.5);" class="line"></div>
                    <li @click="whichType(1)" :class="{sellactive:type==1}">出售</li>
                </ul>
            </div>
            <tableDate :type="type"></tableDate>
        </section>
    </div>
</template>

<script>
import tableDate from '../../components/otc/tradeTableDate';
export default {
    components: {
        tableDate
    },
    data() {
        var self = this;
        return {
            buyType: 0,
            sellType: 1,
            type:0
        };
    },
    computed: {
        isLogin: function () {
            return this.$store.getters.isLogin;
        },
        member: function () {
            return this.$store.getters.member;
        },
        coin: function () {
            return this.$route.params.pathMatch
            // return this.$route.params[0];
        },
        lang: function () {
            return this.$store.state.lang;
        }
    },
    methods:{
        whichType(name){
            this.type=name;
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../my_theme/custom.less";
#List .nav-right {
    color: @nav-right_color;
    padding-right: 0;
    .list-content {
        color: @nav-right_content;
    }
}
#List .nav-right {
    color: @nav-right_color;
    padding-right: 0;
    .list-content {
        .tab{
            padding:0 10%;
            ul{
                cursor:pointer;
                display:flex;
                li{
                    font-size:16px;
                    font-weight:700;
                    color:#333;
                    margin:0 18px;
                    padding-bottom:5px; 
                }
                .buyactive{
                    color:#489972;
                    border-bottom:2px solid #489972;
                }
                .sellactive{
                    color:rgb(214, 69, 60);
                    border-bottom:2px solid rgb(214, 69, 60);
                }
                .line{
                    width:2px;
                    background-color:rgba(211, 207, 207, 0.5);
                    height:22px;
                    margin-top:4px;
                }
            }
        }
        color: @nav-right_content;
        /deep/ .ivu-tabs-nav-scroll{
            padding:0 10%;
        }
        /deep/ .ivu-tabs {
            .ivu-tabs-bar {
                font-weight:700;
                margin-bottom: 0;
                .ivu-tabs-tab.ivu-tabs-tab-active.ivu-tabs-tab-focused{
                    color:#489972;
                }
                .ivu-tabs-ink-bar{
                    background-color:#489972;
                }
            }
        }
    }
}
.tradeCenter button span,
.tradeCenter button a,
.tradeCenter button a:hover {
    display: block;
    color: @white-custom;
}

.tradeCenter .ivu-poptip-popper button span {
    display: block;
    color: inherit;
}

#carousel {
    margin-bottom: 40px;
}

#List .nav-right .list-content .list-table .user-name .user-icon span {
    font-size: 22px;
    color: @white-custom;
    align-self: center;
}

#List .nav-right .list-content .list-table .user-name .user-info {
    margin-left: 5%;
    width: 100px;
    word-wrap: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#List .nav-right .list-content .list-table .user-name .user-info p {
    height: 16px;
    margin: 0 0 3px;
}

#List .nav-right .list-content .pagelist {
    display: flex;
    justify-content: flex-end;
}

#List .nav-right .list-content .pagelist ul {
    list-style: none;
}

#List .nav-right .list-content .pagelist ul li {
    display: inline-block;
    background-color: #ebeff5;
    height: 32px;
    width: 32px;
    text-align: center;
    line-height: 32px;
    border: @border-width_primary @border-style_solid #c5cdd7;
    border-radius: 6px;
    cursor: pointer;
    margin: 0 2px;
}

#List .nav-right .list-content .pagelist ul li:hover {
    background-color: #c5cdd7;
}

#List .nav-right .list-content .pagelist ul li a {
    color: #26264c;
}

#List .header-search {
    width: 100%;
}

#List .select-items select {
    width: initial;
}

#List .list-payMethod {
    width: 80%;
    display: inline-block;
    word-break: keep-all;
}

.select-items .form-control {
    -webkit-box-shadow: none;
    box-shadow: none;
}

.nav-pills .dropdown a {
    color: #555 !important;
}

.has-success .control-label {
    color: #26264c !important;
}

.trade-group {
    margin-bottom: 20px;
    font-size: 14px;
}

.merchant-icon {
    display: inline-block;
    margin-left: 4px;
    background-size: 100% 100%;
}

.merchant-icon.tips {
    width: 4px;
    height: 22px;
    margin-right: 10px;
    background: @primary-custom;
}

.merchant-icon.alipay {
    width: 17px;
    height: 17px;
    background-image: url(../../assets/img/alipay.png);
}

.merchant-icon.bankcard {
    width: 17px;
    height: 17px;
    background-image: url(../../assets/img/bankcard.png);
}

.merchant-icon.wechat {
    width: 17px;
    height: 17px;
    background-image: url(../../assets/img/wechat.png);
}

.merchant-icon.westernunion {
    width: 17px;
    height: 17px;
}

.merchant-icon.paytm {
    width: 29px;
    height: 17px;
}

.merchant-icon.m-booth {
    width: 131px;
    height: 94px;
    background-position: 0 -220px;
}

.merchant-icon.m-server {
    width: 158px;
    height: 94px;
    background-position: 0 -335px;
}

.merchant-icon.m-rate {
    width: 125px;
    height: 94px;
    background-position: 0 -110px;
}

.merchant-icon.m-ok {
    width: 23px;
    height: 9px;
    background-position: -100px 0;
}

.merchant-top {
    display: flex;
    align-items: center;
    background: @white-custom;
    padding: 0 15px;
    color: #0d214e;
}

.merchant-top .tips-word {
    flex-grow: 2;
    text-align: left;
}

.merchant-item {
    padding: 20px 15px 20px 15px;
    background: @white-custom;
    width: 31%;
    float: left;
    margin: 0 1%;
}

.merchant-item.center {
    margin: 0 1.5%;
}

.merchant-item .item-hd {
    /* background: url("../../images/trade/merchant_item_split.png") left bottom no-repeat; */
    padding-bottom: 20px;
    display: flex;
    align-items: center;
}

.merchant-item .item-hd .item-face {
    width: 42px;
    height: 42px;
    text-align: center;
    line-height: 42px;
    border-radius: 42px;
    color: @white-custom;
    background: #00b5f6;
}

.merchant-item .item-hd .item-name {
    padding: 0 10px;
}

.merchant-item .item-hd .item-name p {
    margin-bottom: 0;
}

.merchant-item .item-hd .item-name p:first-child {
    color: #0d214e;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.merchant-item .item-hd .item-name p:last-child {
    color: #5c68a6;
    font-size: 12px;
}

.merchant-item .text-right {
    display: flex;
    justify-content: flex-end;
}

.merchant-item .text-right .online-status-box {
    color: #18b111;
    display: flex;
}

.merchant-item .item-hd .item-pay {
    flex-grow: 2;
    text-align: right;
}

.merchant-item .item-hd .item-pay .states {
    height: 17px;
    width: 67px;
    display: inline-block;
}

.merchant-item .item-hd .item-pay .states.merchant {
    background: url("../../assets/img/renzheng.png") no-repeat;
    background-size: 100% 100%;
}

.merchant-item .item-hd .item-pay p {
    font-size: 12px;
    color: #ed7325;
    margin-bottom: 5px;
}

.merchant-item .item-bd {
    padding-top: 10px;
}

.merchant-item .item-bd .price {
    font-size: 16px;
    color: #3e435e;
    font-weight: bold;
}

.merchant-item .item-bd .price span {
    font-size: 12px;
}

.merchant-item .item-bd .limit {
    color: #636981;
    font-size: 12px;
    padding-bottom: 15px;
}

.merchant-item .item-bd .btn {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: @white-custom;
    padding: 0 12px;
    border-radius: 6px;
}

.merchant-item .item-bd .btn-buy {
    background: #ed7325;
}

.merchant-item .item-bd .btn-sell {
    background: #0db124;
}

.merchant-items {
    margin-bottom: 40px;
}

.carousel-indicators li {
    width: 30px;
    height: 5px;
    border-radius: @border-radius_5px;
    -webkit-border-radius: 3px;
    border: none;
    background: #d4d6e1;
}

.carousel-indicators .active {
    width: 30px;
    height: 5px;
    border-radius: @border-radius_5px;
    -webkit-border-radius: 3px;
    border: none;
    background: #7f8bc6;
    margin: 1px;
}

.carousel-indicators {
    bottom: -30px;
}

.m-intro {
    width: 33.33%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.m-intro p {
    color: #474e72;
    font-weight: bold;
    font-size: 16px;
}

.m-subtitle {
    line-height: 40px;
    padding-left: 20px;
    background: #f7f7fa;
    color: #636981;
    font-size: 12px;
}

.m-data-lf {
    width: 20%;
    float: left;
    display: flex;
    align-items: center;
}

.m-data-cn {
    width: 45%;
    float: left;
    display: flex;
    align-items: center;
}

.m-data-rf {
    width: 35%;
    float: left;
    display: flex;
    align-items: center;
}

.online-status-box {
    height: 20px;
}

.headerimg {
    color: rgb(245, 106, 0);
    background-color: rgb(253, 227, 207);
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: @border-radius_circular;
    margin-right: 5px;
}

.headerimg ~ p {
    display: inline-block;
}

.price {
    font-size: 16px;
    font-weight: bolder;
    color: #444f71;
}

.price2 {
    font-size: 12px;
    color: #8994a3;
    margin-top: 0;
}

.renzheng {
    height: 17px;
    width: 67px;
    display: inline-block;
    background: url("../../assets/img/renzheng.png") no-repeat;
    background-size: 100% 100%;
    transform: translateY(-10px);
    display: block;
}

.renzhengA {
    transform: translateY(-10px);
    display: block;
}

.tjbtn {
    width: 80%;
}

// 商家样式
/deep/ .user-avatar-public {
    background: @white-custom;
    border-radius: @border-radius_circular;
    height: 45px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 5px 0 rgba(71, 78, 114, 0.24);
    position: relative;
}

/deep/ .user-avatar-public > .user-avatar-in {
    background: @primary-custom;
    border-radius: @border-radius_circular;
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: @white-custom;
}

/deep/ .ivu-table-cell .user-avatar-public {
    width: 45px;
    display: inline-block;
    margin: 10px 10px 10px 0;
    vertical-align: middle;
}

/deep/ .ivu-table-cell .user-avatar-public > .user-avatar-in {
    transform: translate(5px, 5px);
}

/deep/ .ivu-table-cell .user-avatar-public ~ p {
    /*width: 60%;*/
    display: inline-block;
}
</style>

