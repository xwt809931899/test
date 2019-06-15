class Router {
    constructor(options) {
      console.log(options);
      // 将数组配置项， 转变成， json
      this.routes = {};
      this.bindEvent();
      options.forEach(item => {
        this.route(item.path, ()=> {
          document.querySelector('#content').innerHTML = item.component;
        })
      })
      console.log(this.routes);
    }
    init() {
        window.addEventListener('load', this.updateView.bind(this),false)
        //管理页面路由变化的监听事件，当我们点击
        window.addEventListener('popstate',this.updateView.bind(this),false)
      }
    route( path, cb) {
      this.routes[path] = cb;
    }
    updateView() {
      const currentUrl = window.location.pathname || '/';
      console.log(currentUrl);
      this.routes[currentUrl] && this.routes[currentUrl]();
    }
    push (url) {
      window.history.pushState({}, null, url);
      this.updateView();
    }
    bindEvent () {
      const links = document.getElementsByTagName('a');
      const that = this;
      [].forEach.call(links, link => {
        link.addEventListener('click', function() {
          const url = this.getAttribute('data-href');
          // console.log(url);
          that.push(url);
        })
      })
    }
  }
  