// 云函数入口文件
const cloud = require('wx-server-sdk');
const request = require('request');
const cheerio = require('cheerio');

cheerio.prototype.removeTagText = function () {
  const html = this.html();
  // <span>123456</span>
  return html.replace(/<.*>.*<\/.*>/g, '');
}
cloud.init()
function youhuiSpider() {
  return new Promise((resolve, reject) => {
    request('https://www.smzdm.com/youhui/', (err, res) => {
      if (!err) {
        const body = res.body;
        const $ = cheerio.load(body, {
          decodeEntities: false
        })
        let youhuiLists = []
        $('.list.list_preferential').each(function () {
          const price = $('.itemName .red', this).text().trim();
          // js innerHTML
          // <span></span>
          // <i></i>
          let title = $('.itemName a', this).removeTagText();
          const img = $('img', this).attr('src');
          const desc = $('.lrInfo', this).text().trim();
          youhuiLists.push({
            title,
            price,
            img,
            desc
          });
          console.log({
            title,
            price,
            img,
            desc
          })
        });
        resolve(youhuiLists);
      }
    })
  })
}
// resolve()
// async + await
// 云函数入口函数
exports.main = async (event, context) => {
  const youhuiLists = await youhuiSpider();
  return {
    youhuiLists
  }
}