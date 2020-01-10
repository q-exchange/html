<template>
    <div class="wrapper">
        <ul>
            <li><i class="start"></i><i></i></li>
            <li><i></i></li>
            <li><i></i></li>
            <li><i></i></li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"noLoginSlider",
    data(){
        return{
            percent:0
        }
    }
}
</script>
<style lang="less" scoped>
.exchange .wrapper{
    margin-top: 18px;
    ul{
        width: 100%;
        height: 4px;
        background-color: #34363f;
        transition: all 0s;
        border-radius: 5px;
        display: flex;
        cursor: pointer;
        li{
            width: 25%;
            position: relative;
            cursor: pointer;
            i{
                display: inline-block;
                width: 8px;
                height: 8px;
                background-color: #34363f;
                border-radius: 50%;
                position:absolute;
                right: 0;
                top: -4px;
                border: 2px solid #1f2126;
                box-sizing: content-box;
                cursor: pointer;
                transition: all 0s;
                
                &:hover{
                    border-color: #34363f;;
                    
                }
            }
            i.start{
                left: 0;
            }
        }
    }
}
.exchange.day .wrapper{
    ul{
        background-color: #e5ebf5;
        li{
            i{
                background-color: #e5ebf5;
                border-radius: 50%;
                position:absolute;
                right: 0;
                top: -4px;
                border: 2px solid #fff;
                box-sizing: content-box;
                cursor: pointer;
                transition: all 0s;
                &:hover{
                    border-color: #e5ebf5;;
                    
                }
            }
            i.start{
                left: 0;
            }
        }
    }
}
</style>