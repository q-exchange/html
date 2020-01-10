<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
      <!-- name -->
      <FormItem prop="name">
        <p>{{$t('uc.account.name')}}</p>
        <Input disabled size="large" v-model="formValidate.name"></Input>
      </FormItem>
      <!-- bankName -->
      <FormItem prop="bankName">
        <p>{{$t('uc.account.bankaccount')}}</p>
        <Select v-model="formValidate.bankName" size="large">
          <Option v-for="item in bankNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <!-- bankBranch -->
      <FormItem prop="bankBranch">
        <p>{{$t('uc.account.bankbranch')}}</p>
        <Input v-model="formValidate.bankBranch" size="large"></Input>
      </FormItem>
      <!-- bankNo -->
      <FormItem prop="bankNo">
        <p>{{$t('uc.account.bankno')}}</p>
        <Input v-model="formValidate.bankNo" size="large" type="text"></Input>
      </FormItem>
      <!-- bankNoConfirm -->
      <FormItem prop="bankNoConfirm">
        <p>{{$t('uc.account.confirmbankno')}}</p>
        <Input v-model="formValidate.bankNoConfirm" size="large" type="text"></Input>
      </FormItem>
      <!-- passwd -->
      <FormItem prop="password">
        <p>{{$t('uc.account.fundpwd')}}</p>
        <Input v-model="formValidate.password" type="password" size="large"></Input>
      </FormItem>
      <!-- Button -->
      <FormItem>
        <div style="text-align:right;">
          <Button type="default" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
          <Button type="primary" style="width:80px;" @click="handleSubmit('formValidate')">完成设置</Button>
        </div>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "bindcard",
  props: ["getcard"],
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.account.banknomsg1")));
        // } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
      } else if (!/([0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.account.banknomsg1")));
      } else {
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.account.banknomsg1")));
        // } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
      } else if (!/([0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.account.banknomsg1")));
      } else if (value !== this.formValidate.bankNo) {
        callback(new Error(this.$t("uc.account.banknomsg2")));
      } else {
        callback();
      }
    };
    return {
      bankNameList: [
        {
          value: "中国工商银行",
          label: "中国工商银行"
        },
        {
          value: "中国农业银行",
          label: "中国农业银行"
        },
        {
          value: "中国建设银行",
          label: "中国建设银行"
        },
        {
          value: "中国邮政储蓄银行",
          label: "中国邮政储蓄银行"
        },
        {
          value: "招商银行",
          label: "招商银行"
        },
        {
          value: "中国银行",
          label: "中国银行"
        },
        {
          value: "交通银行",
          label: "交通银行"
        },
        {
          value: "中信银行",
          label: "中信银行"
        },
        {
          value: "华夏银行",
          label: "华夏银行"
        },
        {
          value: "中国民生银行",
          label: "中国民生银行"
        },
        {
          value: "广发银行",
          label: "广发银行"
        },
        {
          value: "平安银行",
          label: "平安银行"
        },
        {
          value: "兴业银行",
          label: "兴业银行"
        },
        {
          value: "上海浦东发展银行",
          label: "上海浦东发展银行"
        },
        {
          value: "浙商银行",
          label: "浙商银行"
        },
        {
          value: "渤海银行",
          label: "渤海银行"
        },
        {
          value: "恒丰银行",
          label: "恒丰银行"
        },
        {
          value: "花旗银行",
          label: "花旗银行"
        },
        {
          value: "渣打银行",
          label: "渣打银行"
        },
        {
          value: "汇丰银行",
          label: "汇丰银行"
        },
        {
          value: "中国光大银行",
          label: "中国光大银行"
        },
        {
          value: "上海银行",
          label: "上海银行"
        },
        {
          value: "江苏银行",
          label: "江苏银行"
        },
        {
          value: "重庆银行",
          label: "重庆银行"
        },
        {
          value: "天津银行",
          label: "天津银行"
        },
        {
          value: "厦门银行",
          label: "厦门银行"
        },
        {
          value: "城市商业银行",
          label: "城市商业银行"
        },
        {
          value: "农村商业银行",
          label: "农村商业银行"
        },
        {
          value: "徽商银行",
          label: "徽商银行"
        }
      ],
      formValidate: {
        name: "",
        password: "",
        bankName: "",
        bankBranch: "",
        bankNo: "",
        bankNoConfirm: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: this.$t("uc.account.verifiedmsg"),
            trigger: "blur"
          }
        ],
        bankName: [
          {
            required: true,
            message: this.$t("uc.account.bankaccountmsg"),
            trigger: "change"
          }
        ],
        bankBranch: [
          {
            required: true,
            message: this.$t("uc.account.bankbranchmsg"),
            trigger: "blur"
          }
        ],
        bankNo: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.account.banknomsg1"),
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        bankNoConfirm: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.account.banknomsg2"),
            trigger: "blur"
          },
          { validator: validatePassCheck, trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: this.$t("uc.account.fundpwdmsg1"),
            trigger: "blur"
          },
          {
            min: 6,
            message: this.$t("uc.account.fundpwdmsg2"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    getcard(val) {
      const { name, bankName, bankBranch, bankNo } = val;
      this.formValidate = { name, bankName, bankBranch, bankNo };
    }
  },

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = {
            bank: this.formValidate.bankName,
            branch: this.formValidate.bankBranch,
            jyPassword: this.formValidate.password,
            realName: this.formValidate.name,
            cardNo: this.formValidate.bankNo
          };
          this.$emit("submitcard", param);
        } else {
          this.$Message.error(this.$t("uc.safe.save_failure"));
        }
      });
    },
       handleReset(name) {
      this.$refs[name].resetFields();
      this.$emit("cancelwx");
    }
  }
};
</script>
<style lang="less" scoped>

</style>


