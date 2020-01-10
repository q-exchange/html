<template>
    <div class="login_form">
        <div class="login_right">
            <Form ref="formInline" :model="formInline">
                <div class="login_title">欢迎登录</div>
                <FormItem label="手机号" label-for="user">
                    <Input @on-enter="handleSubmit('formInline')" name="user" type="text" v-model="formInline.user" class="user" @on-blur="userBlur" element-id="user" @on-focus="labelFocus" />
                </FormItem>
                <FormItem label="密码" label-for="password">
                    <Input @on-enter="handleSubmit('formInline')" type="password" v-model="formInline.password" element-id="password" @on-focus="labelFocus" @on-blur="labelBlur">
                    </Input>
                </FormItem>
                <FormItem v-if="openGooleCode" label="谷歌验证码" label-for="openGooleCode">
                    <Input type="text" @on-enter="handleSubmit('formInline')" v-model="formInline.googleCode" element-id="openGooleCode" @on-focus="labelFocus">
                    </Input>
                </FormItem>
                <p>
                    <router-link to="/findPwd" class="toRegister">
                        {{$t('uc.login.forget')}}
                    </router-link>
                </p>
                <FormItem style="margin-bottom:10px;">
                    <Button class="login_btn" @click="handleSubmit('formInline')" long type="primary">{{$t('uc.login.login')}}</Button>
                </FormItem>
                <!-- <div class='to_register'>
                    <span class="tips">{{$t("uc.login.noaccount")}}</span>
                    <router-link to="/register">{{$t("uc.login.register")}}</router-link>
                </div> -->

            </Form>

        </div>
        <div class="global-ad">
            <div class="qrcode">
                <div>
                    <div id="ios"></div>
                    <div style="text-align:center;color:#fff;font-size:12px;">IOS</div>
                </div>
                <div>
                     <div id="android"></div>
                     <div style="text-align:center;color:#fff;font-size:12px;">Android</div>
                </div>
                <div class="cell-content">
                    <p class="text">XX全球站App</p>
                    <p class="text">随时随地 便捷交易</p>
                    <p class="other">扫描二维码下载XXApp</p>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped lang="less">
/* 验证码 */
// $primary-color: #3399ff;
@main_theme: #3399ff;
.login_form {
    position: relative;
    overflow: hidden;
    .login_right {
        padding: 0 48px 48px;
        width: 496px;
        margin: 150px auto 0;
    }
    .toRegister {
        float: right;
        padding-right: 10px;
        font-size: 14px;
        color: #357ce1;
        font-weight: 500;
        margin-top: -24px;
        padding: 10px 0;
    }
    .global-ad {
        width: 496px;
        margin: 16px auto;
        overflow: hidden;
        border-radius: 3px;
        padding: 18px 24px;
        background-color: #334164;
        background-repeat: no-repeat;
        background-position: bottom right 24px;
        background-image: url(https://file.huobiasia.vip/global/zh-cn/static/img/e46bbe8.svg);
        .qrcode {
            // width: 62px;
            // height: 62px;
            padding: 2px;
            // background: #fff;
            display: flex;
            #ios,#android {
                margin-right: 10px;
                padding: 5px;
                border-radius: 5px;
                background-color: #fff;
                height: 72px;
            }
        }
        .cell-content {
            margin-left: 20px;
            font-weight: 600;
            p.text {
                color: #fff;
                font-size: 14px;
                margin-bottom: 7px;
            }
            p.other {
                color: #8199c3;
                font-size: 12px;
                margin-top: 15px;
            }
        }
    }
}
</style>
<script>
import { phoneRegExp, ANDROIDURL, IOSURL } from "../../staticMap/static";
import { regCode } from "../../minxs/code";
import QRCode from 'qrcode2';
export default {
    mixins: [regCode],
    data() {
        // const pattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        return {
            openGooleCode: false,//是否开启google验证;
            openGoole: "", //  获取谷歌验证状态
            captchaObj: null,
            _captchaResult: null,
            formInline: {
                user: "",
                password: "",
                googleCode: ""
            },

        };
    },
    created: function () {
        this.init();
    },
    computed: {
        isLogin: function () {
            return this.$store.getters.isLogin;
        }
    },
    methods: {

        //用户名输入以后判断用户是否开启谷歌验证
        userBlur(e) {
            this.labelBlur(e);
            const pattern = /^[1][3456789][0-9]{9}$/;
            var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            let tel = this.formInline.user;
            if (phoneRegExp.test(tel) || reg.test(tel)) {
                this.isNeedGoogle(tel).then(res => {
                    if (res == 1) {//1为开启谷歌验证
                        this.openGooleCode = true;
                    } else {
                        this.openGooleCode = false;
                    }
                })
            }
        },
        init() {
            if (this.isLogin) {
                this.$router.push("/");
            }
        },
        onKeyup(ev) {
            if (ev.keyCode == 13) {
                $(".login_btn").click();
            }
        },
        initGtCaptcha() {
            var self = this;
            // var captcha1 = new TencentCaptcha("2040846200", (res) => {
            //     res.ret == 0 && (self.ticket = res.ticket) && (self.randStr = res.randstr) && self.success(res.ticket, res.randstr);//腾讯防水验证成功的回调
            // });
            // captcha1.show(); // 显示验证码
            self.success()
        },
        /**验证用户是否开启了谷歌验证  返回值1为开启*/
        isNeedGoogle(tel) {
            return this.$http.post(this.host + '/uc/get/user', { mobile: tel }).then(res => {
                const resp = res.body;
                this.openGoole = res.body.data
                if (resp.code == 0) {
                    return new Promise((resolve, reject) => {
                        resolve(resp.data)
                    })
                }
            })
        },
        success(ticket, randstr) {
            const params = {
                // ticket,
                // randStr: randstr
            };
            const formParams = this.formInline;
            params.username = formParams.user;
            params.password = formParams.password;
            if (this.openGooleCode) {
                params.code = formParams.googleCode
            }
            return this.login(params);
        },
        loginCheck() {
            // 新加代码
            // 判断手机号邮箱不能为空
            if (!this.formInline.user) {
                this.$Message.error(this.$t("uc.login.loginvalidate"));
                return false
            } else {
                this.initGtCaptcha();
            }
            return;
            // 判断是否绑定谷歌
            if (this.openGoole == 1) {
                // 判断谷歌验证码不能为空
                if (!this.formInline.googleCode) {
                    this.$Message.error(this.$t("uc.login.google"));
                    return false
                } else {
                    this.initGtCaptcha();
                }
            } else {
                // 谷歌验证调用
                this.initGtCaptcha();
            }
        },
        handleSubmit() {
            /*
            const params = {};
            const formParams = this.formInline;
            params.username = formParams.user;
            params.password = formParams.password;
            params.code = formParams.googleCode;
            */
            // 5.20修改
            this.loginCheck()
        },
        login(params) {
            this.$http.post(this.host + this.api.uc.login, params).then(response => {
                console.log(response.body)
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(this.$t("uc.login.success"));
                    this.$store.commit("setMember", response.body.data);
                    localStorage.setItem("TOKEN", response.body.data.token);
                    if (
                        this.$route.query.key != null &&
                        this.$route.query.key != ""
                    ) {
                        localStorage.setItem("USERKEY", this.$route.query.key);
                    }
                    this.$router.push("/");
                } else {
                    this.$Message.error(resp.message);
                }
            });
        }
    },
    mounted() {
        new QRCode(document.getElementById("android"), {
            text: ANDROIDURL,
            width: 62,
            height: 62,
            colorDark: "#000000",
            colorLight: "#ffffff",
        });
        new QRCode(document.getElementById("ios"), {
            text: ANDROIDURL,
            width: 62,
            height: 62,
            colorDark: "#000000",
            colorLight: "#ffffff",
        });
    }
};
</script>
