
let ss = require('slideshow');

function makeSlideShow() {
    return new ss("powerpoint");
}

module.exports = {
    slideshow: makeSlideShow(),
}