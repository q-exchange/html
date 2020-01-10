<template>
    <div>
        <Table  :columns="tablePromoteMoney" :data="dataPromoteMoney.length>0&&dataPromoteMoney||[]" :disabled-hover="true" class="escapeTables"></Table>
            <!-- <span>{{dataPromoteMoney.totalElements}}</span> -->
            <Page :current="currentPage" v-show="dataPromoteMoney.length>0&&dataPromoteMoney.total > 10" :total="parseInt(dataPromoteMoney.length>0&&dataPromoteMoney.total)" @on-change="promoteMoneyPageChange"></Page>
    </div>
</template>

<script>
const getParamFun = obj => pageNum => Object.assign(obj, pageNum);
const getParams = getParamFun({
  pageSize: 10,
  type: "",
  createStartTime: "",
  createEndTime: ""
});
// 积分类型 PROMOTION_GIVING  LEGAL_RECHARGE_GIVING  COIN_RECHARGE_GIVING("")
const map = new Map([[0, "推广"], [1, "法币充值赠送"], [2, "币币充值赠送"]]);
const mapEn = new Map([
  [0, "recommend"],
  [1, "Presentation of French Currency"],
  [2, "Currency recharge gift"]
]);
export default {
  name: "money",
  data() {
   
    return {
      loading: true,
      dataPromoteMoney: {},
      pageSize: 10,
      currentPage: 1
    };
  },
  created() {
    this.getPromotionMoney();
  },
  methods: {
    promoteMoneyPageChange(data) {
      this.currentPage = data;
      this.getPromotionMoney(data, this.pageSize);
    },
    getPromotionMoney(pageNum = 1) {
      const params = getParams({ pageNum });
      this.$http
        .post(this.host + "/uc/integration/record/page_query", params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.loading = false;
            this.dataPromoteMoney = resp.data;
          } else {
            // this.$Message.error(resp.message);
          }
        });
    }
  },
  computed: {
    lang: function() {
      return this.$store.state.lang;
    },
    tablePromoteMoney() {
         const m = this.$store.getters.lang == "English" ? mapEn : map;
      let PromoteMoneyArr = [
        {
          title: this.$t("uc.extension.type"),
          render: (h, params) => {
            return h("div", {}, m.get(params.row.type));
          }
        },
        {
          title: this.$t("uc.extension.amount"),
          key: "amount",
          align: "center"
        },
        {
          title: this.$t("uc.extension.amounttime"),
          key: "createTime",
          align: "center"
        }
      ];
      return PromoteMoneyArr;
    }
  }
};
</script>
<style lang="less" scoped>
</style>


