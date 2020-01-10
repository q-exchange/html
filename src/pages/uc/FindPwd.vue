<template>
    <div class="login_form">
        <div class="login_right">
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem style="text-align:center;">
                    <ButtonGroup>
                        <!-- <Button v-for="(list,index) in buttonLists" :key="list.text" :class="{ active:changeActive == index}" @click="actives(index)">{{list.text}}</Button> -->
                        <div class="login_title">忘记密码</div>
                    </ButtonGroup>
                </FormItem>
                <FormItem prop="user" label="手机号" label-for="user">
                    <Input type="text" v-model="formInline.user" element-id="user" @on-focus="labelFocus" @on-blur="labelBlur">
                    </Input>
                </FormItem>
                <FormItem prop="code" label="验证码" label-for="code">
                    <Input type="text" v-model="formInline.code" element-id="code" @on-focus="labelFocus" @on-blur="labelBlur">
                    </Input>
                    <input id="sendCode" @click="sendCode" type="Button" :value="sendcodeValue" :disabled="codedisabled">
                    </input>
                </FormItem>
                <FormItem prop="password" label="请输入大小写加数字新密码" label-for="password">
                    <Input type="password" v-model="formInline.password" element-id="password" @on-focus="labelFocus" @on-blur="labelBlur">
                    </Input>
                </FormItem>
                <FormItem prop="repassword" label="请再次确认密码" label-for="repassword">
                    <Input type="password" v-model="formInline.repassword" element-id="repassword" @on-focus="labelFocus" @on-blur="labelBlur">
                    </Input>
                </FormItem>
                <FormItem>
                    <Button class="login_btn" @click="handleSubmit('formInline')" long type="primary">{{$t('uc.forget.save')}}</Button>
                </FormItem>
            </Form>
        </div>
        <Modal v-model="modal1" :mask-closable="false">
            <p slot="header" style="text-align:center">{{$t('uc.regist.modaltitle')}}</p>
            <div style="text-align:center">
                <div>
                    <div id="captcha">
                        <p id="wait" class="show">{{$t('uc.login.validatecodeload')}}......</p>
                    </div>
                </div>
                <p id="notice" class="hide">{{$t('uc.login.validatemsg')}}</p>
            </div>
            <p slot="footer"></p>
        </Modal>
    </div>
</template>
<style scoped lang="less">
.login_form {
    position: relative;
    overflow: hidden;
    .login_right {
        padding: 0 48px 48px;
        width: 496px;
        margin: 100px auto;
        .login_title{
            height: 30px;
        }
    }
}
/* 验证码 */
#captcha {
    width: 100%;
    display: inline-block;
}
.show {
    display: block;
}
.hide {
    display: none;
}
#notice {
    color: red;
}
#wait {
    text-align: left;
    color: #666;
    margin: 0;
}
</style>
<script>
// const mobilereg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
//     emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
import { phoneRegExp, emailReg} from "../../staticMap/static";
import gtInit from "../../assets/js/gt.js";
import $ from "jquery";
import { regCode } from "../../minxs/code";

export default {
     mixins: [regCode],
    data() {
        const validateUser = (rule, value, callback) => {
            if (this.changeActive == 0) {
                // var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (value == "") {
                    callback(new Error(this.$t("uc.regist.teltip")));
                } else if (!phoneRegExp.test(this.formInline.user)) {
                    callback(new Error(this.$t("uc.regist.telerr")));
                } else {
                    callback();
                }
            } else {
                var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
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
                callback(new Error(this.$t("uc.forget.pwdvalidate1")));
            } else if (value !== this.formInline.password) {
                callback(new Error(this.$t("uc.forget.pwdvalidate2")));
            } else {
                callback();
            }
        };
        return {
            codedisabled: false,
            // sendcodeValue: this.$t("uc.regist.sendcode"),
            captchaObj: null,
            modal1: false,
            _captchaResult: null,
            buttonLists: [
                {
                    text: this.$t("uc.forget.resettelpwd")
                }
            ],
            changeActive: 0,
            countdown: 60,
            formInline: {
                user: "",
                code: "",
                password: "",
                repassword: ""
            },
            ruleInline: {
                // user: [{ validator: validateUser, trigger: "blur" }],
                code: [{ required: true, message: this.$t("uc.forget.entercode"), trigger: "blur" }],
                password: [
                    {
                        required: true,
                        message: this.$t("uc.forget.newpwdtip"),
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 6,
                        message: this.$t("uc.forget.pwdvalidate3"),
                        trigger: "blur"
                    }
                ],
                repassword: [
                    { validator: validateRepassword, trigger: "blur" },
                    {
                        type: "string",
                        min: 6,
                        message: this.$t("uc.forget.pwdvalidate3"),
                        trigger: "blur"
                    }
                ]
            },
            key: "",
            code: ""
        };
    },
    watch: {
        changeActive: function (val) {
            this.$refs["formInline"].resetFields();
            // if (val == 0) this.initGtCaptcha();
        }
    },
    created: function () {
        this.init();
        // this.actives(this.changeActive);
    },
    computed: {
        isLogin: function () {
            return this.$store.getters.isLogin;
        }
    },
    methods: {
        init() {
            if (this.isLogin) {
                this.$router.push("/");
            } else {
                this.$store.state.HeaderActiveName = "1-4";
            }
            // this.initGtCaptcha();
        },
        // 切换
        // actives: function(index) {
        //   this.changeActive = index;
        //   if (this.changeActive == 0) {
        //     this.key = this.$t("uc.forget.telno");
        //     this.code = this.$t("uc.forget.smscode");
        //     this.ruleInline.user[0].message = this.$t("uc.forget.teltip");
        //     this.ruleInline.code[0].message = this.$t("uc.forget.smscodetip");
        //   } else {
        //     this.key = this.$t("uc.forget.email");
        //     this.code = this.$t("uc.forget.emailcode");
        //     this.ruleInline.user[0].message = this.$t("uc.forget.emailtip");
        //     this.ruleInline.code[0].message = this.$t("uc.forget.emailcodetip");
        //   }
        // },

        // initGtCaptcha() {
        //   var that = this;
        //   this.$http.get(this.host + this.api.uc.captcha).then(function(res) {
        //     window.initGeetest(
        //       {
        //         // 以下配置参数来自服务端 SDK
        //         gt: res.body.gt,
        //         challenge: res.body.challenge,
        //         offline: !res.body.success, //表示用户后台检测极验服务器是否宕机
        //         new_captcha: res.body.new_captcha, //用于宕机时表示是新验证码的宕机
        //         product: "popup",
        //         width: "100%"
        //       },
        //       function(captchaObj) {
        //         captchaObj.onSuccess(function() {
        //           that._captchaResult = captchaObj.getValidate();
        //           that.afterValidate();
        //         });
        //         // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
        //         captchaObj.appendTo("#captcha");
        //         that.captchaObj = captchaObj;
        //         captchaObj.onReady(function() {
        //           $("#wait").hide();
        //         });
        //       }
        //     );
        //   });
        // },


        // initGtCaptcha() {
        //     var that = this;
        //     this.$http.get(this.host + this.api.uc.captcha).then(function (res) {
        //         window.initGeetest(
        //             {
        //                 // 以下配置参数来自服务端 SDK
        //                 gt: res.body.gt,
        //                 challenge: res.body.challenge,
        //                 offline: !res.body.success, //表示用户后台检测极验服务器是否宕机
        //                 new_captcha: res.body.new_captcha, //用于宕机时表示是新验证码的宕机
        //                 product: "bind",
        //                 width: "100%"
        //             },
        //             this.handler
        //         );
        //     });
        // },
        // handler(captchaObj) {
        //     captchaObj.onReady(() => {
        //         $("#wait").hide();
        //     }).onSuccess(() => {
        //         let result = (this._captchaResult = captchaObj.getValidate());
        //         if (!result) {
        //             this.$Message.error("请完成验证");
        //         } else {
        //             mobilereg.test(this.formInline.user) && this.afterValidate();
        //             emailReg.test(this.formInline.user) && this.emailReset();
        //         }
        //     });
        //     $("#sendCode").click(() => {
        //         const tel = this.formInline.user,
        //             flagtel = mobilereg.test(tel) || emailReg.test(tel);
        //         flagtel && captchaObj.verify();
        //         !flagtel && this.$Message.error("请填写正确的手机号或者邮箱号");
        //     });
        // },
        sendCode(){
             const tel = this.formInline.user,
                    flagtel = phoneRegExp.test(tel) || emailReg.test(tel);
                // flagtel && captchaObj.verify();
                if(!flagtel){
                    this.$Message.error("请填写正确的手机号或者邮箱号");
                }else{
                    this.afterValidate();
                }
              
              
        },
        emailReset() {
            this.modal1 = false;
            var params = {};
            // params["account"] = this.formInline.user;
            // params["geetest_challenge"] = this._captchaResult.geetest_challenge; //极验验证二次验证表单数据 chllenge
            // params["geetest_validate"] = this._captchaResult.geetest_validate; //极验验证二次验证表单数据 validate
            // params["geetest_seccode"] = this._captchaResult.geetest_seccode; //极验验证二次验证表单数据 seccode

            this.$http.post(this.host + "/uc/reset/email/code", params).then(response => {
                this.countdown = 60;
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Notice.success({
                        title: this.$t("common.tip"),
                        desc: resp.message
                    });
                } else {
                    this.$Notice.error({
                        title: this.$t("common.tip"),
                        desc: resp.message
                    });
                }
            });
        },
        afterValidate() {
            this.modal1 = false;
            if (this.changeActive == 1) {
                //发送邮件

            } else {
                var params = {};
                params["account"] = this.formInline.user;
                // params["geetest_challenge"] = this._captchaResult.geetest_challenge; //极验验证二次验证表单数据 chllenge
                // params["geetest_validate"] = this._captchaResult.geetest_validate; //极验验证二次验证表单数据 validate
                // params["geetest_seccode"] = this._captchaResult.geetest_seccode; //极验验证二次验证表单数据 seccode
                this.$http.post(this.host + "/uc/mobile/reset/code", params).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.settime();
                        this.$Notice.success({ title: this.$t("common.tip"), desc: resp.message });
                    } else {
                        this.$Notice.error({ title: this.$t("common.tip"), desc: resp.message });
                    }
                });
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (emailReg.test(this.formInline.user)) {
                        var params = {};
                        params["account"] = this.formInline.user;
                        params["code"] = this.formInline.code;
                        params["mode"] = 1;
                        params["password"] = this.formInline.password;
                        this.$http
                            .post(this.host + "/uc/reset/login/password", params)
                            .then(response => {
                                this.countdown = 60;
                                var resp = response.body;
                                if (resp.code == 0) {
                                    this.$Notice.success({
                                        title: this.$t("common.tip"),
                                        desc: resp.message
                                    });
                                    this.$router.push("/login");
                                } else {
                                    this.$Notice.error({
                                        title: this.$t("common.tip"),
                                        desc: resp.message
                                    });
                                }
                            });
                    } else {
                        var params = {};
                        params["account"] = this.formInline.user;
                        params["code"] = this.formInline.code;
                        params["mode"] = 0;
                        params["password"] = this.formInline.password;
                        this.$http
                            .post(this.host + "/uc/reset/login/password", params)
                            .then(response => {
                                var resp = response.body;
                                if (resp.code == 0) {
                                    this.$Notice.success({
                                        title: this.$t("common.tip"),
                                        desc: '重置成功'
                                    });
                                    this.$router.push("/login");
                                } else {
                                    this.$Notice.error({
                                        title: this.$t("common.tip"),
                                        desc: resp.message
                                    });
                                }
                            });
                    }
                    // this.$Message.success(this.$t('uc.forget.resetpwdsuccess'));
                } else {
                }
            });
        },
        // settime() {
        //     this.sendcodeValue = this.countdown;
        //     this.codedisabled = true;
        //     let timercode = setInterval(() => {
        //         this.countdown--;
        //         this.sendcodeValue = this.countdown;
        //         if (this.countdown <= 0) {
        //             clearInterval(timercode);
        //             this.codedisabled = false;
        //             this.sendcodeValue = this.$t("uc.regist.sendcode");
        //             this.countdown = 60;
        //         }
        //     }, 1000);
        // },



        // sendCode() {
        //   this.settime();
        //   var mobilePhone = this.formInline.user;
        //   if (mobilePhone == "") {
        //     this.countdown = 0;
        //     this.$Notice.error({
        //       title: this.$t("common.tip"),
        //       desc: this.ruleInline.user[0].message
        //     });
        //     return;
        //   }
        //   this.openValidateModal();
        // },

        // openValidateModal() {
        //   if (this.captchaObj != null && this.captchaObj.reset) {
        //     this.captchaObj.reset();
        //   } else {
        //     this.initGtCaptcha();
        //   }
        //   this.modal1 = true;
        // }
    }
};
</script>