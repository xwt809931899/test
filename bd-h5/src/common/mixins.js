export const isChannel = {
    computed: {
        isChannel() {
            return !!sessionStorage.getItem('channel')
        }
    }
}