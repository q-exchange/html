<template>
  <div class="shaow">
    <div class="til">
      <div class="til_content">
        <img src="../../assets/images/zh.png" alt="">
        <span>法币账户</span>
      </div>
    </div>
    <div class="order-table">
      <div class="hidden-assets">
        <i-switch v-model="googleSwitch" @on-change="changeGoogleSwitch">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
        <span class="hidden">{{$t('myAccount._display')}}</span>
      </div>
      <Table class="table escapeTables" :columns="tableColumnsMoney" :data="tableMoney" :loading="loading" :disabled-hover="true"></Table>
    </div>
    <transfermodal :modal="modal" @closetransferModal="closeModal" :getmoney="getMoney"></transfermodal>
  </div>
</template>
<script>
import transfermodal from "../transfer/Index";
export default {
  // props: ["modal"],
  components: { transfermodal },
  data() {
    return {
      modal: false,
      tableMoney: [],
      loading: true,
      googleSwitch: false,
      hiddenAccountData: [],
      showAccountData: []
    };
  },
  created() {
    this.getMoney();
  },
  methods: {
    closeModal() {
      this.modal = false;
    },
    changeGoogleSwitch() {
      this.googleSwitch
        ? (this.tableMoney = this.hiddenAccountData)
        : (this.tableMoney = this.showAccountData);
    },
    getMoney() {
      this.$http.post(this.host + "/uc/otc/wallet/get").then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          this.tableMoney = resp.data;
          this.showAccountData = resp.data;
          for (let i = 0; i < this.tableMoney.length; i++) {
            this.tableMoney[i]["coinType"] = this.tableMoney[i].coin.unit;
            if (
              this.tableMoney[i].balance != "0" ||
              this.tableMoney[i].frozenBalance != "0" ||
              this.tableMoney[i].releaseBalance != "0"
            ) {
              this.hiddenAccountData.push(this.tableMoney[i]);
            }
          }
          this.loading = false;
        } else {
          //   this.$Message.error(this.loginmsg);
          this.$Message.error(resp.message);
        }
      });
    }
  },
  computed: {
    tableColumnsMoney() {
      let self = this;
      let columns = [];
      columns.push({
        title: this.$t("uc.finance.money.cointype"),
        key: "coinType",
        width: 100,
        align: "center"
      });
      columns.push({
        title: this.$t("uc.finance.money.balance"),
        key: "balance",
        align: "center",
        render(h, params) {
          return h(
            "span",
            {
              attrs: {
                title: params.row.balance
              }
            },
            self.toFloor(params.row.balance || "0")
          );
        }
      });
      columns.push({
        title: this.$t("uc.finance.money.frozen"),
        key: "frozenBalance",
        align: "center",
        render(h, params) {
          return h(
            "span",
            {
              attrs: {
                title: params.row.frozenBalance
              }
            },
            self.toFloor(params.row.frozenBalance || "0")
          );
        }
      });
      columns.push({
        title: this.$t("uc.finance.money.needreleased"),
        align: "center",
        render(h, params) {
          return h(
            "span",
            {
              attrs: {
                title: params.row.toReleased
              }
            },
            self.toFloor(params.row.toReleased || "0")
          );
        }
      });
      columns.push({
        title: this.$t("uc.finance.money.operate"),
        align: "center",
        render: (h, params) => {
          var actions = [];
          const btn = h(
            "span",
            {
              on: {
                click: () => {
                  this.modal = true;
                }
              },
              style: {
                marginRight: "8px",
                color: "#357ce1",
                cursor: "pointer"
              }
            },
            self.$t("myAccount._rollout")
          );
          actions.push(btn);
          return h("p", actions);
        }
      });
      return columns;
    }
  }
};
</script>
<style lang="less" scoped>
.shaow {
  padding-top: 48px;
  width: 100%;
  // padding: 90px 10%;
   .til {
    width: 100%;
    background-color: #1b2946;
    line-height: 60px;
    padding: 0 20px;
    font-size: 18px;
    color: #fff;
    display: flex;
    align-items: center;
    .til_content {
      width: 80%;
      margin: 0 auto;
      img {
        vertical-align: middle;
      }
      //  vertical-align: middle;
    }
  }
  .order-table {
    width: 80%;
    margin: 20px auto;
    border: 1px solid #eee;
    .hidden-assets {
      height: 40px;
      margin: 0;
      line-height: 40px;
      text-align: right;
      background-color: #f2f6fa;
      padding: 0 32px;
      align-items: center;
      span:nth-last-child(1) {
        margin-left: 10px;
      }
      .hidden {
        font-size: 12px;
      }
    }
    .escapeTables.ivu-table-wrapper {
      border: 0;
      /deep/ .ivu-table .ivu-table-header th {
        color: #9aa5b5;
        font-weight: 400;
      }
    }
  }
}
</style>

