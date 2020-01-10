<template>
  <div class="content-title">
    <ul class="title">
      <li v-if="isLogin" @click="getMember">发布广告</li>
      <!-- <li v-if="isLogin" @click="choice" :class="{active:selected=='order'}" class="order">
          <router-link to="/otcorder">法币订单</router-link>
			<div class="orderBox">
				<p style="color:#333">进行中订单</p>
				<div class="content">
					<div v-if="orderList.length==0" class="nodata">
						<img src="../../assets/images/nolist.png" alt="">
						<p>暂无进行中的订单</p>
					</div>
					<ul v-else>
						<li v-for="(item,i) in orderList" :key="i">
							<span @click="goChat(i)">{{item.orderSn}}</span>
						</li>
					</ul>
				</div>
				<div class="foot">
					<router-link to="/otcorder">查询所有订单</router-link>
				</div>
			</div>
      </li> -->
    </ul>
	<!-- 实名认证 -->
    <Modal v-model="nameModal" :footer-hide="true" title="实名认证" :closable="false" class="realname">
    	<p style="padding:5px 0;">为保证交易安全，请您耐心完善以下信息</p>
        <Form ref="formValidate" :model="formValidate" :label-width="100" style="text-align:center;">
        	<FormItem :label="$t('uc.safe.realname')" prop="realName">
        	  <Input v-model="formValidate.realName" size="large"></Input>
        	</FormItem>
        	<FormItem :label="$t('uc.safe.idcard')" prop="idCard">
        	  <Input v-model="formValidate.idCard" size="large"></Input>
        	</FormItem>
			<div class="upImg">
				<FormItem>
					<uploadimg txt="上传身份证正面照" imgName="imgPreview" imgShow="frontCardImg" :imgData="imgPreview" :imgSrc="frontCardImg" @success="success" />
				</FormItem>
				<FormItem>
					<uploadimg txt="上传身份证反面照" imgName="imgNext" imgShow="backCardImg" :imgData="imgNext" :imgSrc="backCardImg" @success="success" />
				</FormItem>
				<FormItem>
					<uploadimg txt="上传手持身份证照" imgName="imgLast" imgShow="handCardImg" :imgData="imgLast" :imgSrc="handCardImg" @success="success" />
				</FormItem>
			</div>

        	<span v-if="lang==='简体中文'" class="uploadimgtip">提示：上传图片仅支持.jpg、.gif、.png、.jpeg格式，且推荐大小为100kb-1024kb，否则有可能上传失败。</span>
        	<span v-else class="uploadimgtip">Tip: uploaded pictures only support.Jpg,.Gif,.Png,.Jpeg format, and recommended size is 100kb-1024kb, otherwise it may fail to upload.</span>
        </Form>
        <div class="lever-info" style="margin-top:20px;'">
          <Button type="default" @click="nameModal=false">取消</Button>
          <Button type="primary" @click="realNameSubmit('formValidate')">确定</Button>
        </div>
    </Modal>
	<Modal v-model="realfail" :footer-hide="true" title="实名审核未通过" :closable="false">
		<p>审核失败原因：{{this.failReason}}</p>
		<p>请再次认证</p>
        <div class="lever-info" style="margin-top:20px;'">
          <Button type="default" @click="realfail=false">取消</Button>
          <Button type="primary" @click="realAgain">再次认证</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import uploadimg from "../../components/uc/safe/uploadImg";
export default {
  data() {
    return {
		selected:"",
		orderList:[],
		nameModal:false,
		realfail:false,
		failReason:"",   //实名审核失败原因
		formValidate:{
			realName:"",
			idCard:""
		},
		imgPreview: "",
      	imgNext: "",
      	imgLast: "",
      	frontCardImg: require("../../assets/images/frontCardImg.png"),
      	backCardImg: require("../../assets/images/backCardImg.png"),
      	handCardImg: require("../../assets/images/HandCardImg.png")
    }
  },
  computed: {
    ...mapGetters(["isLogin", "lang"]),
    letterSpacingbig() {
      return this.lang == "English" ? 0 : 20;
    },
    letterSpacingsmall() {
      return this.lang == "English" ? 0 : 10;
    }
  },
  created(){
	  console.log(this.isLogin);
	//   this.getOrder();
  },
  methods:{
	//   审核失败后再次认证
	  realAgain(){
		  this.realfail=false;
		  this.nameModal=true;
	  },
	success(e) {
      this[e.name] = e.src;
      this[e.imgShow] = e.src;
    },
    // choice(){
    //     this.selected="order";
	// },
	goChat(i){
		let orderSn=this.orderList[i].orderSn;
		this.$router.push("/chat?tradeId=" + orderSn);
	},
	// 获取订单列表
	// getOrder() {
	// 	let params = {};
    //     params["status"] = 1;     //1未付款
    //     params["pageNo"] = 0;
    //     params["pageSize"] = 10;
    //     this.$http.post(this.host + "/otc/order/self", params).then(response => {
    //         var resp = response.body;
    //         if (resp.code == 0 && resp.data.content) {
	// 			this.orderList = resp.data.content;
    //         }
    //     });
	// },
	// 获取个人信息发布广告前判断是否实名认证
	getMember() {
      let self = this;
      this.$http
        .post(this.host + "/uc/approve/security/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
			  console.log(resp.data);
			// 判断是否实名认证
			if(resp.data.realVerified==1){
				// 实名认证通过跳转
				this.$router.push({ path: "/identbusiness" });
			}else if(resp.data.realVerified==0&&resp.data.realAuditing==0 &&resp.data.realNameRejectReason!=null){
				// 实名审核未通过弹框
				this.failReason=resp.data.realNameRejectReason;
				this.realfail=true;
			}else if(resp.data.realAuditing==1){
				this.$Message.warning("实名审核中!");
			}else{
				// 实名认证弹框
				this.nameModal=true;
			}
          } else {
            this.$Message.error(resp.message);
          }
        });
	},
	// 实名认证
    realNameSubmit(name) {
      if (!this.formValidate.realName) {
        this.$Message.error(this.$t("uc.safe.realnametip"));
        return false;
      }
      if (!this.formValidate.idCard) {
        this.$Message.error(this.$t("uc.safe.idcardtip"));
        return false;
      }
      if (this.imgPreview == "") {
        this.$Message.error(this.$t("uc.safe.upload_positivetip"));
        return false;
      }
      if (this.imgNext == "") {
        this.$Message.error(this.$t("uc.safe.upload_negativetip"));
        return false;
      }
      if (this.imgLast == "") {
        this.$Message.error(this.$t("uc.safe.upload_handtip"));
        return false;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          const param = {
            realName: this.formValidate.realName,
            idCard: this.formValidate.idCard,
            idCardFront: this.imgPreview,
            idCardBack: this.imgNext,
            handHeldIdCard: this.imgLast
          };
          this.$http.post(this.host + "/uc/approve/real/name",param).then(res=>{
            var resp = response.body;
            if (resp.code == 0) {
              this.member.realName = param.realName;
              this.$store.commit("setMember", this.member);
              this.$Message.success(this.$t("uc.safe.save_success"));
            } else {
              this.$Message.error(resp.message);
            }
          })
        }else{
          this.$Message.error(this.$t("uc.safe.save_failure"));
        }
      });
    },
  },
  components: {
	uploadimg
  },
  watch:{
	  isLogin(newVal){
		  if(newVal){
			  this.getOrder();
		  }
	  }
  }
};
</script>

<style scoped lang="less">
.content-title {
  position: relative;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  background-color: #1b2945;
  padding: 0 10%;
  .title {
        color: #638bd4;
        display: flex;
        float: right;
    li {
        cursor:pointer;
        height:60px;
        margin: 0 20px;
        a{
          color:#638bd4;
		}
		a:hover{
			color:#fff;
		}
    }
    .order{
        margin-right: 0;
        &:hover{
          .orderBox{
            display: block;
          }
		}
		.orderBox {
			display:none;
			p {
				padding: 0 20px;
				color:#333;
			}
			font-size: 14px;
			position: absolute;
			border-radius: 4px;
			width: 344px;
			top: 60px;
			right: 10%;
			z-index:999;
			background-color: #fff;
			box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
			.content {
				border-top: 1px solid #eee;
				border-bottom: 1px solid #eee;
				color:#333;
				a:hover{
					color:rgb(147,185,239);
				}
				.nodata{
					text-align:center;
					margin:120px 0;
					img{
						width:88px;
						height:99px;
					}
					p{
						color:#d9d9d9;
						font-size:12px;
						margin-top:-40px;
					}
				}
			}
			.foot {
				text-align: right;
				padding: 0 20px;
				color: #638bd4;
				cursor: pointer;
				a:hover{
					color:rgb(147,185,239);
				}
			}
		}
    }
    .active{
        a{
          color:#fff;
        }
        color:#fff;
        border-bottom:3px solid#2D8cF0;
    }
  }
  
}
.upImg{
	display:flex;
	text-align:center;
}
.realname{
	/deep/ .ivu-modal{
		width:800px !important;
	}
}
.lever-info{
	text-align:right;
	button{
		width:120px;
	}
}
</style>