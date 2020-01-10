<template>
    <footer data-locale="zh-cn" class="fedui-root fedui-footer" data-v-3ffbf6be="">
        <div class="fedui-footer-inner">
            <div class="fedui-footer-left">
                <div class="fedui-footer-logo"><img width="84" height="23" src="" alt="logo"></div>
                <div class="fedui-footer-copyright">
                    © 2017-2019 XX
                </div>
                <div class="fedui-footer-link"><a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/huobiglobalofficial"><i class="fedui-icon-facebook"></i></a> <a rel="noopener noreferrer" target="_blank" href="https://twitter.com/HuobiGlobal"><i class="fedui-icon-twitter"></i></a> <a rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/HuobiGlobal"><i class="fedui-icon-youtube"></i></a> <a rel="noopener noreferrer" target="_blank" href="https://www.huobichat.com/globalGroup"><i class="fedui-icon-chat"></i></a> <a rel="noopener noreferrer" target="_blank" href="https://medium.com/@huobiglobal"><i class="fedui-icon-medium"></i></a> <a rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/huobiglobalofficial/"><i class="fedui-icon-instagram"></i></a> <a rel="noopener noreferrer" target="_blank" href="https://weibo.com/huobicom"><i class="fedui-icon-weibo"></i></a> <a rel="noopener noreferrer" target="_blank" href="https://coinmarketcap.com/zh/exchanges/huobi-global/"><i class="fedui-icon-coinmarketcap"></i></a> <a rel="noopener noreferrer" target="_blank" href="https://www.coingecko.com/zh/exchanges/huobi/"><i class="fedui-icon-clingecko"></i></a></div>
            </div>
            <div class="fedui-footer-right">
                <dl>
                    <dt>工具</dt>
                    <dd><a target="_blank" href="">客户端下载</a> <a rel="noopener noreferrer" target="_blank" href="">API文档</a> <a target="_blank" href="">数字资产介绍</a> <a target="_blank" href="">官方验证通道</a>
                        <!---->
                    </dd>
                </dl>
                <dl>
                    <dt>服务</dt>
                    <dd><a target="_blank" href="">费率</a> <a rel="noopener noreferrer" target="_blank" href="">帮助中心</a> <a rel="noopener noreferrer" target="_blank" href="">新手指南</a> </dd>
                </dl>
                <dl>
                    <dt>支持</dt>
                    <dd><a target="_blank" href="">上币申请</a> <a target="_blank" href="">机构账户</a> <a target="_blank" href="">大客户权益</a> <a target="_blank" href="">法币广告权限申请</a></dd>
                </dl>
                <dl>
                    <dt>条款说明</dt>
                    <dd><a rel="noopener noreferrer" target="_blank" href="">用户协议</a> <a rel="noopener noreferrer" target="_blank" href="">隐私条款</a> <a rel="noopener noreferrer" target="_blank" href="">法律声明</a> <a rel="noopener noreferrer" target="_blank" href="">法币交易规则</a></dd>
                </dl>
            </div>
        </div>
        <!---->
    </footer>
</template>
<script>
import { ENTERPRISEEMAIL, ENTERPRISECOPYRIGHT } from "../../staticMap/static"
export default {
    name: "Footer",
    data() {
        return {
            ENTERPRISEEMAIL,
            ENTERPRISECOPYRIGHT,
        }
    }
}
</script>
<style lang="less" scoped>
.fedui-footer {
    width: 100%;
    background-color: #111114;
    color: #697080;
    padding-top: 100px;
    padding-bottom: 100px;
    min-width: 1280px;
    .fedui-footer-inner {
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: space-between;
        .fedui-footer-logo {
            height: 23px;
        }
        .fedui-footer-copyright {
            font-size: 12px;
            color: #6a707f;
            line-height: 12px;
            padding-top: 16px;
        }
        .fedui-footer-link {
            padding-top: 40px;
            a {
                margin-left: 8px;
                width: 24px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                color: #a8b7c8;
                display: inline-block;
                border-radius: 50%;
                vertical-align: top;
            }
        }
        .fedui-footer-right {
            width: 792px;
            display: flex;
            justify-content: space-between;
            dl {
                width: 180px;
                dt {
                    line-height: 20px;
                    padding-bottom: 8px;
                    display: block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                a {
                    padding-top: 8px;
                    display: block;
                    font-size: 12px;
                    line-height: 16px;
                    color: #d5def2;
                    word-wrap: break-word;
                }
            }
        }
    }
}
</style>