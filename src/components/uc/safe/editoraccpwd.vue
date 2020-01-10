<template>
    <div>
      <Modal v-model=" editorpwdnmodal" title="修改资金密码" :footer-hide="true" :mask-closable="false" :closable="false">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="121">
            <!-- oldPw -->
            <FormItem :label="$t('uc.safe.oldfundpwd')" prop="oldPw">
                <Input v-model="formValidate.oldPw" size="large" type="password"></Input>
            </FormItem>
            <!-- newMPw -->
            <FormItem :label="$t('uc.safe.newfundpwd')" prop="newMPw">
                <Input v-model="formValidate.newMPw" :placeholder="$t('uc.safe.pwdmsg1')" size="large" type="password"></Input>
            </FormItem>
            <!-- newMPwConfirm -->
            <FormItem :label="$t('uc.safe.confirmnewpwd')" prop="newMPwConfirm">
                <Input v-model="formValidate.newMPwConfirm" size="large" type="password"></Input>
            </FormItem>
            <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode5">
                <Input v-model="formValidate.vailCode5" size="large">
                <div class="timebox" slot="append">
                    <Button @click="send(5)" :disabled="sendMsgDisabled">
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
  name: "editoraccpwd",
  props: {
    googleSwitch: {
      type: Boolean
    },
    cleardata: {
       type: Boolean
    },
    editorpwdnmodal: {
       type: Boolean
    }
  },
  data() {
    const validateMPassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else if (value !== this.formValidate.newMPw) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.newpwdmsg1")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.newpwdmsg1")));
      } else {
        callback();
      }
    };
    const validateMPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else {
        callback();
      }
    };
    return {
        show:false,
      flag: false,
      sendMsgDisabled: false,
      time: 60, // 发送验证码倒计时
      formValidate: {
        oldPw: "",
        newMPw: "",
        newMPwConfirm: "",
        vailCode5: "",
        googleCode: ""
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
        newMPw: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg1"),
            trigger: "blur"
          },
          { validator: validateMPass, trigger: "blur" }
        ],
        newMPwConfirm: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg2"),
            trigger: "blur"
          },
          { validator: validateMPassCheck, trigger: "blur" }
        ],
        googleCode: [
          {
            required: true,
            message: this.$t("googleverify._GoogleVerificationCode"),
            trigger: "blur"
          }
        ],
        vailCode5: [
          {
            required: true,
            message: this.$t("uc.safe.codetip"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    googleSwitch(val) {
      this.flag = val;
    },
    cleardata(val){
      console.log(val)
       if(val){
           for(let key in this.formValidate){
               this.formValidate[key]='';
           };
           this.sendMsgDisabled=false;
       }
    }
  },
  methods: {
    send() {
      let me = this;
      this.$http.post(this.host + "/uc/mobile/trade/code").then(response => {
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
            newPassword: this.formValidate.newMPw,
            msgCode: this.formValidate.vailCode5
          };
          if (this.flag) {
            param.googleCode = this.formValidate.googleCode;
          }
          this.$emit("submiteditoracc", param);
        }else{
            this.$Message.error(this.$t("uc.safe.save_failure"));
        }
      });
    },
      handleReset(name) {
      // for (let key in this.formValidate) {
      //   this.formValidate[key] = "";
      // }
        this.$refs[name].resetFields();
       this.$emit("canceleditor");
    }
  }
};
</script>
<style lang="less" scoped>
</style>


