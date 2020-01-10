<template>
    <div class="content-wraps">
        <div class="containers" id="List">
            <div class="fiat">
                <div class="to_business">
                <h3 :style="{letterSpacing:letterSpacingbig+'px'}">{{$t('paper.legal')}}</h3>
                <span :style="{letterSpacing:letterSpacingsmall+'px'}">{{$t('paper.curren')}}</span>
                <a href="javascript:void(0)" @click="goBusiness">{{$t('paper.become')}}</a>
                </div>
            </div>
            <otcHeader></otcHeader>
            <div>
				<div v-if="isLogin">
					<div class="msg" v-if="psd==false || realName==false">在开始交易之前，您需要完善必要的交易信息。
					<span @click="showModal">去填写</span>
					</div>
				</div>
                <!-- 设置资金密码 -->
                <Modal v-model="psdModal" title="设置资金密码" :footer-hide="true">
                  <span>为保证交易安全，请您耐心完善以下信息</span>
                  <Form ref="psdForm" :model="psdForm" label-width="100%" :rules="ruleValidate">
                      <FormItem label="资金密码" prop="pw">
                      <Input v-model="psdForm.pw" placeholder="出售资产/发广告时验证身份所用，请牢记" type="password"></Input>
                      </FormItem>
                      <FormItem label="确认资金密码" prop="pwConfirm">
                      <Input v-model="psdForm.pwConfirm" placeholder="请确认资金密码" type="password"></Input>
                      </FormItem>
                  </Form>
                  <div class="lever-info" style="margin-top:20px;'">
                      <Button type="default" @click="psdModal=false">取消</Button>
                      <Button type="primary" @click="handleSubmit('psdForm')">{{psd==false && realName==false?"下一步":"确定"}}</Button>
                  </div>
                </Modal>
                <!-- 实名认证 -->
                <Modal v-model="nameModal" :footer-hide="true" title="实名认证" :closable="false" class="realModal">
                  <p>为保证交易安全，请您耐心完善以下信息</p>
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

                <div class="fiat-main">
				<div class="content">
					<router-view></router-view>
				</div>
                <!-- <advantageShow></advantageShow> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import advantageShow from "../../components/otc/advantage";
import { mapGetters } from "vuex";
import orderList from "../../components/uc/myorder";
import otcHeader from "./otcHeader";
import uploadimg from "../../components/uc/safe/uploadImg";
export default {
  data() {
    const validatepw = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else {
        callback();
      }
    };
    const validatepwcheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else if (value !== this.psdForm.pw) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else {
        callback();
      }
    };
    return {
      orderBoxShow: false,
      coins: [],
      activeMenuName: "coin-USDT",
      psdForm: {
        pw: "",
        pwConfirm: ""
      },
      psd: false, //是否设置资金密码
      realName: false, //是否实名认证
      psdModal: false,
      nameModal: false,
      ruleValidate: {
        pw: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg1"),
            trigger: "blur"
          },
          { validator: validatepw, trigger: "blur" }
        ],
        pwConfirm: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg2"),
            trigger: "blur"
          },
          { validator: validatepwcheck, trigger: "blur" }
        ]
      },
      formValidate:{
        realName: "",
        idCard: ""
      },
      imgPreview: "",
      imgNext: "",
      imgLast: "",
      frontCardImg: require("../../assets/images/frontCardImg.png"),
      backCardImg: require("../../assets/images/backCardImg.png"),
      handCardImg: require("../../assets/images/HandCardImg.png")
    };
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
  methods: {
    success(e) {
      this[e.name] = e.src;
      this[e.imgShow] = e.src;
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
              this.getMember();
            } else {
              this.$Message.error(resp.message);
            }
          })
        }else{
          this.$Message.error(this.$t("uc.safe.save_failure"));
        }
      });
    },
    // 判断是否实名认证、是否设置资金密码
    showModal() {
      if (this.psd == false && this.realName == false) {
        this.psdModal = true;
      }else if(this.realName == false){
        this.nameModal = true;
      }
    },
    // 资金密码表单验证
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = {
            jyPassword: this.psdForm.pw
          };
          this.submitSetaccpwd(param);
        } else {
          this.$Message.error(this.$t("uc.safe.save_failure"));
        }
      });
    },
    //设置资金密码
    submitSetaccpwd(param) {
      this.$http
        .post(this.host + "/uc/approve/transaction/password", param)
        .then(response => {
          let resp = response.body;
          if (resp.code == 0) {
            this.psdModal = false;
            this.$Message.success(this.$t("uc.safe.save_success"));
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    // 获取个人信息
    getMember() {
      let self = this;
      this.$http
        .post(this.host + "/uc/approve/security/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
			  console.log(resp.code);
            // 判断是否设置交易密码
            if (resp.data.fundsVerified == 0) {
              this.psd = false;
            } else {
              this.psd = true;
            }
            // 判断是否实名认证
            if (resp.data.realName == null || resp.data.realName == "") {
              this.realName = false;
            } else {
              this.realName = true;
            }
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    goBusiness() {
      if (this.isLogin) {
        this.$router.push({ path: "/identbusiness" });
      } else {
        this.$Message.warning("请先登录");
      }
    },
    // menuSelected(menuName) {
    //   if (menuName.startsWith("coin")) {
    //     var coin = menuName.split("-")[1];
    //     this.$router.push("/otc/trade/" + coin);
    //   } else {
    //     this.$router.push("/otc/" + menuName);
    //   }
    // },
  },
  created() {
    // this.init();
    // this.activeMenuName = "coin-1";
    // this.$nextTick(function() {
    //   this.$refs.navMenu.updateActiveName();
    // });
    // this.activeMenu();
	if(this.isLogin){
		this.getMember();
	}
  },
  components: {
    advantageShow,
    orderList,
    otcHeader,
	uploadimg
  }
};
</script>

<style scoped lang="less">
@import "../../my_theme/custom.less";
@import url("../../less/otc/index/light.less");
.lever-info {
  text-align: right;
}
.msg {
  margin: 40px 10% 0px;
  padding: 12px 20px;
  background-color: #fff8e3;
  span {
    color: #638bd4;
    cursor: pointer;
    &:hover {
      color: rgb(265, 163, 5);
    }
  }
}
.realModal{
	/deep/ .ivu-modal{
		width:800px !important;
	}
	.upImg{
		display:flex;
		text-align:center;
	}
	.lever-info{
		button{
			width:120px;
		}
	}
}
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
      margin: 0 20px;
      &:hover {
        color: #fff;
      }
    }
    li:last-child {
      margin-right: 0;
    }
  }
  .orderBox {
    p {
      padding: 0 20px;
    }
    font-size: 14px;
    position: absolute;
    border-radius: 4px;
    width: 344px;
    top: 60px;
    right: 10%;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    .content {
      border-top: 1px solid #eee;
	  border-bottom: 1px solid #eee;
    }
    .foot {
      text-align: right;
      padding: 0 20px;
      color: #638bd4;
      cursor: pointer;
    }
  }
}
.content-wraps {
  .containers {
    width: 100%;
    /*margin: 20px 0;*/
    .fiat {
      height: 400px;
      background: url("../../assets/images/fiat_banner.jpg") no-repeat center
        center; //顶部背景图片
      background-size: 100%;
      display: flex; //flex布局
      justify-content: center; //使子项目水平居中
      align-items: center; //使子项目垂直居中
      .to_business {
        color: @white-custom;
        text-align: center;
        h3 {
          font-size: 46px;
          letter-spacing: 20px;
        }
        span {
          font-size: 20px;
          letter-spacing: 10px;
          display: block;
        }
        a {
          width: 220px;
          height: 45px;
          display: inline-block;
          background: @white-custom;
          border-radius: @border-radius_5px;
          font-size: 20px;
          line-height: 45px;
          color: @a-color_black;
          margin-top: 20px;
        }
      }
    }
  }
  .fiat-main {
	padding:30px 0;
    width: 100%;
    .ivu-menu {
      background-color: @bigBg;
      padding: 0 10%;
    }
    .content {
      width: 100%;
      margin: 0px auto 20px;
      border-bottom: none;
      border-radius: 5px;
    }
  }
  .tabContent {
    padding: 0 10%;
  }
}
</style>
