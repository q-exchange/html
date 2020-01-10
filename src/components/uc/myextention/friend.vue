<template>
    <div>
        <Table  :columns="tablePromoteFriends" :data="dataPromoteFriends.content||[]" :disabled-hover="true" class="escapeTables"></Table>
            <!-- <span>{{dataPromoteFriends.totalElements}}</span> -->
            <Page :current="currentPage" v-show="dataPromoteFriends.totalElements > 10" :total="parseInt(dataPromoteFriends.totalElements)" @on-change="promoteFriendsPageChange"></Page>
    </div>
</template>
<script>
export default {
  name: "friend",
  data() {
    return {
      loading: true,
      dataPromoteFriends: {},
      pageSize: 10,
      currentPage: 1
    };
  },
  created(){
  this.getPromotionList();
  },
  methods: {
    getPromotionList(pageNo = 1, pageSize = 10) {
      this.$http
        .post(this.host + "/uc/promotion/record", { pageNo, pageSize })
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
              this.loading=false;
            this.dataPromoteFriends = resp.data;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    promoteFriendsPageChange(data) {
      this.currentPage = data;
      this.getPromotionList(data, this.pageSize);
    }
  },
  computed: {
    tablePromoteFriends() {
      let PromoteFriendsArr = [
        {
          title: this.$t("uc.extension.username"),
          key: "username",
          align: "center"
        },
        {
          title: this.$t("uc.extension.createdtime"),
          key: "createTime",
          align: "center"
        },
        {
          title: this.$t("uc.extension.userlevel"),
          key: "level",
          align: "center",
          render: function(h, params) {
            return h("span", "V" + (parseInt(params.row.level) + 1));
          }
        }
      ];
      return PromoteFriendsArr;
    }
  }
};
</script>
<style lang="less" scoped>
</style>


