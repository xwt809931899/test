const https = require('https');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const url = 'https://movie.douban.com/top250';
const imageDir = './math/'
const moviesDir = './doubanMoviesData/';
function doSpider (start) {
    https.get(url + `?start=${start}`,(res) => {
        let html = '';
        res.on('data', (chunk) => {
            html += chunk;
        });
        res.on('end',() => {
            // console.log(html);
            const $ = cheerio.load(html);
            //li .item 25
            let movies = [];
            $('.item').each(function () {
                //this 限制第一个参数的选择区域
                //默认全局 第一个
                const picUrl = $('.pic img',this).attr('src');
                const title = $('.info .title',this).text();
                const star = $('star .rating_num',this).text();
                const link = $('.hd a',this).attr('href');
                //
                const movie = {
                    title,
                    star,
                    link,
                    picUrl
                }
                movies.push(movie);
                // console.log(picUrl);
                downloadImage(picUrl);
    
            })
            saveLocalData(movies,start / 25);
        });
        
    })
}

function  saveLocalData (movies,pageNum) {
    fs.writeFile(moviesDir + `data${pageNum}.json`,
       JSON.stringify(movies),
       (err) => {
           if(!err){
               console.log("数据保存成功")
           }
       }
        
        )
}
function downloadImage(picUrl) {
    https.get(picUrl,(res) => {
        res.setEncoding('binary');
        let data = ''
        res.on('data',(chunk) => {
            data += chunk;
        })
        res.on('end',() => {
            const fileName = path.basename(picUrl);
            fs.writeFile(imageDir + fileName,
            data,
            'binary',
            (err) => {
                console.log(err)
                if(!err){
                    console.log(fileName,'保存成功');
                }
            }
            )
        })
    })
}
const total = 250;
let start = 0;
while(start < total){
    doSpider(start);
    start +=25;
    
}