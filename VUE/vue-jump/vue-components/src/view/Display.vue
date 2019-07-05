<template>
    <div>
        <h3>动态渲染 .vue 文件的组件--display</h3>
        <v-display :code='code'></v-display>
    </div>
</template>

<script>
//驼峰式命名要改成杠
import display from '@/components/com/display'
import defaultCode from './default-code'
export default {
    components:{
        'v-display':display,
    },
    data () {
        return {
            code:'default'
        }
    }
}
</script>

<style>

</style>
