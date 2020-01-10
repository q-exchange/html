<template>
    <div class="symbol">
        <div class="item" @click="currentCoinFavorChange" style="display:none;">
            <!-- 点击收藏 -->
            <Icon v-if="currentCoinIsFavor" type="ios-star" color="#3399ff" size="24" />
            <Icon v-else type="ios-star-outline" color="#3399ff" size="24" />
        </div>
        <div class="item">
            <!-- 交易对 -->
            <span class="coin">{{currentCoin.coin}}/{{currentCoin.base}}</span>
        </div>
        <div class="item newPrice">
            <!-- 最新价 -->
            <span class="num" :class="{buy:currentCoin.change>0,sell:currentCoin.change<0}">{{currentCoin.closeStr}}</span>
            
            <span class="price-cny">≈{{currentCoin.cnyPrice}}CNY</span>
        </div>
        <div class="item gain">
            <span class="text">涨幅</span>
            <span class="num" :class="{buy:currentCoin.change>0,sell:currentCoin.change<0}">{{currentCoin.rose}}</span>
        </div>
        <div class="item gain">
            <span class="text">24H高</span>
            <span class="num ">{{currentCoin.high | toFixed(baseCoinScale)}}</span>
        </div>
        <div class="item gain">
            <span class="text">24H低</span>
            <span class="num ">{{currentCoin.low | toFixed(baseCoinScale)}}</span>
        </div>
        <div class="item gain">
            <span class="text">24H量</span>
            <span class="num ">{{currentCoin.volume}} {{currentCoin.coin}}</span>
        </div>
        <div class="item" @click="changeSkin" style="justify-content:center;margin-left: auto;align-items:flex-end;padding-right:14px;">
            <img :src="skin == 'night' ? night : day" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name: "exchangeHeader",
    props: {
        currentCoin: Object,
        currentCoinIsFavor: Boolean,
        skin: String,
        CNYRate: Number,
        baseCoinScale: Number
    },
    data() {
        return {
            day: require("../../assets/images/exchange/night.png"), // 黑色版本
            night: require("../../assets/images/exchange/day.png"), // 白色版本
        }

    },
    methods: {
        currentCoinFavorChange() {
            this.$emit("collect");
        },
        changeSkin() {
            this.$emit("changeSkin");
        }
    },
    watch:{
        currentCoin(newVal){
            // console.log(newVal);
        }
    }
}
</script>
<style lang="less" scoped>
.exchange {
    .symbol {
        display: flex;
        justify-content: flex-start;
        height: 44px;
        align-items: center;
        background-color: #191a1f;
        border-radius: 2px 2px 0 0;
        .item {
            color: #d5def2;
            font-weight: 500;
            height: 100%;
            display: flex;
            flex-direction: column;
            .price-cny {
                font-size: 12px;
                color: #999;
                line-height: 1.25;
            }
            .coin {
                height: 44px;
                line-height: 44px;
                vertical-align: unset;
                white-space: nowrap;
                margin-right: 4px;
                font-size: 16px;
                font-weight: 400;
                font-weight: 600;
                position: relative;
                cursor: pointer;
                display: inline-block;
                padding-left: 8px;
                margin-left: 6px;
                margin-right: 4px;
            }
            .text {
                width: 100%;
                display: block;
                font-size: 12px;
                color: #697080;
            }
            .num {
                line-height: 1.25;
                color: #697080;
            }
            .num.sell {
                color: #fa5252;
            }
            .num.buy {
                color: #05c19e;
            }
            > img {
                display: block;
                width: 18px;
                height: 18px;
                cursor: pointer;
            }
        }
        .newPrice {
            margin-left: 8px;
            text-align: left;
            padding: 5px 0;
            margin-right: 16px;
            .num{
                 font-size: 16px;
            }
        }
        .gain {
            margin-right: 15px;
            padding: 6px 0;
            font-size: 12px;
            .num{
                color: #a7b7c7;
            }
        }
    }
}
.exchange.day {
    .symbol {
        background-color: #f2f6fa;
        .item {
            color: #1c242c;
            .price-cny {
                color: #9ca9b5;
            }
            .text {
                color: #9ca9b5;
            }
            .num {
                color: #596a7a;
            }
            .num.sell {
                color: #fa5252;
            }
            .num.buy {
                color: #05c19e;
            }
        }
        .newPrice {
            .num{
                 font-size: 16px;
            }
        }
        .gain {
            .num{
                color: #596a7a;
            }
        }
    }
}
</style>
