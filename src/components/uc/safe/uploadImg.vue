<template>
    <div>
        <div>{{txt}}</div>
        <input type="hidden" :name="imgName" :value="imgData" />
        <img id="frontCardImg" style="width: 150px;height: 100px; margin:10px 0;" :src="imgSrc">
        <div class="acc_sc" style="margin-bottom:20px;">
            <Upload :show-upload-list="false" :before-upload="beforeUpload" :on-success="frontHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                <Button icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
            </Upload>
        </div>
    </div>
</template>
<script>
export default {
    name:"uploadimg",
    props:{
        txt:String,
        imgSrc:String,
        imgData:String,
        imgName:String,
        imgShow:String
    },
    data(){
      return{
        uploadUrl:this.host + "/uc/upload/oss/image",
        uploadHeaders:{
          "x-auth-token":localStorage.getItem('TOKEN')
        }
      }
    },
    methods:{
        beforeUpload(data) {
            if (data && data.size >= 1024000 * 2) {
                this.$Message.error("上传图片大小不能超过2M");
                return false;
            }
        },
        frontHandleSuccess(res, file, fileList) {
            if (res.code == 0) {
                this.imgSrc = res.data;
                this.$emit("success",{src:res.data,name:this.imgName,imgShow:this.imgShow});
            } else {
                this.$Message.error(res.message);
            }
        },
    }
}
</script>
