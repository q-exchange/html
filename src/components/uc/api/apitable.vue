<template>
    <div>
        <Table class="escapeTables table" :columns="myColumns" :data="tableData" :no-data-text="$t('common.nodata')"></Table>
        <!-- 删除 -->
        <Modal v-model="modal" :title="$t('apiAdmin.delete')" @on-ok="onDel(id)" @on-cancel="cancel" :ok-text="$t('apiAdmin.okText')" :cancel-text="$t('apiAdmin.cancel')">
            <p>{{$t('apiAdmin.sureDelete')}}</p>
        </Modal>

        <!--编辑API-->
        <Modal v-model="editor" :title="$t('apiAdmin.edit')">
            <Form :model="editorFormItem" label-position="top">
                <FormItem :label="$t('apiAdmin.mark')">
                    <Input v-model="editorFormItem.remark"></Input>
                </FormItem>
                <FormItem :label="$t('apiAdmin.bindIpAddress')">
                    <Input v-model="editorFormItem.bindIp"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="editor=false">取消</Button>
                <Button type="primary" size="large" @click="update">确定</Button>
            </div>
        </Modal>

        <!--编辑短信校验-->
        <div class="let-code">
            <Modal v-model="verifyEditor" :title="$t('apiAdmin.edit')">
                <Form :model="editorFormItem" label-position="top">
                    <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode3">
                        <Input v-model="editorFormItem.code" size="large">
                        <div class="timebox" slot="append">
                            <Button @click="sendCode" :disabled="sendMsgDisabled1">
                                <span v-if="sendMsgDisabled">{{time+$t('uc.safe.second')}}</span>
                                <span v-if="!sendMsgDisabled">{{$t('uc.safe.clickget')}}</span>
                            </Button>
                        </div>
                        </Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" size="large" @click="verifyEditor=false">取消</Button>
                    <Button type="primary" size="large" @click="okUpdate">确定</Button>
                </div>
            </Modal>
        </div>

    </div>
</template>
<script>
export default {
  name: "apitable",
  props: {
    flag: Boolean
  },
  data() {
    return {
      tableData: [],
      modal: false,
      editor: false,
      editorFormItem: {
        remark: "",
        bindIp: "",
        code: ""
      },
      time: 60, // 发送验证码倒计时
      sendMsgDisabled: false,
      verifyEditor:false
    };
  },
  created() {
    this.getAllAPI();
  },
  methods: {
    // 删除api
    onDel(id) {
      this.$http.get(this.host + `/uc/open/api/del/${id}`).then(res => {
        if (!res.body.code) {
          this.$Message.success(res.body.message);
          this.getAllAPI();
        } else {
          this.$Message.error(res.body.message);
        }
      });
    },
    // 编辑api
    update() {
      const IP_REG = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
      if (!this.editorFormItem.remark) {
        const lang =
          this.$store.getters.lang == "English"
            ? "please scanner remark"
            : "请输入备注信息";
        this.$Message.error(lang);
        return;
      }
      //   if (!this.editorFormItem.bindIp) {
      //     const lang =
      //       this.$store.getters.lang == "English"
      //         ? "please scanner IP Address"
      //         : "请输入IP地址";
      //     this.$Message.error(lang);
      //     return;
      //   }
      //   if (!IP_REG.test(this.editorFormItem.bindIp)) {
      //     const lang =
      //       this.$store.getters.lang == "English"
      //         ? "please scanner Correct IP Address"
      //         : "请输入正确IP地址";
      //     this.$Message.error(lang);
      //     return;
      //   }
      this.$http
        .post(this.host + "/uc/open/api/update", this.editorFormItem)
        .then(res => {
          if (!res.body.code) {
            this.getAllAPI();
            this.editor = false;
            this.$Message.success(res.body.message);
          } else {
            this.$Message.error(res.body.message);
          }
        });
    },
    // 编辑验证
    okUpdate() {
      if (this.editorFormItem.code == undefined) {
        const lang =
          this.$store.getters.lang == "English"
            ? "please scanner Correct IP Address"
            : "请输入验证码";
        this.$Message.error(lang);
        return;
      } else {
        this.verifyEditor = false;
        this.editor = true;
      }
    },
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
    getAllAPI() {
      return this.$http.get(this.host + `/uc/open/get_key`).then(res => {
        console.log(res);
        this.tableData = res.body.data;
        console.log(this.tableData);
      });
    }
  },
  watch: {
    flag(val) {
      if (val) {
        this.getAllAPI();
      }
    }
  },
  computed: {
    myColumns() {
      const arr = [];
      arr.push({
        title: this.$t("apiAdmin.createTime"),
        // width: 100,
        width: this.locale == "en" ? 110 : 100,
        key: "createTime"
      });
      arr.push({
        title: this.$t("apiAdmin.mark"),
        width: 90,
        key: "remark"
      });
      arr.push({
        title: "API Key",
        width: 150,
        key: "apiKey"
      });
      arr.push({
        title: this.$t("apiAdmin.accessKey"),
        width: this.locale == "en" ? 130 : 100,
        render: (h, params) => {
          const text = "******";
          return h("span", {}, text);
        }
      });
      arr.push({
        title: this.$t("apiAdmin.bindIpAddress"),
        width: this.locale == "en" ? 130 : "",
        render: (h, params) => {
          let txts = params.row.bindIp.split(",");
          txts = txts.length > 1 ? txts[0] + "  " + "..." : txts;
          return h("span", {}, txts);
        }
      });
      arr.push({
        title: this.$t("apiAdmin.ioDays"),
        width: this.locale == "en" ? 150 : "",
        render: (h, params) => {
          if (!params.row.bindIp) {
            let residue = +new Date(params.row.expireTime) - +new Date();
            let lastTime = Math.floor(residue / 1000 / 60 / 60 / 24);
            lastTime = lastTime <= 0 ? 0 : lastTime;
            const timeDay = h("span", {}, lastTime);
            return [timeDay];
          }
        }
      });
      arr.push({
        title: this.$t("apiAdmin.operation"),
        align: "center",
        width: 180,
        render: (h, params) => {
          return [
            h(
              "Button",
              {
                props: {
                  type: "primary"
                },
                on: {
                  click: () => {
                    const { remark, bindIp, id, code } = params.row;
                    this.editorFormItem = { remark, bindIp, id, code };
                    this.verifyEditor = true;
                  }
                }
              },
              this.$t("apiAdmin.edit")
            ),
            h(
              "Button",
              {
                props: {
                  type: "error"
                },
                style: {
                  marginLeft: "10px"
                },
                on: {
                  click: () => {
                    this.modal = true;
                    this.id = params.row.id;
                  }
                }
              },
              this.$t("apiAdmin.delete")
            )
          ];
        }
      });
      return arr;
    }
  }
};
</script>
<style lang="less" scoped>
</style>


