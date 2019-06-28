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

export const playerMixin = {
    computed:{
        ...mapGetters([
            'playList',
            'currentSong',
            'currentIndex',
            'favoriteList'
        ]),
        favoriteIcon () {
            return this.getFavoriteIcon(this.currentSong)
        }
    },
    methods:{
        getFavoriteIcon (song) {
            if(this.isFavorite(song)) {
                return 'icon-favorite'
            } else {
                return 'icon-not-favorite'
            }
        },
        toggleFavorite (song) {
            if(this.isFavorite(song)) {
                this.deleteFavoriteList(song)
            } else {
                this.saveFavoriteList
            }
        },
        isFavorite (song) {
            const index = this.favoriteList.findIndex((item) => {
                return item.id === song.id
            })
            return index > -1
        },
        deleteFavoriteList (song) {

        },
        saveFavoriteList (song) {

        },
        ...mapMutations({      //对应mutations  不需经过actions的手
            setPlaylist:'SET_PLAYLIST',
            setCurrentIndex:'SET_CURRENT_INDEX',
            setPlaying:'SET_PLAYING'
        }),
        ...mapActions([
            'saveFavoriteList'
        ])

    }
}