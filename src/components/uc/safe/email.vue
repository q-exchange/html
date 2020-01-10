<template>
  <div>
    <div class="detail-list">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
        <!-- mail -->
        <FormItem :label="$t('uc.safe.email')" prop="mail">
          <Input v-model="formValidate.mail" size="large"></Input>
        </FormItem>
        <!-- 登录密码 -->
        <FormItem :label="$t('uc.safe.loginpwd')" prop="password">
          <Input v-model="formValidate.password" size="large" type="password"></Input>
        </FormItem>
        <!-- 邮箱验证码 -->
        <FormItem :label="$t('uc.safe.emailcode')" prop="vailCode1">
          <Input v-model="formValidate.vailCode1" size="large">
          <!-- <Button slot="append">点击获取</Button> -->
          <div class="timebox" slot="append">
            <Button @click="send" :disabled="sendMsgDisabled">
              <span v-if="sendMsgDisabled">{{time+$t('uc.safe.second')}}</span>
              <span v-if="!sendMsgDisabled">{{$t('uc.safe.clickget')}}</span>
            </Button>
          </div>
          </Input>
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
    </div>
  </div>
</template>
<script>
import { emailReg} from "../../../staticMap/static";
export default {
  name: "email",
  data() {
    return {
      time: 60, // 发送验证码倒计时
      sendMsgDisabled: false,
      formValidate: {
        mail: "",
        vailCode1: "",
        password: ""
      },
      ruleValidate: {
        mail: [
          {
            required: true,
            type: "email",
            message: this.$t("uc.safe.emailtip"),
            trigger: "blur"
          },
          // { validator: emailReg, trigger: "blur" }
        ],
        //  newPw: [
        //   {
        //     required: true,
        //     type: "string",
        //     min: 6,
        //     message: this.$t("uc.safe.newpwdmsg1"),
        //     trigger: "blur"
        //   },
        //   { validator: validatePass, trigger: "blur" }
        // ],
        vailCode1: [
          {
            required: true,
            message: this.$t("uc.safe.codetip"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg1"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    send() {
      let me = this;
      if (this.formValidate.mail) {
        //获取邮箱code
        this.$http
          .post(this.host + "/uc/bind/email/code", {
            email: this.formValidate.mail
          })
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
      } else {
        this.$refs.formValidate.validateField("mail");
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = {
            email: this.formValidate.mail,
            code: this.formValidate.vailCode1,
            password: this.formValidate.password
          };
          this.$emit("submitEmail", param);
        }else{
           this.$Message.error(this.$t("uc.safe.save_failure"));
        }
      });
    },
    handleReset() {
      for (let key in this.formValidate) {
        this.formValidate[key] = "";
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>

