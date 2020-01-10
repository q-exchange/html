<template>
  <div class="myextension">
    <div class="banner">
      <div class="write">
        <h2>邀请好友注册XX，轻松获得交易返佣</h2>
        <span>当日立享手续费
          <em>30%</em>返佣福利</span>
      </div>
    </div>
    <div class="step">
      <img src="../../assets/images/back.png" alt="">
    </div>
    <div class="invite-total">
      <p>我的专属分享方式</p>
      <div class="content">
        <div class="con_lef">
          <p>注册链接</p>
          <div class="link">
            <p>{{qrcode.value}}</p>
            <p v-clipboard:copy="qrcode.value" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</p>
          </div>
        </div>
        <div class="con_lef">
          <p>邀请码</p>
          <div class="link">
            <p>{{qrcode.code}}</p>
            <p v-clipboard:copy="qrcode.code" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</p>
          </div>
        </div>
      </div>

    </div>
    <div class="list">
      <div class="list_til">
        <span v-for="(list,index) in buttonLists" :key="list.text" class="btnchange" :class="{changedbtn:changeActive == index}" @click="actives(index)">
          {{list.text}}
        </span>
      </div>
      <div class="list_content">
        <div class="message" v-if="this.changeActive==0">
          <friend></friend>
        </div>
        <div class="message" v-else-if="this.changeActive==1">
          <money></money>
        </div>
      </div>
    </div>

   
  </div>
</template>

<script>
import friend from "./myextention/friend";
import money from "./myextention/money";
export default {
  components: {
    friend,
    money
  },
  data() {
    return {
      currentCommission: "0.00",
      commissionPaying: "6%",
      changeActive: 0,
      qrcode: {
        value: "",
        size: 200,
        code: ""
      },
      loading: true,

      // dataPromoteMoney: {},
      // pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    actives(index) {
      this.currentPage = 1;
      this.changeActive = index;
    },
    qrcodeM() {
      let promotionCode = this.user.promotionCode;
      this.qrcode.value = this.host + "/#/register?agent=" + promotionCode;
      this.qrcode.code = promotionCode;
    },
    onCopy(e) {
      this.$Message.success(this.$t("uc.extension.copy_msg1") + e.text);
    },
    onError(e) {
      this.$Message.error(this.$t("uc.extension.copy_msg2"));
    }
  },
  created() {
    this.actives(this.changeActive);
    this.qrcodeM();
  },
  computed: {
    user: function() {
      return JSON.parse(localStorage.getItem("MEMBER"));
    },
    lang: function() {
      return this.$store.state.lang;
    },
    buttonLists() {
      let buttonListsArr = [
        {
          text: this.$t("uc.extension.title2")
        },
        {
          text: this.$t("uc.extension.title3")
        }
      ];
      return buttonListsArr;
    }
  },
  watch: {
    // lang: function () {
    //     this.updateLangData();
    // }
  }
};
</script>
<style lang="less" scoped>
@import "../../my_theme/custom.less";
@import url("../../less/uc/myextension/light.less");
.myextension {
  // padding-top: 48px;
  .banner {
    background: url(https://file.huobiasia.vip/global/zh-cn/static/img/19f020f.jpg)
      no-repeat;
    height: 432px;
    width: 100%;
    background-size: 100% 100%;
    position: relative;
    .write {
      position: absolute;
      top: calc(50% + 24px);
      left: 50%;
      width: 1200px;
      transform: translate(-50%, -50%);
      h2 {
        font-size: 32px;
        line-height: 40px;
        color: #fff;
        margin-bottom: 24px;
      }
      span {
        font-size: 24px;
        line-height: 32px;
        color: #b0b8db;

        em {
          font-style: normal;
          color: #ffc886;
        }
      }
    }
  }
  .step {
    height: 140px;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .invite-total {
    width: 80%;
    // height: 292px;
    margin: 20px auto;
    border: 1px solid #eaedf0;
    padding: 32px;
    box-sizing: border-box;
    font-size: 20px;
    .content {
      margin-top: 24px;
      color: #495666;
      display: flex;
      justify-content: space-between;
      .con_lef {
        width: 48%;
        font-size: 12px;
        .link {
          width: 100%;
          height: 40px;
          line-height: 40px;
          border-radius: 2px;
          padding-left: 16px;
          margin-top: 8px;
          border: 1px solid #dfe2e7;
          color: #1c242c;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          p:nth-child(2) {
            // min-width: 54px;
            padding: 0 12px;
            height: 32px;
            line-height: 32px;
            margin: 3px 8px 0 0;
            background-color: #357ce1;
            color: #fff;
            border-radius: 3px;
            text-align: center;
            cursor:pointer;
          }
        }
      }
    }
  }
  .list {
    width: 80%;
    margin: 16px auto;
    border: 1px solid #eaedf0;
    .list_til {
      height: 48px;
      line-height: 48px;
      background-color: #f2f6fa;
      border-bottom: 1px solid #e6ecf2;
      padding: 0 24px;
      .btnchange {
        margin-right: 20px;
        padding-bottom: 12px;
        cursor:pointer;
        &:hover{
          color:#357ce1;
        }
      }
      .changedbtn {
        color: #357ce1;
        border-bottom: 3px solid #357ce1;
      }
    }
  }
  .nav-right {
    height: auto;
    overflow: hidden;
    padding: 0 15px;
    .sharelink {
      width: 100%;
      background: @recommendBG;
      border-radius: 5px 5px 0 0;
      padding: 0 20px;
      p {
        color: @titleColor;
        line-height: 2;
      }
      .c1 {
        font-size: 20px;
      }
      .c2 {
        font-size: 12px;
        margin-bottom: 15px;
      }
      .copyAndshare {
        background: @recommendBG;
        display: flex;
        .leftwrapper {
          div {
            height: 30px;
            line-height: 30px;
            color: @titleColor;
            .code {
              color: @primary-custom;
            }
            .link-copy {
              margin-left: 10px;
            }
          }
        }
      }
    }
    .rightarea {
      background: @recommendBG;
      .message {
        margin: 0 auto;
        font-size: 16px;
        color: @titleColor;
        margin-top: -2px;
        .title {
          float: left;
          margin: 46px 0 0px 0;
          .copy {
            user-select: text;
          }
        }
        .inner-box {
          display: table-cell;
          width: 100%;
        }
        a.link-copy {
          margin-left: 10px;
        }
        .describe {
          float: left;
          margin: 52px 36px 0 0;
        }
      }
      /deep/.ivu-btn-group {
        .btStyle {
          width: 174px;
          height: 42px;
          font-size: 1.125em;
          color: #a2a0a1;
          background: @main_theme_font_color;
          // color: @main_theme;
          margin: 20px 0 0;
          border: none;
          border-radius: 0;
          &:nth-child(1) {
            border-right: none;
          }
          &:hover {
            color: @main_theme_font_color;
            background-color: @main_theme;
          }
        }
        .btStyle.active {
          background-color: @main_theme;
          color: @main_theme_font_color;
        }
      }
      /deep/.ivu-table-wrapper {
        margin-top: 2px;
        border: 1px solid @tableborderColor;
        border-bottom: none;
        .ivu-table {
          th {
            border-bottom: 1px solid @tableHeaderBorderColor;
          }
          &:after {
            width: 0;
          }
          &:before {
            height: 0;
          }
          .ivu-table-header {
            background-color: @recommendBG;
            color: @titleColor;
          }
          .ivu-table-header th {
            background: none;
          }
          .ivu-table-body td {
            background-color: @recommendBG;
            color: @titleColor;
          }
          .ivu-table-overflowX {
            overflow: hidden;
          }
          .ivu-table-body {
            tr {
              td {
                border-bottom: 1px solid @tableHeaderBorderColor;
              }
            }
          }
        }
      }
    }
  }
 /deep/ .escapeTables.ivu-table-wrapper .ivu-table{
   .ivu-table-header th,.ivu-table-tip td{
   color: #9ca9b5;
  }
 } 
}

</style>





