<template>
  <div>
    <table></table>
    
    <div class="container">
      <otcHeader style="margin-top:48px"></otcHeader>
      <div class="content">
        <div style="width: 80%;margin: 0 auto;margin-bottom: 60px;">
          <div class="ident-title" v-if="certStatus === 0">
            <!-- 申请认证商家 -->
            <p style="font-size:32px;font-weight:400;color:#333;">{{$t('uc.identity.apply')}}</p>
            <span style="color:#999;font-size:14px;">成为商家，获得广告发布权限，享受更多交易特权。</span>
          </div>
          <!-- prepare:准备资料； review：提交审核； result:审核结果；certified：已认证 ; shenheshibai：审核失败-->
          <Steps class="apply-step" :current="certStatus == 2 ? 3 : certStatus == 3 ? 2 : certStatus" :status="certStatus == 3 ? 'error' :'finish'" v-if="certStatus != 0 && certStatus != 5 && certStatus != 6 && certStatus != 7">
            <Step :title=prepare></Step>
            <Step :title=review></Step>
            <Step :title="certStatus == 1 || certStatus == 0  ? result : certStatus == 2 ? certified : shenheshibai"></Step>
          </Steps>
          <!-- shangjiazhuxiao：商家注销  tijiaoshenqing：提交申请 shenheshibai：审核失败；passed：审核通过-->
          <Steps class="apply-step" :current="certStatus == 5 ? 1 : certStatus == 6 ? 2 : 3" :status="certStatus == 6 ? 'error':'finish'" v-if="certStatus == 5 || certStatus == 6 || certStatus == 7">
            <Step :title=shangjiazhuxiao></Step>
            <Step :title=tijiaoshenqing></Step>
            <Step :title="certStatus == 5 ? result : certStatus == 6 ? shenheshibai : passed"></Step>
          </Steps>

          <div v-if="certStatus == 6" style="width: 500px;margin: 0 auto;text-align: center;">
            <Button type="warning" style="width: 120px;background:#3399ff;border-color:#3399ff" @click="modal_return=true" long size="large">{{$t("uc.identity.shenagain")}}</Button>
            <div class="fail-reason" style="margin-top: 50px;font-size: 16px;">
              <Icon type="md-alert" color="red" size="16" />
              <span style="margin-left: 10px;">{{$t('uc.identity.yuanyin')}}：{{refuseReason}}</span>
            </div>
          </div>

          <div v-if="certStatus == 7" style="width: 500px;margin: 0 auto;text-align: center;">
            <Button type="warning" style="width: 120px;background:#3399ff;border-color:#3399ff" @click="modal_read=true" long size="large">{{$t("uc.identity.sheqinggain")}}</Button>
          </div>

          <div v-if="certStatus == 3" style="width: 500px;margin: 0 auto;text-align: center;">
            <Button type="warning" style="width: 120px;background:#357ce1;border-color:#357ce1" @click="modal_read=true" long size="large">{{$t("uc.identity.shenagain")}}</Button>
            <div class="fail-reason" style="margin-top: 50px;font-size: 16px;">
              <Icon type="md-alert" color="red" size="16" />
              <span style="margin-left: 10px;">{{$t("uc.identity.reason")}}：{{certReason}}</span>
            </div>
          </div>

          <div v-else-if="certStatus == 2" style="width: 500px;margin: 0 auto;text-align: center;">
            <Button type="warning" style="width: 120px;background:#357ce1;border-color:#357ce1" @click="publishAd" long size="large">{{$t('nav.fabu')}}</Button>
            <div style="margin-top: 30px;font-size: 16px;text-align: center;">
              <a @click="returnAdit" style="color: #aaa;">{{$t("uc.identity.shenqingtuibao")}}</a>
            </div>
          </div>
        </div>
        <!-- 认证商家第一步 -->
        <div class="ipshang" :class="certStatus != 0 ? 'applying' : '' ">
          <div class="ident-title" v-if="certStatus == 3">
            <h3 style="font-size:32px">{{$t('uc.identity.apply')}}</h3>
            <p style="font-size: 14px;margin-top: 10px"> {{$t('uc.identity.become')}}</p>
          </div>
          <div class="ident-title" v-else-if="certStatus == 2">
            <h3 style="font-size:32px;font-weight:400;">{{$t("uc.identity.getquan")}}</h3>
          </div>
          <!-- 第一步 -->
          <Row style="margin-top:40px;">
            <div class="business-feature">
              <Col span="8">
                <div class="business-function">
                  <img alt="" src="../../assets/images/ad.png" class="msgImg">
                  <p class="title">{{$t('uc.identity.seat')}}</p>
                  <span class="titleMsg">{{$t("uc.identity.zhusnhu")}}</span>
                </div>
              </Col>
              <Col span="8">
                <div class="business-function">
                  <img alt="" src="../../assets/images/vip.png" class="msgImg">
                  <p class="title">{{$t('uc.identity.service')}}</p>
                  <span class="titleMsg">{{$t("uc.identity.service")}}</span>
                </div>
              </Col>
              <Col span="8">
                <div class="business-function">
                  <img alt="" src="../../assets/images/serve.png" class="msgImg">
                  <p class="title">{{$t('uc.identity.lowfee')}}</p>
                  <span class="titleMsg">{{$t("uc.identity.lowfee")}}</span>
                </div>
              </Col>
            </div>
          </Row>
          <!-- 同意第一步的协议 -->
          <div v-show="certStatus === 0" style="text-align: center;font-size: 16px;margin-top:50px">
            <Checkbox v-model="single"></Checkbox>
            <span style="color:#999;">{{$t("uc.identity.read")}}</span>
            <router-link target="_blank" to="/helpdetail?cate=1&id=6&cateTitle=常见问题" class="cur" style="color:rgb(122, 152, 247);">{{$t('uc.identity.agreement')}}</router-link>
          </div>
          <!-- 同意第一步的按钮 -->
          <div v-show="certStatus === 0" class="sq">
			  	<Button @click="apply" class="butapply" v-if="single">{{$t("uc.identity.lijishenqing")}}</Button>
            	<div class="butdisabled" v-else>{{$t("uc.identity.lijishenqing")}}</div>
          </div>
        </div>

        <!-- 商家end -->
        <!-- 发送邮件 -->
        <div class="mail" v-show="isShowMailt">
          <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input><br/>
          <Input v-model="value" placeholder="Enter something..." style="width:202px"></Input>
          <Button type="info">{{$t('uc.identity.sendcode')}}</Button><br/>
          <Button type="info" style="margin-top: 25px; width: 297px;">{{$t('uc.identity.confirm')}}</Button>
        </div>
        <!-- 邮件end -->
      </div>
      <!-- 提交审核中 -->
      <div class="submittedAudit" v-show="activeStepIndex === 1">
        <img src="../../assets/img/accomplish.png" alt="">
      </div>
      <!-- end -->
      <!-- 审核成功 -->
      <div class="auditSuccess" v-show="activeStepIndex === 2">
        <img src="../../assets/img/accomplish.png" alt="">
      </div>

      <!-- 如何申请成为商家 -->
      <applayread :modalRead='modal_read' @modalstatus='modalstatus'></applayread>

      <!-- 填写资料 -->
      <fillinformation :modalApply='modal_apply' @submitapply='submitapply' :amount='amount' :auditCurrency='auditCurrency'></fillinformation>

      <!-- 申请退保 -->
      <Modal v-model="modal_return">
        <p slot="header" style="text-align: center;">{{$t("uc.identity.tips")}}</p>
        <p style="text-align: center;font-size: 14px;">{{$t("uc.identity.wufachexiao")}}</p>
        <p style="text-align: center;font-size: 14px;">{{$t("uc.identity.suredo")}}</p>
        <Input v-model="returnReason" type="textarea" :placeholder=placeholder :rows="4"></Input>
        <div slot="footer">
          <Button type="default" @click="modal_return=false">{{$t('uc.identity.cancel')}}</Button>
          <Button type="primary" @click="returnAudit">{{$t('uc.identity.confirm')}}</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import applayread from "../../components/otc/applyread";
import fillinformation from "../../components/otc/fillinformation";
import otcHeader from "../otc/otcHeader"
const certifMap = new Map([
  [0, "uc.identity.apply"],
  [1, "uc.identity.tijiao"],
  [2, "uc.identity.tijiaosuc"],
  [3, "uc.identity.tijiaofail"],
  [5, "uc.identity.zhuxiaotijiao"],
  [6, "uc.identity.shenhefail"],
  [7, "uc.identity.shenhesuc"]
]);
export default {
  components: {
    applayread,
    fillinformation,
    otcHeader
  },
  data() {
    return {
      single: false,
      value: "",
      isShowShang: true,
      isShowMailt: false,
      isShowSubmitted: false,
      isShowSuccess: false,
      activeStepIndex: 0,
      emailAdress: "kefu@XX网.pro",
      steps: [
        this.$t("uc.identity.prepare"),
        this.$t("uc.identity.review"),
        this.$t("uc.identity.passed")
      ],
      certStatus: 0, //认证申请状态，0:未申请，1：审核中，2：已认证，3：认证失败
      certifTile: "", //不同状态不同标题
      certReason: "",
      auditCurrency: "",
      auditText: "",
      modal_read: false,
      modal_return: false,
      modal_apply: false,
      returnReason: "",
      refuseReason: "",
      amount: ""
    };
  },
  methods: {
    submitapply() {
      this.modal_apply = false;
      this.certStatus = 1;
    },
    modalstatus() {
      this.modal_read = false;
      this.modal_apply = true;
    },
    islogin() {
      let self = this;
      //判断是否进行实名认证；
      this.$http
        .post(this.host + "/uc/approve/security/setting", {})
        .then(response => {
          let resp = response.body;
          if (resp.code == 0) {
            if (resp.data.realName == null || resp.data.realName == "") {
              this.$Message.warning(this.$t("otc.publishad.submittip1"));
              self.$router.push("/uc/safe");
            } else if (resp.data.phoneVerified == 0) {
              this.$Message.warning(this.$t("otc.publishad.submittip2"));
              self.$router.push("/uc/safe");
            } else if (resp.data.fundsVerified == 0) {
              this.$Message.warning(this.$t("otc.publishad.submittip3"));
              self.$router.push("/uc/safe");
            }
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    publishAd() {
      this.$router.push("/uc/ad/create");
    },
    returnAdit() {
      this.modal_return = true;
    },
    returnAudit() {
      let params = {};
      params["detail"] = this.returnReason;
      this.$http
        .post(this.host + "/uc/approve/cancel/business", params)
        .then(res => {
          let resp = res.body;
          if (resp.code == 0) {
            this.$Message.success("提交成功!");
            this.modal_return = false;
            this.getSetting();
          } else {
            this.$Message.error(resp.message);
          }
        });
    },

    getSetting() {
      this.$http
        .get(this.host + this.api.uc.identification)
        .then(res => {
          let certifiedBusinessStatus = res.body.data.certifiedBusinessStatus;
          this.certifTile = certifMap.get(certifiedBusinessStatus);
          this.certStatus = this.activeStepIndex = certifiedBusinessStatus;
          this.certReason = res.body.data.detail;
          this.refuseReason = res.body.data.reason;
        })
        .catch(function(error) {});
    },

    getAuthFound() {
      this.$http
        .get(this.host + "/uc/approve/business-auth-deposit/list")
        .then(res => {
          var resp = res.body;
          if (resp.code == 0) {
            console.log(resp);
            this.auditCurrency = resp.data;
            var tempText = "";
            for (var i = 0; i < resp.data.length; i++) {
              if (i == 0) {
                this.amount = resp.data[i].amount;
              }
              tempText += resp.data[i].amount + "个" + resp.data[i].coin.unit;
              if (i < resp.data.length - 1) tempText += "或";
            }
            this.auditText = tempText;
          }
        });
    },
    apply() {
      let stasingle = this.single;
      if (stasingle == false) {
        this.$Message.warning(this.$t("uc.identity.approve"));
        return;
      }
      this.modal_read = true;
      return;
      this.$http
        .get(this.host + this.api.uc.apply)
        .then(res => {
          var resp = res.body;
          if (resp.code == 0) {
            this.$Message.success(resp.message);
            this.activeStepIndex = 1;
          } else {
            this.$Message.warning(resp.message);
          }
        })
        .catch(function(error) {
          this.$Message.error(error);
        });
    }
  },
  created() {
    //this.timer();
    this.islogin();
    this.getSetting();
    this.getAuthFound();
  },
  computed: {
    lang: function() {
      return this.$store.state.lang;
    },
    prepare() {
      return this.$t("uc.identity.prepare"); //准备资料
    },
    review() {
      return this.$t("uc.identity.review"); // 提交审核
    },
    result() {
      return this.$t("uc.identity.result"); //等待结果
    },
    certified() {
      return this.$t("uc.identity.certified"); //已认证
    },
    shenheshibai() {
      return this.$t("uc.identity.shenheshibai"); //审核失败
    },
    shangjiazhuxiao() {
      return this.$t("uc.identity.shangjiazhuxiao"); //商家注销
    },
    tijiaoshenqing() {
      return this.$t("uc.identity.tijiaoshenqing"); //提交申请
    },
    shenheshibai() {
      return this.$t("uc.identity.shenheshibai"); //审核失败
    },
    passed() {
      return this.$t("uc.identity.passed"); //审核通过
    }
  },
  watch: {
    lang: function() {}
  }
};
</script>

<style lang="less" scoped>
@ivu-steps-item-background-border: #313654;
@import "../../my_theme/custom.less";
@import url("../../less/business/light.less");
.container {
  background-color: @bsBg;
  .content {
    width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
    height: 100%;
    background: @bsconeBg;
    .ipshang.applying {
      padding: 40px 0;
    }
    .business-function {
      width: 275px;
      height:344px;
      margin: 0 auto;
      background-color: @bssjBg;
      box-shadow:0 4px 12px rgba(0,0,0,.1);
      padding:20% 28px;
      .msgImg{
        width:64px;
        height:64px;
        border-radius:50%;
	  }
	  .title{
		margin-top:28px;
		font-weight:400;
		color:#333;
		margin-bottom:10px;
	  }
	  .titleMsg{
		  line-height:1.6;
		  width:186px;
		  text-align:center;
		  color:#999;
	  }
    }
    /deep/  .apply-step.ivu-steps.ivu-steps-horizontal {
    .ivu-steps-item.ivu-steps-status-finish {
      .ivu-steps-tail {
        i {
          &:after {
            background: @primary-custom;
          }
        }
      }
      .ivu-steps-head{
            background-color: @bsfulleBg;
            .ivu-steps-head-inner {
          background-color: rgb(53, 124, 225);
          border-color: rgb(53, 124, 225);
        }
      }
      .ivu-steps-main {
        .ivu-steps-title {
          background-color:@bsfulleBg;
          color: #666;
        }
      }
    }
  }
  }
}
.previewImg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.ip .ivu-col {
  line-height: 37px;
  text-align: left;
  padding-left: 139px;
}
.ipshang {
  overflow: hidden;
}

.sq {
  width: 1200px;
  margin-top: 50px;
  text-align: center;
  margin-bottom: 50px;

.butdisabled{
	width: 270px;
  	font-size: 18px;
  	margin:auto;
  	height: 50px;
	line-height:50px;
	background-color:rgba(229,235,245,.7);
	color:rgba(154,169,181,.7);
	cursor:not-allowed;
		&:hover{
			background-color: rgb(245,245,250)
		}
	}
	.butapply{
		outline:none;
		border:0;
		width:270px;
		background-color:#357ce1;
		height:50px;
		color:#fff;
		border-radius:0;
		font-size:18px;
		&:hover{
			background-color:rgb(114,164,234);
		}
	}
}
.xian {
  width: 100%;
  height: 1px;
  margin-top: 105px;
  border-top: @border-width_primary @border-style_dotted #ececec;
}

.tit {
  font-size: 16px;
  line-height: 25px;
  border-left: 5px @border-style_solid @primary-custom;
  padding-left: 15px;
}
.plancon {
  width: 64%;
  margin: 49px auto;
  position: relative;
}
.plan {
  position: absolute;
  height: 36px;
  width: 100%;
  top: -13px;
}
.plans {
  position: absolute;
  height: 36px;
  width: 100%;
  top: 13px;
}
.plan div {
  z-index: 99;
  float: left;
  width: 33.33%;
  color: @white-custom;
  height: 31px;
  line-height: 31px;
  text-align: center;
  background: url("../../assets/img/2.png") center no-repeat;
  background-size: contain;
}
.action {
  z-index: 99999 !important;
  float: left;
  width: 25%;
  height: 31px;
  line-height: 31px;
  text-align: center;
  background-size: contain;
  background: url("../../assets/img/1.png") center no-repeat !important;
}
.plans div {
  z-index: 99;
  float: left;
  width: 33.333%;
  height: 53px;
  line-height: 53px;
  font-size: 14px;
  text-align: center;
  background-size: contain;
}
.plancon span {
  background: #ececec;
  height: 1px;
  width: 65%;
  display: inherit;
  margin: 0 auto;
}
.ivu-col-span-8 p {
  font-size: 19px;
}
.peakfire {
  width: 1000px;
  margin: 0 auto;
  height: 80px;
  line-height: 80px;
  border: @border-width_primary @border-style_solid #eaeaea;
  margin-top: 43px;
  padding-left: 25px;
}
.peakfire span {
  color: #3faef5;
}
.mail {
  width: 1000px;
  margin: 87px auto;
  text-align: center;
  line-height: 50px;
  display: none;
}
.submittedAudit {
  width: 1000px;
  margin: 87px auto;
  text-align: center;
  display: none;
}
.auditSuccess {
  width: 1000px;
  margin: 87px auto;
  text-align: center;
  display: none;
}
.apply-note {
  font-size: 14px;
}
.apply-note h3 {
  padding: 20px 0;
  font-size: 16px;
}
.apply-note ul {
  list-style: initial;
  padding-left: 20px;
}
.apply-content {
  width: 80%;
  margin: 0 auto;
}
.apply-title {
  text-align: center;
}
.apply-title h3 {
  font-size: 20px;
}
.apply-title p {
  font-size: 14px;
  padding: 10px 0;
}
.ident-title {
  text-align: center;
  font-size: 20px;
}
.apply-step {
  padding: 50px 0;
  margin-left: 150px;
}
.apply-step .ivu-steps-title {
  display: block;
}

.ipshang {
  .sq {
    button {
      &:active {
        border-color: @primary-custom;
      }
    }
    button.ivu-btn {
      &:focus {
        box-shadow: 2px 2px 5px @white-custom, -2px -2px 4px @white-custom;
      }
      &:hover {
        border: @border-width_primary @border-style_solid @primary-custom;
      }
    }
  }
}
/deep/ .ivu-form-item {
  margin-bottom: 24px;
}
/deep/
  .ivu-steps-item.ivu-steps-status-finish
  .ivu-steps-head-inner
  > .ivu-steps-icon,
.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner span {
  color: @white-custom !important;
}
/deep/ .ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail > i:after {
  background: @ivu-steps-item-background-border;
}
/deep/ .v-transfer-dom {
  .ivu-modal-wrap {
    .ivu-modal-content {
      .apply-content {
        form.apply-form.ivu-form.ivu-form-label-top {
          .ivu-form-item-content {
            .ivu-input {
              &:hover {
                border-color:#357ce1;
              }
              &:focus {
                border-color:#357ce1;
                box-shadow: 2px 2px 5px @white-custom,
                  -2px -2px 4px @white-custom;
              }
            }
            .ivu-select.ivu-select-single {
              .ivu-select-selection {
                &:hover {
                  border-color: @primary-custom;
                }
                box-shadow: 2px 2px 5px @white-custom,
                  -2px -2px 4px @white-custom;
              }
            }
            .ivu-select-visible .ivu-select-selection {
              border-color: @primary-custom;
            }
          }
          .ivu-row {
            .ivu-upload.ivu-upload-drag {
              &:hover {
                border-color: @primary-custom;
              }
            }
          }
          .ivu-form-item-content {
            button {
              &:focus {
                box-shadow: 2px 2px 5px @white-custom,
                  -2px -2px 4px @white-custom;
              }
            }
          }
        }
      }
      .ivu-modal-body {
        .apply-note {
          button {
            &:focus {
              box-shadow: 2px 2px 5px @white-custom, -2px -2px 4px @white-custom;
            }
          }
        }
      }
    }
  }
}
/deep/ .ivu-btn-primary {
  background:#357ce1;
  border:1px solid #357ce1;
  &:hover {
    background:#357ce1;
    border:1px solid #357ce1;
  }
}
/deep/ .ivu-btn-text {
  &:hover {
    color: @primary-custom;
  }
}
/deep/ .ivu-checkbox-checked .ivu-checkbox-inner {
  background-color: #357ce1 !important;
  border: 1px solid #357ce1 !important;
}
/deep/ li.ivu-upload-list-file.ivu-upload-list-file-finish {
  &:hover {
    span {
      color: @primary-custom;
    }
  }
}
</style>


