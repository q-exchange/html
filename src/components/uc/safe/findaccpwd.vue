<template>
    <div>
      <Modal v-model=" findpwdnmodal" title="修改资金密码" :footer-hide="true" :mask-closable="false" :closable="false">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="121">
            <!-- newMPw -->
            <FormItem :label="$t('uc.safe.newfundpwd')" prop="newMPw8">
                <Input v-model="formValidate.newMPw8" size="large" type="password"></Input>
            </FormItem>
            <!-- newMPwConfirm -->
            <FormItem :label="$t('uc.safe.confirmnewpwd')" prop="newMPwConfirm8">
                <Input v-model="formValidate.newMPwConfirm8" size="large" type="password"></Input>
            </FormItem>
            <!-- 邮箱验证码 -->
            <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode5">
                <Input v-model="formValidate.vailCode5" size="large">
                <div class="timebox" slot="append">
                    <Button @click="send(8)" :disabled="sendMsgDisabled">
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
  name: "findaccpwd",
  props: {
    googleSwitch: {
      type: Boolean
    },
    cleardata:{
      type:Boolean
    },
    findpwdnmodal:{
       type:Boolean
    }
  },
  data() {
    const validateMPass8 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else {
        callback();
      }
    };
    const validateMPassCheck8 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else if (value !== this.formValidate.newMPw8) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else {
        callback();
      }
    };
    return {
      flag: false,
      formValidate: {
        newMPw8: "",
        newMPwConfirm8: "",
        vailCode5: "",
        googleCode: ""
      },
      ruleValidate: {
        newMPw8: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg1"),
            trigger: "blur"
          },
          { validator: validateMPass8, trigger: "blur" }
        ],
        newMPwConfirm8: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg2"),
            trigger: "blur"
          },
          { validator: validateMPassCheck8, trigger: "blur" }
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
      },
      time: 60,
      sendMsgDisabled: false
    };
  },
  methods: {
    send() {
      let me = this;
      this.$http
        .post(this.host + "/uc/mobile/transaction/code")
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
            newPassword: this.formValidate.newMPw8,
            code: this.formValidate.vailCode5
          };
          if (this.flag) {
            param.googleCode = this.formValidate.googleCode;
          }
          this.$emit("submitfindaccpwd", param);
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
       this.$emit("cancelfind");
    }
  },
  watch: {
    googleSwitch(val) {
      this.flag = val;
    },
    cleardata(val){
       if(val){
           for(let key in this.formValidate){
               this.formValidate[key]='';
           };
           this.sendMsgDisabled=false;
       }
    }
  }
};
</script>
<style lang="less" scoped>
</style>


