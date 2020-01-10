<template>
  <div>
    <Table  class="table escapeTables" :columns="tableColumnsWithdraw" :data="tableWithdraw" :loading="loading">
    </Table>
    <Page style="margin-top:10px;" :total="transaction.total" :current="transaction.page + 1" @on-change="changePage">
    </Page>
  </div>
</template>
<script>
export default {
  name: "getrecord",
  props: ["coinList", "flag"],
  data() {
    return {
      transaction: {
        page: 0,
        pageSize: 10,
        total: 0
      },
      coinList: [],
      tableWithdraw: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    changePage(index) {
      this.transaction.page = index - 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      //获取tableWithdraw
      let params = {};
      params["page"] = this.transaction.page;
      params["pageSize"] = this.transaction.pageSize;
      this.$http
        .post(this.host + "/uc/withdraw/record", params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.tableWithdraw = resp.data.content || [];
            this.transaction.total = resp.data.totalElements;
            this.transaction.page = resp.data.number;
          } else {
            this.$Message.error(resp.message);
          }
          this.loading = false;
        });
    }
  },
  watch: {
    coinList(val) {
      this.coinList = val;
      console.log(this.coinList);
    },
    flag(val) {
      if (val) {
        this.transaction.page = 0;
        this.getList();
      }
    }
  },
  computed: {
    tableColumnsWithdraw() {
      let columns = [],
        filters = [];
      if (this.coinList.length > 0) {
        this.coinList.forEach(v => {
          filters.push({
            label: v.unit,
            value: v.unit
          });
        });
      }
      columns.push({
        title: this.$t("uc.finance.withdraw.time"),
        width: 180,
        key: "createTime"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.symbol"),
        key: "symbol",
        filters,
        filterMultiple: false,
        filterMethod(value, row) {
          return row.coin.unit === value;
        },
        render: function(h, params) {
          return h("span", params.row.coin.unit);
        }
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.address"),
        key: "address"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.num"),
        key: "totalAmount"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.fee"),
        key: "fee"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.status"),
        key: "status",
        render: (h, params) => {
          let text = "";
          if (params.row.status == 0) {
            text = this.$t("uc.finance.withdraw.status_1");
          } else if (params.row.status == 1) {
            text = this.$t("uc.finance.withdraw.status_2");
          } else if (params.row.status == 2) {
            text = this.$t("uc.finance.withdraw.status_3");
          } else if (params.row.status == 3) {
            text = this.$t("uc.finance.withdraw.status_4");
          }
          return h("div", [h("p", text)]);
        }
      });
      return columns;
    }
  }
};
</script>
<style lang="less" scoped>
</style>


