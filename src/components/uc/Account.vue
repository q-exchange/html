<template>
  <div class="account">
    <div class="accounthead">
      <div class="account_content">
        <div class="lef">
          <div class="userPic">
            {{usernameS}}
          </div>
          <div class="userPhone">
            <span>{{userInfo.username}}</span>
          </div>
        </div>
        <div class="rig">
          <router-link to="/identbusiness">
            <Icon type="ios-list-box-outline" size="30" />&nbsp;&nbsp;&nbsp;&nbsp;广告权限申请</router-link>
        </div>
      </div>
    </div>
    <div class="way">
      <div class="way_head">
        <span>收款方式</span>
        <span>请务必使用您本人的实名账户，被激活的收款方式将在交易时向买方展示，最多激活3种</span>
      </div>
      <div class="way_content">
        <div v-if="user.bankVerified!=1&&user.aliVerified!=1&&user.wechatVerified!=1">
          <img src="../../assets/images/atu.png" alt="" style="width:70px;border-radius:50%;margin-bottom:10px;">
          <p>暂未添加收款方式</p>
          <Button type="primary" ghost @click="addway" style="background:#fff;font-size:14px; width:130px;margin-top:20px;">+ 添加收款方式</Button>
        </div>
        <!-- 银行卡 -->
        <div class="hasbind" v-if="user.bankVerified==1">
          <div class="bindname">
            <img src="https://file.eiijo.cn/common/images/pay-icon/bank-cn.svg" alt="">
            <span>{{user.realName}}</span>
            <span> {{String(user.bankInfo.cardNo).substring(0,4)}}****{{String(user.bankInfo.cardNo).substr(user.bankInfo.cardNo.length-4)}}</span>
          </div>
          <div class="edito" @click="wayeditor('0')"> 修改</div>
        </div>
        <!-- 支付宝 -->
        <div class="hasbind" v-if="user.aliVerified==1">
          <div class="bindname">
            <img src="https://file.eiijo.cn/common/images/pay-icon/alipay-cn.svg" alt="">
            <span>{{user.realName}}</span>
            <span>{{user.alipay.aliNo}}</span>
          </div>
          <div class="edito" @click="wayeditor('1')"> 修改</div>
        </div>
        <!-- 微信 -->
        <div class="hasbind" v-if="user.wechatVerified==1">
          <div class="bindname">
            <img src="https://file.eiijo.cn/common/images/pay-icon/wechat-cn.svg" alt="">
             <span>{{user.realName}}</span>
            <span>{{user.wechatPay.wechat}}</span>
          </div>
          <div class="edito" @click="wayeditor('2')"> 修改</div>
        </div>

        <div class="adds" v-if="user.bankVerified==0||user.aliVerified==0||user.wechatVerified==0">
          <span @click="addmodal=true"> + 添加收款方式</span>
        </div>
      </div>
      <Modal v-model="addmodal" title="添加收款方式" :footer-hide="true" :mask-closable="false" :closable="false">
        <p style="margin-bottom:10px;">收款方式</p>
        <Select v-model="getway" placeholder="请选择一种收款方式" style="margin-bottom:10px;" :disabled='goeditor'>
          <Option value="0" :disabled="user.bankVerified==1?true:false">银行卡</Option>
          <Option value="1" :disabled="user.aliVerified==1?true:false">支付宝</Option>
          <Option value="2" :disabled="user.wechatVerified==1?true:false">微信</Option>
        </Select>
        <!-- 银行卡 -->
        <bindcard @submitcard='submitcard' @cancelwx='cancelwx' :getcard='getcard' v-show="getway=='0'"></bindcard>
        <!-- 支付宝 -->
        <bindali @submitali='submitali' @cancelwx='cancelwx' :getali='getali' v-show="getway=='1'"></bindali>
        <!-- 微信 -->

        <bindwx @submitwx='submitwx' @cancelwx='cancelwx' :getwx='getwx' v-show="getway=='2'"></bindwx>
        <div class="btns" v-if="!getway" style="text-align:right;">
          <Button type="defaualt" @click="addmodal=false">取消</Button>
          <Button type="primary" @click="complete" style="width:80px;">完成设置</Button>
        </div>
      </Modal>
    </div>

  </div>

</template>
<script>
import bindcard from "./account/bindcard";
import bindali from "./account/bindali";
import bindwx from "./account/bindwx";
export default {
  components: {
    bindcard,
    bindali,
    bindwx
  },
  data() {
    return {
      goeditor: false,
      addmodal: false, //添加收款方式
      footbtn: true,
      getway: "",
      isNoName: true,
      msg: "",
      choseItem: 0,
      user: {},
      getali: {},
      getwx: {},
      getcard: {},
      userInfo: {},
      usernameS: ""
    };
  },
  methods: {
    addway(){
      if(this.user.realName){
         this.addmodal=true;
      }else{
         this.$Message.error('请先完成实名认证！');
      }
     
    },
    wayeditor(index) {
      this.addmodal = true;
      this.getway = index;
      this.goeditor = true;
    },
    complete() {
      if (!this.getway) {
        this.$Message.error("请选择收款方式");
      }
    },
    //银行卡
    submitcard(param) {
      if (this.user.bankVerified == 1) {
        //修改
        this.$http
          .post(this.host + "/uc/approve/update/bank", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.account.save_success"));
              this.cancelwx();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      } else {
        //设置
        this.$http
          .post(this.host + "/uc/approve/bind/bank", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.account.save_success"));
              this.cancelwx();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
    },
    //支付宝
    submitali(param) {
      if (this.user.aliVerified == 1) {
        this.$http
          .post(this.host + "/uc/approve/update/ali", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.account.save_success"));
              this.cancelwx();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      } else {
        this.$http
          .post(this.host + "/uc/approve/bind/ali", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.account.save_success"));
              this.cancelwx();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
    },
    //微信
    submitwx(param) {
      if (this.user.wechatVerified == 1) {
        this.$http
          .post(this.host + "/uc/approve/update/wechat", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.account.save_success"));
              this.cancelwx();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      } else {
        this.$http
          .post(this.host + "/uc/approve/bind/wechat", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              param.password = "";
              this.$Message.success(this.$t("uc.account.save_success"));
              this.cancelwx();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
    },
    cancelwx() {
      this.addmodal = false;
      this.getway = "";
      this.getAccount();
    },

    showItem(index) {
      this.choseItem = index;
      //   this.formValidate1.password = "";
      //   this.formValidate2.password = "";
      //   this.formValidate3.password = "";
    },
    noName() {
      this.$Message.error(this.msg);
    },
    getMember() {
      //获取个人安全信息
      return this.$http
        .post(this.host + "/uc/approve/security/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.userInfo = resp.data;
            this.usernameS = this.userInfo.username.slice(0, 1);
          } else {
            this.$Message.error(this.loginmsg);
          }
        });
    },
    getAccount() {
      //获取个人账户信息
      this.$http
        .post(this.host + "/uc/approve/account/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.user = resp.data;
            let ali = {
              name: resp.data.realName,
              alipay: resp.data.alipay == null ? "" : resp.data.alipay.aliNo,
              aliImg:
                resp.data.alipay == null
                  ? "https://wangzhanzhaopian.oss-cn-shanghai.aliyuncs.com/20190509152321.png"
                  : resp.data.alipay.qrCodeUrl
            };
            this.getali = ali;
            let wx = {
              name: resp.data.realName,
              wechat:
                resp.data.wechatPay == null ? "" : resp.data.wechatPay.wechat,
              weImg:
                resp.data.wechatPay == null
                  ? "https://wangzhanzhaopian.oss-cn-shanghai.aliyuncs.com/20190509152321.png"
                  : resp.data.wechatPay.qrWeCodeUrl
            };
            this.getwx = wx;
            let card = {
              name: resp.data.realName,
              bankName:
                resp.data.bankInfo == null ? "" : resp.data.bankInfo.bank,
              bankBranch:
                resp.data.bankInfo == null ? "" : resp.data.bankInfo.branch,
              bankNo:
                resp.data.bankInfo == null ? "" : resp.data.bankInfo.cardNo
            };
            this.getcard = card;
            // this.usernameS = (this.user.username + '').slice(0, 1)
            // this.dataCount = resp.data.length
            this.isNoName = false;
          } else {
            this.msg = resp.message;
            this.$Message.error(resp.message);
            // this.$router.push("/uc/safe");
          }
        });
    }
  },
  created() {
    this.getAccount();
    this.getMember();
  },
  computed: {}
};
</script>
<style scoped lang='less'>
.account {
  padding-top: 48px;
  /deep/.ivu-modal-body {
    padding: 16px 30px;
  }
  .accounthead {
    width: 100%;
    background-color: #1b2945;
    padding: 46px 0;
    .account_content {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .lef {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .userPic {
          width: 50px;
          line-height: 50px;
          margin-right: 30px;
          text-align: center;
          font-size: 24px;
          background: #5d8cc2;
          border-radius: 50%;
          color: #fff;
        }
        .userPhone {
          span {
            color: #d2d6ec;
            font-size: 24px;
          }
        }
      }
      .rig {
        width: 180px;
        background-color: #357ce1;
        text-align: center;
        padding: 10px 0;
        border-radius: 2px;
        a {
          color: #fff;
        }
      }
    }
  }
  .way {
    width: 80%;
    margin: 20px auto;
    border: 1px solid #e6ecf2;
    border-radius: 2px;
    .hasbind {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px 10px;
      .bindname {
        img {
          vertical-align: middle;
        }
        span:nth-last-child(2) {
          margin: 0 16px 0 24px;
        }
      }
      .edito {
        color: #357ce1;
        cursor: pointer;
      }
    }
    .adds {
      text-align: right;
      color: #357ce1;
      padding-right: 20px;
      margin-top: 10px;
      position: relative;
      padding-top: 30px;
      &::before {
        content: "";
        display: block;
        border-top: 1px solid #e6ecf2;
        position: absolute;
        top: 0;
        left: 0;
        width: 90%;
        margin-left: 105px;
      }
    }
    .way_head {
      background-color: #f2f6fa;
      height: 48px;
      line-height: 48px;
      padding-left: 24px;
      border-bottom: 1px solid #e6ecf2;
      span:nth-child(1) {
        color: #1c242c;
        font-weight: 500;
        font-size: 14px;
      }
      span:nth-child(2) {
        margin-left: 24px;
        color: #9aa5b5;
        font-size: 12px;
      }
    }
    .way_content {
      padding: 40px 0;
      text-align: center;
    }
    .btns {
      width: 100%;
      margin: 10px 0 0;
    }
  }
}
</style>
