<template>
    <div class="coinorder" :style="{'min-height':minHeight+'px'}">
        <div class="coinorder_til">
            <div class="til_con">
                <img src="../../assets/images/coin.png" alt="" style="height:25px;">
                <p>币币订单</p>
                <p v-for="(list,index) in buttonLists" :key="list.text" :class="{checkeditem:changeActive == index}" @click="actives(index)">
                    {{list.text}}
                </p>
            </div>
        </div>
        <div class="list_content">
            <div class="message" v-if="this.changeActive==0">
                <current></current>
            </div>
            <div class="message" v-else-if="this.changeActive==1">
                <history></history>
            </div>
        </div>
    </div>
</template>

<script>
import current from "./EntrustCurrent";
import history from "./EntrustHistory";
export default {
    components: { current, history },
    data() {
        return {
            changeActive: 0,
            minHeight: 0
        };
    },
    methods: {
        actives(index) {
            this.changeActive = index;
        }
    },
    created() {
        this.actives(this.changeActive);
    },
    computed: {
        buttonLists() {
            let buttonListsArr = [
                {
                    text: "当前委托"
                },
                {
                    text: "历史委托"
                }
            ];
            return buttonListsArr;
        }
    },
    mounted() {
        let minHeight = document.documentElement.clientHeight;
        document.getElementById("minHeight").style.minHeight = minHeight;
    }
};
</script>


<style lang="less" scoped>
@import "../../my_theme/custom.less";
.coinorder {
    //   padding-top: 48px;
    margin-top: 48px;
    // min-height: 700px;
    .coinorder_til {
        width: 100%;
        height: 82px;
        background-color: #1b2945;
        .til_con {
            width: 80%;
            margin: 0 auto;
            color: #fff;
            padding-top: 40px;
            display: flex;
            cursor: pointer;
            p:nth-last-child(3) {
                margin-right: 80px;
                margin-left: 10px;
            }
            p:nth-last-child(2) {
                margin-right: 30px;
            }
            .checkeditem {
                color: #3399ff;
                padding-bottom: 17px;
                border-bottom: 2px solid #3399ff;
            }
        }
    }
}
/deep/ .ivu-page {
    text-align: right;
    .ivu-page-item {
        border: 1px solid #eee;
        &:hover {
            border: 1px solid #357ce1;
            background-color: #fff;
            a {
                color: #638bd4;
            }
        }
    }
    .ivu-page-item.ivu-page-item-active {
        background-color: #fff !important;
        color: #638bd4 !important;
        border: 1px solid #357ce1;
        a {
            color: #638bd4 !important;
        }
    }
}
.nav-right {
    height: auto;
    overflow: hidden;
    padding: 0 0 0 15px;
    .rightarea.bill_box {
        width: 100%;
        height: auto;
        overflow: hidden;
        /deep/.ivu-table-body {
            td {
                .ivu-table-cell {
                    p .ivu-btn {
                        background: #fff;
                        height: 25px;
                        padding: 0 10px;
                        span {
                            display: inline-block;
                            line-height: 25px;
                            font-size: 14px;
                        }
                    }
                    p .ivu-btn.ivu-btn-info {
                        border: 1px solid @primary-custom;
                        border-radius: 20px;
                        span {
                            color: @primary-custom;
                        }
                    }
                    p .ivu-btn.ivu-btn-error {
                        border: 1px solid #f15057;
                        border-radius: 20px;
                        span {
                            color: #f15057;
                        }
                    }
                    p .ivu-btn.ivu-btn-primary {
                        border: 1px solid #00b275;
                        border-radius: 20px;
                        span {
                            color: #00b275;
                        }
                    }
                }
            }
        }
    }
}
</style>





