'use strict'

let process=require('process');

let ngrok=require('ngrok');
let ppt = require('./ppt-obj.js');
let slideshow = ppt.slideshow;
var path = require('path');

var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs.create().engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res, next) {
    res.render('browser', {
        showTitle: true,
        layout: false,

        // Override `foo` helper only for this rendering.
        helpers: {
            wot_url: function () { return "".concat(process.env.WOT_URL_BASE,'/WOT'); }
        }
    });
});

var proxy = require('http-proxy').createProxyServer({
    //host: 'http://your_blog.com',
    // port: 80
});
app.use('/WOT', function(req, res, next) {
    proxy.web(req, res, {
        target: 'http://localhost:8081/WOT'
    }, next);
});


let pptfilename = 'sample.pptx';
//
// slideshow.boot()
//     .then(function () { slideshow.open(pptfilename) })
//
// const http = require('http')
// const port = 3010;

//process.env.WOT_URL_BASE='http://wot.yoga.joshco.me:8081';

var wotServer = require('./wot-server');

var wts;

getNgrok().then((url)=>{
    let httpUrl=url.replace("https","http");
    process.env.WOT_URL_BASE=httpUrl;
    wts=wotServer.start();
    wts.then(()=>{
        setTimeout(()=> {
            // Delay to make sure it is the last thing printed to the console.
            console.log("Make sure PowerPoint is open with your preso loaded!");
            console.log(`Open browser to Ngrok url: \n${httpUrl}`);
        },2000)

    });
    return httpUrl;
});


async function getNgrok() {
    var ngUrl= await ngrok.connect({addr: 3000,proto:'http'}); // https://757c1652.ngrok.io -> http://localhost:9090
    console.log(`URL ${ngUrl}`);
    return ngUrl;
}

//const url = getNgrok();


const requestHandler = (request, response) => {
    console.log(request.url)


    if(request.url.indexOf("last") !== -1){
        console.log("last slide");
        slideshow.boot()
            .then(function () { slideshow.last() })
    }

    if(request.url.indexOf("first") !== -1){
        console.log("first slide");
        slideshow.boot()
            .then(function () { slideshow.first() })
    }

    if(request.url.indexOf("next") !== -1){
        console.log("next slide");
        slideshow.boot()
            .then(function () { slideshow.start() })
            .then(function () { slideshow.next() })
    }

    if(request.url.indexOf("previous") !== -1){
        console.log("previous slide");
        slideshow.boot()
            .then(function () { slideshow.start() })
            .then(function () { slideshow.prev() })
    }

    if(request.url.indexOf("slide") !== -1){
        let slideno = request.url.split('=')[1];
        console.log("go to slide: " + slideno);
        slideshow.boot()
            .then(function () { slideshow.start() })
            .then(function () { slideshow.goto(slideno) })

    }

    response.end('Alexa PowerPoint Controller')
}
app.get('/',requestHandler);

//
// const server = http.createServer(requestHandler)
//
// server.listen(port, (err) => {
//     if (err) {
//         return console.log('Error: something bad happened', err)
//     }
//
//     console.log('Alexa PowerPoint Controller is listening on port ' + port);
// })

module.exports = app;
