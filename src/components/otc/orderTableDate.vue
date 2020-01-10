<template>
  <div class="orderdate">
    <div class="searchWrapper">
      <Input v-model="ordKeyword" slot="extra" @on-click="handleSearch" icon="ios-search" :placeholder="$t('uc.otcorder.searchtip')" class="search"></Input>
    </div>
    <div class="order-table">
      <Table class="table escapeTables" :no-data-text="$t('common.nodata')" :columns="tableColumnsOrder" :data="tableOrder" :loading="loading" :disabled-hover="true"></Table>
      <Page v-if="totalPage > 0" :total="totalNum" :current="currentPage" @on-change="changePage" :page-size="pageSize"></Page>
    </div>
  </div>
</template>

<script>
export default {
    props: ['type'],
    data() {
        return {
            ordKeyword: "",
            whichItem: null,
            tableOrder: [],
            loading: true,
            totalPage: 0,
            pageSize: 10,
            totalNum: 0,
            currentPage: 1,
            loginmsg: this.$t("common.logintip")
        }
    },
    created() {
      this.changePage(0);
    },
    methods: {
        getOrder(status, pageNo) {
            this.loading = true;
            let params = {};
            params["status"] = status;
            params["pageNo"] = pageNo;
            params["pageSize"] = this.pageSize;
            this.currentPage = pageNo + 1;
            this.$http.post(this.host + "/otc/order/self", params).then(response => {
                var resp = response.body;
                if (resp.code == 0 && resp.data.content) {
                    this.tableOrder = resp.data.content;
                    this.totalPage = resp.data.totalPages;
                    this.totalNum = resp.data.totalElements;
                } else {
                    // this.$Message.error(resp.message);
                    // this.$Message.error(this.$t('common.logintip'));
                    this.$Message.error(this.loginmsg);
                }
                this.loading = false;
            });
        },
        changePage(pageNo) {
          if (pageNo > 0) pageNo = pageNo - 1;
          this.getOrder(this.whichItem, pageNo);
        },
        handleSearch() {
            this.tableOrder = [];
            let params = {};
            params["status"] = this.whichItem;
            if (params.status == 5) {
                params.status = "";
            }
            params["pageNo"] = 0;
            params["pageSize"] = this.pageSize;
            if (this.ordKeyword != "") {
                params["orderSn"] = this.ordKeyword;
            }
            this.currentPage = 1;
            this.$http.post(this.host + "/otc/order/self", params).then(response => {
                var resp = response.body;
                if (resp.code == 0 && resp.data.content) {
                    this.tableOrder = resp.data.content;
                    this.totalPage = resp.data.totalPages;
                    this.totalNum = resp.data.totalElements;
                } else {
                    this.$Message.error(resp.message);
                }
                this.loading = false;
            });
        },
    },
    computed: {
        tableColumnsOrder() {
            let self = this;
            let columns = [];
            columns.push({
                title: this.$t("uc.otcorder.orderno"),
                key: "orderSn",
                minWidth: 60,
                align: "center",
                render: function (h, params) {
                    return h("p", [
                        h(
                            "a",
                            {
                              on: {
                                click: function () {
                                  self.$router.push("/chat?tradeId=" + params.row.orderSn);
                                }
                              }
                            },
                            params.row.orderSn
                        )
                    ]);
                }
            });
            columns.push({
                title: this.$t("uc.otcorder.created"),
                key: "createTime",
                minWidth: 90,
                align: "center"
            });
            columns.push({
                title: this.$t("uc.otcorder.symbol"),
                key: "unit",
                // width: 80,
                align: "center"
            });
            columns.push({
                title: this.$t("uc.otcorder.type"),
                key: "type",
                // width: 90,
                align: "center",
                render: (h, params) => {
                    let text = "";
                    if (params.row.type == 0) {
                        text = this.$t("uc.otcorder.type_buy");
                    } else {
                        text = this.$t("uc.otcorder.type_sell");
                    }
                    return h("div", [h("p", text)]);
                }
            });
            columns.push({
                title: this.$t("uc.otcorder.tradename"),
                key: "name",
                // width: 80,
                ellipsis: "true",
                align: "center",
                render: function (h, params) {
                    return h("p", [
                        h(
                            "a",
                            {
                                on: {
                                    click: function () {
                                        self.$router.push("/checkuser?id=" + params.row.name);
                                    }
                                }
                            },
                            params.row.name
                        )
                    ]);
                }
            });
            columns.push({
                title: this.$t("uc.otcorder.amount"),
                key: "amount",
                align: "center"
            });
            columns.push({
                title: this.$t("uc.otcorder.money"),
                key: "money",
                align: "center"
            });
            columns.push({
                title: this.$t("uc.otcorder.fee"),
                key: "commission",
                align: "center"
            });
            return columns;
        }
    },
    watch: {
        type(newVal) {
            newVal == 5 && (newVal = null);   //全部
            this.whichItem = newVal;
            this.changePage(1);
        }
    }
}
</script>

<style scoped lang="less">
@import "../../my_theme/custom.less";
 .orderdate{
     margin:20px 0;
     position:relative;
     border:0;
    .searchWrapper{
      position: absolute;
      right: -15px;
      top: -70px;
    }
    .order-table{
      /deep/ .escapeTables.ivu-table-wrapper .ivu-table .ivu-table-header th{
        color:#999;
        font-weight:500;
      }
      .escapeTables.ivu-table-wrapper{
        border:0;
      }
      /deep/ .ivu-table-header{
        font-size:14px;
      }
      /deep/ .ivu-table-tip{
        padding:80px 0;
      }
      /deep/ .ivu-page {
        text-align:center;
        .ivu-page-item.ivu-page-item-active {
          background-color: #fff;
          border-color: #638bd4;
          color: #638bd4;
          a {
            color: #638bd4 !important;
          }
          &:hover {
            a {
              color: #638bd4 !important;
            }
          }
        }
        .ivu-page-item {
          &:hover {
            background-color:#fff;
            border: 1px solid #638bd4;
            a {
              color: #638bd4;
            }
          }
        }
        .ivu-page-prev,
        .ivu-page-next {
          &:hover {
            border: 1px solid #638bd4;
            a {
              color: #638bd4;
            }
          }
        }
      }
    }
 }
.search {
  float: right;
  width: 250px;
  margin-right: 20px;
}
</style>