<template>
    <div class="scroll brand-list">
        <header>
            <a class="back" href="javascript:history.back()"><i class="iconfont">&#xe603;</i></a>
            <h1> 关注的品牌</h1>
            <template v-if="list.length>0">
                <span class="right" v-show="!isEditor" @click="eidtor">编辑</span>
                <span class="right" v-show="isEditor" @click="eidtor">取消</span>
            </template>
        </header>
        <pager :on-data="getData" :start-num="0" :model.sync="list">
            <ul>
                <li v-for="item in list" class="display-flex" v-link="{ name: 'brand-details',params: {brandId:item.id,}}">
                    <div class="log">
                        <img :src="item.logourl"/>
                    </div>
                    <div class="name">{{item.name}}{{item.ename}}</div>
                    <div class="icon" v-show="!isEditor">
                        <img src="imgs/ic_tkcenter_com_right-arrow_default.png">
                    </div>
                    <div class="check" v-show="isEditor" @click.stop="toggleChoose(item)">
                        <i v-if="item.isSelected" class="iconfont">&#xe609;</i>
                        <i v-else class="iconfont">&#xe60e;</i>
                    </div>
                </li>
            </ul>
        </pager>
        <div class="empty" v-if="list.length === 0">
            <img class="note" src="imgs/ic_followbrand_empty.png">
            <div class="tip">您还没有关注过品牌哦</div>
        </div>
    </div>
    <div class="footer" v-show="isEditor && list.length>0">
        <button class="al-btn al-btn-clear al-btn-block al-btn-big" :class="{ 'al-btn-disabled': !isHasSelected }"
                @click="delete">取消关注
        </button>
    </div>
</template>
<script>
    import messBox from 'common/mess-box'
    export default{
        data(){
            return {
                details: {},
                list: [],
                isFavorited: false,
                branId: undefined,
                isEditor: false,
            }
        },
        computed: {
            isHasSelected(){
                var count = 0
                this.list.forEach(item => {
                    if (item.isSelected) {
                        count++
                    }
                });
                return count > 0
            }
        },
        methods: {
            getData({ startNum, pageSize }){
                return http.get('/api/user/brand.jsp', {
                    startNum,
                    pageSize,
                    op: 3,
                }).then((result) => {
                    var obj = result.data.obj;
                    obj.list.forEach((item) => {
                        item.isSelected = false;
                    });
                    return result;
                })
            },
            eidtor(){
                //如果点击取消，则遍历list，把里面的选中状态都置为false
                if (this.isEditor) {
                    this.list.forEach((item) => {
                        item.isSelected = false;
                    });
                }
                this.isEditor = !this.isEditor;

            },
            toggleChoose(item){

                item.isSelected = !item.isSelected;
            },
            delete(){
                var arry = []
                this.list.forEach(item => {
                    if (item.isSelected) {
                        arry.push(item.id);
                    }
                });
                if (arry.length === 0) {
                    messBox.tips('您未选中任何品牌');
                    return;
                }
                messBox.confirm('是否取消关注？').then(() => {

                    http.get("/api/user/brand.jsp", {
                        op: 2,
                        id: arry.join(',')
                    }).success(({ obj }) => {
                        if (obj) {
                            messBox.tips('取消关注成功');
                            this.$broadcast("loadPage");
                            this.isEditor = !this.isEditor;
                        }
                    });
                });
            },
        },
        ready(){
        },
        route: {
            data ({ to }) {
                setTimeout(() => {
                    this.$broadcast("loadPage");
                });
            }
        },
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    header {
        border-bottom: 1px solid #e5e5e5; /*no*/
    }

    .brand-list {
        padding-bottom: 100px;
    }

    .right {
        color: $C6;
        font-size: $H3;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
            height: 180px;
            border-bottom: 1px solid $C8; /*no*/
            background-color: #ffffff;
            .log {
                width: 180px;
                height: 180px;
                padding: 20px;
                img {
                    width: 140px;
                    height: 140px;
                    border: 1px solid $C8; /*no*/
                }
            }
            .name {
                flex: 1;
                color: $C4;
                font-size: $H4;
                padding: 0px 20px 0px 20px;
            }
            .icon {
                width: 44px;
                height: 180px;
                line-height: 180px;
                img {
                    width: 16px;
                    height: 24px;
                }
            }
            .check {
                width: 44px;
                height: 180px;
                line-height: 180px;
                margin-right: 20px;
                .iconfont {
                    font-size: 44px;
                    color: $C1;
                }
            }
        }
    }

    .empty {
        text-align: center;
        padding-top: 100px;
        .note {
            width: 160px;
            height: 160px;
        }
        .tip {
            color: $C7;
            font-size: $H4;
            padding-top: 25px;
            padding-bottom: 32px;
        }
    }

    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #fff;
        z-index: 1;
    }
</style>
