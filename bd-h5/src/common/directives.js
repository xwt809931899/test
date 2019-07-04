import util from './util'
import store from 'store'

module.exports = function (Vue) {

    Vue.directive("src", (function () {
        window.requestAnimationFrame = window.requestAnimationFrame || window.setTimeout

        function getBase64ByColor(color) {
            const canvas = document.createElement("canvas")
            canvas.width = 1
            canvas.height = 1
            const ctx = canvas.getContext("2d")
            ctx.fillStyle = color
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            return canvas.toDataURL()
        }

        const defaultImgs = ["#8c8a8d", "#8aa0ac", "#d1e0d4", "#94b1c9", "#aeb79c", "#d4c2a0", "#d6cdc1", "#a67a93", "#cdb1ba", "#f9d0bd"].map(function (item) {
            return getBase64ByColor(item);
        })

        return {
            // 宽高相对于屏幕宽度的比例
            params: ['w', 'h', 'scrollSelector'],
            wrapper: null,
            bind(value){
                this.onScroll = this.onScroll.bind(this)
                this.vm.$nextTick(() => {
                    this.wrapper = document.querySelector('#wrapper>.scroll') || document.querySelector('#wrapper') || document.body
                    if (this.params.scrollSelector === 'document') {
                        this.wrapper = document
                    }
                    // 绑定事件
                    window.addEventListener('resize', this.onScroll)
                    this.wrapper.addEventListener('scroll', this.onScroll)
                    const width = window.innerWidth > 640 ? 640 : window.innerWidth
                    this.el.width = width * this.params.w
                    this.el.height = width * this.params.h
                    this.el.src = defaultImgs[parseInt(Math.random() * defaultImgs.length)]
                })
            },
            update(value){
                this.el.setAttribute('_src', value)
                if (value) {
                    this.imgSrc = util.addParam(value, 'imageslim') // 图片压缩参数
                }
                this.vm.$nextTick(() => {
                    this.onScroll()
                    window.requestAnimationFrame(this.onScroll)
                })
            },
            unbind() {
                // 移除事件
                window.removeEventListener('resize', this.onScroll)
                this.wrapper.removeEventListener('scroll', this.onScroll)
            },
            imgSrc: "",
            onScroll () {
                const windowHeight = window.innerHeight

                const elTop = this.el.getBoundingClientRect().top,
                    elHeight = this.el.height;

                const inView = (elTop >= 0 && elTop < windowHeight) || (elTop + elHeight >= 0 && elTop + elHeight < windowHeight)

                if (inView) {
                    if (this.el.getAttribute("src") !== this.imgSrc && this.imgSrc) {
                        this.el.setAttribute("src", this.imgSrc);
                        this.el.onload = () => {
                            this.el.removeAttribute("width");
                            this.el.removeAttribute("height");
                            this.el.onload = undefined;
                        }

                    }
                }
            }
        }
    })())


    Vue.directive('countdown', {
        /*
         支持 time 和 actEndTime 两种方式，两个参数只能传一个
         time 是服务器已经算好的 this.params.actEndTime - Date.now()
         */
        params: ['fmt', 'time', 'actEndTime', 'showDay'],
        timer: -1,
        lag: 0,
        render(){
            let remain = 0
            let actEndTime = this.params.actEndTime
            if (Object.prototype.toString.call(actEndTime) === "[object String]") {
                actEndTime = new Date(actEndTime.replace(/-/g, '/'))
            }
            if (this.params.time == null) {
                remain = (actEndTime - store.state.system.curTime) / 1000
            } else {
                remain = (this.params.time - this.lag) / 1000
            }
            if (remain <= 0) {
                this.el.innerHTML = '00:00:00'
                return
            }
            const fmt = this.params.fmt || 'hh:mm:ss'
            var h = parseInt(remain / 3600),
                m = parseInt(remain / 60 % 60),
                s = parseInt(remain % 60),
                day = 0

            function fix(i) {
                return i < 10 ? '0' + i : i;
            }

            if (this.params.showDay && h >= 24) {
                day = parseInt(h / 24)
                h = h % 24
            }

            const fmtData = {
                dd: fix(day),
                hh: fix(h),
                mm: fix(m),
                ss: fix(s),
            }

            let r = fmt
            // 自动格式化，天数大于1显示天数，小时大于1显示小时
            if (r === 'auto') {
                r = 'mm:ss'
                if (h > 0) {
                    r = 'hh:' + r
                }
                if (day > 0) {
                    r = 'dd天' + r
                }
            }
            for (const k in fmtData) {
                r = r.replace(new RegExp(k, 'g'), fmtData[k])
            }
            // 有showDay参数，没有 d 占位符，自动添加 d天
//            if (fmt.indexOf('d') === -1 && this.params.showDay && day > 0) {
//                r = `${day}天${r}`
//            }
            this.el.innerHTML = r
        },
        bind(){
        },
        update(){
            window.clearInterval(this.timer)
            const startDate = Date.now()
            this.timer = window.setInterval(() => {
                this.lag = Date.now() - startDate
                this.render()
            }, 1000)
            this.render()
        },
        unbind(){
            window.clearInterval(this.timer)
        }
    })
}
