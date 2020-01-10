<!--
 * @Descripttion: 
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-07 10:51:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-07 11:04:36
 -->
<template>
    <footer>
        <div class="footer">
            <div class="footer_content">
                <div class="footer-main">
                    <div class="footer_left">
                        <!-- <img src="./assets/images/logo.png" style="margin:0"></img> -->
                        <div>
                            <img src="../../assets/images/in.png" alt="">
                            <img src="../../assets/images/twitter.png" alt="">
                            <img src="../../assets/images/telegram.png" alt="">
                            <img src="../../assets/images/facebook.png" alt="">
                        </div>
                    </div>
                    <div class="footer_right">
                        <!--下载支持-->
                        <ul class="footer_info">
                            <li class="footer_title">
                                <span>{{$t("footer.download")}}</span>
                            </li>
                            <li>
                                <router-link to="/">{{$t("footer.apiDoc")}}</router-link>
                            </li>
                            <li>
                                <router-link to="/">{{$t("footer.appDownload")}}</router-link>
                            </li>
                            <li>
                                <router-link to="/">{{$t("footer.otherDownload")}}</router-link>
                            </li>

                        </ul>
                        <!--客户服务-->
                        <ul class="footer_info">
                            <li class="footer_title">
                                <span>{{$t("footer.helpCenter")}}</span>
                            </li>
                            <li>
                                <router-link to="/helplist?cate=0&cateTitle=使用教程">{{$t("footer.RecommendedCommission")}}</router-link>
                            </li>
                            <li>
                                <router-link to="/helplist?cate=1&cateTitle=常见问题">{{$t("footer.question")}}</router-link>
                            </li>
                            <li>
                                <router-link to="/">{{$t("footer.serviceArgee")}}</router-link>
                            </li>
                            <li>
                                <router-link to="/">{{$t("footer.transactionCosts")}}</router-link>
                            </li>
                        </ul>
                        <!--投票上币-->
                        <ul class="footer_info">
                            <li class="footer_title">
                                <span>{{$t("footer.voteBi")}}</span>
                            </li>
                            <li class="wechatclick">
                                <router-link to="/">{{$t("footer.shallVote")}}</router-link>
                                <!--                                <poptip width="200">-->
                                <!--                                    <a href="javascript:;" class="wechat">客服邮箱</a>-->
                                <!--                                    &lt;!&ndash; <div slot="content">-->
                                <!--                                        <p style="color:#333;text-align:center;">service@bhuo.top</p>-->
                                <!--                                    </div> &ndash;&gt;-->
                                <!--                                </poptip>-->
                            </li>
                            <li>
                                <router-link to="/">{{$t("footer.coinApp")}}</router-link>
                            </li>
                            <li>
                                <router-link to="/">{{$t("footer.nodeCenter")}}</router-link>
                            </li>
                            <li>
                                <router-link to="/">{{$t("footer.nodeListenning")}}</router-link>
                            </li>
                        </ul>
                        <!--其他-->
                        <ul class="footer_info">
                            <li class="footer_title">
                                <span>{{$t('footer.other')}}</span>
                            </li>
                            <li>
                                <router-link to="/">{{$t('footer.officeNotice')}}</router-link>
                            </li>
                            <li>
                                <router-link to="/">{{$t('footer.marketPlan')}}</router-link>
                            </li>
                            <li>
                                <router-link to="/">{{$t('footer.SubaccountManagement')}}</router-link>
                            </li>
                            <li>
                                <router-link to="/">{{$t('footer.questionnaire')}}</router-link>
                            </li>

                        </ul>
                        <!--联系我们-->
                        <ul class="footer_info" v-if="ENTERPRISEEMAIL">
                            <li class="footer_title">
                                <span>{{$t('footer.concatUs')}}</span>
                            </li>
                            <li>
                                <a href="javascript:;">{{$t('footer.email')}}：{{ENTERPRISEEMAIL}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="info">
                <div class="footer-info">
                    <div class="info-title">{{$t('footer.friendLinks')}}:</div>
                    <div class="info-img">
                        <a href="javascript:;">
                            <img src="../../assets/images/footer/1.png" alt="">
                        </a>
                        <a href="javascript:;">
                            <img src="../../assets/images/footer/2.png" alt="">
                        </a>
                        <a href="http://www.jinse.com">
                            <img src="../../assets/images/footer/3.png" alt="">
                        </a>
                        <a href="http://www.bishijie.com">
                            <img src="../../assets/images/footer/4.png" alt="">
                        </a>
                        <a href="http://www.iterduo.com">
                            <img src="../../assets/images/footer/5.png" alt="">
                        </a>
                        <a href="http://www.feixiaohao.com">
                            <img src="../../assets/images/footer/6.png" alt="">
                        </a>
                        <a href="http://www.btc123.com">
                            <img src="../../assets/images/footer/7.png" alt="">
                        </a>
                        <a href="http://www.jiedian.io">
                            <img src="../../assets/images/footer/8.png" alt="">
                        </a>
                        <a href="http://ihuoqiu.com">
                            <img src="../../assets/images/footer/9.png" alt="">
                        </a>
                        <a href="http://www.huoxing24.com">
                            <img src="../../assets/images/footer/10.png" alt="">
                        </a>
                        <a href="http://www.zerohello.com">
                            <img src="../../assets/images/footer/11.png" alt="">
                        </a>
                        <a href="http://www.xnqb.com">
                            <img src="../../assets/images/footer/16.png" alt="">
                        </a>
                        <a href="http://www.block360.pro">
                            <img src="../../assets/images/footer/12.png" alt="">
                        </a>
                        <a href="http://www.shenliancaijing.com">
                            <img src="../../assets/images/footer/13.png" alt="">
                        </a>
                        <a href="http://huoxun.com">
                            <img src="../../assets/images/footer/14.png" alt="">
                        </a>
                        <a href="http://www.chaingeworld.com">
                            <img src="../../assets/images/footer/15.png" alt="">
                        </a>
                    </div>
                </div>
               <div v-if="ENTERPRISECOPYRIGHT"> {{ENTERPRISECOPYRIGHT}}</div>
            </div>
        </div>
    </footer>
</template>
<script>
import {ENTERPRISEEMAIL,ENTERPRISECOPYRIGHT} from "../../staticMap/static"
export default {
    name: "Footer",
    data(){
        return{
            ENTERPRISEEMAIL,
            ENTERPRISECOPYRIGHT,
        }
    }
}
</script>
<style lang="less" scoped>
.footer .footer_content .footer-main .footer_right .footer_info li {
    color: #8790a1 !important;
}
.wechatclick .api2 {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        img {
            width: 100px;
        }
        span {
            display: block;
            color: #333;
            text-align: center;
        }
    }
}
.footer {
    min-width: 1260px;
    height: 500px;
    overflow: hidden;
    color: #53575c;
    background: #1c2435;
    .footer_content {
        width: 1200px;
        margin: 60px auto 30px;
        .footer-main {
            height: 150px;
            .footer_left {
                float: left;
                font-size: 14px;
                img {
                    margin: 15px 0;
                }
                p {
                    margin: 10px 0;
                    color: rgba(255, 255, 255, 0.6);
                }
            }
            .footer_right {
                float: right;
                text-align: left;
                ul {
                    float: left;
                    margin: 0 15px;
                }
                .footer_info {
                    .footer_title {
                        font-size: 15px;
                        height: 35px;
                    }
                    li {
                        color: #fff;
                        &:first-child {
                            span {
                                font-size: 16px;
                                display: block;
                            }
                        }

                        a {
                            line-height: 26px;
                            color: #8790a1;
                        }
                    }
                }
            }
        }
    }
    .info {
        text-align: center;
        width: 100%;
        border-top: 1px solid #8790a1;
        line-height: 60px;
        font-size: 15px;
        color: #8790a1;
        .footer-info {
            width: 1200px;
            margin: 20px auto 0;
            display: flex;
            .info-title {
                flex: 1;
                margin-right: 20px;
                text-align: left;
                line-height: 45px;
                color: #8790a1;
            }
            .info-img {
                text-align: left;
                flex: 15;
                a {
                    width: 125px;
                    height: 40px;
                    display: inline-block;
                    margin-right: 15px;
                    &:nth-child(8),
                    &:last-child {
                        margin-right: 0;
                    }
                    img {
                        width: 85%;
                    }
                }
            }
        }
    }
}
</style>