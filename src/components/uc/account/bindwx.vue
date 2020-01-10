<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" >
      <Row>
     
        <!-- name -->
        <FormItem prop="name">
          <p>{{$t('uc.account.name')}}</p>
          <Input disabled size="large" v-model="formValidate.name"></Input>
        </FormItem>
        <!-- wechat -->
        <FormItem  prop="wechat">
          <p>{{$t('uc.account.wxaccount')}}</p>
          <Input v-model="formValidate.wechat" size="large"></Input>
        </FormItem>
        <!-- passwd -->
       <FormItem> 
         <p>二维码</p>
          <input type="hidden" name="wePreview" :value="wePreview" />
        <img  id="weImg" style="width: 100px;height: 100px;" :src=weImg>
        <div >
          <Upload ref="upload" :on-success="weHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
            <Button icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
          </Upload>
        </div>
       </FormItem>
         <FormItem  prop="password">
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
        

      </Row>
    </Form>
  </div>
</template>
<script>
export default {
  name: "bindwx",
  props: ["getwx"],
  data() {
    return {
      uploadHeaders: { "x-auth-token": localStorage.getItem("TOKEN") },
      uploadUrl: this.host + "/uc/upload/oss/image",
      weImg: "",
      wePreview: "",
      formValidate: {
        name: "",
        wechat: "",
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
        wechat: [
          {
            required: true,
            message: this.$t("uc.account.wxaccountmsg"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    getwx(val) {
      const { name, wechat } = val;
      this.formValidate = { name, wechat };
      this.weImg = this.wePreview = val.weImg;
    }
  },
  methods: {
    weHandleSuccess(res, file, fileList) {
      this.$refs.upload.fileList = [fileList[fileList.length - 1]];
      this.weImg = this.wePreview = res.data;
    },

    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = {
            wechat: this.formValidate.wechat,
            jyPassword: this.formValidate.password,
            realName: this.formValidate.name,
            qrCodeUrl: this.wePreview
          };
          this.$emit("submitwx", param);
        } else {
          this.$Message.error(this.$t("uc.safe.save_failure"));
        }
      });
    },
    handleReset(name){
       this.$refs[name].resetFields();
       this.$emit('cancelwx')
    }

  }
};
</script>
<style lang="less" scoped>
</style>


