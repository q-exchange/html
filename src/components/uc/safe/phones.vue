<template>
  <div>
    <Modal v-model="phonemodal" title="绑定手机号" :footer-hide="true" :mask-closable="false" :closable="false">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
      <!-- 手机 -->
      <FormItem :label="$t('uc.safe.phone')" prop="mobile">
        <Input v-model="formValidate.mobile" size="large">
        </Input>
      </FormItem>
      <!-- 登录密码 -->
      <FormItem :label="$t('uc.safe.loginpwd')" prop="password">
        <Input v-model="formValidate.password" size="large" type="password">
        </Input>
      </FormItem>
      <!-- 手机验证码 -->
      <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode">
        <Input v-model="formValidate.vailCode" size="large">
        <!-- <Button slot="append">点击获取</Button> -->
        <div class="timebox" slot="append">
          <Button @click="send(2)" :disabled="sendMsgDisabled">
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
    </Modal>
  
  </div>
</template>
<script>
export default {
  name:'phones',
  props: {
    phonemodal: Boolean
  },
  data() {
    return {
      sendMsgDisabled: false,
      time: 60, // 发送验证码倒计时
      formValidate: {
        mobile: "",
        vailCode: "",
        password: ""
      },
      ruleValidate: {
        mobile: [
          {
            required: true,
            message: this.$t("uc.safe.telnotip"),
            trigger: "blur"
          }
        ],
        vailCode: [
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
      if (this.formValidate.mobile) {
        //获取手机code
        this.$http
          .post(this.host + "/uc/mobile/bind/code", {
            phone: this.formValidate.mobile
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
        this.$refs.formValidate.validateField("mobile");
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = {
            phone: this.formValidate.mobile,
            code: this.formValidate.vailCode,
            password: this.formValidate.password
          };
          this.$emit("phoneSubmit", param);
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
       this.$emit("cancelphone");
    }
  }
};
</script>
<style lang="less" scoped>
</style>


