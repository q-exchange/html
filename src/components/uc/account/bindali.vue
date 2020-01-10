<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
      <!-- name -->
      <FormItem prop="name">
        <p>{{$t('uc.account.name')}}</p>
        <Input disabled size="large" v-model="formValidate.name"></Input>
      </FormItem>
      <!-- alipay -->
      <FormItem prop="alipay">
        <p>{{$t('uc.account.zfbaccount')}}</p>
        <Input v-model="formValidate.alipay" size="large"></Input>
      </FormItem>
      <FormItem>
        <p>二维码</p>
        <input type="hidden" name="aliPreview" :value="aliPreview" />
        <img id="aliImg" style="width: 100px;height: 100px;" :src=aliImg>
        <div class="acc_sc">
          <Upload ref="upload1" :on-success="aliHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
            <Button icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
          </Upload>
        </div>
      </FormItem>
      <!-- passwd -->
      <FormItem prop="password">
        <p>{{$t('uc.account.fundpwd')}}</p>
        <Input v-model="formValidate.password" type="password" size="large"></Input>
      </FormItem>
      <!-- Button -->
      <FormItem>
        <div style="text-align:right;">
          <Button type="default" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
          <Button type="primary" style="width:80px;" @click="handleSubmit('formValidate')">完成设置</Button>
        </div>
      </FormItem>

    </Form>
  </div>
</template>
<script>
export default {
  name: "bindali",
  props: ["getali"],
  data() {
    return {
      uploadHeaders: { "x-auth-token": localStorage.getItem("TOKEN") },
      uploadUrl: this.host + "/uc/upload/oss/image",
      aliImg: "",
      aliPreview: "",
      formValidate: {
        name: "",
        alipay: "",
        password: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: this.$t("uc.account.verifiedmsg"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("uc.account.fundpwdmsg1"),
            trigger: "blur"
          },
          {
            min: 6,
            message: this.$t("uc.account.fundpwdmsg2"),
            trigger: "blur"
          }
        ],
        alipay: [
          {
            required: true,
            message: this.$t("uc.account.zfbaccountmsg"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    getali(val) {
      const { name, alipay } = val;
      this.formValidate = { name, alipay };
      this.aliImg = this.aliPreview = val.aliImg;
    }
  },

  methods: {
    aliHandleSuccess(res, file, fileList) {
      this.$refs.upload1.fileList = [fileList[fileList.length - 1]];
      this.aliImg = this.aliPreview = res.data;
    },

    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = {
            ali: this.formValidate.alipay,
            jyPassword: this.formValidate.password,
            realName: this.formValidate.name,
            qrCodeUrl: this.aliPreview
          };
          this.$emit("submitali", param);
        } else {
          this.$Message.error(this.$t("uc.safe.save_failure"));
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$emit("cancelwx");
    }
  }
};
</script>
<style lang="less" scoped>
</style>


