<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="85" style="text-align:center;">
      <!-- 真实姓名 -->
      <FormItem :label="$t('uc.safe.realname')" prop="realName">
        <Input v-model="formValidate.realName" size="large"></Input>
      </FormItem>
      <!-- 身份证号 -->
      <FormItem :label="$t('uc.safe.idcard')" prop="idCard">
        <Input v-model="formValidate.idCard" size="large"></Input>
      </FormItem>
      <uploadimg txt="上传身份证正面照" imgName="imgPreview" imgShow="frontCardImg" :imgData="imgPreview" :imgSrc="frontCardImg" @success="success" />
      <uploadimg txt="上传身份证反面照" imgName="imgNext" imgShow="backCardImg" :imgData="imgNext" :imgSrc="backCardImg" @success="success" />
      <uploadimg txt="上传手持身份证照" imgName="imgLast" imgShow="handCardImg" :imgData="imgLast" :imgSrc="handCardImg" @success="success" />
      <span v-if="lang==='简体中文'" class="uploadimgtip">提示：上传图片仅支持.jpg、.gif、.png、.jpeg格式，且推荐大小为100kb-1024kb，否则有可能上传失败。</span>
      <span v-else class="uploadimgtip">Tip: uploaded pictures only support.Jpg,.Gif,.Png,.Jpeg format, and recommended size is 100kb-1024kb, otherwise it may fail to upload.</span>
      <!-- Button -->
      <FormItem style="text-align:center;">
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: -85px;">{{$t('uc.safe.save')}}</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">{{$t('uc.safe.reset')}}</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import uploadimg from "./uploadImg";
export default {
  name: "realname",
  components: { uploadimg },
  data() {
    return {
      formValidate: {
        realName: "",
        idCard: ""
      },
      imgPreview: "",
      imgNext: "",
      imgLast: "",
      frontCardImg: require("../../../assets/images/frontCardImg.png"),
      backCardImg: require("../../../assets/images/backCardImg.png"),
      handCardImg: require("../../../assets/images/HandCardImg.png")
    };
  },
  methods: {
    success(e) {
      this[e.name] = e.src;
      this[e.imgShow] = e.src;
    },
    handleSubmit(name) {
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
          this.$emit("submit", param);
        }else{
          this.$Message.error(this.$t("uc.safe.save_failure"));
        }
      });
    },
    handleReset() {
      this.formValidate.realName = "";
      this.formValidate.idCard = "";
      this.imgPreview = "";
      this.imgNext = "";
      this.imgLast = "";
      (this.frontCardImg = require("../../../assets/images/frontCardImg.png")),
        (this.backCardImg = require("../../../assets/images/backCardImg.png")),
        (this.handCardImg = require("../../../assets/images/HandCardImg.png"));
    }
  }
};
</script>

<style lang="less" scoped>
</style>


