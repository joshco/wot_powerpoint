let ppt = require('./ppt-obj.js');
let slideshow = ppt.slideshow;

// example-server.js
Servient = require("@node-wot/core").Servient;
HttpServer = require("@node-wot/binding-http").HttpServer;
Helpers = require("@node-wot/core").Helpers;

var theThing;

// create Servient add HTTP binding with port configuration
let servient = new Servient();

function getThing() {
    return theThing;
}

function updateState2(thing) {

    return slideshow.stat()
        .then((response) => {
            status = response;
            return status;
        });
}


function wotThing() {
    servient.addServer(new HttpServer({
        port: 8081 // (default 8080)
    }));
    return servient.start().then((WoT) => {
            WoT.produce({
                "@context": "https://www.w3.org/2019/wot/td/v1",
                title: "WOT",
                properties: {
                    status: {
                        type: "object"
                    }
                },
                actions: {
                    next: {
                        icon: 'fa-step-forward',
                        btn: 'success'
                    },
                    prev: {
                        icon: 'fa-step-backward',
                        btn: 'primary'
                    },
                    start: {
                        icon: 'fa-play'
                    },
                    first: {
                        icon: 'fa-fast-backward'
                    },
                    last: {
                        icon: 'fa-fast-forward'
                    },
                    stop: {
                        icon: 'fa-stop'
                    }
                }
            }).then((thing) => {

                thing.expose().then(() => {
                    console.info(thing.getThingDescription().title + " ready");
                    theThing = thing;

                    function updateState() {
                        return updateState2(thing)
                    }

                    function actionHandler(action, start, arg) {
                        return new Promise((resolve, reject) => {
                                var p = slideshow.boot()

                                if (start) {
                                    p = p.then(() => slideshow.start())
                                }

                                p.then(function () {
                                    //slideshow.first()
                                    slideshow[action](arg)
                                }).then(updateState).then((response) => resolve(response));
                            }
                        )
                    }


                    thing.setPropertyReadHandler(
                        "status",
                        (value) => {
                            return new Promise((resolve, reject) => {
                                var status;
                                slideshow.boot()
                                    .then(() => {
                                        status = slideshow.stat()
                                            .then((response) => {
                                                status = response;
                                                thing.writeProperty("status", status)
                                                resolve(response)
                                            })
                                    })
                            })
                        });

                    thing.setActionHandler("first", (siren) => {
                        return actionHandler("first")
                    });


                    thing.setActionHandler("last", (siren) => {
                        return actionHandler("last");
                    });

                    thing.setActionHandler("next", (siren) => {
                        return actionHandler("next", true)
                    });

                    thing.setActionHandler("prev", (siren) => {
                        return actionHandler("prev", true)
                    });

                    thing.setActionHandler("stop", (siren) => {
                        return actionHandler("stop")
                    });

                    thing.setActionHandler("start", (siren) => {
                        return actionHandler("start")
                    });

                });
            })
        });
}

module.exports = {
    start: wotThing,
    thing: getThing,
    servient: servient
};
