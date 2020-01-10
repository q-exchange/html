<template>
    <div>
        <div class="table">
            <div class="head">
                <ul>
                    <li style="width:15%">{{$t("otc.checkuser.col_symbol")}}</li>
                    <li style="width:15%">{{$t("otc.checkuser.col_paymode")}}</li>
                    <li style="width:20%">{{$t("otc.checkuser.col_num")}}</li>
                    <li style="width:15%">{{$t("otc.checkuser.col_price")+"/BTC"}}</li>
                    <li style="width:20%">{{$t("otc.checkuser.col_created")}}</li>
                    <li style="width:15%">{{$t("otc.checkuser.col_operate")}}</li>
                </ul>
            </div>
            <div v-if="tableOrderBuy.length==0" class="nodata">暂无数据</div>
            <ul class="content" v-else>
                <li v-for="(item,i) in tableOrderBuy" :key="i">
                    <div class="noclick" v-if="item.Itemclicked">
                        <div class="coinImg">
							<img src="../../assets/images/usdt.png" alt="">
							<span>{{item.unit}}</span>
						</div>
                        <div style="width:15%">
							<img src="https://file.eiijo.cn/common/images/pay-icon/bank-cn.svg" alt="" v-if="item.payMode.indexOf('银联')!=-1">
              				<img src="https://file.eiijo.cn/common/images/pay-icon/alipay-cn.svg" alt="" v-if="item.payMode.indexOf('支付宝')!=-1">
              				<img src="https://file.eiijo.cn/common/images/pay-icon/wechat-cn.svg" alt="" v-if="item.payMode.indexOf('微信')!=-1">
						</div>
                        <div style="width:20%">{{item.remainAmount}}</div>
                        <div style="width:15%">
							<p>{{item.price}} CNY</p>
							<p>{{item.minLimit}}-{{item.maxLimit}} CNY</p>
						</div>
                        <div style="width:20%" class="price">{{item.createTime}}</div>
                        <div style="width:15%;" @click="whichItem(item.advertiseId,i)">
                            <p class="operate">{{item.advertiseType==0?`${$t("otc.sell")}`:`${$t("otc.buy")}`}}</p>
                        </div>
                    </div>
                    <div class="clicked" v-else>
                        <div class="top">
                            <div class="userAvatar">
								<img src="../../assets/images/usdt.png" alt="" class="userImg">
                                <div class="userInfo">
                                    <div>
                                        <span class="name">{{item.memberName}}</span>
                                        <img
                                            src="../../assets/images/business_v.png"
                                            alt
                                            class="level"
                                            v-if="item.level==2"
                                        />
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
                                        <Input
                                            v-model="buyPrice"
                                            @on-change="transform1"
                                            @on-keyup="keyEvent1"
                                        >
                                            <span slot="append">CNY</span>
                                        </Input>
                                    </Poptip>
                                    <span style="margin:0 10px;">
                                        <Icon type="md-swap" />
                                    </span>
                                    <Poptip trigger="focus" :content="text2" style="width: 100%;">
                                        <Input
                                            v-model="nuyNum"
                                            @on-change="transform2"
                                            @on-keyup="keyEvent2"
                                        >
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
    </div>
</template>

<script>
export default {
	props:["name"],
    data() {
        return {
		  tableOrderBuy:[],
		  user:{},
		  buyPrice:"",
		  nuyNum:0,
        };
	},
	created(){
		this.getAdv(this.name);
	},
	computed:{
		priceNow: function() {
			return (
				(this.user.price + "").replace(/,/g, "").replace(/[^\d|.]/g, "") - 0
			);
		},
		minNum: function() {
			return (this.user.minLimit / this.priceNow).toFixed(8);
		},
	},
    methods:{
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
		//根据路由传来的name获取个人账户信息
        getAdv(name) {
			this.$http
				.post(this.host + "/otc/advertise/member", {
                    name: name
                }).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.tableOrderBuy = resp.data.buy.map(ele=>{
							ele.Itemclicked=true;
							return ele;
						})
                        this.user = resp.data;
                    } else {
                        this.$Message.error(resp.message);
                    }
                });
		},
		whichItem(id,i){
			this.tableOrderBuy=this.tableOrderBuy.map(ele=>{
				ele.Itemclicked=true;
				return ele;
			});
			this.tableOrderBuy[i].Itemclicked=false;
			this.getIdAdv(id);
    	},
		closeItem(i){
			this.tableOrderBuy[i].Itemclicked=true;
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
    }
};
</script>

<style scoped lang="less">
  .table{
    .head{
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
		padding-left:20px;
      }
    }
	.nodata{
		padding:40px;
		margin:auto;
		text-align:center;
	}
    .content{
      color:#333;
      text-align:center;
      .userImg{
        width:36px;
        height:36px;
        border-radius:50%;
        margin:0 10px;
      }
      .noclick{
        display:flex;
        align-items:center;
        padding:12px 0;
        width:100%;
        border-bottom:1px solid #eee;
        .coinImg{
          width:15%;
          display:flex;
		  align-items:center;
			span{
				font-weight:700;
				margin:0 10px;
			}
        }
        .operate{
          width:80px !important;
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
</style>