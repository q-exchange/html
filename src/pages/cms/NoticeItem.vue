<template>
    <div class="notice">
        <div class="content-wrap">
            <div class="title_header">
                <router-link to="/helplist">帮助中心</router-link>
                <span>></span>
                <router-link to="/notice">重要公告</router-link>
                <span>></span>
                <router-link to="/notice">最新热点</router-link>
            </div>
            <div class="main">
                <div class="menu">
                    <p>此组别内的文章</p>
                    <ul class="menuList">
                        <li v-for="(item,i) in FAQList" :key="i" @click="clickTitle(item.id)" :class="{active:item.id==data.id}">{{item.title}}</li>
                    </ul>
                </div>
                <div class="content">
                    <h4 class="title">{{data.title}}</h4>
                    <div v-html="data.content" class="text"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: { info: {} },
            queryId: "",
            title: "",
            time: "",
            content: "",
			initLang: this.$store.state.lang,
			FAQList:[],
			pageSize:10,
			pageNo:1,
        };
    },
    created: function() {
		this.initialize();
		this.id = this.$route.query.id;
        var self = this;
        self.fetchData();
		this.$store.commit("navigate", "nav-service");
		this.loadDataPage(this.pageNo);
    },
    computed: {
        lang() {
            if (this.$store.state.lang != this.initLang) {
                this.$router.back();
            }
            return this.$store.state.lang;
        }
    },
    methods: {
		clickTitle(id) {
			this.$http
                .get(this.host + `/uc/announcement/${id}`)
                .then(response => {
                    var result = response.body;
                    if (result.code == 0) {
						this.data = result.data;
                    }
                });
        },
        initialize() {
            this.loadNoticeInfo();
        },
        loadNoticeInfo() {
            let id = this.$route.query.id;
            if (id == null || id == "") {
                this.$router.push("/notice");
                return;
            }
            this.$http
                .get(this.host + `/uc/announcement/${id}`)
                .then(response => {
                    var result = response.body;
                    if (result.code == 0) {
						this.data = result.data;
                    }
                });
        },
        loadDataPage(pageIndex) {
            var param = {};
            (param["pageNo"] = pageIndex),
                (param["pageSize"] = this.pageSize),
                this.$http
                    .post(this.host + this.api.uc.announcement, param)
                    .then(response => {
                        var resp = response.body;
                        if (resp.code == 0) {
							console.log(resp.data.content);
                            this.FAQList = resp.data.content;
                        } else {
                            this.$Notice.error({
                                title: this.$t("common.tip"),
                                desc: resp.message
                            });
                        }
                    });
        },
        fetchData() {
            let id = this.$route.query.id;
            this.loadNoticeInfo();
        }
    },
    watch: {
        $route: "fetchData"
    }
};
</script>

<style lang="less" scoped>
@import url("../../less/notice/light.less");
.notice {
    background: @noticedetailBg;
    padding:80px 0;
    overflow-x: hidden;
    min-height: 800px;
    header {
        padding: 0 10%;
        height: 70px;
        border-bottom: 1px solid #eee;
        img {
            margin-top: 15px;
        }
    }
    .title_header {
        font-size: 13px;
        a {
            color: rgba(53, 124, 225, 1);
        }
        a:hover {
            border-bottom: 1px solid rgba(53, 124, 225, 1);
        }
	}
	.menuList{
		li{
			cursor:pointer;
			color:rgba(28, 36, 44, 1);
			padding:10px;
			width:85%;
			margin:10px 0;
		}
		li:hover{
			color:#fff;
			background-color:rgba(53, 124, 225, 1);
			border-radius:4px;
		}
		.active{
			color:#fff;
			background-color:rgba(53, 124, 225, 1);
			border-radius:4px;
		}
	}
}
.content-wrap {
    background: @noticedetailconBg;
    padding: 30px 10%;
    .main {
		margin:50px 0;
        display: flex;
        .menu {
            width: 20%;
            p {
                font-size: 15px;
                font-weight: 700;
                color: rgba(28, 36, 44, 1);
            }
        }
    }
    .content {
		padding-left:40px;
        .title {
			font-size:32px;
			font-weight:500;
			color: rgba(28, 36, 44, 1);
		}
		.text{
			font-size:15px;
			color:rgba(28, 36, 44, 1);
			padding:20px 0;
		}
    }
}
</style>
