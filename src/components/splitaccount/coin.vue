<template>
  <div class="coin">
    <div class="til">
      <div class="til_content">
        <img src="../../assets/images/zh.png" alt="">
        <span>币币账户</span>
      </div>
    </div>
    <div class="coin_content">
      <div class="conlist">
        <div class="conlist_til">
          <i-switch v-model="googleSwitch" @on-change="changeGoogleSwitch">
            <span slot="open"></span>
            <span slot="close"></span>
          </i-switch>
          <span>隐藏小额资产</span>
          <router-link to="/uc/fince" style="margin:0 20px;">财务记录</router-link>
          <router-link to="/uc/withdraw/address">提币地址管理</router-link>
        </div>

        <div class="box">
          <dl class="box_list">
            <dt>币种名称</dt>
            <dt>可用资产</dt>
            <dt>冻结资产</dt>
            <dt>待释放资产</dt>
            <dt>操作</dt>
          </dl>
          <dl class="box_list" v-for="(item,index) in tableMoney" :key="index">
            <div>
              <dt>{{item.coinType}}</dt>
              <dt>{{item.balance||0}}</dt>
              <dt>{{item.frozenBalance||0}}</dt>
              <dt>{{item.toReleased||0}}</dt>
              <dt>
                <template v-if="item.coin.canRecharge == 1">
                  <span style="cursor:pointer;" v-if="item.address!= null&&item.address!= ''" @click="whichItem(index,name='pay')">充币</span>
                  <span v-else style="cursor:pointer;" @click="resetAddress(item.coin.unit,index)">获取地址</span>
                </template>

                <span style="cursor:pointer;" v-if="item.coin.canWithdraw == 1" @click="whichItem(index,name='carry')">提币</span>
                <span style="cursor:pointer;" @click="modal = true">划转</span>
              </dt>
            </div>
            <div v-if="item.Itemclicked==true" style="background:#fff;margin-top:50px;">
              <recharge :coin="item.coin.unit" v-if="showstatus=='1'"></recharge>

              <withdraw :coin="item.coin.unit" v-if="showstatus=='2'"></withdraw>

            </div>
          </dl>
        </div>

        <!-- <Table class="table escapeTables" :columns="tableColumnsMoney" :data="tableMoney" :loading="loading" :disabled-hover="true"></Table> -->
        <transfermodal :modal="modal" @closetransferModal="closeModal" :getmoney="getMoney"></transfermodal>
      </div>
    </div>

  </div>
</template>
<script>
import transfermodal from "../transfer/Index";
import withdraw from "../uc/Withdraw";
import recharge from "../uc/Recharge";
export default {
  // props: ["modal"],
  components: { transfermodal, withdraw, recharge },
  inject: ["reload"],
  data() {
    return {
      showstatus: "",
      modal: false,
      tableMoney: [],
      loading: true,
      googleSwitch: false,
      hiddenAccountData: [],
      showAccountData: []
    };
  },
  created() {
    this.modal = false;
    this.getMoney();
  },
  methods: {
    closeModal() {
      this.modal = false;
    },
    whichItem(index, name) {
      this.tableMoney = this.tableMoney.map(ele => {
        ele.Itemclicked = false;
        return ele;
      });
      this.tableMoney[index].Itemclicked = true;
      if (name == "carry") {
        this.showstatus = "2";
      } else if (name == "pay") {
        this.showstatus = "1";
      }
    },
    changeGoogleSwitch() {
      console.log(this.googleSwitch);
      this.googleSwitch
        ? (this.tableMoney = this.hiddenAccountData)
        : (this.tableMoney = this.showAccountData);
      console.log(this.tableMoney);
    },
    getMoney() {
      this.$http.post(this.host + "/uc/asset/wallet").then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          this.tableMoney = resp.data.map(ele => {
            ele.Itemclicked = false;
            return ele;
          });
          this.showAccountData = this.tableMoney;
          // console.log(this.tableMoney,this.showAccountData);
          for (let i = 0; i < this.tableMoney.length; i++) {
            this.tableMoney[i]["coinType"] = this.tableMoney[i].coin.unit;
            // console.log(this.tableMoney[i].balance,this.tableMoney[i].frozenBalance,this.tableMoney[i].releaseBalance);
            if (
              this.tableMoney[i].balance != "0" ||
              this.tableMoney[i].frozenBalance != "0" ||
              this.tableMoney[i].releaseBalance != "0"
            ) {
              this.hiddenAccountData.push(this.tableMoney[i]);
              // console.log(this.hiddenAccountData);
            }
          }
          this.loading = false;
        } else {
          //   this.$Message.error(this.loginmsg);
          this.$Message.error(resp.message);
        }
      });
    },
    resetAddress(unit, index) {
      let params = {};
      params["unit"] = unit;
      console.log(unit);
      let that = this;
      this.$http
        .post(this.host + "/uc/asset/wallet/reset-address", params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(this.$t("uc.finance.money.resetsuccess"));
            // this.getMoney();
            this.getMoney();
            setTimeout(function() {
              that.whichItem(index, "pay");
              //   // that.getMoney();
              //   // that.reload();
              //   // that.$router.push({
              //   //   path: "/uc/recharge",
              //   //   query: { name: unit }
              //   // });
              //   // window.location.reload();
            }, 3000);
          } else {
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
        key: "price1",
        width: 400,
        align: "center",
        render: (h, params) => {
          var actions = [];
          if (params.row.coin.canRecharge == 1) {
            if (params.row.address != null && params.row.address != "") {
              // 充币
              actions.push(
                h(
                  "Button",
                  {
                    // 充币;
                    props: {
                      type: "expand",
                      size: "small"
                    },
                    on: {
                      click: function() {
                        // self.$router.push(
                        //   "/uc/recharge?name=" + params.row.coin.unit
                        // );
                      }
                    },
                    style: {
                      marginRight: "8px"
                    }
                  },
                  self.$t("uc.finance.money.charge")
                )
              );
            } else {
              //   获取地址按钮;
              actions.push(
                h(
                  "Button",
                  {
                    props: { type: "info", size: "small" },
                    on: {
                      click: function() {
                        // self.resetAddress(params.row.coin.unit);
                        /*self.$router.push(
                                                                            "/uc/recharge?name=" + params.row.coin.unit
                                                                        );*/
                      }
                    },
                    style: {
                      marginRight: "8px"
                    }
                  },
                  self.$t("uc.finance.money.getaddress")
                )
              );
            }
          }
          if (params.row.coin.canWithdraw == 1) {
            // 提币;
            actions.push(
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: function() {
                      self.$router.push(
                        "/uc/withdraw?name=" + params.row.coin.unit
                      );
                    }
                  },
                  style: {
                    marginRight: "8px"
                  }
                },
                self.$t("uc.finance.money.pickup")
              )
            );
          }
          const btn = h(
            "Button",
            {
              props: {
                type: "info"
              },
              on: {
                click: () => {
                  this.modal = true;
                }
              },
              style: {
                marginRight: "8px"
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
@import "../../my_theme/custom.less";
.coin {
  padding: 48px 0 20px;
  // background-color: #f2f3f8;
  width: 100%;
  // min-height: 700px;
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
  .coin_content {
    width: 80%;
    margin: 20px auto;

    .conlist {
      width: 100%;
      border-radius: 3px;
      background-color: #fff;
      margin-top: 10px;

      border: 1px solid #eee;
      .conlist_til {
        text-align: right;
        // display: flex;
        background-color: #f2f6fa;
        border-bottom: 1px solid #e6ecf2;
        align-items: center;
        padding: 20px;
      }

      .box {
        width: 100%;
        padding: 10px 20px;
        .box_list {
          font-size: 12px;
          width: 100%;
          line-height: 40px;
          display: table;
          text-align: center;
          border-bottom: 1px solid #edf0ed;
          // &:hover {
          //   background-color: rgb(245, 248, 248);
          // }
          dt {
            float: left;
          }
          dt:nth-child(1) {
            width: 15%;
          }
          dt:nth-child(2),
          dt:nth-child(3),
          dt:nth-child(4) {
            width: 20%;
          }
          dt:nth-child(5) {
            width: 25%;
            span {
              color: #3399ff;
            }
          }
        }
      }
    }
  }
}
/deep/.ivu-table-body {
  td {
    .ivu-table-cell {
      p .ivu-btn {
        background: #fff;
        height: 25px;
        padding: 0 10px;
        span {
          display: inline-block;
          line-height: 25px;
          font-size: 14px;
        }
      }
      p .ivu-btn.ivu-btn-info {
        border: 1px solid @primary-custom;
        border-radius: 20px;
        span {
          color: @primary-custom;
        }
      }
      p .ivu-btn.ivu-btn-primary {
        border: 1px solid #00b275;
        border-radius: 20px;
        span {
          color: #00b275;
        }
      }
      p .ivu-btn.ivu-btn-error {
        border: 1px solid #f15057;
        border-radius: 20px;
        span {
          color: #f15057;
        }
      }
    }
  }
}
</style>
