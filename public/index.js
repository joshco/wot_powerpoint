/**
 * In the browser, node wot only works in client mode with limited binding support.
 * Supported bindings: HTTP / HTTPS / WebSockets
 *
 * After adding the following <script> tag to your HTML page:
 * <script src="https://cdn.jsdelivr.net/npm/@node-wot/browser-bundle@latest/dist/wot-bundle.min.js" defer></script>
 *
 * you can access all node-wot functionality / supported packages through the "Wot" global object.
 * Examples:
 * var servient = new Wot.Core.Servient();
 * var client = new Wot.Http.HttpClient();
 *
 **/
var jseditor = null;

var logger;
var mything;
let eventSubscriptions = {};

function createLog() {
    logger = CodeMirror.fromTextArea(document.getElementById("uilogger"), {
        theme: 'cobalt',
        lineWrapping: true,
        scrollbarStyle: "null"
    });
}

function uilogger(...messages) {
    var message=messages.map(function(arg) {
        if ( typeof(arg)=== 'object') {
            arg=JSON.stringify(arg,undefined,2);
        }
        return arg;
    }).join("\n");


    var existing = logger.getValue();
    logger.setValue(existing.concat(message, "\n"));
    //logger.execCommand('goDocEnd');
    logger.setCursor({line: logger.lastLine(), ch:0});
    window.scrollTo({x: 0, top: 0});
}

function get_td(addr) {
    servient.start().then((thingFactory) => {
        helpers.fetch(addr).then((td) => {
            thingFactory.consume(td)
                .then((thing) => {
                    removeInteractions();

                    showInteractions(thing);
                    initialStatus(thing);
                }).then((thing) => {

            });
        }).catch((error) => {
            uilogger("Could not fetch TD.\n" + error)
        })
    })
}

function initialStatus(thing) {

        thing.readProperty("status")
            .then(res => {

                uilogger("status: ", res)
                showResults(res);
            })
            .catch(err => uilogger("errsor: " + err))

}

function showInteractions(thing) {
    mything = thing;
    let td = thing.getThingDescription();
    for (let property in td.properties) {
        if (td.properties.hasOwnProperty(property)) {
            let item = document.createElement("li");
            item.className='list-group-item';
            let link = document.createElement("a");
            link.className=`btn btn-default`;
            link.appendChild(document.createTextNode(property));
            item.appendChild(link);
            document.getElementById("properties").appendChild(item);

            item.onclick = (click) => {
                thing.readProperty(property)
                    .then(res => {

                        uilogger(property + ": ", res)
                        showResults(res);
                    })
                    .catch(err => uilogger("error: " + err))
            }
        }
    }
    ;
    for (let action in td.actions) {
        if (td.actions.hasOwnProperty(action)) {
            let item = document.createElement("li");
            item.className="list-group-item";
            let button = document.createElement("button");
            let icon = td.actions[action].icon || 'fa-play';
            let btn= td.actions[action].btn || 'default';
            let label = `<i class="fa fa-lg ${icon}"></i>&nbsp;&nbsp;&nbsp; ${action}`;
            $(button).html(label);
            button.className = `"btn btn-lg btn-${btn} btn-block`;
            item.appendChild(button)
            document.getElementById("actions").appendChild(item);


                item.onclick = (click) => {
                    if (td.actions[action].input) {
                        showSchemaEditor(action, thing)
                    } else {
                        thing.invokeAction(action, {})
                            .then((res) => {
                                if (res) {
                                    showResults(res);
                                    uilogger("Success! Received response: ", res)
                                } else {
                                    uilogger("Executed successfully.")
                                }
                            })
                            .catch((err) => {
                                uilogger(err)
                            })
                    }
                }
        }
    }
    ;

    // for (let evnt in td.events) {
    //     if (td.events.hasOwnProperty(evnt)) {
    //         let item = document.createElement("li");
    //         let link = document.createElement("a");
    //         link.appendChild(document.createTextNode(evnt));
    //
    //         let checkbox = document.createElement("div");
    //         checkbox.className = "switch small"
    //         checkbox.innerHTML = '<input id="' + evnt + '" type="checkbox">\n<label for="' + evnt + '"></label>'
    //         item.appendChild(link);
    //         item.appendChild(checkbox)
    //         document.getElementById("events").appendChild(item);
    //
    //         checkbox.onclick = (click) => {
    //             if (document.getElementById(evnt).checked && !eventSubscriptions[evnt]) {
    //                 eventSubscriptions[evnt] = thing.subscribeEvent(evnt,
    //                     (response) => {
    //                         uilogger(evnt + ": " + response);
    //                     }).then(() => {
    //                     //uilogger("onCompleted");
    //                 })
    //                     .catch((e) => {
    //                         uilogger("onError: %s", e);
    //                     })
    //
    //                 uilogger(`Subscribed to ${evnt}`);
    //
    //             } else if (!document.getElementById(evnt).checked && eventSubscriptions[evnt]) {
    //                 eventSubscriptions[evnt]=false;
    //                 thing.unsubscribeEvent(evnt);
    //                 uilogger(`Unsubscribed ${evnt}`);
    //             }
    //         }
    //     }
    // }
    ;
    // Check if visible
    let placeholder = document.getElementById("interactions")
    if (placeholder.style.display === "none") {
        placeholder.style.display = "block"
    }
}

function showResults(results){
    let placeholder = document.getElementById('results_holder');
    while (placeholder.firstChild) {
        placeholder.removeChild(placeholder.firstChild);
    }
    let resultsEditor = new JSONEditor(
        placeholder,
        {
            schema: {
                title: 'Status',
                type: "object",
                properties: {
                    state: {
                        type: "string"
                    },
                    position: {
                        type: "integer"
                    },
                    slides: {
                        type: "integer"
                    }
                }
            },

            disable_edit_json: true,
            disable_properties: true,
            disable_collapse: true,
            startval: results,
            form_name_root: "Status"
        }
    )
    resultsEditor.disable();
}
function removeInteractions() {
    for (id of ["properties", "actions"]) {
        let placeholder = document.getElementById(id);
        while (placeholder.firstChild) {
            placeholder.removeChild(placeholder.firstChild);
        }
    }
}

function showSchemaEditor(action, thing) {
    let td = thing.getThingDescription();
    // Remove old editor
    removeSchemaEditor()

    let placeholder = document.getElementById('editor_holder');
    let editor;
    if (td.actions[action] && td.actions[action].input) {
        td.actions[action].input.title = action
        editor = new JSONEditor(
            placeholder,
            {
                schema: td.actions[action].input,
                form_name_root: action,
                theme: 'foundation'
            }
        );
        jseditor = editor;
    }
    // Add invoke button
    let button = document.createElement("button")
    button.appendChild(document.createTextNode("Invoke"))
    placeholder.appendChild(button)

    button.onclick = () => {
        let input = editor ? editor.getValue() : "";
        thing.invokeAction(action, input)
            .then((res) => {
                if (res) {
                    showResults(res);
                    uilogger("Success! Received response: " + res)
                } else {
                    uilogger("Executed successfully.")
                }
            })
            .catch((err) => {
                uilogger(err)
            })
        removeSchemaEditor()
    };
}

function removeSchemaEditor() {
    let placeholder = document.getElementById('editor_holder');
    while (placeholder.firstChild) {
        placeholder.removeChild(placeholder.firstChild);
    }
}


var servient = new Wot.Core.Servient();
servient.addClientFactory(new Wot.Http.HttpClientFactory());
var helpers = new Wot.Core.Helpers(servient);
document.getElementById("fetch").onclick = () => {
    get_td(document.getElementById("td_addr").value);
};
