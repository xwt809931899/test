/**
 * pager.js
 */
(function () {

    var Pager = Base.klass.create({
        elements: {
            '.j-current-page': 'elCurrentPage',
            '.j-total-page': 'elTotalPage'
        },
        events: {
            'click .j-prev': 'goPrev',
            'click .j-next': 'goNext'
        },
        init: function () {
            this.currentPage = 1;
            this.totalPage = null;
            var body = document.querySelector('body')
            var self = this
            $(document).scroll(function () {
                if (window.innerHeight + window.scrollY + 50 > body.scrollHeight) {
                    console.log('到底')
                    if (self.loading || self.noMore) return
                    self.loading = true;
                    self.getData(self.startNum)
                }
            })
            this.el.html('')
        },
        startNum: 0,
        noMore: false,
        getData: function () {
        },
        total: function (count, size) {
            this.totalPage = Math.ceil(parseFloat(count) / parseFloat(size)) || 1;
            this.render();
        },
        complete: function (result, list) {
            this.loading = false;
            this.startNum = result.data.startNum
            if (list.length > 0 && list.length < this.startNum) {
                this.noMore = true;
                this.el.html('')
//                this.el.html('没有更多数据')
                console.log('没有更多数据')
            }
            this.render();
        },
        goPrev: function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.go();
            }
            return false;
        },
        goNext: function () {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
                this.go();
            }
            return false;
        },
        go: function (page) {
            this.currentPage = page || this.currentPage;
            this.trigger('go', this.currentPage);
            this.render();
        },
        render: function () {
            this.elCurrentPage.text(this.currentPage);
            this.elTotalPage.text(this.totalPage);
        },
        setCurrent: function (page) {
            this.currentPage = page || 1;
        }
    });

    Base.Widget.Pager = Pager;

})();