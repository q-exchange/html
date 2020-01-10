<!--
 * @Descripttion: 
 * @version: 
 * @Author: 张志强
 * @Date: 2019-08-16 16:15:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 11:25:41
 -->
<template>
  <div class="apimanage">
    <div :bordered="false" class="apihead">
      <p>
        <img src="../../assets/images/lound.png" alt="" >{{$t('apiAdmin.apiAdmin')}}
      </p>
    </div>
    <div class="main">

      <Card :bordered="false" class="content">
        <p slot="title">{{$t('apiAdmin.createApi')}}</p>
        <div class="content_header">
          <div class="add">
            <Form :model="formItem" label-position="top">
              <FormItem :label="$t('apiAdmin.mark')">
                <Input v-model="formItem.remark"></Input>
              </FormItem>
              <FormItem :label="$t('apiAdmin.bindAddress')">
                <Input v-model="formItem.bindIp"></Input>
              </FormItem>
            </Form>
            <Button type="primary" size="large" style="width:200px;" @click="codeVerify">{{$t('apiAdmin.create')}}</Button>
          </div>
          <div class="prompt">
            <p style="color:#515a6e; font-weight: 600;">{{$t('apiAdmin.hint')}}</p>
            <ul>
              <li>
                {{$t('apiAdmin.part1')}}
                <router-link to>{{$t('apiAdmin.apiDoc')}}</router-link>
                {{$t('apiAdmin.howUse')}}
              </li>
              <li>{{$t('apiAdmin.part2')}}</li>
              <li>{{$t('apiAdmin.part3')}}</li>
            </ul>
          </div>
        </div>
      </Card>
      <Card :bordered="false" class="content">
        <p slot="title">{{$t('apiAdmin.myApiKey')}}</p>
        <apitable :flag='flag'></apitable>
      </Card>
    </div>

    <!--秘钥-->
    <Modal v-model="show" :title="$t('apiAdmin.access')" @on-ok="show=false" :mask-closable="false" :ok-text="$t('apiAdmin.okText')" :cancel-text="$t('apiAdmin.cancel')">
      <p class="screat">{{$t('apiAdmin.tips')}}</p>
      <p class="screat">
        <!--{{screat}}-->
        <span>{{screat}}</span>
        <span v-clipboard:copy="screat" v-clipboard:success="onCopy" v-clipboard:error="onError" class="blue">{{$t('apiAdmin.copy')}}</span>
      </p>
    </Modal>
    <!--添加短信校验-->
    <Modal v-model="verify" :title="$t('apiAdmin.edit')">
      <Form :model="formItem" label-position="top">
        <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode3">
          <Input v-model="formItem.code" size="large">
          <div class="timebox" slot="append">
            <Button @click="sendCode" :disabled="sendMsgDisabled">
              <span v-if="sendMsgDisabled">{{time+$t('uc.safe.second')}}</span>
              <span v-if="!sendMsgDisabled">{{$t('uc.safe.clickget')}}</span>
            </Button>
          </div>
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="verify=false">取消</Button>
        <Button type="primary" size="large" @click="make">确定</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import apitable from "./api/apitable";
export default {
  components: {
    apitable
  },
  data() {
    return {
      flag: false,
      locale: "",
      verify: false,
      loading: false,
      verifyEditor: false,
      show: false,
      screat: "",
      time: 60, // 发送验证码倒计时
      // time1: 60, // 发送验证码倒计时
      sendMsgDisabled: false,
      // sendMsgDisabled1: false,
      codeEditorFormItem: "",

      formItem: {
        remark: "",
        bindIp: "",
        code: ""
      },
      // tableData: [],
      id: ""
    };
  },
  //5.25加
  watch: {
    "$i18n.locale": {
      handler(newVal) {
        this.locale = newVal;
      },
      immediate: true
    }
  },
  created() {
    // this.getAllAPI();
  },
  methods: {
    sendCode() {
      let me = this;
      //获取手机code
      this.$http.post(this.host + "uc/mobile/api/code").then(response => {
        let resp = response.body;
        if (resp.code == 0) {
          this.sendMsgDisabled = true;
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
    onCopy(e) {
      this.$Notice.success({
        title: this.$t("common.tip"),
        desc: "success"
      });
    },
    onError() {
      this.$Notice.error({
        title: this.$t("common.tip"),
        desc: "fail"
      });
    },
    // getAllAPI() {
    //   return this.$http.get(this.host + `/uc/open/get_key`).then(res => {
    //     console.log(res);
    //     this.tableData = res.body.data;
    //     console.log(this.tableData);
    //   });
    // },
    // 添加api校验
    codeVerify() {
      const IP_REG = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
      if (this.formItem.remark == "") {
        const lang =
          this.$store.getters.lang == "English"
            ? "please scanner remark"
            : "请输入备注信息";
        this.$Message.error(lang);
        return;
      }
      this.verify = true;
      return;

      if (true) {
      } else if (this.formItem.bindIp == "") {
        const lang =
          this.$store.getters.lang == "English"
            ? "please scanner IP Address"
            : "请输入IP地址";
        this.$Message.error(lang);
        return;
      } else if (!IP_REG.test(this.formItem.bindIp)) {
        const lang =
          this.$store.getters.lang == "English"
            ? "please scanner Correct IP Address"
            : "请输入正确IP地址";
        this.$Message.error(lang);
        return;
      } else {
        // debugger;
      }
    },
    // 确认添加api
    make() {
      this.$http
        .post(this.host + "/uc/open/api/save", this.formItem)
        .then(res => {
          if (!res.body.code) {
            this.$Message.success(res.body.message);
            this.formItem.remark = "";
            this.formItem.bindIp = "";
            this.formItem.code = "";
            // this.getAllAPI();
            this.flag = true;
            this.verify = false;
            this.screat = res.body.data;
            this.show = true;
          } else {
            this.flag = false;
            this.$Message.error(res.body.message);
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
// @main_theme: #3399ff;
// @import '../../my_theme/index.less';
@import "../../my_theme/custom.less";
.apimanage {
  width: 100%;
  margin: 0 auto;
  padding-top: 48px;
}
.blue {
  cursor: pointer;
  color: @white-custom;
  background: @primary-custom;
  display: inline-block;
  padding: 0 @padding-sm-custom;
  font-size: 56px;
  border-radius: 3px;
}
.apihead {
  padding: 20px 0;
  background-color: #1b2946;
  color: #fff;
  p {
    width: 80%;
    margin: 0 auto;
    padding-top: 5px;
    padding-left: 15px;
    img{
      vertical-align: bottom;
      margin-right: 10px;
    }
  }
}
.main {
  width: 80%;
  margin: 0 auto;
  //   background-color: #eee;
  padding: @padding-custom;

  .content {
    border: 1px solid #e6ecf2;
    margin: @padding-xsm-custom 0;
    /deep/.ivu-card-head{
      background-color: #f2f6fa;
    }
    .content_header {
      
      padding: @padding-xsm-custom;
      display: flex;
      justify-content: space-between;
      .add {
        width: 49%;
      }
      .prompt {
        width: 39%;
        ul li {
          font-size: @padding-xsm-custom;
          color: #9aa5b5;
          line-height: 25px;
          list-style: disc;
          span {
            color: #000;
          }
        }
      }
      .ivu-btn-primary {
        background-color: @lightblue-custom;
        border-color: @lightblue-custom;
      }
    }
  }
}
.screat {
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
}
.let-code {
}
</style>



