<template>
    <footer class="fedui-root fedui-footer-simple" data-v-e650ad18="">
        <ul>
            <li><a href="">首页</a></li>
            <li><a rel="noopener noreferrer" target="_blank" href="https://www.huobigroup.com/zh-cn/">XX集团</a></li>
            <li><a rel="noopener noreferrer" target="_blank" href="https://huobiglobal.zendesk.com/hc/zh-cn/">帮助中心</a></li>
            <li><a target="_blank" href="/zh-cn/download/#exchange">客户端下载</a></li>
            <li><span>© 2013-2019 Huobi</span></li>
        </ul>
    </footer>
</template>
<script>
export default {
    name: "simpleFooter",
}
</script>
<style lang="less" scoped>
.fedui-footer-simple {
    background-color: rgb(36, 46, 72);
    color: rgba(134, 158, 201, 0.7);
    font-size: 12px;
    height: 48px;
    min-width: 1280px;
    width: 100%;
    text-align: center;
    padding-top: 12px;
    padding-bottom: 12px;
    line-height: 24px;
    ul>li{
        display: inline-block;
    }
}
</style>