<template>
    <div>
        <Table :columns="tableColumnsRecharge" :data="tableRecharge" class="escapeTables"></Table>
        <Page :total="dataCount" :current="1" @on-change="changePage" class="recharge_btn"></Page>
    </div>
</template>
<script>
export default {
  name: "rechargeList",
  props:['cointype','tableRecharge'],
  data() {
    return {
      dataCount: 0,
      coinType:'',
      allTableRecharge:[]
    };
  },
  created() {
    this.cointype = this.coinType;
  
  },
  methods: {
    changePage(index) {
        this.$emit('rechargePage',index)
    },
  
  },
  computed:{
        tableColumnsRecharge() {
            let columns = [];
            columns.push({
                title: this.$t("uc.finance.recharge.time"),
                align: "center",
                render: (h, param) => {
                    let str = param.row.createTime;
                    return h("div", {}, str);
                }
            });
            columns.push({
                title: this.$t("uc.finance.recharge.symbol"),
                align: "center",
                render: (h, param) => {
                    let str = param.row.symbol;
                    return h("div", {}, str);
                }
            });
            columns.push({
                title: this.$t("uc.finance.recharge.address"),
                align: "center",
                render: (h, param) => {
                    let str = param.row.address;
                    return h("div", {}, str);
                }
            });
            columns.push({
                title: this.$t("uc.finance.recharge.amount"),
                align: "center",
                render: (h, param) => {
                    let str = param.row.amount;
                    return h("div", {}, str);
                }
            });
            return columns;
        }
  }
};
</script>
<style></style>

