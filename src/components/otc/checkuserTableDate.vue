<template>
    <div class="order-table">
        <Table stripe :columns="tableColumnsOrder" :data="tableOrder" :loading="loading" :disabled-hover="true" class="escapeTables"></Table>
    </div>
</template>

<script>
export default {
    props: ['type'],
    data() {
        return {
            tableOrder: [],
            loading: true,
            type: "sell"
        }
    },
    created() {
        this.getAdv(this.type);
    },
    methods: {
        //获取个人账户信息
        getAdv(userType) {
            this.$http
                .post(this.host + "/otc/advertise/member", {
                    name: this.$route.query.id
                })
                .then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.loading = false;
                        if (userType == 'sell') {
                            this.tableOrder = resp.data.sell;
                        } else if (userType == 'buy') {
                            this.tableOrder = resp.data.buy;
                        }
                    } else {
                        this.$Message.error(resp.message);
                    }
                });
        },
    },
    computed: {
        tableColumnsOrder() {
            let self = this;
            let columns = [];
            columns.push({
                title: this.$t("otc.checkuser.col_symbol"),
                key: "unit"
            });
            columns.push({
                title: this.$t("otc.checkuser.col_paymode"),
                key: "payMode"
            });
            columns.push({
                title: this.$t("otc.checkuser.col_num"),
                key: "remainAmount"
            });
            columns.push({
                title: this.$t("otc.checkuser.col_price") + "/BTC",
                key: "price",
                width: 170,
                render: function (h, params) {
                    return h("div", [
                        h(
                            "p",
                            {
                                attrs: {
                                    class: "price"
                                }
                            },
                            params.row.price + "CNY"
                        ),
                        h(
                            "p",
                            {
                                attrs: {
                                    class: "price2"
                                }
                            },
                            params.row.minLimit + "-" + params.row.maxLimit + "CNY"
                        )
                    ]);
                }
            });
            columns.push({
                title: this.$t("otc.checkuser.col_created"),
                key: "createTime",
                width: 160
            });
            columns.push({
                title: this.$t("otc.checkuser.col_operate"),
                key: "buyBtn",
                render: function (h, params) {
                    return h("p", [
                        h(
                            "a",
                            {
                                on: {
                                    click: function () {
                                        if (!self.isLogin) {
                                            self.$router.push("/login");
                                        } else if (!self.member.realName) {
                                            self.$Message.error(self.$t("otc.checkuser.operatemsg"));
                                            setTimeout(() => {
                                                self.$router.push("/uc/safe");
                                            }, 2000);
                                        } else {
                                            self.$router.push(
                                                "/otc/tradeInfo?tradeId=" + params.row.advertiseId
                                            );
                                        }
                                    }
                                },
                                style: {
                                    color: "#fff"
                                }
                            },
                            [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: params.row.advertiseType == 1 ? 'success' : 'error',
                                            long: true
                                        },
                                        style: {
                                            marginRight: "8px",
                                            width: "80%"
                                        }
                                    },
                                    params.row.advertiseType == 1 ? self.$t("otc.checkuser.buyin") : self.$t("otc.checkuser.sellout")
                                )
                            ]
                        )
                    ]);
                }
            });
            return columns;
        },
        isLogin: function () {
            return this.$store.getters.isLogin;
        },
        member: function () {
            return this.$store.getters.member;
        }
    },
    watch: {
        type(newVal) {
            this.type = newVal;
            this.getAdv(newVal);
        }
    }
}
</script>

<style scoped lang="less">
</style>