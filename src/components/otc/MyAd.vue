<template>
    <div class="nav-rights">
        <div class="my_ad_box">
            <div class="title">
                <p>我的广告</p>
                <div class="add_ad">
                    <Button icon="plus-round" @click="publish">{{$t('otc.myad.post')}}</Button>
                </div>
            </div>

            <Alert :class="locale == 'en' ? 'en' : ''">{{$t('otc.myad.alert')}}</Alert>
            <div class="order-table">
                <Table :columns="tableColumnsAdv" :data="tableAdv" :no-data-text="$t('common.nodata')" :loading="loading" class="table escapeTables" :disabled-hover="true"></Table>
                <Page v-if="totalPage > 0" :pageSize="pageNumber" :total="totalPage" :current="currentPage" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        let self = this;
        return {
            locale: "",
            loginmsg: this.$t("common.logintip"),
            dataCount: 0,
            tableAdv: [],
            loading: true,
            totalPage: 0,
            pageNumber: 10,
            currentPage: 1
        };
    },
    methods: {
        remove(index) {
            this.tableAdv.splice(index, 1);
        },
        changePage() { },
        getAd() {
            //获取个人广告
            this.$http.post(this.host + "/otc/advertise/all").then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.tableAdv = resp.data.content;
                    for (var i = 0; i < this.tableAdv.length; i++) {
                        this.tableAdv[i].coinUnit = this.tableAdv[i].coin.unit;
                    }
                    this.loading = false;
                    //this.dataCount = resp.data.length
                    this.totalPage = resp.data.totalElements;
                } else {
                    // this.$Message.error(resp.message);
                    // this.$Message.error(this.$t('common.logintip'));
                    this.$Message.error(this.loginmsg);
                }
            });
        },
        publish() {
            this.$router.push(this.api.otc.createAd);
        }
    },
    computed: {
        lang: function () {
            return this.$store.state.lang;
        },
        tableColumnsAdv() {
            let self = this;
            let arr = [];
            arr.push({
                title: self.$t("otc.myad.no"),
                key: "id",
                width: 55,
                align: "center"
            });
            arr.push({
                title: self.$t("otc.myad.type"),
                key: "advertiseType",
                width: 90,
                align: "center",
                render: (h, params) => {
                    let text = "";
                    if (params.row.advertiseType == 0) {
                        text = self.$t("otc.myad.buy");
                    } else if (params.row.advertiseType == 1) {
                        text = self.$t("otc.myad.sell");
                    }
                    return h("div", [h("p", text)]);
                }
            });
            arr.push({
                title: self.$t("otc.myad.limit"),
                key: "limit",
                width: 100,
                align: "center",
                render: (h, params) => {
                    return h("div", [
                        h("p", params.row.minLimit + "~" + params.row.maxLimit)
                    ]);
                }
            });
            arr.push({
                title: self.$t("otc.myad.remain"),
                key: "remainAmount",
                width: 90,
                align: "center"
            });
            arr.push({
                title: self.$t("otc.myad.coin"),
                key: "coinUnit",
                width: 100,
                align: "center"
            });
            arr.push({
                title: self.$t("otc.myad.created"),
                key: "createTime",
                width: 160,
                align: "center"
            });
            arr.push({
                title: self.$t("otc.myad.operate"),
                key: "buyBtn",
                width: 180,
                align: "center",
                render: function (h, params) {
                    return h("p", [
                        h(
                            "a",
                            {
                                on: {
                                    click: function () {
                                        if (params.row.status == 0) {
                                            self.$Message.error(self.$t("otc.myad.errmsg"));
                                        } else {
                                            self.$router.push("/uc/ad/update?id=" + params.row.id);
                                        }
                                    }
                                }
                            },
                            [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "8px"
                                        }
                                    },
                                    self.$t("otc.myad.update")
                                )
                            ]
                        ),
                        h(
                            "Button",
                            {
                                props: {
                                    type: "primary",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "8px"
                                },
                                on: {
                                    click: () => {
                                        //要上架
                                        if (params.row.status == 1) {
                                            let canshu = {};
                                            canshu["id"] = params.row.id;
                                            // canshu['status'] = params.row.status == 0 ? 1 : 0
                                            self.$http
                                                .post(self.host + "/otc/advertise/on/shelves", canshu)
                                                .then(response => {
                                                    var resp = response.body;
                                                    if (resp.code == 0) {
                                                        self.$Message.success(resp.message);
                                                        // self.$router.go(0)
                                                        self.getAd();
                                                    } else {
                                                        self.$Message.error(resp.message);
                                                    }
                                                });
                                        } else if (params.row.status == 0) {
                                            let canshu = {};
                                            canshu["id"] = params.row.id;
                                            // canshu['status'] = params.row.status == 0 ? 1 : 0
                                            self.$http
                                                .post(self.host + "/otc/advertise/off/shelves", canshu)
                                                .then(response => {
                                                    var resp = response.body;
                                                    if (resp.code == 0) {
                                                        self.$Message.success(resp.message);
                                                        // self.$router.go(0)
                                                        self.getAd();
                                                    } else {
                                                        self.$Message.error(resp.message);
                                                    }
                                                });
                                        }
                                    }
                                }
                            },
                            params.row.status == 0
                                ? self.$t("otc.myad.dropoff")
                                : self.$t("otc.myad.shelf")
                        ),
                        h(
                            "Button",
                            {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                on: {
                                    click: () => {
                                        let canshu = {};
                                        canshu["id"] = params.row.id;
                                        if (params.row.status == 1) {
                                            self.$Modal.confirm({
                                                title: self.$t("common.tip"),
                                                content: "<p>" + self.$t("common.delete") + "</p>",
                                                onOk: () => {
                                                    self.$http
                                                        .post(self.host + "/otc/advertise/delete", canshu)
                                                        .then(response => {
                                                            var resp = response.body;
                                                            if (resp.code == 0) {
                                                                self.$Message.success(resp.message);
                                                                self.remove(params.index);
                                                            } else {
                                                                self.$Message.error(resp.message);
                                                            }
                                                        });
                                                }
                                            });
                                        } else {
                                            self.$Message.error("下架广告后才可以删除！");
                                        }
                                    }
                                }
                            },
                            self.$t("otc.myad.delete")
                        )
                    ]);
                }
            });
            return arr;
        }
    },
    watch: {
        //5.25修改
        "$i18n.locale": {
            handler(newVal) {
                this.locale = newVal;
            },
            immediate: true
        }
    },
    created() {
        this.getAd();
    }
};
</script>

<style lang="less" scoped>
@import "../../my_theme/custom.less";
/deep/ .nav-rights .my_ad_box .ivu-alert.ivu-alert-info[data-v-50c44f70].en {
    text-align: left;
}
.ivu-alert.en {
    padding: 8px 0 8px 0;
}
.nav-rights {
    padding:80px 10%;
    .my_ad_box {
        border:1px solid #eee;
        .title{
            display:flex;
            align-items:center;
            justify-content:space-between;
            height:48px;
            background-color:#f2f6fa;
            padding:0 24px;
            p{
                font-weight:600;
                color:#18232d;
            }
        }
        .add_ad {
            .ivu-btn {
                background:#357ce1;
                color: @white-custom;
                &:hover {
                    border-color:#357ce1;
                }
                &:focus {
                    box-shadow: 2px 2px 5px @white-custom,
                        -2px -2px 4px @white-custom;
                }
            }
        }
        /deep/ .ivu-alert.ivu-alert-info {
            border: @border-width_primary @border-style_solid @white-custom;
            background-color: #fdfaf3;
            text-align: center;
        }
    }
}
.escapeTables.ivu-table-wrapper{
    border:0;
}
.nav-rights {
    .my_ad_box {
        .order-table {
            /deep/ th .ivu-table-cell{
                color:#999;
                font-size:14px;
                font-weight:500;
            }
            /deep/ .ivu-table {
                .ivu-table-header,
                .ivu-table-body {
                    table {
                        width: 100% !important;
                        thead {
                            .ivu-table-cell {
                                padding: 0;
                            }
                        }
                    }
                }
                .ivu-table-body {
                    .ivu-table-tbody .ivu-table-row .ivu-table-cell {
                        button.ivu-btn {
                            border-radius: 10px;
                            background: @white-custom;
                            &:focus {
                                box-shadow: 2px 2px 5px @white-custom,
                                    -2px -2px 4px @white-custom;
                            }
                        }
                        button.ivu-btn.ivu-btn-default {
                            border-color: @button-default;
                            span {
                                color: @button-default;
                            }
                        }
                        button.ivu-btn.ivu-btn-primary {
                            border-color: @primary-custom;
                            span {
                                color: @primary-custom;
                            }
                        }
                        button.ivu-btn.ivu-btn-error {
                            border-color: @button-error;
                            span {
                                color: @button-error;
                            }
                        }
                    }
                }
                .ivu-table-tip{
                    padding:60px 0;
                }
            }
        }
    }
}
</style>
