<template>
    <div class="nav-rights">
        <div class="nav-right">
            <div class="blc-table">
                <div class="title">
                    <p class="title_left">积分管理</p>
                    <div class="blc_box">
                        <p class="nowintegration">{{$t('pointPage.currentPoint')}}:{{integration}}</p>
                        <span>{{$t('pointPage.time')}}:&nbsp;</span>
                        <DatePicker type="daterange" :placeholder="$t('pointPage.enterTime')" style="width: 200px" v-model="rangeDate" :editable="false"></DatePicker>
                        <button class="search_btn" @click="serar">{{$t('pointPage.search')}}</button>
                    </div>
                </div>
                <Table   class="escapeTables table" :columns="tableColumnsBlc" :data="tableMoney" :loading="loading" :disabled-hover="true"></Table>
                <Page :current="pageNo" v-if="totalElement>0" :total="parseInt(totalElement)" :page-size="pageSize" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
const FixAraible = (pageSize, type) => (pageNum) => (createStartTime) => (createEndTime) => ({
    pageSize,
    pageNum,
    type,
    createStartTime,
    createEndTime
});
const getParams = FixAraible(10, '');
const map = new Map([["0", "推广"], ['1', '法币充值赠送'], ['2', '币币充值赠送']]);
const mapEn = new Map([["0", "recommend"], ['1', 'legal tender recharge gift'], ['2', 'Currency recharge gift']]);
import moment from "moment";
export default {
    components: {},
    data() {
        return {
            pageNo: 1,
            pageSize: 10,
            pageNum: 1,
            type: "",
            integration: "",
            createStartTime: "",
            createEndTime: "",
            rangeDate: "",
            tableMoney: [],
            loading: true,
            totalElement: 0
        };
    },
    created: function () {
        this.init();
    },
    methods: {
        init() {
            this.integration = this.$store.getters.member.integration;
            const params = getParams(this.pageNum)(this.createStartTime)(this.createEndTime);
            this.getList(params).then(res => {
                this.tableMoney = res.map(ele => ({
                    type: ele.type,
                    amount: "+" + ele.amount,
                    createTime: ele.createTime
                }));
                this.totalElement = res.length;
            });
        },
        getList(params) {
            return this.$http.post(this.host + "/uc/integration/record/page_query", params).then(res => {
                const resp = res.body;
                if (resp.code == 0) {
                    this.loading = false;
                    return new Promise((resolve, reject) => {
                        resolve(resp.data)
                    })
                }
            });
        },
        changePage(index) {
            this.pageNum = this.pageNo = index;
            this.init();
        },
        serar() {
            this.pageNo = 1;
            this.loading = true;
            let rangeDate = this.rangeDate;
            if (rangeDate && rangeDate[0]) {
                let createStartTime = new Date(rangeDate[0]);
                let createEndTime = new Date(rangeDate[1]);
                this.createStartTime = this.formatTime(createStartTime);
                this.createEndTime = this.formatTime(createEndTime);
            } else {
                this.createStartTime = "";
                this.createEndTime = "";
            }
            this.init();
        },
        formatTime(date) {
            return moment(date).format("YYYY-MM-DD HH:mm:ss")
        }
    },
    computed: {
        tableColumnsBlc() {
            const arr = [];
            arr.push({ title: this.$t('pointPage.type'), render:(h,params)=>{
                return h("div",{},this.mapFun.get(String(params.row.type)));
            }});
            arr.push({ title: this.$t('pointPage.num'), key: "amount", });
            arr.push({ title: this.$t('pointPage.time'), key: "createTime"});
            return arr;
        },
        mapFun(){
            const m = this.$store.getters.lang == "English" ? mapEn : map;
            return m;
        }
    }
};
</script>

<style lang="less" scoped>
@import '../../my_theme/custom.less';
.nav-right {
    height: auto;
    overflow: hidden;
    padding: 80px 10%;
    /deep/ .escapeTables.ivu-table-wrapper{
        border:0;
        .ivu-table .ivu-table-header th{
            font-size:14px;
            color:#999;
            font-weight:500;
        }
    }
    /deep/ .ivu-page{
         text-align:right;
         .ivu-page-item{
             border:1px solid #eee;
             &:hover{
                 border:1px solid #357ce1;
                 background-color:#fff;
                 a{
                     color:#638bd4;
                 }
             }
         }
         .ivu-page-item.ivu-page-item-active{
             background-color:#fff !important;
             color:#638bd4!important;
             border:1px solid #357ce1;
             a{
                 color:#638bd4!important;
             }
         }
    }
    .blc_box {
        display:flex;
        align-items:center;
        .nowintegration{
            margin:0 20px;
            font-size:12px;
        }
        span {
            font-size: 12px;
        }
        .search_btn {
            height: 32px;
            width: 86px;
            background: #357ce1;
            color: @white-custom;
            font-size: 14px;
            border: none;
            outline: none;
            border-radius: 5px;
            margin-left: @padding-xsm-custom;
        }
    }
    .blc-table {
        border:1px solid #eee;
        .title{
            display:flex;
            align-items:center;
            justify-content:space-between;
            padding:0 24px;
            background-color:#f2f6fa;
            height:48px;
            .title_left{
                font-size:14px;
                font-weight:600;
                color:#18232d
            }
        }
    }
}
.blc-table {
    .ivu-table-wrapper {
        .ivu-table-header {
            thead th {
                background: @white-custom;
            }
        }
        tbody.ivu-table-tbody .ivu-table-row td {
            background: @white-custom;
        }
    }
}
</style>

