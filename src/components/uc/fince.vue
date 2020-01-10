<template>
    <div class="fince">
        <div class="fince_content">
            <div class="fince_head">
                <span>
                    <router-link to="/uc/coin">交易账户</router-link>&nbsp;&nbsp;&nbsp;></span>
                <span>充值记录</span>
            </div>
            <div class="recorde">
                <div class="recorde_head">
                    <p v-for="(list,index) in buttonLists" :key="list.text" :class="{checkeditem:changeActive == index}" @click="actives(index)">
                        {{list.text}}
                    </p>
                </div>
                <div class="record_content">
                    <div class="message" v-if="this.changeActive==0">
                        <getrecord :coinList='coinList' :flag='flag'></getrecord>
                    </div>
                    <div class="message" v-else-if="this.changeActive==1">
                        <rechargeList :tableRecharge="tableRecharge" @rechargePage="rechargePage" :type="coninstype"></rechargeList>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import getrecord from "./withdraw/getRecord";
import rechargeList from "./recharge/rechargeList";
export default {
  components: { getrecord, rechargeList },
  data() {
    return {
      changeActive: 0,
      coinList: [],
      coninstype: "",
      allTableRecharge:[]
    };
  },
  methods: {
    //提币记录
    getAddrList() {
      //获取地址
      this.$http
        .post(this.host + "/uc/withdraw/support/coin/info")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0 && resp.data.length > 0) {
            this.coinList = resp.data;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    //充币记录
    getCurrentCoinRecharge() {
      if (this.coninstype != "") {
        var temp = [];
        this.tableRecharge = this.allTableRecharge.filter(
          ele => ele.symbol == this.coninstype
        );
      } else {
        this.tableRecharge = this.allTableRecharge;
      }
    },
    rechargePage(index){
        this.getList(index);
    },
    getList(pageNo) {
      //获取tableRecharge
      // let memberId = 0;
      !this.$store.getters.isLogin && this.$router.push("/login");
      // this.$store.getters.isLogin && (memberId = this.$store.getters.member.id);
      const params = { unit: "", pageNo, pageSize: 10, type: "0" };
      this.$http
        .post(this.host + "/uc/asset/transaction", params)
        .then(response => {
          let resp = response.body;
          if (resp.code == 0) {
            if (resp.data) {
              this.allTableRecharge = resp.data.content || [];
              this.dataCount = resp.data.totalElements || 0;
              this.getCurrentCoinRecharge();
            }
            // this.loading = false;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },

    actives(index) {
      this.changeActive = index;
    }
  },
  created() {
    this.coninstype = this.$route.params.cointypes;
    this.getAddrList();
    this.getList(1);
    this.actives(this.changeActive);
  },
  computed: {
    buttonLists() {
      let buttonListsArr = [
        {
          text: "提币记录"
        },
        {
          text: "充币记录"
        }
      ];
      return buttonListsArr;
    }
  }
};
</script>
<style lang="less" scoped>
.fince {
  height: 1000px;
  padding-top: 48px;
  background-color: rgba(145, 148, 164, 0.15);
  .fince_content {
    width: 80%;
    margin: 20px auto;
    .fince_head {
      width: 100%;
      border-radius: 5px;
      background-color: #fff;
      line-height: 60px;
      padding-left: 20px;
      box-sizing: border-box;
      font-size: 20px;
      color: #333;
      margin: 20px 0;
      span:nth-child(1) {
        margin-right: 10px;
        color: #357ce1;
      }
    }
    .recorde {
      width: 100%;
      margin: 10px 0;

      .recorde_head {
        padding-left: 20px;
        box-sizing: border-box;
        background-color: #fff;
        margin-bottom: 5px;
        font-size: 16px;
        line-height: 50px;
        display: flex;
        cursor: pointer;
        p:nth-child(1) {
          margin-right: 20px;
        }
        .checkeditem {
          color: #3399ff;
        }
      }
      .record_content {
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;
        .message{
          margin:10px auto;
        }
      }
    }
  }
}
</style>


