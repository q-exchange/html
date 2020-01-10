<template>
  <div>
    <Modal v-model="modalApply">
      <p slot="header"></p>
      <div class="apply-content">
        <div class="apply-title">
          <h3>{{$t("uc.identity.tijiaoziliao")}}</h3>
          <p>{{$t("uc.identity.place")}}</p>
        </div>
        <Form class="apply-form" :model="apply_form" label-position="top">
          <FormItem :label="phone">
            <Input type="text" v-model="apply_form.telno" :placeholder="noEmpty"></Input>
          </FormItem>
          <FormItem :label="wechat">
            <Input type="text" v-model="apply_form.wechat" :placeholder="noEmpty"></Input>
          </FormItem>
          <FormItem :label="qq">
            <Input type="text" v-model="apply_form.qq" :placeholder="noEmpty"></Input>
          </FormItem>
          <Row>
            <Col span="8">
              <FormItem :label="bizhong">
                <!-- //5.20修改 -->
                <Select
                  v-model="apply_form.coinSymbol"
                  :placeholder="select"
                  @on-change="onCoinChange"
                >
                  <Option
                    v-for="(item,index) in auditCurrency"
                    :value="item.coin.unit"
                    :key="index"
                  >{{item.coin.unit}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <span>&nbsp;</span>
            </Col>
            <Col span="8">
              <FormItem :label="shuliang">
                <Label v-model="apply_form.amount">{{apply_form.amount}}</Label>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Upload
                type="drag"
                ref="upload1"
                :on-success="assetHandleSuccess"
                :headers="uploadHeaders"
                :action="uploadUrl"
                :on-remove="assetRemove"
              >
                <span style="line-height: 100px;font-size: 50px">+</span>
                <img v-show="assetImg" class="previewImg" :src="assetImg" />
              </Upload>
              <span>{{$t("uc.identity.gerenzichan")}}</span>
            </Col>
            <Col span="8">
              <span>&nbsp;</span>
            </Col>
            <Col span="8">
              <Upload
                type="drag"
                ref="upload2"
                :on-success="tradeHandleSuccess"
                :headers="uploadHeaders"
                :action="uploadUrl"
                :on-remove="tradeRemove"
              >
                <span style="line-height: 100px;font-size: 50px">+</span>
                <img v-show="tradeImg" class="previewImg" :src="tradeImg" />
              </Upload>
              <span>{{$t("uc.identity.shuzizichan")}}</span>
            </Col>
          </Row>
          <FormItem style="margin-top: 20px;">
            <Button
              style="width:100%;background:#3399ff;color:#fff;border:1px solid #3399ff;"
              type="info"
              @click="apply('apply_form')"
              :disabled="applyBtn"
            >{{$t("uc.identity.lijishenqing")}}</Button>
          </FormItem>
        </Form>
      </div>
      <p slot="footer"></p>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "fillinformation",
  props: ["modalApply", "auditCurrency", "amount"],
  data() {
    return {
      noEmpty: "必填",
      applyBtn: false,
      assetImg: "",
      tradeImg: "",
      uploadHeaders: { "x-auth-token": localStorage.getItem("TOKEN") },
      uploadUrl: this.host + "/uc/upload/oss/image",
      apply_form: {
        telno: "",
        wechat: "",
        qq: "",
        coinSymbol: "",
        assetData: "",
        tradeData: ""
      }
    };
  },
  watch: {
    amount(val) {
      this.apply_form.amount = val;
    }
  },
  methods: {
    apply(form) {
      if (this.apply_form.telno == "") {
        this.$store.state.lang != "English" &&
          this.$Message.error("请填写手机号");
        this.$store.state.lang == "English" &&
          this.$Message.error("Please fill in your cell phone number");
        return;
      }
      if (this.apply_form.wechat == "") {
        this.$store.state.lang != "English" &&
          this.$Message.error("请填写微信号");
        this.$store.state.lang == "English" &&
          this.$Message.error("Please fill in your cell wechat number");
        return;
      }
      if (this.apply_form.coinSymbol == "") {
        this.$store.state.lang != "English" &&
          this.$Message.error("请选择币种");
        this.$store.state.lang == "English" &&
          this.$Message.error("Please choose currency");
        return;
      }
      if (this.apply_form.qq == "") {
        this.$store.state.lang != "English" &&
          this.$Message.error("请填写qq号");
        this.$store.state.lang == "English" &&
          this.$Message.error("Please fill in your cell qq number");
        return;
      }
      if (this.apply_form.assetData == "") {
        this.$store.state.lang != "English" &&
          this.$Message.error("请上传资产证明");
        this.$store.state.lang == "English" &&
          this.$Message.error("Please upload the asset certificate");
        return;
      }
      if (this.apply_form.tradeData == "") {
        this.$store.state.lang != "English" &&
          this.$Message.error("请上传交易证明");
        this.$store.state.lang == "English" &&
          this.$Message.error("Please upload the transaction certificate");
        return;
      }
      var params = {};
      params["businessAuthDepositId"] = this.getAudiCoin(
        this.apply_form.coinSymbol
      ).id;
      params["json"] = JSON.stringify(this.apply_form);
      this.$http
        .post(this.host + "/uc/approve/certified/business/apply", params)
        .then(res => {
          var resp = res.body;
          if (resp.code == 0) {
            this.$Message.success("提交成功!");
            this.$emit("submitapply");
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    onCoinChange(value) {
      var coin = this.getAudiCoin(value);
      if (coin != null) {
        this.apply_form.amount = coin.amount;
      }
    },
    getAudiCoin(symbol) {
      var coin = null;
      for (var i = 0; i < this.auditCurrency.length; i++) {
        if (symbol == this.auditCurrency[i].coin.unit) {
          coin = this.auditCurrency[i];
          break;
        }
      }
      return coin;
    },
    assetHandleSuccess(res, file, fileList) {
      // fileList = fileList[fileList.length-1]
      this.$refs.upload1.fileList = [fileList[fileList.length - 1]];
      this.apply_form.assetData = res.data;
      this.assetImg = res.data;
    },
    tradeHandleSuccess(res, file, fileList) {
      this.$refs.upload2.fileList = [fileList[fileList.length - 1]];
      this.apply_form.tradeData = res.data;
      this.tradeImg = res.data;
    },
    assetRemove(file, fileList) {
      this.apply_form.assetData = "";
      this.assetImg = "";
    },
    tradeRemove(file, fileList) {
      this.apply_form.tradeData = "";
      this.tradeImg = "";
    }
  },
  computed: {
    phone() {
      return this.$t("uc.identity.phone");
    },
    qq() {
      return this.$t("uc.identity.qq");
    },
    wechat() {
      return this.$t("uc.identity.wx");
    },
    bizhong() {
      return this.$t("uc.identity.bizhong");
    },
    shuliang() {
      return this.$t("uc.identity.shuliang");
    }
  }
};
</script>
<style lang="less" scoped>
.previewImg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.apply-content {
  width: 80%;
  margin: 0 auto;
}
</style>


