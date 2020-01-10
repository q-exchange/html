<template>
  <div class="nav-rights">
    <div class="user">
      <div class="user_info">
        <div class="userPic">
          <img src="../../assets/images/atu.png" alt="">
        </div>
        <div class="userPhone">
          <span>Hi, {{String(user.mobilePhone).substring(0,3)}}****{{String(user.mobilePhone).substring(7,11)}}</span>
          <span>UID: {{user.id}}</span>
          <p>
            {{$t("uc.safe.safelevel_low")}}:&nbsp;&nbsp;{{memberlevel}} &nbsp;&nbsp;&nbsp;
          </p>
        </div>
      </div>
    </div>
    <div class="person">
      <!-- 个人认证 -->
      <div class="person_confirm">
        <div>
          <p>个人认证</p>
          <p>完成个人认证有助于保护账户安全，提高提现额度及交易权限</p>
          <span v-if="user.realVerified==1">
            <Icon type="md-checkmark-circle" color="green" size="20" />
          </span>
          <span v-else-if="user.realAuditing==1">
            <Icon type="ios-alert" color="red" size="20" />
          </span>
          <span class="btn" v-else-if="user.realVerified==0&&user.realAuditing==0&&user.realNameRejectReason!=null" :title="user.realNameRejectReason">
            <Icon type="ios-alert" color="red" size="20" />
          </span>
          <span v-else class="btn">
          </span>
          <router-link to="/uc/realname">身份认证</router-link>
        </div>
        <div class="bg">

        </div>
      </div>
      <!-- 双重身份验证 -->
      <div class="two_confirm">
        <div class="two_title">
          双重身份验证
        </div>
        <div class="two_content">
          <div class='content_item'>
            <div class="lef">
              <div class="conPic">
                <img src="../../assets/images/safe.png" alt="">
              </div>
              <div class="conInfo">
                <p>安全等级： {{googleSwitch ?'强':'中'}}</p>
                <p>建议开启谷歌验证</p>
              </div>
            </div>
            <div class="rig">
              <p class="yell"></p>
              <p :class="googleSwitch ?'green':''"></p>
            </div>
          </div>
          <!-- 手机验证 -->
          <div class='content_item'>
            <div class="lef">
              <div class="conPic">
                <img src="../../assets/images/phone.png" alt="">
              </div>
              <div class="conInfo">
                <p>手机</p>
                <p>用于登录、提币、找回密码、修改安全设置、管理API时进行安全验证</p>
              </div>
            </div>
            <div class="rig">
              <span v-if="user.phoneVerified==1" class="bankInfo" style="color: grey;">
                <!-- {{$t('uc.safe.bindphone')}} -->
                {{user.mobilePhone}}&nbsp;&nbsp;&nbsp;
              </span>
              <span v-if="user.phoneVerified==0" class="btn" @click="phonemodal=true" style="cursor:pointer;">
                {{$t('uc.safe.bind')}}
              </span>
              <span :class="googleSwitch ?'closegoole':'opengoole'" @click="closeGoogle">&nbsp;&nbsp;&nbsp;关闭验证</span>
            </div>
          </div>
          <phones :phonemodal='phonemodal' @cancelphone='phonemodal=false' @phoneSubmit='submitphone'></phones>
          <!-- 谷歌验证 -->
          <div class='content_item'>
            <div class="lef">
              <div class="conPic">
                <img src="../../assets/images/goole.png" alt="">
              </div>
              <div class="conInfo">
                <p>谷歌验证器</p>
                <p>用于登录、提币、找回密码、修改安全设置、管理API时进行安全验证</p>
              </div>
            </div>
            <div class="rig">
              <!-- <div class="google-info" style="display:none;">
                  
                    <i-switch v-model="googleSwitch" @on-change="changeGoogleSwitch">
                      <span slot="open"></span>
                      <span slot="close"></span>
                    </i-switch>
                  </div> -->
              <span>
                <router-link to="/openGoogleVali">更换谷歌验证器</router-link> &nbsp;&nbsp;&nbsp;</span>

              <span style="cursor: pointer;" @click="changeSwitch">&nbsp;&nbsp;&nbsp;{{googleSwitch?'关闭验证':'开启验证'}}</span>

            </div>
            <closegoogleVali @cancelclosegoomodal='openGoogleModal=false' @closegoomodal='closegoomodal' :openGoogleModal="openGoogleModal" :phone='user.mobilePhone'></closegoogleVali>
          </div>
        </div>
      </div>
      <!-- 安全密码管理 -->
      <div class="two_confirm">
        <div class="two_title">
          安全密码管理
        </div>
        <div class="two_content">
          <!-- 登录密码 -->
          <div class='content_item'>
            <div class="lef">
              <div class="conPic">
                <img src="../../assets/images/loginpwd.png" alt="">
              </div>
              <div class="conInfo">
                <p>登录密码</p>
                <p>用于保护账户安全</p>
              </div>
            </div>
            <div class="rig">
              <span>
                <a class="btn" v-if="user.phoneVerified==0" @click="noPhone">
                  {{$t('uc.safe.edit')}}
                </a>
                <!-- <a class="btn" v-else @click="showItem(4)"> -->
                <a class="btn" v-else @click="loginmodal=true">
                  {{$t('uc.safe.edit')}}
                </a>
                <loginpwd :loginmodal='loginmodal' :googleSwitchs='googleSwitch' @cancellogin='loginmodal=false' @submitlogin='submitlogin'></loginpwd>
              </span>
            </div>
          </div>

          <!-- 资金密码 -->
          <div class='content_item'>
            <div class="lef">
              <div class="conPic">
                <img src="../../assets/images/monpwd.png" alt="">
              </div>
              <div class="conInfo">
                <p>法币资金密码</p>
                <p>用于保护法币资产安全</p>
              </div>
            </div>
            <div class="rig forget">

              <span v-if="user.phoneVerified==0" @click="noPhone" style="cursor:pointer;">
                {{$t('uc.safe.set')}}
              </span>
              <!-- <a class="btn" v-else-if="user.fundsVerified==0" @click="showItem(5)"> -->
              <span v-else-if="user.fundsVerified==0" @click="setpwdnmodal=true" style="cursor:pointer;">
                {{$t('uc.safe.set')}}
              </span>
              <div v-else>
                <span @click="showItemFundpwd()" style="cursor:pointer;">
                  {{$t('uc.safe.edit')}}
                </span>
                <span @click="forget" style="color:#3399ff; cursor:pointer;">
                  忘记密码
                </span>
              </div>

              <!-- 设置 -->
              <div class="detail-list" v-show="user.fundsVerified!=1">
                <setaccpwd :setpwdnmodal='setpwdnmodal' :cleardata='cleardata' @cancelset='setpwdnmodal=false' @submitSetaccpwd='submitSetaccpwd'></setaccpwd>

              </div>
              <!-- 修改资金密码 -->
              <div class="detail-list" v-show="user.fundsVerified==1  && !fGetBackFundpwd" style="display:flex;justify-content:space-between">
                <editoraccpwd :editorpwdnmodal='editorpwdnmodal' :cleardata='cleardata' @canceleditor='editorpwdnmodal=false' :googleSwitch='googleSwitch' @submiteditoracc='submiteditoracc'></editoraccpwd>
              </div>
              <!-- 找回 -->
              <div class="detail-list" v-show="user.fundsVerified==1 && fGetBackFundpwd">
                <findaccpwd :findpwdnmodal='findpwdnmodal' :cleardata='cleardata' :googleSwitch='googleSwitch' @cancelfind='findpwdnmodal=false' @submitfindaccpwd='submitfindaccpwd'></findaccpwd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import realname from "./safe/realname";
import email from "./safe/email";
import phones from "./safe/phones";
import loginpwd from "./safe/loginpwd";
import setaccpwd from "./safe/setaccpwd";
import editoraccpwd from "./safe/editoraccpwd";
import findaccpwd from "./safe/findaccpwd";
import closegoogleVali from "../../pages/google/CloseGoogleVali";
import { isEmailRegister, googleUrl } from "../../staticMap/static";

export default {
  components: {
    realname,
    email,
    phones,
    loginpwd,
    setaccpwd,
    editoraccpwd,
    findaccpwd,
    closegoogleVali
  },
  data() {
    return {
      isEmailRegister,
      googleUrl,
      loginmodal: false, //登录
      setpwdnmodal: false, //设置资金密码
      editorpwdnmodal: false, //修改资金密码
      findpwdnmodal: false, //找回密码
      phonemodal: false, //绑定手机号
      openGoogleModal: false, //关闭谷歌验证
      cleardata: false,
      uid: "",
      googleSwitch: false,
      fGetBackFundpwd: false,
      loginmsg: this.$t("common.logintip"),
      memberlevel: "",
      uploadHeaders: { "x-auth-token": localStorage.getItem("TOKEN") },
      usernameS: "",
      user: {},
      googleAuthentication: "",
      choseItem: 0,
      accountValue: "1",
      googleAuthentication: ""
    };
  },
  methods: {
    userUid() {
      this.uid = this.userId.id;
    },
    checkGoogleValidtor(data) {
      //验证用户是否开启google验证
      this.$http.post(this.host + "/uc/get/user", data).then(res => {
        const data = res.body;
        if (data.code == 0) {
          this.googleSwitch = !!data.data;
        }
        if (data.data == 1) {
          this.googleAuthentication = this.$t("googleverify._reset");
        }
      });
    },
    closegoomodal() {
      this.openGoogleModal = false;
      this.googleSwitch = !this.googleSwitch;
    },
    closeGoogle() {
      if (this.googleSwitch) {
        this.changeSwitch();
      } else {
        return;
      }
    },
    changeSwitch() {
      if (this.googleSwitch) {
        this.openGoogleModal = true;
        //  this.changeGoogleSwitch();
      } else {
        this.$router.push({
          name: "resetgooglevali"
        });
      }
    },

    changeGoogleSwitch() {
      //改变google验证状态
      const params = {
        phone: this.user.mobilePhone
      };
      !this.googleSwitch &&
        this.$router.push({
          name: "closegoogleVali",
          params
        });
      this.googleSwitch &&
        this.$router.push({
          name: "resetgooglevali"
        });
    },

    noPhone() {
      this.$Message.info(this.$t("uc.safe.bindphonetip"));
      this.showItem(3);
    },
    showItemFundpwd() {
      this.editorpwdnmodal = true;
      this.fGetBackFundpwd = false;
      this.showItem(5);
    },
    renderPw() {
      this.$Modal.confirm({
        title: this.$t("uc.safe.resetfundpwd"),
        onOk: () => {
          this.$Message.info("Clicked ok");
        },
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true
            },
            on: {
              input: val => {
                this.value = val;
              }
            }
          });
        }
      });
    },
    //实名认证
    submitRealName(param) {
      this.$http
        .post(this.host + "/uc/approve/real/name", param)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.member.realName = param.realName;
            this.$store.commit("setMember", this.member);
            this.$Message.success(this.$t("uc.safe.save_success"));
            this.getMember();
            this.choseItem = 0;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    // 邮箱
    submitemail(param) {
      this.$http
        .post(this.host + "/uc/approve/bind/email", param)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(this.$t("uc.safe.save_success"));
            this.getMember();
            this.choseItem = 0;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    // 手机
    submitphone(param) {
      this.$http
        .post(this.host + "/uc/approve/bind/phone", param)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(this.$t("uc.safe.save_success"));
            this.phonemodal = false;
            this.getMember();
            this.choseItem = 0;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    // 登录密码
    submitlogin(param) {
      this.$http
        .post(this.host + "/uc/approve/update/password", param)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.loginmodal = false;
            this.$Message.success(this.$t("uc.safe.save_success"));
            this.getMember();
            this.choseItem = 0;
            localStorage.removeItem("MEMBER");
            localStorage.removeItem("TOKEN");
            this.$store.state.showLogout = true;
            this.$store.state.showLogin = false;
            let self = this;
            setTimeout(() => {
              self.$router.push("/login");
            }, 2000);
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    //设置资金密码
    submitSetaccpwd(param) {
      this.$http
        .post(this.host + "/uc/approve/transaction/password", param)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.cleardata = true;
            this.setpwdnmodal = false;
            this.$Message.success(this.$t("uc.safe.save_success"));
            this.getMember();
            this.choseItem = 0;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    //修改资金密码
    submiteditoracc(param) {
      this.$http
        .post(this.host + "/uc/approve/update/transaction/password", param)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(this.$t("uc.safe.save_success"));
            this.cleardata = true;
            this.editorpwdnmodal = false;
            console.log(param);
            this.getMember();
            this.choseItem = 0;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    //找回资金密码
    submitfindaccpwd(param) {
      this.$http
        .post(this.host + "/uc/approve/reset/transaction/password", param)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.cleardata = true;
            this.findpwdnmodal = false;
            this.$Message.success(this.$t("uc.safe.save_success"));
            this.fGetBackFundpwd = false;
            this.getMember();
            this.choseItem = 0;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    forget() {
      this.fGetBackFundpwd = !this.fGetBackFundpwd;
      this.findpwdnmodal = true;
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    showItem(index) {
      this.choseItem = index;
    },
    send(index) {
      let me = this;
      if (index == 1) {
      } else if (index == 2) {
      } else if (index == 3) {
      } else if (index == 5) {
        //资金密码获取手机code
      } else if (index == 8) {
      }
    },
    getMember() {
      //获取个人安全信息
      return this.$http
        .post(this.host + "/uc/approve/security/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            return new Promise((resolve, reject) => {
              this.user = resp.data;
              this.usernameS = this.user.username.slice(0, 1);
              resolve(resp.data);
            });
          } else {
            this.$Message.error(this.loginmsg);
          }
        });
    }
  },
  computed: {
    userId: function() {
      return JSON.parse(localStorage.getItem("MEMBER"));
    },
    member: function() {
      return this.$store.getters.member;
    },
    lang() {
      return this.$store.state.lang;
    }
  },
  created() {
    this.userUid();
    this.getMember().then(res => {
      this.checkGoogleValidtor({ mobile: res.mobilePhone });
    });
    const level = memberGradeId => {
      return `V${memberGradeId}`;
    };
    let memberGradeId = this.$store.getters.member.memberGradeId;
    this.memberlevel = level(memberGradeId);
    //验证用户是否开启google验证
    // this.checkGoogleValidtor();
  }
};
</script>
<style scoped lang="less">
@import "../../my_theme/custom.less";
@import url("../../less/uc/safe/light.less");
.nav-rights {
  padding-top: 48px;
  .user {
    background-color: #1b2945;
    width: 100%;
    padding: 30px 0;
    .user_info {
      width: 80%;
      margin: 0 auto;
      color: #fff;
      display: flex;
      align-items: center;
      .userPic {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 30px;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .userPhone {
        span:nth-child(1) {
          font-size: 24px;
        }
        span:nth-child(2) {
          font-size: 12px;
          color: #b0b8db;
          border: 1px solid #393f66;
          border-radius: 10px;
          padding: 2px 9px;
          margin-left: 24px;
        }
        p {
          font-size: 12px;
          color: #61698a;
          line-height: 28px;
        }
      }
    }
  }
  .person {
    width: 80%;
    margin: 20px auto;
    .person_confirm {
      width: 100%;
      border: 1px solid #e6ecf2;
      padding: 25px;
      display: flex;
      justify-content: space-between;
      .bg {
        width: 400px;
        height: 100px;
        background: url("../../assets/images/bgperson.png") center center
          no-repeat;
        background-size: contain;
      }
      p:nth-child(1) {
        color: #1c242c;
        line-height: 18px;
        font-size: 14px;
        font-weight: 500;
      }
      p:nth-child(2) {
        color: #495666;
        line-height: 16px;
        font-size: 12px;
        margin: 10px 0 20px;
      }
      a {
        margin-right: 40px;
        color: #357ce1;
        font-size: 12px;
        &:hover {
          color: #80aceb;
        }
      }
    }
    .two_confirm {
      width: 100%;
      border: 1px solid #e6ecf2;
      margin: 20px 0;
      .two_title {
        padding-left: 24px;
        font-size: 14px;
        line-height: 48px;
        border-bottom: 1px solid #e6ecf2;
        background-color: #f2f6fa;
        color: #18232d;
        font-weight: 500;
      }
      .two_content {
        padding: 0 24px;
        .content_item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e6ecf2;
          .lef {
            display: flex;
            padding: 20px 0;
            .conPic {
              width: 45px;
              height: 45px;
              margin-right: 24px;
              img {
                width: 100%;
              }
            }
            .conInfo {
              p:nth-child(1) {
                font-size: 14px;
                margin-bottom: 10px;
                color: #1c242c;
                font-weight: 500;
              }
              p:nth-child(2) {
                font-size: 12px;
                line-height: 14px;
                color: #495666;
              }
            }
          }
          .rig {
            display: flex;

            p {
              height: 10px;
              width: 130px;
              background: #f2f6fa;
              margin-left: 4px;
            }
            .yell {
              background-color: #faad14;
            }
            .green {
              background-color: #47e454;
            }
            span {
              color: #495666;
              font-size: 12px;
              // margin-right: 24px;
              line-height: 20px;
            }
            span:nth-last-child(2),
            span:nth-last-child(1) {
              color: #357ce1;
              margin-right: 0;
              border-right: 1px solid #e5eaef;
            }
            span:nth-last-child(1) {
              border-right: none;
            }
            .closegoole {
              cursor: pointer;
            }
            .opengoole {
              cursor: not-allowed;
              color: #ccc !important;
            }
          }
          .forget {
            div span:nth-child(1) {
              padding-right: 10px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}

</style>

