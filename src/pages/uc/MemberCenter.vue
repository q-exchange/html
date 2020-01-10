<!--
 * @Descripttion: 
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 18:58:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 19:44:37
 -->
<style lang="less" scoped>
@import "../../my_theme/custom.less";
@import url("../../less/mycenter/light.less");
.myCenterWrapper {
  background-color: @wrapperBG;
  overflow: hidden;
}
.mymsg_wrapper {
  width: 1200px;
  padding: 100px 0;
  margin: 0 auto;
  .wrapper {
    width: 100%;
    border: 1px solid @outborderColor;
    padding: 30px 30px 30px 0;
    overflow: hidden;
    /deep/ul.ivu-menu.ivu-menu-vertical {
      padding: 0 10px;
      width: 18% !important;
      float: left;
      border-right: 1px solid @outborderColor;
      background-color: @leftMenuBg;
      &:after {
        width: 0;
      }
      .title {
        text-align: center;
        font-size: 20px;
        line-height: 40px;
        color: @titleColor;
      }
      li.ivu-menu-submenu {
        .ivu-menu-submenu-title {
          color: @submenuTitleColor;
          .isclick {
            width: 6px;
            height: 6px;
            background-color: @primary-custom;
            border-radius: 50%;
            line-height: 50px;
          }
          .content {
            padding-left: 5px;
          }
          .ivu-icon {
            top: 27px;
          }
        }
        .ivu-menu {
          li.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
            color: @primary-custom;
            a {
              color: @primary-custom;
            }
          }
          li.ivu-menu-item {
            color: @submenyOpenfontColor;
            background: @submenyOpenTheme;
            padding: 0 !important;
            line-height: 3.5;
            text-align: center;
          }
        }
      }
      li.ivu-menu-submenu.ivu-menu-opened {
        background-color: @main_them;
        .ivu-menu-submenu-title {
          .isclick {
            background-color: #fff;
          }
          .content,
          .ivu-icon {
            color: #fff;
          }
        }
      }
    }
    ul.ivu-menu.ivu-menu-light {
      &:after {
        background-color: #fff;
      }
    }
    .nav-rights {
      width: 82%;
      float: left;
      min-height: 600px;
    }
  }
}
.mymsg_wrapper {
  .wrapper {
    ul.ivu-menu.ivu-menu-vertical {
      li.ivu-menu-submenu {
        .ivu-menu-submenu-title {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
<style lang="less">
.mymsg_wrapper .ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 0 24px;
}
</style>




<template>
    <div class="myCenterWrapper">
        <div class="mymsg_wrapper" style="display:none;">

            <div class="wrapper">
                <Menu :active-name="activename" :open-names="opennames" @on-select="getName" @on-open-change="getOpenName" ref="test" accordion>
                    <div class="title">{{$t("uc.title")}}</div>
                    <Submenu name="账户管理">
                        <template slot="title">
                            <span class="isclick"></span>
                            <span class="content">{{$t("uc.menuTitle.AccountManagement")}}</span>
                        </template>
                        <Menu-item name="安全设置">{{$t('uc.member.securitysetting')}}</Menu-item>
                        <Menu-item name="收款方式">{{$t('uc.member.accountsetting')}}</Menu-item>
                        <Menu-item name="我的推广">{{$t('uc.member.myextension')}}</Menu-item>
                        <Menu-item name="手续费等级">{{$t('uc.member.FeeGrade')}}</Menu-item>
                    </Submenu>
                    <Submenu name="资产管理">
                        <template slot="title">
                            <span class="isclick"></span>
                            <span class="content">{{$t("uc.menuTitle.moneyManagement")}}</span>
                        </template>
                        <Menu-item name="个人资产">{{$t('uc.finance.personalassets')}}</Menu-item>
                        <Menu-item name="资产流水">{{$t('uc.finance.billdetail')}}</Menu-item>
                        <Menu-item name="充币">{{$t('uc.finance.charge')}}</Menu-item>
                        <Menu-item name="提币">{{$t('uc.finance.pickup')}}</Menu-item>
                        <Menu-item name="积分管理">{{$t('uc.finance.pointManagement')}}</Menu-item>
                        <Menu-item name="糖果赠送记录">{{$t('uc.finance.CandyGivingRecords')}}</Menu-item>
                    </Submenu>
                    <Submenu name="币币管理">
                        <template slot="title">
                            <span class="isclick"></span>
                            <span class="content">{{$t("uc.menuTitle.bibiManagement")}}</span>
                        </template>
                        <Menu-item name="币币管理当前委托">{{$t("exchange.curdelegation")}}</Menu-item>
                        <Menu-item name="币币管理历史委托">{{$t("exchange.hisdelegation")}}</Menu-item>
                    </Submenu>
                    <Submenu name="法币管理">
                        <template slot="title">
                            <span class="isclick"></span>
                            <span class="content">{{$t("uc.menuTitle.otcManagement")}}</span>
                        </template>
                        <Menu-item name="我的广告">{{$t('otc.myad.title')}}</Menu-item>
                        <Menu-item name="我的订单">{{$t('otc.myorder')}}</Menu-item>
                    </Submenu>
                    <Submenu name="IEO管理">
                        <template slot="title">
                            <span class="isclick"></span>
                            <span class="content">{{$t("uc.menuTitle.ieoManagement")}}</span>
                        </template>
                        <Menu-item name="IEO管理">{{$t("uc.menuTitle.ieoManagement")}}</Menu-item>
                    </Submenu>
                    <Submenu name="API管理">
                        <template slot="title">
                            <span class="isclick"></span>
                            <span class="content">{{$t("uc.menuTitle.apiManagement")}}</span>
                        </template>
                        <MenuItem name="API管理">{{$t("uc.menuTitle.apiManagement")}}</MenuItem>
                    </Submenu>
                    <Submenu name="杠杆交易管理">
                        <template slot="title">
                            <span class="isclick"></span>
                            <span class="content">{{$t("uc.menuTitle.leverManagement")}}</span>
                        </template>
                        <MenuItem name="杠杆管理当前委托">{{$t("exchange.curdelegation")}} </MenuItem>
                        <MenuItem name="杠杆管理历史委托">{{$t("exchange.hisdelegation")}}</MenuItem>
                    </Submenu>
                </Menu>

            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import {
  memberCenterMap,
  memberCenterReverseMap,
  memberAllFirstDirMap,
  linkMap
} from "../../staticMap";
export default {
  data() {
    return {
      activename: "安全设置",
      opennames: ["账户管理"]
    };
  },
  created: function() {
    this.init();
    const path = this.$route.path;
    this.heightLightMenu(path);
  },
  methods: {
    init() {
      if (
        !localStorage.getItem("TOKEN") === "null" ||
        localStorage.getItem("MEMBER") === "null"
      ) {
        this.$Message.success(this.$t("common.logintip"));
        this.$router.push("/login");
      }
    },
    getOpenName(name) {
      if (name.length > 0) {
        const path = linkMap.get(name[0]);
        this.$router.push(path);
        this.heightLightMenu(path);
      }
    },
    getName(name) {
      this.$router.push(memberCenterMap.get(name));
    },
    heightLightMenu(path) {
      this.activename = memberCenterReverseMap.get(path);
      this.opennames = [memberAllFirstDirMap.get(path)];
      // this.$nextTick(() => {
      //     this.$refs.test.updateOpened();
      //     this.$refs.test.updateActiveName();
      // });
    }
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        window.scrollTo(0, 0);
      });
    }
  },
  mounted: function() {
    const doc = document.body;
    const sreenHeight = doc.offsetHeight;
    const headerHeight = doc.getElementsByTagName("header")[0].offsetHeight;
    const footerHeight = doc.getElementsByTagName("footer")[0].offsetHeight;
    const contentHeight = doc.getElementsByClassName("mymsg_wrapper")[0];
    const bodyHeight = sreenHeight - headerHeight - footerHeight;
    contentHeight.style.minHeight = bodyHeight + "px";
  }
};
</script>

