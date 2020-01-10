<template>
    <div class="symbol">
        <div class="item">
            <span class="coin">{{currentCoin.coin}}
                <!-- 5.20修改 -->
                <small>/{{currentCoin.base}} &nbsp;&nbsp;<span style="border:1px solid rgba(53,124,225,.4); borderColor: 'rgba(53,124,225,.4); display:inline-block; width:30px; text-align:center;line-height:18px;padding-top:2px; color:#357ce1">{{LeversymbolMsg.proportion}}</span></small>
            </span>
        </div>
        <div class="item">
            <!-- 风险率 -->
            <span class="text">{{$t('coin.rate')}}</span>
            <span class="num">{{LeversymbolMsg.riskRate?LeversymbolMsg.riskRate:'---'}}</span>
        </div>
        <div class="item">
            <span class="text">{{$t('coin.blowing')}}</span>
            <span class="num">{{LeversymbolMsg.explosionPrice ? LeversymbolMsg.explosionPrice : '---'}}&nbsp;&nbsp;{{LeversymbolMsg.baseCoin}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"riskRate",
    props:{
        currentCoin:Object,
        LeversymbolMsg:Object
    }
}
</script>
<style lang="less" scoped>
.symbol{
    padding: 6px 16px;
    border-radius: 1px;
    font-size: 12px;
    line-height: 24px;
    background-color: #1f2126;
    color: #a7b7c7;
    display: flex;
    margin-bottom: 6px;
    font-weight: 700;
    justify-content: space-between;
}
</style>