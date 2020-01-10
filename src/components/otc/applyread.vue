<template>
  <div>
    <Modal v-model="modalRead">
      <p slot="header">
        <span class="tit">{{$t('uc.identity.second.line')}}</span>
      </p>
      <div class="apply-note">
        <h3 style="padding-top: 10px;">{{$t('uc.identity.second.step1')}}</h3>
        <p>{{$t('uc.identity.second.step1c1')}}<br>{{$t('uc.identity.second.step1c2')}}</p>
        <h3>{{$t('uc.identity.second.step2')}}</h3>
        <p>{{$t('uc.identity.second.step2c')}}</p>
        <h3>{{$t('uc.identity.second.step3')}}</h3>
        <p>{{$t('uc.identity.second.stepc')}}</p>
        <div style="text-align: left;padding: 30px 0;">
          <Checkbox v-model="agreeFrozen"></Checkbox> {{$t('uc.identity.second.agree')}}
          <span>
            <font color="#3399ff">{{auditText}}</font>{{$t('uc.identity.second.agreec')}}</span>
        </div>
        <Button @click="apply" long style="font-size: 16px;background:#357ce1;color:#fff;border:1px solid #3399ff;">{{$t('uc.identity.second.shenqingchngweishangjia')}}</Button>
      </div>
      <p slot="footer">
        <!--<span style="text-align: left">-->
        <!--<Checkbox v-model="agreeFrozen" ></Checkbox> <span>同意冻结{{auditText}}作为商家保证金</span>-->
        <!--</span>-->
        <!--<Button type="info" @click="apply">申请成为商家</Button>-->
      </p>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "applayread",
  props:{
    modalRead:Boolean
  },
  data(){
    return{
        agreeFrozen: false,
    }
  },
  methods:{
    apply(){
      let agreeFrozen = this.agreeFrozen;
      if (agreeFrozen == false) {
        this.$store.state.lang != "English" &&
          this.$Message.warning("请同意冻结相应数量的币");
        this.$store.state.lang == "English" &&
          this.$Message.warning(
            "Please agree to freeze the corresponding amount of currency"
          );
        return;
      }
      this.$emit('modalstatus')
    }
  }
};
</script>
<style lang="less" scoped>
.apply-note {
  font-size: 14px;
}
.apply-note h3 {
  padding: 20px 0;
  font-size: 16px;
}
.apply-note ul {
  list-style: initial;
  padding-left: 20px;
}
</style>