<template>
  <div class="realname">
    <div class="til">
      身份认证
    </div>
    <div class="persontil">
      个人身份认证
    </div>
    <div class="con">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="55" style="text-align:left;" label-position='top' v-if="bind">
      <!-- 真实姓名 -->
      <FormItem prop="realName">
        <p>{{$t('uc.safe.realname')}}</p>
        <Input v-model="formValidate.realName" size="large"></Input>
      </FormItem>
      <!-- 身份证号 -->
      <FormItem prop="idCard">
        <p>{{$t('uc.safe.idcard')}}</p>
        <Input v-model="formValidate.idCard" size="large"></Input>
      </FormItem>
      <div class="upImg">
        <uploadimg txt="上传身份证正面照" imgName="imgPreview" imgShow="frontCardImg" :imgData="imgPreview" :imgSrc="frontCardImg" @success="success" />
        <uploadimg txt="上传身份证反面照" imgName="imgNext" imgShow="backCardImg" :imgData="imgNext" :imgSrc="backCardImg" @success="success" />
        <uploadimg txt="上传手持身份证照" imgName="imgLast" imgShow="handCardImg" :imgData="imgLast" :imgSrc="handCardImg" @success="success" />
      </div>
      <p class="uploadimgtip">提示：上传图片仅支持.jpg、.gif、.png、.jpeg格式，且推荐大小为100kb-1024kb，否则有可能上传失败。</p>
      <!-- <p v-if="lang==='简体中文'" class="uploadimgtip">提示：上传图片仅支持.jpg、.gif、.png、.jpeg格式，且推荐大小为100kb-1024kb，否则有可能上传失败。</p>
      <p v-else class="uploadimgtip">Tip: uploaded pictures only support.Jpg,.Gif,.Png,.Jpeg format, and recommended size is 100kb-1024kb, otherwise it may fail to upload.</p> -->
      <!-- Button -->
      <div style=" display:flex;justify-content:space-between;width:80%;margin:20px auto;">
        <Button @click="handleReset('formValidate')" style="width:300px;">取消</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="width:300px;">认证</Button>

      </div>
    </Form>
    <div class="showstatus" v-else>
      <div v-if="user.realVerified==1">
        <h3>
          <Icon type="md-checkmark-circle" color="green" size="35" /> 您的身份信息已通过认证
        </h3>

      
          <p>
          <span>证件号</span>{{user.idCard}}</p>
        <p>
          <span>&nbsp;&nbsp;&nbsp;姓名</span>{{user.realName}}</p>

      </div>
      <!-- 审核中 -->
      <p v-else-if="user.realAuditing==1">
        <Icon type="ios-alert" color="red" size="35" /> {{$t('uc.safe.binding')}}
      </p>
      <!-- 审核失败 -->
      <h3 v-else-if="user.realVerified==0&&user.realAuditing==0&&user.realNameRejectReason!=null">
        <Icon type="ios-alert" color="red" size="35" /> 审核未通过{{user.realNameRejectReason?"："+user.realNameRejectReason:""}}，
        <span @click="bind=true" style="cursor:pointer;color:#3399ff;">请重试</span>。
      </h3>
    </div>
    </div>
  
  </div>
</template>
<script>
import uploadimg from "./safe/uploadImg";
export default {
  name: "realname",
  components: { uploadimg },
  data() {
    return {
      bind: true,
      formValidate: {
        realName: "",
        idCard: ""
      },
      imgPreview: "",
      imgNext: "",
      imgLast: "",
      frontCardImg: require("../../assets/images/frontCardImg.png"),
      backCardImg: require("../../assets/images/backCardImg.png"),
      handCardImg: require("../../assets/images/HandCardImg.png"),
      user: {}
    };
  },
  created() {
    this.getMember();
  },
  methods: {
    getMember() {
      //获取个人安全信息
      return this.$http
        .post(this.host + "/uc/approve/security/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.user = resp.data;
            if (this.user.realVerified == 1) {
              this.bind = false;
            }
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
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
          //   this.$emit("submit", param);
          this.$http
            .post(this.host + "/uc/approve/real/name", param)
            .then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.$store.commit("setMember", this.member);
                this.$Message.success(this.$t("uc.safe.save_success"));
                this.handleReset();
              } else {
                this.$Message.error(resp.message);
              }
            });
        } else {
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
      (this.frontCardImg = require("../../assets/images/frontCardImg.png")),
        (this.backCardImg = require("../../assets/images/backCardImg.png")),
        (this.handCardImg = require("../../assets/images/HandCardImg.png"));
      this.$router.push("/uc/safe");
    }
  }
};
</script>

<style lang="less" scoped>
.realname {
  width: 100%;
  height: 100%;
  margin: 0 auto 0;
  padding-top: 58px;
  background-color: #f2f3f8;
  .til,
  .persontil {
    padding: 20px;
    width: 80%;
    font-size: 18px;
    margin: 20px auto 10px;
    background-color: #fff;
  }
  .persontil {
    padding: 10px;
    font-size: 16px;
    margin-bottom: 5px;
  }
  .con{
    width: 80%;
    margin: 0 auto 100px;
    padding: 50px 0 100px;
    // text-align:center;
     background-color: #fff;
     .uploadimgtip {
        padding: 30px;
        // margin: 20px;
        text-align: left;
        color: #3399ff;
      }
      .upImg{
        display:flex;
        justify-content:space-around;
      }
.showstatus {
  margin: 20px auto;
  width: 80%;

  // text-align: center;
  h3 {
    text-align: center;
    font-size: 24px;
    height: 60px;
  }
  
  p {
    width: 200px;
    color: #333;
   margin-left:50%;
   transform: translateX(-100px);
    span {
      text-align: right;
      padding-right: 20px;
      line-height: 56px;
      color: #bbb;
    }
  }
}
  }
}

</style>


