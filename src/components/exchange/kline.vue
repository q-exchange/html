<template>
    <div class="imgtable" :loading="loadingButton7">
        <div :id="id" :class="{hidden:currentImgTable==='s'}"></div>
    </div>
</template>
<script>
export default {
    name: "kline",
    props:{
        currentImgTable:String,
        id:String
    },

}
</script>