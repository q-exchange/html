<template>
  <div>
    <table></table>
    <div class="nav-rights">
      <div class="nav-right">
        <otcHeader></otcHeader>
        <table></table>
        <div class="bill_box_order">
          <div class="order_box">
            <Tabs value="name5" @on-click="showItem">
              <TabPane :label="$t('uc.otcorder.all')" name="name5"></TabPane>
              <TabPane :label="$t('uc.otcorder.unpaid')" name="name1"></TabPane>
              <TabPane :label="$t('uc.otcorder.paided')" name="name2"></TabPane>
              <TabPane :label="$t('uc.otcorder.finished')" name="name3"></TabPane>
              <TabPane :label="$t('uc.otcorder.canceled')" name="name0"></TabPane>
              <TabPane :label="$t('uc.otcorder.appealing')" name="name4"></TabPane>
              <!-- <Input v-model="ordKeyword" slot="extra" @on-click="handleSearch" icon="ios-search" :placeholder="$t('uc.otcorder.searchtip')" style="width: 250px;margin-right: 20px;"></Input> -->
            </Tabs>
            <orderDate :type="whichItem"></orderDate>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
const whichItemMap = new Map([
    ['name0', 0],
    ['name1', 1],
    ['name2', 2],
    ['name3', 3],
    ['name4', 4],
    ['name5', 5],
]);
import orderDate from '../otc/orderTableDate';
import otcHeader from "../../pages/otc/otcHeader"
export default {
  components: {
    orderDate,
    otcHeader
  },
  data() {
    return {
      ordKeyword: "",
      choseBtn: 0,
      whichItem: 5,
      tableOrder: [],
      loading: true,
      totalPage: 0,
      pageSize: 10,
      totalNum: 0,
      currentPage: 1,
      loginmsg: this.$t("common.logintip")
    };
  },
  methods: {
    showItem(name) {
      this.whichItem=whichItemMap.get(name);
    },
    strpro(str) {
      let newStr = str;
      str = str.slice(1);
      var re = /[\D\d]*/g;
      var str2 = str.replace(re, function(str) {
        var result = "";
        for (var i = 0; i < str.length; i++) {
          result += "*";
        }
        return result;
      });
      return newStr.slice(0, 1) + str2;
    }
  },
};
</script>

<style scoped lang="less">
@colorwhite:#fff;
@main_theme:#3399ff;
@color666:#666;
@coloreee:#eee;
.nav-rights{
  margin-top:48px;
}
.bill_box_order {
  padding:0 10%;
  // width: 99%;
  height: auto;
  margin:60px auto 40px;
}

.order_box {
  text-align: left;
  /deep/ .ivu-tabs .ivu-tabs-bar .ivu-tabs-tab{
    color:#638bd4;
    font-size:16px;
    font-weight:700;
  }
  /deep/ .ivu-tabs .ivu-tabs-bar .ivu-tabs-tab.ivu-tabs-tab-active.ivu-tabs-tab-focused{
    color:#333;
  }
  /deep/ .ivu-tabs-ink-bar{
    background-color:#333;
  }
}

.order_box a {
  color: #0b0d1b;
  font-size: 16px;
  padding: 0 30px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 54px;
  display: inline-block;
}

.order_box .active {
  border-bottom: 2px solid #00b5f6;
}

.order_box .search {
  width: 300px;
  height: 32px;
  display: flex;
}
</style>

