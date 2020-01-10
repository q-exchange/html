<template>
    <div class="nav-rights">
        <div class="nav-right">
            <div class="blc-table">
              <div class="content">
                <div class="title">
                  <p class="title_left">糖果赠送记录</p>
                  <div class="blc_box">
                      <span style="font-size:12px;">{{$t('pointPage.giftTime')}}:&nbsp;</span>
                      <DatePicker type="daterange" :placeholder="$t('pointPage.enterTime')" style="width: 200px" v-model="rangeDate" :editable="false"></DatePicker>
                      <button class="search_btn" @click="serar">{{$t('pointPage.search')}}</button>
                  </div>
                </div>
                <Table class="escapeTables table" :columns="tableColumnsBlc" :data="tableMoney" :loading="loading" :disabled-hover="true"></Table>
                <Page :current="pageNo" v-if="totalElement>0" :total="parseInt(totalElement)" :page-size="pageSize" @on-change="changePage"></Page>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
const FixAraible = pageSize => pageNum => startTime => endTime => ({
  pageSize,
  pageNum,
  startTime,
  endTime
});
const getParams = FixAraible(10, "");
const map = new Map([
  ["0", "推广"],
  ["1", "法币充值赠送"],
  ["2", "币币充值赠送"]
]);
import moment from "moment";
export default {
  components: {},
  data() {
    let that = this;
    return {
      pageNo: 1,
      pageSize: 10,
      pageNum: 1,
      type: "",
      integration: "",
      startTime: "",
      endTime: "",
      rangeDate: "",

      tableMoney: [],
      loading: true,
      totalElement: 0
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init() {
      this.integration = this.$store.getters.member.integration;
      const params = getParams(this.pageNum)(this.startTime)(this.endTime);
      this.getList(params).then(res => {
        this.tableMoney = res.data;
        this.totalElement = res.total;
      });
    },
    getList(params) {
      return this.$http
        .post(this.host + "/uc/gift/record", params)
        .then(res => {
          const resp = res.body;
          if (resp.code == 0) {
            this.loading = false;
            return new Promise((resolve, reject) => {
              resolve(resp);
            });
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
        let startTime = new Date(rangeDate[0]);
        let endTime = new Date(rangeDate[1]);
        this.startTime = this.formatTime(startTime);
        this.endTime = this.formatTime(endTime);
      } else {
        this.startTime = "";
        this.endTime = "";
      }
      this.init();
    },
    formatTime(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  computed: {
    tableColumnsBlc() {
      const arr = [];
      arr.push({
        title: this.$t("pointPage.activity"),
        key: "giftName"
      });
      arr.push({
        title: this.$t("pointPage.QuantityGiven"),
        render: (h, params) => {
          return h(
            "div",
            {},
            params.row.giftAmount + " " + params.row.giftCoin
          );
        }
      });
      arr.push({
        title: this.$t("pointPage.time"),
        key: "createTime"
      });
      return arr;
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
  .nowintegration {
    font-size: 24px;
    line-height: 2;
  }
  .blc_box {
    span {
      font-size: 14px;
    }
    .search_btn {
      height: 32px;
      width: 86px;
      background:#357ce1;
      color: @white-custom;
      font-size: 14px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin-left: 10px;
    }
  }
  .blc-table {
    .content{
      border:1px solid #eee;
      .title{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:0 24px;
        height:48px;
        background-color:#f2f6fa;
        .title_left{
          font-size:14px;
          color:#18232d;
          font-weight:600;
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
    }
  }
}
</style>



