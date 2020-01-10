<template>
    <div>
        <Modal v-model="loginmodal" title="修改登录密码" :footer-hide="true" :mask-closable="false" :closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="121">
            <!-- oldPw -->
            <FormItem :label="$t('uc.safe.oldpwd')" prop="oldPw">
                <Input v-model="formValidate.oldPw" size="large" type="password"></Input>
            </FormItem>
            <!-- newPw -->
            <FormItem :label="$t('uc.safe.newpwd')" prop="newPw">
                <Input v-model="formValidate.newPw" :placeholder="$t('uc.safe.newpwdmsg1')" size="large" type="password"></Input>
            </FormItem>
            <!-- newPwConfirm -->
            <FormItem :label="$t('uc.safe.confirmnewpwd')" prop="newPwConfirm">
                <Input v-model="formValidate.newPwConfirm" size="large" type="password"></Input>
            </FormItem>
            <!-- 手机验证码 -->
            <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode3">
                <Input v-model="formValidate.vailCode3" size="large">
                <!-- <Button slot="append">点击获取</Button> -->
                <div class="timebox" slot="append">
                    <Button @click="send" :disabled="sendMsgDisabled">
                        <span v-if="sendMsgDisabled">{{time+$t('uc.safe.second')}}</span>
                        <span v-if="!sendMsgDisabled">{{$t('uc.safe.clickget')}}</span>
                    </Button>
                </div>
                </Input>
            </FormItem>
            <FormItem :label="$t('googleverify._GoogleVerificationCode')" prop="googleCode" v-if="flag">
                <Input v-model="formValidate.googleCode" size="large" type="text"></Input>
            </FormItem>
            <!-- Button -->
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">
                    {{$t('uc.safe.save')}}
                </Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">
                    {{$t('uc.safe.reset')}}
                </Button>
            </FormItem> 
        </Form>
        </Modal>
      
    </div>
</template>
<script>
export default {
  name: "loginpwd",
  props: {
    googleSwitchs: {
      type: Boolean
    },
    loginmodal: {
      type: Boolean
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.newpwdmsg1")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.newpwdmsg1")));
      } else {
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.newpwdmsg2")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.newpwdmsg2")));
      } else if (value !== this.formValidate.newPw) {
        callback(new Error(this.$t("uc.safe.newpwdmsg2")));
      } else {
        callback();
      }
    };
    return {
      sendMsgDisabled: false,
      time: 60, // 发送验证码倒计时
      flag: "",
      formValidate: {
        googleCode: "",
        oldPw: "",
        newPw: "",
        newPwConfirm: "",
        vailCode3: ""
      },
      ruleValidate: {
        oldPw: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.oldpwdtip"),
            trigger: "blur"
          }
        ],
        newPw: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.newpwdmsg1"),
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        newPwConfirm: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.newpwdmsg2"),
            trigger: "blur"
          },
          { validator: validatePassCheck, trigger: "blur" }
        ],
        vailCode3: [
          {
            required: true,
            message: this.$t("uc.safe.codetip"),
            trigger: "blur"
          }
        ],
        googleCode: [
          {
            required: true,
            message: this.$t("googleverify._GoogleVerificationCode"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    googleSwitchs(val) {
      this.flag = val;
    }
  },
  methods: {
    send() {
      //登录密码获取手机code
      let me = this;
      this.$http
        .post(this.host + "/uc/mobile/update/password/code")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            me.sendMsgDisabled = true;
            let interval = window.setInterval(function() {
              if (me.time-- <= 0) {
                me.time = 60;
                me.sendMsgDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = {
            oldPassword: this.formValidate.oldPw,
            newPassword: this.formValidate.newPw,
            code: this.formValidate.vailCode3
          };
          if (this.flag) {
            param.googleCode = this.formValidate.googleCode;
          }
          this.$emit("submitlogin", param);
        } else {
          this.$Message.error(this.$t("uc.safe.save_failure"));
        }
      });
    },
    handleReset(name) {
      // for (let key in this.formValidate) {
      //   this.formValidate[key] = "";
      // }
        this.$refs[name].resetFields();
       this.$emit("cancellogin");
    }
  }
};
</script>
<style lang="less" scoped>
</style>


