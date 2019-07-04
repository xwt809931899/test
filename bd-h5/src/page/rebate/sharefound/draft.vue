<template>
    <div class="share_found">
        <header>
            <a href="javascript:window.history.go(-1);" class="goback"></a>
            <h1>
                <div id="j-act-title" class="title">我的草稿箱</div>
            </h1>
        </header>

        <div class="container">
            <div class="draft-list">
                <pager :on-data="getData" :start-num="0" :model.sync="list">
                    <slide-left-btns v-for="item in list" :show-del="true" @slide-del="delFound(item)">
                        <div class="draft-item">
                            <a v-link="'/'+item.eid" class="item-draft display-flex">
                                <div><img :src="item.titleImg"></div>
                                <div class="details">
                                    <p class="title">{{item.title}}&nbsp;</p>
                                    <br>
                                    <time>{{item.changeTime}} 保存</time>
                                </div>
                            </a>
                        </div>
                    </slide-left-btns>
                </pager>
            </div>
            <div v-if="list.length===0" class="no-draft">
                <img class="note" src="imgs/ic_draftsbox_empty.png"/>
                <div class="tip"> 您还没有保存过草稿哦</div>
                <button class="al-btn al-btn-primary pub" onclick="location='/rebate/share_found.html'">发表文案</button>
            </div>
        </div>
    </div>

</template>

<script>
    var tip = new Base.Widget.Tip();
    export default{
        data(){
            return {
                list: [],
            }
        },
        methods: {
            getData({ startNum }){
                return this.$http.get(gConfig.PROJECT_REBATE+'/api/essay/draftEssayList', {
                    startNum
                });
            },
            delFound(item){
                this.$http.get(gConfig.PROJECT_REBATE+'/api/essay/deleteEssay', { eid: item.eid }).success(({ code, data })=> {
                    if (code === 1000 && data.result === 'Y') {
                        tip.show(" 删除成功", { 'timeout': 1000 });
                        this.list.$remove(item);
                    }
                })
            }
        },
        ready(){
        },
        route: {
            data(){
                setTimeout(() => {
                    this.$broadcast("loadPage");
                });
            }
        },
    }
</script>
