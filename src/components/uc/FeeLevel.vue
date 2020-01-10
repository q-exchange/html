<template>
    <div class="nav-rights">
        <div class="top">
            <p class="title">我的等级</p>
            <ul>
                <li class="myLevel">{{mySelf.gradeCode}}</li>
                <li>
                    <p>{{$t("leverDescPage._feeGread")}}</p>
                    <p>{{mySelf.exchangeFeeRate}}</p>
                </li>
                <li>
                    <p>{{$t("leverDescPage._legalServiceCharge")}}</p>
                    <p>{{mySelf.exchangeFeeRate}}</p>
                </li>
                <li>
                    <p>{{$t("leverDescPage._leverServiveCharge")}}</p>
                    <p>{{mySelf.exchangeFeeRate}}</p>
                </li>
                <li>
                    <p>{{$t("leverDescPage._dayLimit")}}(USDT)</p>
                    <p>{{mySelf.withdrawCoinAmount}}</p>

                </li>
                <li>
                    <p>{{$t("leverDescPage._daynumLimit")}}</p>
                    <p>{{mySelf.dayWithdrawCount}}</p>
                </li>
            </ul>
        </div>
        <div class="top">
            <p class="title">{{$t("leverDescPage._gradDes")}}</p>
            <Table :columns="columns" :data="allSelf" class="table escapeTables"></Table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mySelf: {},
            allSelf: []
        };
    },
    created() {
        // const level = this.$store.getters.member.memberGradeId;
        const level = memberGradeId => {
            return `V${memberGradeId}`;
        };
        const memberGradeId = level(this.$store.getters.member.memberGradeId);
        // alert(memberGradeId)
        this.init().then(data => {
            const mySelf = data.filter(ele => `V${ele.gradeCode}` == memberGradeId);
            this.mySelf = mySelf.length > 0 && mySelf[0];
            console.log(this.mySelf);
            this.allSelf = data;
        });
    },
    methods: {
        init() {
            return this.$http.get(this.host + "/uc/integration/grade").then(res => {
                const resp = res.body;
                if (resp.code == 0) {
                    return new Promise((resolve, reject) => {
                        resolve(resp.data);
                    });
                }
            });
        }
    },
    computed: {
        columns() {
            const arr = [];
            const E = this.$store.getters.lang == "English" ? 230 : "";
            const L = this.$store.getters.lang == "English" ? 200 : "";
            arr.push({
                title: this.$t("leverDescPage._grade"),
                key: "gradeName"
            });
            arr.push({
                title: this.$t("leverDescPage._BitcoinServiceCharge"),
                key: "exchangeFeeRate"
            });
            arr.push({
                title: this.$t("leverDescPage._legalServiceCharge"),
                key: "exchangeFeeRate"
            });
            arr.push({
                title: this.$t("leverDescPage._leverServiveCharge"),
                key: "exchangeFeeRate"
            });
            arr.push({
                title: this.$t("leverDescPage._dayLimit") + "（USDT）",
                width: E,
                key: "withdrawCoinAmount"
            });
            arr.push({
                title: this.$t("leverDescPage._daynumLimit"),
                width: L,
                key: "dayWithdrawCount"
            });
            return arr;
        }
    }
};
</script>
<style lang="less" scoped>
@import "../../my_theme/custom.less";
@import url("../../less/uc/feelevel/light.less");
.nav-rights{
    padding:80px 10%;
}
.top {
    border:1px solid #eee;
    margin:20px 0;
    .title{
        font-size:14px;
        font-weight:600;
        height:48px;
        background-color:#f2f6fa;
        line-height:48px;
        padding:0 24px;
        color:#18232d;
    }
    ul {
        display: flex;
        justify-content: space-between; 
        align-items: center;
        color: @titleColor;
        padding:20px 24px;
        li{
            text-align:center;
        }
        .myLevel {
            padding: @padding-custom;
            border-radius: 50%;
            background-color: @main_theme;
            color: @userColor;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: @padding-custom;
        }
    }
    /deep/ .escapeTables.ivu-table-wrapper{
        border:0;
        .ivu-table .ivu-table-header th{
                font-size:14px;
                color:#999;
                font-weight:500;
            }
    }
}
</style>
