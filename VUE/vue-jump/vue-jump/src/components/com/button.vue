<template>
    <button :class="'i-button-size' + size" :disabled="disabled" @click="handleClick">
        <slot></slot>
        <!-- {{msg}} -->
    </button>
</template>

<script>
function oneOf (value,validList) {
    for(let i = 0; i < validList.length; i++) {
        if(value === validList[i]) {
            return true
        }
    }
    return false
}
import bus from '@/bus/bus'
export default {
    data () {
        return {
            msg:'1111111111'
        }
    },
    props:{
        size:{
            validator(value) {
                return oneOf(value,['small','large','default'])
            },  //校验传过来是否有这个属性
            default:'default'
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        handleClick (event) {
            console.log(event)
            // this.$emit('on-click',this.msg)
            bus.$emit('todo',this.msg)
        }
    }
}
</script>

<style scoped>
button{
    border-radius: 5px;
    cursor: pointer;
    outline: none;
}
.i-button-sizelarge{
    padding:12px;

}
.i-button-sizedefault{
    padding:8px;
    
}
.i-button-sizesmall{
    padding:4px;
    
}

</style>
