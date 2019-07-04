<template>
    <div class="menu">
        {{message}}
        {{name.name}}
    </div>
</template>

<script>
import bus from "@/bus/bus"
export default {
    inject:['name'],
    data () {
        return {
            message:'1234'
        }
    },
    created () {
        let self = this
        bus.$on('todo',(val) => {
            console.log(val)
            self.message = val
        })
    }
}
</script>

<style>

</style>
