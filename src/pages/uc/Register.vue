<template>
    <div class="login_form registerWrapper">
        <div class="login_right">
            <Form v-if="allowRegister" ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem style="text-align:center;">
                    <!-- 开启邮箱注册 -->
                    <template v-if="isEmailRegister">
                        <ButtonGroup>
                            <Button v-for="(list,index) in buttonLists" :key="list.text" :class="{ active:changeActive == index}" @click="actives(index)">{{list.text}}</Button>
                        </ButtonGroup>
                    </template>
                    <template v-else>
                        <div class="login_title">{{this.$t("uc.regist.telregist")}}</div>
                    </template>
                    <!-- 不开启邮箱注册 -->
                </FormItem>
                <FormItem prop="country">
                    <Select v-model="formInline.country" :placeholder="$t('uc.regist.country')" @on-change="onAreaChange" size="large">
                        <Option v-for="(area,index) in areas" :value="area.zhName" :key="index">{{area.zhName}}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="username" label="用户名" label-for="username">
                    <Input type="text" v-model="formInline.username" element-id="username" @on-focus="labelFocus" @on-blur="labelBlur">
                    </Input>
                </FormItem>
                <FormItem prop="user" label="手机号" label-for="user">
                    <Input v-if="changeActive == 0" type="text" v-model="formInline.user" element-id="user" @on-focus="labelFocus" @on-blur="labelBlur">
                    </Input>
                    <Input v-else type="text" v-model="formInline.user" element-id="user" @on-focus="labelFocus" @on-blur="labelBlur">
                    </Input>
                </FormItem>
                <FormItem prop="code" v-show="showCode" label="验证码" label-for="code">
                    <Input type="text" v-model="formInline.code" element-id="code" @on-focus="labelFocus" @on-blur="labelBlur">
                    </Input>
                    <input id="sendCode" @click="sendCode();" type="Button" :value="sendcodeValue" :disabled='codedisabled'>
                    </input>
                </FormItem>
                <FormItem prop="password" label="登录密码(8-16位字母加数字)" label-for="password">
                    <Input type="password" v-model="formInline.password" element-id="password" @on-focus="labelFocus" @on-blur="labelBlur">
                    </Input>
                </FormItem>
                <FormItem prop="repassword" label="确认密码" label-for="repassword">
                    <Input type="password" v-model="formInline.repassword" element-id="repassword" @on-focus="labelFocus" @on-blur="labelBlur">
                    </Input>
                </FormItem>
                <FormItem prop="agentcode" label="推荐码" label-for="agentcode">
                    <Input type="text" v-model="formInline.agentcode" element-id="agentcode" @on-focus="labelFocus" @on-blur="labelBlur">
                    </Input>
                </FormItem>
                <div class="check-agree" style="margin-bottom:16px;">
                    <label class="agreeTips">
                        <Checkbox v-model="agree">{{$t('uc.regist.agreement')}}</Checkbox>
                    </label>
                    <a href="#/helpdetail?cate=1&id=9&cateTitle=常见问题" target="_blank" style="color:#357ce1">《{{$t('uc.regist.userprotocol')}}》</a>
                </div>
                <FormItem>
                    <Button class="login_btn" @click="handleSubmit('formInline')" long type="primary">{{$t('uc.regist.regist')}}</Button>
                </FormItem>
            </Form>
        </div>
        <div class="guide-tips">
            <!-- <img src="https://huobi-hadax-service.s3.ap-northeast-1.amazonaws.com/images/201907301410/76a176c2b80549a6954a5ead075db50a/huobixinshouying01.png"> -->
            <div class="guide-desc">
                <p class="text">加入XX网</p>
                <p class="text">零门槛入群，享糖果</p>
            </div>
        </div>
    </div>
</template>
<script>
import { regCode } from "../../minxs/code";
import { phoneRegExp, isEmailRegister } from "../../staticMap/static";
import { mapGetters } from "vuex";
export default {
    mixins: [regCode],
    data() {
        const validateUser = (rule, value, callback) => {
            if (this.changeActive == 0) {
                // let reg = /^[1][3456789][0-9]{9}$/;
                if (value == "") {
                    callback(new Error(this.$t("uc.regist.teltip")));
                } else if (!phoneRegExp.test(this.formInline.user)) {
                    callback(new Error(this.$t("uc.regist.telerr")));
                } else {
                    callback();
                }
            } else {
                let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
                if (value == "") {
                    callback(new Error(this.$t("uc.regist.emailtip")));
                } else if (!reg.test(this.formInline.user)) {
                    callback(new Error(this.$t("uc.regist.emailerr")));
                } else {
                    callback();
                }
            }
        };
        const validateRepassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t("uc.regist.confirmpwdtip")));
            } else if (value !== this.formInline.password) {
                callback(new Error(this.$t("uc.regist.confirmpwderr")));
            } else {
                callback();
            }
        };
        return {
            isEmailRegister: isEmailRegister,
            codedisabled: false,
            ticket: "",
            randStr: "",
            captchaObj: null,
            modal1: false,
            _captchaResult: null,
            agree: true,
            allowRegister: true,
            areas: [],
            changeActive: 0,
            showCode: true,
            countdown: 60,
            formInline: {
                username: "",
                country: "",
                user: "",
                code: "",
                areaCode: "",
                password: "",
                repassword: "",
                agentcode:
                    typeof this.$route.query.agent == "undefined"
                        ? ""
                        : this.$route.query.agent,
                superType:
                    typeof this.$route.query.type == "undefined"
                        ? ""
                        : this.$route.query.type
            },
            ruleInline: {
                username: [
                    {
                        required: true,
                        message: this.$t("uc.regist.usernametip"),
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 3,
                        max: 15,
                        message: this.$t("uc.regist.usernamemsg"),
                        trigger: "blur"
                    }
                ],
                country: [
                    {
                        required: true,
                        message: this.$t("uc.regist.countrytip"),
                        trigger: "blur"
                    }
                ],
                user: [{ validator: validateUser, trigger: "blur" }],
                code: [
                    {
                        required: true,
                        message: this.$t("uc.regist.smscodetip"),
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: this.$t("uc.regist.pwdtip"),
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 6,
                        message: this.$t("uc.regist.pwdmsg"),
                        trigger: "blur"
                    }
                ],
                repassword: [{ validator: validateRepassword, trigger: "blur" }]
            },
            code: ""
        };
    },
    watch: {
        changeActive: function (val) {
            this.$refs["formInline"].resetFields();
        },
        lang: function () {
            this.updateLangData();
        },

    },
    computed: {
        key() {
            if (this.changeActive == 0) {
                return this.$t("uc.regist.telno");
            } else {
                return this.$t("uc.regist.email");
            }
        },
        ...mapGetters(["isLogin", "member", "lang"]),
        buttonLists() {
            let arr = [
                {
                    text: this.$t("uc.regist.telregist")
                },
                {
                    text: this.$t("uc.regist.emailregist")
                }
            ];
            return arr;
        }
    },
    created: function () {
        this.formInline.user = this.$route.query.phone;
        window.scrollTo(0, 0);
        this.init();
        this.actives(this.changeActive);
    },
    methods: {
        init() {
            if (this.isLogin) {
                this.$router.push("/");
            }
            this.getAreas();
        },
        initGtCaptcha() {
            // 直接生成一个验证码对象
            // let captcha1 = new TencentCaptcha("2038419167", (res) => {
            //     res.ret == 0 && (this.ticket = res.ticket) && (this.randStr = res.randstr);
            //     (this.changeActive == 0) && this.success();
            //     this.changeActive == 1 && this.emailSuccess();
            // });
            // captcha1.show(); // 显示验证码
            this.changeActive == 0 && this.success();
            this.changeActive == 1 && this.emailSuccess();
        },
        onAreaChange(value) {
            for (let i = 0; i < this.areas.length; i++) {
                if (this.areas[i].zhName == value) {
                    this.formInline.areaCode = this.areas[i].areaCode;
                }
            }
        },
        getAreas() {
            this.$http.post(this.host + this.api.common.area).then(response => {
                let resp = response.body;
                this.areas = resp.data;
                if (this.areas != null) {
                    this.formInline.country = this.areas[0].zhName;
                    this.formInline.areaCode = this.areas[0].areaCode;
                }
            });
        },
        actives: function (index) {
            this.changeActive = index;
            if (this.changeActive == 0) {
                this.showCode = true;
                this.key = this.$t("uc.regist.telno");
                this.ruleInline.code = [
                    {
                        required: true,
                        message: this.$t("uc.regist.smscodetip"),
                        trigger: "blur"
                    }
                ];
            } else {
                this.showCode = false;
                this.key = this.$t("uc.regist.email");
                this.ruleInline.code = [];
            }
        },
        emailSuccess() {
            //邮箱注册腾讯防水验证成功
            const forminline = this.formInline;
            let params = {
                ticket: this.ticket,
                randStr: this.randStr,
                email: forminline.user,
                password: forminline.password,
                username: forminline.username,
                country: forminline.country,
                promotion: forminline.agentcode,
                superPartner: ""
            };
            this.$http
                .post(this.host + "uc/register/email", params)
                .then(response => {
                    let resp = response.body;
                    if (resp.code == 0) {
                        this.$Notice.success({
                            title: this.$t("common.tip"),
                            desc: resp.message
                        });
                        setTimeout(() => {
                            this.$router.push("login");
                        }, 3000);
                    } else {
                        this.$Notice.error({
                            title: this.$t("common.tip"),
                            desc: resp.message
                        });
                    }
                });
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.agree == true) {
                        if (this.changeActive == 1) {
                            this.afterValidate();
                        } else {
                            this.phoneRegister();
                        }
                    } else {
                        this.$Notice.error({
                            title: this.$t("common.tip"),
                            desc: this.$t("uc.regist.agreementtip")
                        });
                    }
                }
            });
        },
        sendCode() {
            let mobilePhone = this.formInline.user;
            if (mobilePhone == "" || !phoneRegExp.test(mobilePhone)) {
                this.$Notice.error({
                    title: this.$t("common.tip"),
                    desc: this.$t("uc.regist.teltip"),
                });
                return;
            } else {
                this.initGtCaptcha();
            }
        },
        success() {
            let params = {};
            params["phone"] = this.formInline.user;
            params["country"] = this.formInline.country;
            phoneRegExp.test(params["phone"]) &&
                this.$http
                    .post(this.host + "/uc/mobile/code", params)
                    .then(response => {
                        let resp = response.body;
                        resp.code == 0 &&
                            this.$Notice.success({
                                title: this.$t("common.tip"),
                                desc: resp.message
                            });
                        resp.code == 0 && this.settime();
                        resp.code != 0 &&
                            this.$Notice.error({
                                title: this.$t("common.tip"),
                                desc: resp.message
                            });
                    });
            !phoneRegExp.test(params["phone"]) &&
                this.$Notice.error({
                    title: this.$t("common.tip"),
                    desc: this.$t("uc.finance.withdraw.telerr")
                });
        },
        phoneRegister() {
            //手机注册
            let params = {};
            params["phone"] = this.formInline.user;
            params["username"] = this.formInline.username;
            params["password"] = this.formInline.password;
            params["code"] = this.formInline.code;
            params["country"] = this.formInline.country;
            params["promotion"] = this.formInline.agentcode;
            params["superPartner"] = this.formInline.superType;
            params["ticket"] = this.ticket;
            params["randStr"] = this.randStr;
            this.$http
                .post(this.host + "/uc/register/phone", params)
                .then(response => {
                    let resp = response.body;
                    if (resp.code == 0) {
                        this.$Notice.success({
                            title: this.$t("common.tip"),
                            desc: resp.message
                        });
                        setTimeout(() => {
                            this.$router.push("login");
                        }, 3000);
                    } else {
                        this.$Notice.error({
                            title: this.$t("common.tip"),
                            desc: resp.message
                        });
                    }
                });
        },
        afterValidate() {
            this.initGtCaptcha();
        }
    },
    mounted(){
        if(this.formInline.user){
            document.getElementById("user").focus()
        }
       
    }
};
</script>
<style scoped lang="less">
@main_theme: #3399ff;
.login_form {
    position: relative;
    overflow: hidden;
    .login_right {
        padding: 20px 48px 24px;
        width: 496px;
        margin: 100px auto 0;
        .login_title {
            height: 40px;
        }
    }
    .guide-tips {
        margin: 32px auto;
        width: 496px;
        height: 100px;
        padding: 18px 24px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-image: url("../../assets/myImgs/registerBg.png");
        background-color: #3484ea;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100%;
        border-radius: 3px;
        img {
            display: block;
            flex-shrink: 0;
            width: 64px;
            height: 64px;
        }
        .guide-desc {
            margin-left: 12px;
            p {
                color: rgb(255, 255, 255);
                font-size: 14px;
                line-height: 22px;
            }
        }
    }
}

.login_title {
    color: #000;
    text-align: center;
    height: 40px;
    font-size: 20px;
    font-weight: 500;
}

.show {
    display: block;
}
</style>
