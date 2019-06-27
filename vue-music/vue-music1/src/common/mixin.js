import { mapGetters,mapMutations,mapActions } from 'vuex'
export const searchMixin = {
    data () {
        return {
            query:'',
            refreshDelay:120
        }
    },
    computed:{
        ...mapGetters([
            "searchHistory"
        ])
    },
    methods:{
        onQueryChange (query) {
            this.query = query.trim()
            // console.log(query)
            
        },
        blurInput () {      //给子组件绑定ref,那么父组件通过ref找到它能直接用子组件里的方法
            this.$refs.searchBox.blur()
        },
        addQuery (query) {
            this.$refs.searchBox.setQuery(query)
        },
        saveSearch (song) {
            console.log(song)
            this.selectPlaySong(song)
            this.saveSearchHistory(this.query)
        },
        ...mapActions([
            'saveSearchHistory',
            'selectPlaySong'
        ])
    }
}