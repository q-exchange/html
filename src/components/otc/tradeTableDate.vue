<template>
  <div class="table-responsive list-table">
  	<ul class="tradelist">
		<li v-for="(coin,i) in coins" :key="i" @click="menuSelected(coin.unit)">
			<p class="unit" :class="activeMenuName==coin.unit && type==0?'buytype':activeMenuName==coin.unit && type==1?'selltype':''">{{coin.unit}}</p>
		</li>
  	</ul>
    <div class="line"></div>
    <div class="title">
      <div class="left">
        <span>自选交易</span>
        <span>更多选择，自由交易</span>
      </div>
    </div>

    <div class="table">
      <div class="head">
        <ul>
          <li style="width:18%">{{$t("otc.merchant")}}</li>
          <li style="width:10%">{{$t("otc.volume")}}</li>
          <li style="width:20%">{{$t("otc.paymethod")}}</li>
          <li style="width:15%">{{$t("otc.amount")}}</li>
          <li style="width:15%">{{$t("paper.quota")}}</li>
          <li style="width:15%">{{$t("paper.unit")}}</li>
          <li style="width:15%">{{$t("otc.operate")}}</li>
        </ul>
      </div>
      <ul class="content">
        <li v-for="(item,i) in advertiment.date.rows" :key="i">
          <div class="noclick" v-if="item.Itemclicked">
            <div class="userAvatar">
              <img :src="item.avatar" alt="" class="userImg">
              <span class="name" @click="toInfo(item.memberName)">{{item.memberName}}</span>
              <img src="../../assets/images/business_v.png" alt="" class="level" v-if="item.level==2">
            </div>
            <div style="width:10%">{{item.transactions}}</div>
            <div style="width:20%">
              <img src="https://file.eiijo.cn/common/images/pay-icon/alipay-cn.svg" alt="" v-if="item.payMode.indexOf('支付宝')!=-1">
              <img src="https://file.eiijo.cn/common/images/pay-icon/bank-cn.svg" alt="" v-if="item.payMode.indexOf('银联')!=-1">
              <img src="https://file.eiijo.cn/common/images/pay-icon/wechat-cn.svg" alt="" v-if="item.payMode.indexOf('微信')!=-1">
            </div>
            <div style="width:15%">{{item.remainAmount}}</div>
            <div style="width:15%">{{item.minLimit}}-{{item.maxLimit}} CNY</div>
            <div style="width:15%" class="price">{{item.price}} CNY</div>
            <div style="width:15%;" @click="whichItem(item.advertiseId,i)">
              <p class="operate">{{item.advertiseType==0?`${$t("otc.sell")}`:`${$t("otc.buy")}`}}</p>
            </div>
          </div>
          <div class="clicked" v-else>
            <div class="top">
              <div class="userAvatar">
                <img :src="item.avatar" alt="" class="userImg">
                <div class="userInfo">
                  <div>
                    <span class="name">{{item.memberName}}</span>
                    <img src="../../assets/images/business_v.png" alt="" class="level" v-if="item.level==2">
                  </div>
                  <p>数量 {{item.remainAmount}} USDT</p>
                </div>
                <div class="coinprice">
                  <p>{{item.price}} CNY</p>
                  <p>{{item.minLimit}}-{{item.maxLimit}} CNY</p>
                </div>
              </div>
              <div class="tranform">
                <div class="traninput">
                  <Poptip trigger="focus" :content="text1" style="width: 100%;">
                    <Input v-model="buyPrice" @on-change="transform1" @on-keyup="keyEvent1">
                      <span slot="append">CNY</span>
                    </Input>
                  </Poptip>
                  <span style="margin:0 10px;"><Icon type="md-swap" /></span>
                  <Poptip trigger="focus" :content="text2" style="width: 100%;">
                    <Input v-model="nuyNum" @on-change="transform2" @on-keyup="keyEvent2">
                      <span slot="append">USDT</span>
                    </Input>
                  </Poptip>
                </div>
                <div class="tradein" @click="submit(item.advertiseId)">下单</div>
                <div style="color:#999;cursor:pointer" @click="closeItem(i)">取消</div>
              </div>
            </div>
            <div style="padding:0 5%;">
              <div style="text-align:left;padding:10px 0;">
                <img src="https://file.eiijo.cn/common/images/pay-icon/bank-cn.svg" alt="" v-if="item.payMode.indexOf('银联')!=-1">
              	<img src="https://file.eiijo.cn/common/images/pay-icon/alipay-cn.svg" alt="" v-if="item.payMode.indexOf('支付宝')!=-1">
              	<img src="https://file.eiijo.cn/common/images/pay-icon/wechat-cn.svg" alt="" v-if="item.payMode.indexOf('微信')!=-1">
              </div>
              <div class="msg">
                <div v-show="user.remark!=''" style="color:#999;">
                  <p style="padding:10px 0;">广告方备注：</p>
                  <p>{{user.remark}}</p>
                </div>
                <div>买方付款时限为{{user.timeLimit}}分钟</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="page_change" :style="{margin:marginTop+'px'}">
      <div>
        <Page
          :pageSize="advertiment.date.pageNumber"
          :total="advertiment.date.totalElement"
          :current="advertiment.date.currentPage"
          @on-change="changePage"
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    var self = this;
    return {
      submitBtn: false,
      loading: true,
      coin: "usdt",
      advertiment: {
        date: {
          rows: [],
          currentPage: 1,
          totalPage: 1,
          pageNumber: 10,
          totalElement: 0,
          advertiseType: 1 //0卖出；1买入
        }
      },
      user:{},
      text1: "",
      text2: "",
      buyPrice: "",
      nuyNum: 0,
      remark: "",
      activeMenuName: "USDT",
      coins:[]
    };
  },
  computed: {
    priceNow: function() {
      return (
        (this.user.price + "").replace(/,/g, "").replace(/[^\d|.]/g, "") - 0
      );
    },
    minNum: function() {
      return (this.user.minLimit / this.priceNow).toFixed(8);
    },
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    member: function() {
      return this.$store.getters.member;
    },
    lang: function() {
      return this.$store.state.lang;
    },
    marginTop() {
      if (this.advertiment.date.totalElement > 10) {
        return 10;
      } else {
        return 0;
      }
    }
  },
  methods: {
    menuSelected(menuName) {
	  console.log(menuName);
	  this.$router.push("/otc/trade/" + menuName);
    },
    activeMenu() {
      let coin = this.$route.params[0] || "USDT";
      coin = coin.toUpperCase();
      switch (coin) {
        case "BTC":
          // this.activeMenuName = "coin-0";
          this.activeMenuName = "BTC";
          break;
        case "USDT":
          // this.activeMenuName = "coin-1";
          this.activeMenuName = "USDT";
          break;
        case "ETH":
          //  this.activeMenuName = "coin-2";
          this.activeMenuName = "ETH";
          break;
        default:
          //  this.activeMenuName = "coin-1";
          this.activeMenuName = "USDT";
          break;
      }
    },
    init() {
      this.$store.commit("navigate", "nav-otc");
      this.$http.post(this.host + this.api.otc.coin).then(response => {
        if (response.body.code == 0) {
		    this.coins = response.body.data;
        }
      });
    },
    whichItem(id,i){
      this.advertiment.date.rows=this.advertiment.date.rows.map(ele=>{
        ele.Itemclicked=true;
        return ele;
      })
      this.advertiment.date.rows[i].Itemclicked=false;
      this.getIdAdv(id);
    },
    closeItem(i){
      this.advertiment.date.rows[i].Itemclicked=true;
    },
    // 点击商户名跳转到商户详情
    toInfo(name){
      if (this.isLogin) {
        this.$router.push("/checkuser?id=" + name);
      } else {
        this.$router.push("/login");
      }
    },
    keyEvent1(event) {
      let val = $(event.target).val();
      if (val != "") {
        let r = /^[0-9]+\.?[0-9]{0,9}$/;
        let flag = r.test(val);
        if (!flag) {
          this.buyPrice = "";
        }
      }
    },
    keyEvent2(event) {
      let val = $(event.target).val();
      if (val != "") {
        let r = /^[0-9]+\.?[0-9]{0,9}$/;
        let flag = r.test(val);
        if (!flag) {
          this.nuyNum = "";
        }
      }
    },
    transform1() {
      if (!Number.isNaN(Number(this.buyPrice))) {
        this.nuyNum = this.round(this.div(this.buyPrice, this.priceNow), 8);
        if (/^\d+(\.\d{1,2})?$/.test(this.buyPrice)) {
          this.submitBtn = true;
        } else {
          this.submitBtn = false;
          this.text1 = this.$t("otc.tradeinfo.warning1");
        }
      } else {
        this.text1 =
          this.$t("otc.tradeinfo.warning2") +
          this.user.minLimit +
          "~" +
          this.user.maxLimit;
        this.submitBtn = false;
        return false;
      }
    },
    transform2() {
      if (!Number.isNaN(Number(this.nuyNum))) {
        this.buyPrice = this.round(this.mul(this.nuyNum, this.priceNow), 8);
        if (this.nuyNum <= this.user.number) {
          if (/^\d+(\.\d{1,8})?$/.test(this.nuyNum)) {
            this.submitBtn = true;
          } else {
            this.submitBtn = false;
            this.text2 = this.$t("otc.tradeinfo.warning3");
          }
        } else {
          this.submitBtn = false;
          return false;
        }
      } else {
        this.text2 =
          this.$t("otc.tradeinfo.warning4") +
          this.minNum +
          "~" +
          this.user.number;
        this.submitBtn = false;
        return false;
      }
    },
    round(v, e) {
      var t = 1;
      for (; e > 0; t *= 10, e--);
      for (; e < 0; t /= 10, e++);
      return Math.round(v * t) / t;
    },
    mul(a, b) {
      var c = 0,
        d = a.toString(),
        e = b.toString();
      try {
        c += d.split(".")[1].length;
      } catch (f) {}
      try {
        c += e.split(".")[1].length;
      } catch (f) {}
      return (
        (Number(d.replace(".", "")) * Number(e.replace(".", ""))) /
        Math.pow(10, c)
      );
    },
    div(a, b) {
      var c,
        d,
        e = 0,
        f = 0;
      try {
        e = a.toString().split(".")[1].length;
      } catch (g) {}
      try {
        f = b.toString().split(".")[1].length;
      } catch (g) {}
      return (
        (c = Number(a.toString().replace(".", ""))),
        (d = Number(b.toString().replace(".", ""))),
        this.mul(c / d, Math.pow(10, f - e))
      );
    },
    // 下单
    submit(id) {
      console.log(id);
      if(this.isLogin){
        if (this.submitBtn) {
          if (this.user.advertiseType == 1) {
            let param = {};
            param["id"] = id;
            param["coinId"] = this.user.otcCoinId;
            param["price"] = this.user.price;
            param["money"] = this.buyPrice;
            param["amount"] = this.nuyNum;
            param["remark"] = this.nuyNum;
            this.$http
              .post(this.host + "/otc/order/buy", param)
              .then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Message.success(resp.message);
                  let self = this;
                  setTimeout(() => {
                    self.$router.push("/chat?tradeId=" + resp.data);
                  }, 2000);
                } else {
                  this.$Message.error(resp.message);
                }
              });
          } else if (this.user.advertiseType == 0) {
            let param = {};
            param["id"] = id;
            param["coinId"] = this.user.otcCoinId;
            param["price"] = this.user.price;
            param["money"] = this.buyPrice;
            param["amount"] = this.nuyNum;
            param["remark"] = this.nuyNum;
            this.$http
              .post(this.host + "/otc/order/sell", param)
              .then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Message.success(resp.message);
                  let self = this;
                  setTimeout(() => {
                    self.$router.push("/chat?tradeId=" + resp.data);
                  }, 2000);
                } else {
                  this.$Message.error(resp.message);
                }
              });
          }
        } else {
          this.$Message.error(this.$t("otc.tradeinfo.warning5"));
        }
      }else{
         this.$router.push('/login');
      }
    },
    //获取广告
    loadAd(pageNo, advertiseType) {
      let params = {};
      params["pageNo"] = pageNo;
      params["pageSize"] = this.advertiment.date.pageNumber;
      params["advertiseType"] = advertiseType;
      params["unit"] = this.coin;
      //unit
      if (params.unit == undefined) {
        params.unit = "usdt";
      }
      this.$http
        .post(this.host + this.api.otc.advertise, params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            if (resp.data.context) {
              this.advertiment.date.rows=resp.data.context.map(ele=>{
                ele.Itemclicked=true;
                return ele;
              })
              this.advertiment.date.totalElement = resp.data.totalElement;
            } else {
              this.advertiment.date.rows = [];
              this.advertiment.date.totalElement = resp.data.totalElement;
            }
          } else {
            this.$Message.error(resp.message);
          }
          this.loading = false;
        });
    },
    changePage(page) {
      if (this.advertiment.date.advertiseType == 0) {
        this.loadAd(page, 0);
      } else {
        this.loadAd(page, 1);
      }
    },
    //获取id广告信息
    getIdAdv(id) {
      this.$http
        .post(this.host + "/otc/order/pre",{id:id})
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            console.log(resp.data);
            this.user = resp.data;
            this.text1 =
              this.$t("otc.tradeinfo.warning2") +
              this.user.minLimit +
              "~" +
              this.user.maxLimit;
            this.text2 =
              this.$t("otc.tradeinfo.warning4") +
              this.minNum +
              "~" +
              this.user.number;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
  },
  created() {
    this.coin = this.$route.params[0];
    this.loadAd(1, this.type);
    this.init();
  },
  watch: {
    $route(newVal) {
      this.coin = newVal.params["0"];
      this.loadAd(1, this.type);
    },
    type(newVal){
      this.loadAd(1,newVal);
      this.type=newVal;
    }
  }
};
</script>

<style scoped lang="less">
@import "../../my_theme/custom.less";
.ivu-menu-horizontal{
  padding:0 11%;
}
.table-responsive.list-table {
  .put {
    padding: 0 10%;
    font-size: 12px;
    color: #638bd4;
    img {
      width: 10px;
    }
    .up,
    .down {
      cursor: pointer;
      float: right;
      box-shadow: 0 2px 4px 0 rgba(99, 139, 212, 0.32);
      padding: 2px 14px;
      &:hover {
        background-color: rgb(246, 248, 245);
      }
    }
  }
  .left {
    display: flex;
    align-items: center;
    span:first-child{
      font-size:22px;
      font-weight:700;
      color:#333;
      margin-right:16px;
    }
    span {
      color: #999;
      font-size: 12px;
    }
  }
  .line {
    margin: 20px 0 0;
    background-color: rgba(239, 242, 249, 0.5);
    height: 8px;
  }
  .coin {
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(-180deg, #fff, #f6f8fb);
    padding: 30px 10%;
    .right {
      display: flex;
      align-items: center;
      .inp {
        .ivu-input-group {
          height: 40px;
          width: 400px;
          border: 1px solid #eee;
          border-radius: 5px;
        }
        /deep/ .ivu-input-group .ivu-input {
          height: 40px;
          outline: none;
          border: 0;
        }
        /deep/ .ivu-input-group-prepend {
          background-color: #fff;
          border-right: 1px solid #eee;
        }
        /deep/ .ivu-select-arrow {
          top: 70%;
        }
        /deep/ .ivu-select .ivu-select-selection {
          border: 0;
          background-color: rgba(255, 255, 255, 0.1);
        }
        /deep/ .ivu-input-group-append {
          background-color: #fff;
          color: #c4cbd3;
          border: 0;
        }
        /deep/ .ivu-select-item {
          &:hover {
            background-color: #eee;
            color: #638bd4;
          }
        }
        /deep/
          .ivu-select
          .ivu-select-dropdown
          .ivu-select-dropdown-list
          .ivu-select-item-selected {
          background-color: #eee;
          color: #638bd4;
        }
      }
      .buyBtn {
        text-align: center;
        line-height: 40px;
        font-weight: 700;
        height: 40px;
        padding: 0 24px;
        width: 144px;
        background-image: linear-gradient(90deg, #719ff2, #638bd4);
        color: #fff;
        margin-left: 16px;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
  .title {
    margin: 40px 0;
    padding: 0 10%;
  }
  .table{
    padding:0 10%;
    .head{
      padding-left:20px;
      border-bottom:1px solid #eee;
      ul{
        display:flex;
        padding-bottom:10px;
      }
      ul>li{
        font-size:14px;
        color:#999;
        text-align:center;
      }
      ul>li:first-child{
        text-align:left;
      }
    }
    .content{
      color:#333;
      text-align:center;
      .userImg{
        width:45px;
        height:45px;
        border-radius:50%;
        margin:0 10px;
      }
      .noclick{
        display:flex;
        align-items:center;
        padding:12px 0;
        width:100%;
        border-bottom:1px solid #eee;
        .userAvatar{
          width:18%;
          display:flex;
          align-items:center;
          cursor:pointer;
          .name{
            font-weight:700;
            color:rgb(99, 139, 212);
          }
          .level{
            width:19px;
            height:17px;
            margin:0 10px;
          }
        }
        .operate{
          width:70px !important;
          padding:5px 0;
          border-radius:2px;
          cursor:pointer;
          margin:auto;
          background-color: rgb(53, 124, 225);
          color:#fff;
          &:hover{
            background-color:rgb(114,164,234);
          }
        }
        .price{
          font-weight:700;
          color:rgb(72, 153, 114);
        }
      }
      .clicked{
        box-shadow:0 0 10px rgba(23, 9, 9, 0.2);
        border-radius:8px;
        padding:30px 20px 30px 0px;
        .top{
          display:flex;
          justify-content:space-between;
          .userAvatar{
            display:flex;
            .userInfo{
              text-align:left;
              .name{
                color:#638bd4;
              }
            }
            .coinprice{
              text-align:left;
              margin-left:50px;
              p:first-child{
                color:#5cb58a;
                font-weight:600;
              }
            }
          }
          .tranform{
            display:flex;
            align-items:center;
            .traninput{
              display:flex;
              align-items:center;
            }
            .tradein{
              width:60px;
              border-radius:2px;
              color:#fff;
              height:32px;
              line-height:32px;
              background-color:#357ce1;
              cursor:pointer;
              margin:0 14px;
              &:hover{
                background-color:rgb(114,164,234);
              }
            }
          }
        }
        .msg{
          display:flex;
          align-items:center;
          justify-content:space-between;
        }
      }
    }
  }
  .tradelist{
	  padding:0 11%;
	  margin-top:30px;
	  .unit{
		  font-size:16px;
		  font-weight:600;
		  color:#333;
		  cursor:pointer;
		  margin-right:40px;
		  width:4%;
	  }
	  .buytype{
		  color:#489972;
		  border-bottom:2px solid #489972;
	  }
	  .selltype{
		  color:#d6453c;
		  border-bottom:2px solid #d6453c;
	  }
  }
}
.page_change {
  margin: 55px auto;
  padding: 20px 10% 60px;
  overflow: hidden;
  /deep/ .ivu-page {
    text-align: center;
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
        background-color: #fff;
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
</style>