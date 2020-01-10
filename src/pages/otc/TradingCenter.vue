<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container" id="List">
                <Row>
                    <Col span="4">
                    <div class="leftmenu">
                        <router-link to="/editad" style="line-height:40px;display:block;margin: 10px;">
                            <Button class="adv" type="primary" size="large" style="padding: 7px 25px;">{{$t('otc.tradecenter.postad')}}</Button>
                        </router-link>
                        <ul class="nav nav-pills nav-stacked">
                            <span class="leftmenu-title leftmenu-folding top" data-folding="trademenu1">
                                <i class="lefticon icon1"></i>
                                {{$t('otc.tradecenter.exchange')}}
                            </span>
                            <li class>
                                <router-link to="/tradingcenter/coin1buy">{{$t('otc.tradecenter.buyin')}}</router-link>
                            </li>
                            <li class>
                                <router-link to="/tradingcenter/coin1sell">{{$t('otc.tradecenter.sellout')}}</router-link>
                            </li>
                        </ul>
                    </div>
                    </Col>
                    <Col span="20">
                    <!-- <keep-alive> -->
                    <router-view></router-view>
                    <!-- </keep-alive> -->
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
// import trademenu from '../components/trademenu'
export default {
    components: {
        // trademenu
    },
    data() {
        return {};
    },
    methods: {
        // getId() {
        //     this.tradeWay = event.currentTarget.id
        // },
        init() {
            this.$store.commit("navigate", "nav-otc");
            this.$http.post(this.host + this.api.otc.coin).then(response => { });
        }
    },
    created: function () {
        this.init();
    }
};
</script>

<style scoped lang="less">
@import "../../my_theme/custom.less";
.icon1 {
    background: url("../../assets/img/gcc.png") no-repeat 0 0;
    background-size: 100% 100%;
}

.icon2 {
    background: url("../../assets/img/usdt.png") no-repeat 0 0;
    background-size: 100% 100%;
}

.content-wrap {
    background: @content-wrap_bgcolor;
    min-height: 750px;
}

.container {
    padding-top: 30px;
    margin: 0 auto;
}

/* left */
.leftmenu {
    margin-bottom: 60px;
    background: @white-custom;
    position: relative;
    min-height: 1px;
    padding: 20px 15px;
}

/deep/ .leftmenu a.router-link-active {
    background: @a_hover;
    color: @primary-custom !important;
}

.nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
}

.nav > li {
    line-height: 50px;
}

.leftmenu .nav-stacked {
    background: @white-custom;
}

.leftmenu .leftmenu-title {
    line-height: 55px;
    font-size: 16px;
    background: 0 0;
    color: @a-color_black;
    display: block;
}

.leftmenu .nav > li > a {
    display: block;
    color: @a-color_black;
    font-size: 14px;
}

/deep/ .leftmenu .nav-pills > li.active > a,
.leftmenu .nav > li > a:hover,
.nav-pills > li.active > a:focus,
.nav-pills > li.active > a:hover {
    background: @a_hover;
    color: @primary-custom;
}

.leftmenu .leftmenu-title.top {
    border-top: 0;
}

.leftmenu .lefticon {
    width: 26px;
    height: 26px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
}
</style>

