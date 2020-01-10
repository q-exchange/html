<template>
    <div>
        <Modal v-model="setpwdnmodal" title="设置资金密码" :footer-hide="true" :mask-closable="false" :closable="false">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <!-- newMPw -->
            <FormItem :label="$t('uc.safe.fundpwd')" prop="pw">
                <Input v-model="formValidate.pw" size="large" :placeholder="$t('uc.safe.pwdmsg1')" type="password"></Input>
            </FormItem>
            <!-- newMPwConfirm -->
            <FormItem :label="$t('uc.safe.confirmpwd')" prop="pwConfirm">
                <Input v-model="formValidate.pwConfirm" size="large" type="password"></Input>
            </FormItem>
            <!--<FormItem label="谷歌验证码" prop="googleCode" v-if="googleSwitch">
                                                <Input v-model="formValidate4.googleCode" size="large" type="text"></Input>
                                            </FormItem>-->
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
  name: "setaccpwd",
  props:{
    cleardata:{
      type:Boolean
    },
    setpwdnmodal:{
      type:Boolean
    }
  },
  watch:{
    cleardata(val){
       if(val){
           for(let key in this.formValidate){
               this.formValidate[key]='';
           };
       }
    }
  },
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
      } else if (value !== this.formValidate.pw) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        pw: "",
        pwConfirm: ""
      },
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
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = {
            jyPassword: this.formValidate.pw
          };
          this.$emit("submitSetaccpwd", param);
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
       this.$emit("cancelset");
    }
  }
};
</script>
<style lang="less" scoped>
</style>


