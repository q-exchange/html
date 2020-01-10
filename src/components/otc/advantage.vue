<template>
  <div class="advantage">
    <ul>
      <li>
        <div class="image">
          <img src="../../assets/images/price.png" alt />
        </div>
        <div class="title">{{$t('paper.market')}}</div>
        <div class="content1">{{$t('paper.price')}}</div>
      </li>
      <li>
        <div class="image">
          <img src="../../assets/images/poundage.png" alt />
        </div>
        <div class="title">{{$t('paper.charge')}}</div>
        <div class="content1">{{$t('paper.users')}}</div>
      </li>
      <li>
        <div class="image">
          <img src="../../assets/images/instant.png" alt />
        </div>
        <div class="title">{{$t('paper.instant')}}</div>
        <div class="content1">{{$t('paper.deal')}}</div>
      </li>
      <li>
        <div class="image">
          <img src="../../assets/images/platedanbao.png" alt />
        </div>
        <div class="title">{{$t('paper.plateform')}}</div>
        <div class="content1">{{$t('paper.save')}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  }
}
</script>

<style scoped lang="less">
@import '../../my_theme/custom.less';
@import url("../../less/otc/index/light.less");
.advantage {
  box-shadow: 2px 2px 5px @shadowColor, -2px -2px 4px @shadowColor;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    li {
      width: 25%;
      list-style-type: none;
      min-height: 200px;
      div {
        text-align: center;
      }
      div.image {
        width: 50px;
        height: 50px;
        margin: 20px auto;
        img {
          width: 100%;
        }
      }
      div.title {
        line-height: 30px;
        font-size: 16px;
        color:@titleColor;
      }
      div.content1 {
        padding: 20px 40px;
        line-height: 20px;
        font-size: 12px;
        color:@contentColor;
      }
    }
  }
}
</style>