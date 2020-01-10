<!--
 * @Descripttion: 
 * @version: 
 * @Author: 张志强
 * @Date: 2019-08-16 16:15:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 10:07:25
 -->
<template>
    <div class="helpdetail">
        <div class="helpdetail_content">
            <div class="route-wrap">
                <router-link to="/helplist">{{$t("footer.helpCenter")}}</router-link>
                <span>></span>
                <router-link
                    :to="{path:'/helplist',query:{cate:cate,cateTitle:cateTitle}}"
                >{{cateTitle}}</router-link>
            </div>
            <div>
                <div class="main">
                    <div class="menu">
                        <p>此组别内的文章</p>
                        <div class="titles">
                            <div class="route" v-for="(item,i) in topList" :key="i" @click="clickTitle(item.id)" :class="{active:item.id==article.id}">
                                <span>{{item.title}}</span>
                            </div>
                        </div>
                        <!-- <router-link :to="{path:'helplist',query:{cate:cate,cateTitle:cateTitle}}">查看更多>></router-link> -->
                    </div>
                    <div class="content-wrap">
                        <h3 class="title">{{article.title}}</h3>
                        <p class="time">{{article.createTime}}</p>
                        <div class="content">
                            <div v-html="article.content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            topList: [], //左侧文章列表
            article: {} //文章详情
        };
    },
    created() {
        const { cate, id, cateTitle } = this.$route.query;
        this.cate = cate;
        this.id = id;
        this.cateTitle = cateTitle;
        this.init();
        this.$store.commit("navigate", "nav-uc");
    },
    methods: {
        clickTitle(id) {
			this.getData(id);
			console.log(id);
        },
        getTop() {
            return this.$http.post(
                this.host + "/uc/ancillary/more/help/page/top",
                {
                    cate: this.cate
                }
            );
        },
        getArticle() {
            return this.$http.post(
                this.host + "/uc/ancillary/more/help/detail",
                {
                    id: this.id
                }
            );
        },
        init() {
            Promise.all([this.getTop(), this.getArticle()]).then(arr => {
                if (
                    arr[0].status == 200 &&
                    arr[0].body.code == 0 &&
                    arr[1].status == 200 &&
                    arr[1].body.code == 0
                ) {
                    let returnTop = arr[0].body.data,
                        returnArticle = arr[1].body.data,
                        hsaInTop = false;
                    returnTop.forEach(v => {
                        if (v.id == returnArticle.id) {
                            hsaInTop = true;
                        }
                    });
                    hsaInTop ? "" : returnTop.unshift(returnArticle);
                    this.topList = returnTop;
                    this.article = returnArticle;
                } else {
                    this.$Message.error("网络错误");
                }
            });
        },
        getTopList() {
            this.$http
                .post(this.host + "/uc/ancillary/more/help/page/top", {
                    cate: this.cate
                })
                .then(res => {
                    if (res.status == 200 && res.body.code == 0) {
                        this.topList = res.body.data;
                    } else {
                        this.$Message.error(res.body.message);
                    }
                });
        },
        getData(id) {
            this.$http
                .post(this.host + "/uc/ancillary/more/help/detail", {
                    id
                })
                .then(res => {
                    if (res.status == 200 && res.body.code == 0) {
                        this.article = res.body.data;
                    } else {
                        this.$Message.error(res.body.message);
                    }
                });
        }
    },
    mounted() {
        const doc = document.body;
        const sreenHeight = doc.offsetHeight;
        const headerHeight = doc.getElementsByTagName("header")[0].offsetHeight;
        const footerHeight = doc.getElementsByTagName("footer")[0].offsetHeight;
        const contentHeight = doc.getElementsByClassName("helpdetail")[0];
        const bodyHeight = sreenHeight - headerHeight - footerHeight;
        contentHeight.style.minHeight = bodyHeight + "px";
    }
};
</script>

<style lang="less" scoped>
@import url("../../less/helpList/light.less");
.helpdetail {
    background-color: @helpdetailBg;
    padding:80px 0;
    .helpdetail_content {
        margin: 0 auto;
        padding:50px 10%;
        font-size: 14px;
        .route-wrap {
            font-size: 14px;
            color: rgba(53, 124, 225, 1);
            margin-bottom: 40px;
            a {
                color: rgba(53, 124, 225, 1);
                &:hover {
                    border-bottom: 1px solid rgba(53, 124, 225, 1);
                }
            }
        }
        .main {
			display: flex;
			.menu{
				width:20%;
				p{
					font-size:15px;
					color:#333;
					font-weight:700;
				}
				.titles{
					width:80%;
					cursor: pointer;
					.route{
						width:100%;
						margin:10px 0;
						padding:10px;
						color:rgba(28, 36, 44, 1);
                    }
                    .route:hover{
                        background-color:rgba(53, 124, 225, 1);
						color:#fff;
						border-radius:4px;
                    }
					.active{
						background-color:rgba(53, 124, 225, 1);
						color:#fff;
						border-radius:4px;
					}
				}
			}
            .content-wrap {
				color: @helpdetaicontcor;
                .title {
                    font-size:32px;
					line-height: 1;
					font-weight:500;
					text-align:left;
                    margin-bottom: 20px;
                }
                .time {
                    color: #999;
                    line-height: 1;
                    margin-bottom: 20px;
                }
                .content {
					font-size:15px;
					color:rgba(28, 36, 44, 1);
                    padding: 40px 0;
                }
            }
        }
    }
}
</style>
<style lang="scss">
.main .content-wrap .content {
    .uploaded-img {
        width: 100% !important;
    }
}
.main .content-wrap .title,
.main .content-wrap .time {
    text-align: center;
}
</style>



